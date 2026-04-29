import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getBatchStockQuotes, getBatchCryptoQuotes } from '@/lib/quotes'
import { getOrCreateUser } from '@/lib/user'
import type { Asset, FixedIncomeLot } from '@prisma/client'

const CACHE_TTL_MS = 8 * 60 * 60 * 1000 // 8 horas

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const user = await getOrCreateUser(userId)

  const [assets, fixedLots] = await Promise.all([
    prisma.asset.findMany({ where: { userId: user.id } }),
    prisma.fixedIncomeLot.findMany({ where: { userId: user.id } }),
  ])

  const now = new Date()

  // Separar ativos com cache expirado
  const staleAssets = assets.filter((a: Asset) =>
    !a.cachedPriceAt || (now.getTime() - new Date(a.cachedPriceAt).getTime()) > CACHE_TTL_MS
  )

  const staleStockTickers = staleAssets
    .filter((a: Asset) => a.type === 'stock_br' || a.type === 'fii')
    .map((a: Asset) => a.ticker)
  const staleCryptoTickers = staleAssets
    .filter((a: Asset) => a.type === 'crypto')
    .map((a: Asset) => a.ticker)

  // Uma chamada batch por tipo para os ativos desatualizados
  const [freshStockPrices, freshCryptoPrices] = await Promise.all([
    getBatchStockQuotes(staleStockTickers),
    getBatchCryptoQuotes(staleCryptoTickers),
  ])

  // Atualizar cache no banco em background (não bloqueia a resposta)
  for (const a of staleAssets) {
    const price = a.type === 'crypto'
      ? freshCryptoPrices[a.ticker.toUpperCase()]
      : freshStockPrices[a.ticker.toUpperCase()]
    if (!price) continue
    prisma.asset.update({
      where: { id: a.id },
      data: { cachedPrice: price, cachedPriceAt: now },
    }).catch(() => {})
  }

  // Montar resultado usando preço fresco ou cache
  const assetsWithQuotes = assets.map((asset: Asset) => {
    const freshPrice = asset.type === 'crypto'
      ? freshCryptoPrices[asset.ticker.toUpperCase()]
      : freshStockPrices[asset.ticker.toUpperCase()]
    const currentPrice = freshPrice ?? asset.cachedPrice ?? 0
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
    }
  })

  // Renda fixa: valor manual
  const fixedWithValues = fixedLots.map((lot: FixedIncomeLot) => {
    const currentValue = lot.currentValue ?? lot.investedValue
    const returnPct = lot.investedValue > 0
      ? ((currentValue - lot.investedValue) / lot.investedValue) * 100
      : 0
    return {
      id: lot.id,
      name: lot.name,
      subType: lot.subType,
      investedValue: lot.investedValue,
      currentValue,
      returnPct,
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
