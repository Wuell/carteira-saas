import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getQuote } from '@/lib/quotes'
import { getOrCreateUser } from '@/lib/user'
import type { Asset } from '@prisma/client'

// Alíquota IR regressivo para renda fixa (exceto LCI/LCA que são isentos)
function getIrRate(startDate: Date): number {
  const days = Math.floor((Date.now() - startDate.getTime()) / 86400000)
  if (days <= 180) return 22.5
  if (days <= 360) return 20
  if (days <= 720) return 17.5
  return 15
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const user = await getOrCreateUser(userId)
  const assets = await prisma.asset.findMany({ where: { userId: user.id } })

  if (assets.length === 0) {
    return NextResponse.json({ totalValue: 0, totalInvested: 0, returnPct: 0, assets: [] })
  }

  const assetsWithQuotes = await Promise.all(
    assets.map(async (asset: Asset) => {
      let currentValue: number
      let investedValue: number

      if (asset.type === 'fixed') {
        // Calcula renda fixa por lote: cada BUY transaction com sua própria data e taxa
        const transactions = await prisma.transaction.findMany({
          where: { userId: user.id, ticker: asset.ticker, type: 'fixed', operation: 'BUY' },
        })

        const lotsWithDate = transactions.filter(t => t.startDate && t.fixedRate)

        if (lotsWithDate.length > 0) {
          // Calcula cada lote individualmente
          let totalFromLots = 0
          let investedFromLots = 0
          for (const tx of lotsWithDate) {
            const lotCurrent = await getQuote(asset.ticker, 'fixed', {
              avgPrice: tx.price,
              subType: tx.subType ?? asset.subType,
              startDate: tx.startDate,
              maturityDate: tx.maturityDate ?? asset.maturityDate,
              fixedRate: tx.fixedRate,
            })
            totalFromLots += lotCurrent
            investedFromLots += tx.price
          }

          // Transações antigas sem data ficam pelo valor investido (sem rendimento calculado)
          const lotsWithoutDate = transactions.filter(t => !t.startDate || !t.fixedRate)
          const investedWithoutDate = lotsWithoutDate.reduce((s, t) => s + t.price, 0)
          totalFromLots += investedWithoutDate
          investedFromLots += investedWithoutDate

          currentValue = totalFromLots
          investedValue = investedFromLots
        } else {
          // Nenhum lote com data — fallback para cálculo aggregado do Asset
          const currentPrice = await getQuote(asset.ticker, asset.type, {
            avgPrice: asset.avgPrice,
            subType: asset.subType,
            startDate: asset.startDate,
            maturityDate: asset.maturityDate,
            fixedRate: asset.fixedRate,
          })
          currentValue = currentPrice * asset.quantity
          investedValue = asset.avgPrice * asset.quantity
        }
      } else {
        const currentPrice = await getQuote(asset.ticker, asset.type, {
          avgPrice: asset.avgPrice,
          subType: asset.subType,
          startDate: asset.startDate,
          maturityDate: asset.maturityDate,
          fixedRate: asset.fixedRate,
        })
        currentValue = currentPrice * asset.quantity
        investedValue = asset.avgPrice * asset.quantity
      }

      const grossGain = currentValue - investedValue
      const returnPct = investedValue > 0 ? (grossGain / investedValue) * 100 : 0

      // IR estimado para Tesouro/CDB usando startDate do asset como referência
      let irRate: number | null = null
      let netReturnPct: number | null = null
      if (asset.type === 'fixed' && asset.startDate && grossGain > 0) {
        irRate = getIrRate(asset.startDate)
        const netGain = grossGain * (1 - irRate / 100)
        netReturnPct = investedValue > 0 ? (netGain / investedValue) * 100 : 0
      }

      const currentPrice = asset.type === 'fixed' ? currentValue : currentValue / asset.quantity

      return { ...asset, currentPrice, currentValue, investedValue, returnPct, irRate, netReturnPct }
    })
  )

  const totalValue = assetsWithQuotes.reduce((sum, a) => sum + a.currentValue, 0)
  const totalInvested = assetsWithQuotes.reduce((sum, a) => sum + a.investedValue, 0)
  const returnPct = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0

  return NextResponse.json({ totalValue, totalInvested, returnPct, assets: assetsWithQuotes })
}
