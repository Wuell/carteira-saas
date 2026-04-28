import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getQuote, getFixedLotCurrentValue } from '@/lib/quotes'
import { getOrCreateUser } from '@/lib/user'
import type { Asset, FixedIncomeLot } from '@prisma/client'

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

  const [assets, fixedLots] = await Promise.all([
    prisma.asset.findMany({ where: { userId: user.id } }),
    prisma.fixedIncomeLot.findMany({ where: { userId: user.id } }),
  ])

  // Ações e cripto
  const assetsWithQuotes = await Promise.all(
    assets.map(async (asset: Asset) => {
      const currentPrice = await getQuote(asset.ticker, asset.type)
      const currentValue = currentPrice * asset.quantity
      const investedValue = asset.avgPrice * asset.quantity
      const returnPct = investedValue > 0 ? ((currentValue - investedValue) / investedValue) * 100 : 0
      return {
        id: asset.id,
        ticker: asset.ticker,
        type: asset.type,
        quantity: asset.quantity,
        avgPrice: asset.avgPrice,
        currentPrice,
        currentValue,
        investedValue,
        returnPct,
        irRate: null,
        netReturnPct: null,
      }
    })
  )

  // Renda fixa
  const fixedWithValues = fixedLots.map((lot: FixedIncomeLot) => {
    const currentValue = getFixedLotCurrentValue(lot)
    const grossGain = currentValue - lot.investedValue
    const returnPct = lot.investedValue > 0 ? (grossGain / lot.investedValue) * 100 : 0

    let irRate: number | null = null
    let netReturnPct: number | null = null
    if (lot.subType === 'tesouro' && lot.startDate && grossGain > 0) {
      irRate = getIrRate(lot.startDate)
      const netGain = grossGain * (1 - irRate / 100)
      netReturnPct = lot.investedValue > 0 ? (netGain / lot.investedValue) * 100 : 0
    }

    return {
      id: lot.id,
      name: lot.name,
      subType: lot.subType,
      investedValue: lot.investedValue,
      currentValue,
      annualRate: lot.annualRate,
      startDate: lot.startDate,
      maturityDate: lot.maturityDate,
      accumulatedReturn: lot.accumulatedReturn,
      returnPct,
      irRate,
      netReturnPct,
    }
  })

  type WithValue = { currentValue: number; investedValue: number }
  const totalValue =
    assetsWithQuotes.reduce((s: number, a: WithValue) => s + a.currentValue, 0) +
    fixedWithValues.reduce((s: number, f: WithValue) => s + f.currentValue, 0)
  const totalInvested =
    assetsWithQuotes.reduce((s: number, a: WithValue) => s + a.investedValue, 0) +
    fixedWithValues.reduce((s: number, f: WithValue) => s + f.investedValue, 0)
  const returnPct = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0

  return NextResponse.json({ totalValue, totalInvested, returnPct, assets: assetsWithQuotes, fixedLots: fixedWithValues })
}
