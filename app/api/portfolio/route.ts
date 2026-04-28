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
      const currentPrice = await getQuote(asset.ticker, asset.type, {
        avgPrice: asset.avgPrice,
        startDate: asset.startDate,
        maturityDate: asset.maturityDate,
        fixedRate: asset.fixedRate,
      })
      const currentValue = currentPrice * asset.quantity
      const investedValue = asset.avgPrice * asset.quantity
      const grossGain = currentValue - investedValue
      const returnPct = investedValue > 0 ? (grossGain / investedValue) * 100 : 0

      // IR estimado para Tesouro/CDB (LCI/LCA são isentos mas não distinguimos ainda)
      let irRate: number | null = null
      let netReturnPct: number | null = null
      if (asset.type === 'fixed' && asset.startDate && grossGain > 0) {
        irRate = getIrRate(asset.startDate)
        const netGain = grossGain * (1 - irRate / 100)
        netReturnPct = investedValue > 0 ? (netGain / investedValue) * 100 : 0
      }

      return { ...asset, currentPrice, currentValue, investedValue, returnPct, irRate, netReturnPct }
    })
  )

  const totalValue = assetsWithQuotes.reduce((sum, a) => sum + a.currentValue, 0)
  const totalInvested = assetsWithQuotes.reduce((sum, a) => sum + a.investedValue, 0)
  const returnPct = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0

  return NextResponse.json({ totalValue, totalInvested, returnPct, assets: assetsWithQuotes })
}
