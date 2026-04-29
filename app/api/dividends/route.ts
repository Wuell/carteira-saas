import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getOrCreateUser } from '@/lib/user'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const user = await getOrCreateUser(userId)
  const dividends = await prisma.dividend.findMany({
    where: { userId: user.id },
    orderBy: { paidAt: 'desc' },
  })

  return NextResponse.json(dividends)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { ticker, type, amount, paidAt } = await req.json()
  if (!ticker || !type || !amount || !paidAt) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
  }

  const user = await getOrCreateUser(userId)
  const dividend = await prisma.dividend.create({
    data: {
      ticker: ticker.toUpperCase(),
      type,
      amount: Number(amount),
      paidAt: new Date(paidAt),
      userId: user.id,
    },
  })

  return NextResponse.json(dividend, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { id } = await req.json()
  const user = await getOrCreateUser(userId)
  const dividend = await prisma.dividend.findUnique({ where: { id } })

  if (!dividend || dividend.userId !== user.id) {
    return NextResponse.json({ error: 'Registro não encontrado' }, { status: 404 })
  }

  await prisma.dividend.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
