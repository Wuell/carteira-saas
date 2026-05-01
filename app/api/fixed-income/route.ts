import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getOrCreateUser } from '@/lib/user'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const user = await getOrCreateUser(userId)
  const lots = await prisma.fixedIncomeLot.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(lots)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { name, subType, investedValue, currentValue } = await req.json()
  if (!name || !subType || !investedValue) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
  }

  const user = await getOrCreateUser(userId)
  const lot = await prisma.fixedIncomeLot.create({
    data: {
      name,
      subType,
      investedValue: Number(investedValue),
      currentValue: currentValue != null && currentValue !== '' ? Number(currentValue) : null,
      userId: user.id,
    },
  })

  return NextResponse.json(lot, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { id, name, investedValue, currentValue, notes } = await req.json()

  const user = await getOrCreateUser(userId)
  const lot = await prisma.fixedIncomeLot.findUnique({ where: { id } })

  if (!lot || lot.userId !== user.id) {
    return NextResponse.json({ error: 'Lote não encontrado' }, { status: 404 })
  }

  const updated = await prisma.fixedIncomeLot.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(investedValue !== undefined && { investedValue: Number(investedValue) }),
      ...(currentValue !== undefined && {
        currentValue: currentValue !== '' ? Number(currentValue) : null,
      }),
      ...(notes !== undefined && { notes }),
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { id } = await req.json()
  const user = await getOrCreateUser(userId)
  const lot = await prisma.fixedIncomeLot.findUnique({ where: { id } })

  if (!lot || lot.userId !== user.id) {
    return NextResponse.json({ error: 'Lote não encontrado' }, { status: 404 })
  }

  await prisma.fixedIncomeLot.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
