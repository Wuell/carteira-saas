import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getQuote } from '@/lib/quotes'
import { getOrCreateUser } from '@/lib/user'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const user = await getOrCreateUser(userId)
  const assets = await prisma.asset.findMany({ where: { userId: user.id } })

  if (assets.length === 0) {
    return NextResponse.json({ totalValue: 0, totalInvested: 0, returnPct: 0, assets: [] })
  }

  const assetsWithQuotes = await Promise.all(
    assets.map(async (asset) => {
      const currentPrice = await getQuote(asset.ticker, asset.type)
      const currentValue = currentPrice * asset.quantity
      const investedValue = asset.avgPrice * asset.quantity
      const returnPct = investedValue > 0 ? ((currentValue - investedValue) / investedValue) * 100 : 0
      return { ...asset, currentPrice, currentValue, investedValue, returnPct }
    })
  )

  const totalValue = assetsWithQuotes.reduce((sum, a) => sum + a.currentValue, 0)
  const totalInvested = assetsWithQuotes.reduce((sum, a) => sum + a.investedValue, 0)
  const returnPct = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0

  return NextResponse.json({ totalValue, totalInvested, returnPct, assets: assetsWithQuotes })
}
