import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getOrCreateUser } from '@/lib/user'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const user = await getOrCreateUser(userId)
  const transactions = await prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: 'desc' },
  })

  return NextResponse.json(transactions)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { ticker, type, operation, quantity, price, subType, startDate, maturityDate, fixedRate } = await req.json()
  if (!ticker || !type || !operation || !quantity || !price) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
  }

  const qty = Number(quantity)
  const prc = Number(price)
  const user = await getOrCreateUser(userId)
  const upperTicker = ticker.toUpperCase()

  const transaction = await prisma.transaction.create({
    data: {
      ticker: upperTicker, type, operation, quantity: qty, price: prc, userId: user.id,
      ...(subType && { subType }),
      ...(startDate && { startDate: new Date(startDate) }),
      ...(maturityDate && { maturityDate: new Date(maturityDate) }),
      ...(fixedRate && { fixedRate: Number(fixedRate) }),
    },
  })

  const existingAsset = await prisma.asset.findFirst({
    where: { ticker: upperTicker, userId: user.id },
  })

  if (operation === 'BUY') {
    if (existingAsset) {
      const totalQty = existingAsset.quantity + qty
      const newAvgPrice = (existingAsset.avgPrice * existingAsset.quantity + prc * qty) / totalQty
      await prisma.asset.update({
        where: { id: existingAsset.id },
        data: {
          quantity: totalQty,
          avgPrice: newAvgPrice,
          ...(subType && { subType }),
          // Preserva a startDate original (primeira compra) — cálculo usa datas por lote nas transactions
          ...(!existingAsset.startDate && startDate && { startDate: new Date(startDate) }),
          ...(maturityDate && { maturityDate: new Date(maturityDate) }),
          ...(fixedRate && { fixedRate: Number(fixedRate) }),
        },
      })
    } else {
      await prisma.asset.create({
        data: {
          ticker: upperTicker,
          type,
          quantity: qty,
          avgPrice: prc,
          userId: user.id,
          ...(subType && { subType }),
          ...(startDate && { startDate: new Date(startDate) }),
          ...(maturityDate && { maturityDate: new Date(maturityDate) }),
          ...(fixedRate && { fixedRate: Number(fixedRate) }),
        },
      })
    }
  } else if (operation === 'SELL') {
    if (!existingAsset) {
      return NextResponse.json({ error: 'Ativo não encontrado na carteira' }, { status: 400 })
    }
    if (existingAsset.quantity < qty) {
      return NextResponse.json({ error: 'Quantidade insuficiente' }, { status: 400 })
    }
    const remainingQty = existingAsset.quantity - qty
    if (remainingQty === 0) {
      await prisma.asset.delete({ where: { id: existingAsset.id } })
    } else {
      await prisma.asset.update({
        where: { id: existingAsset.id },
        data: { quantity: remainingQty },
      })
    }
  }

  return NextResponse.json(transaction, { status: 201 })
}
