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

  const body = await req.json()
  const { name, subType, investedValue, annualRate, startDate, maturityDate, accumulatedReturn } = body

  if (!name || !subType || !investedValue) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
  }
  if (subType === 'tesouro' && (!annualRate || !startDate)) {
    return NextResponse.json({ error: 'Taxa ao ano e data de aplicação são obrigatórios para Tesouro Direto' }, { status: 400 })
  }
  if (subType === 'cdb' && accumulatedReturn == null) {
    return NextResponse.json({ error: 'Rentabilidade acumulada é obrigatória para CDB/LCI/LCA' }, { status: 400 })
  }

  const user = await getOrCreateUser(userId)
  const lot = await prisma.fixedIncomeLot.create({
    data: {
      name,
      subType,
      investedValue: Number(investedValue),
      annualRate: annualRate != null ? Number(annualRate) : null,
      startDate: startDate ? new Date(startDate) : null,
      maturityDate: maturityDate ? new Date(maturityDate) : null,
      accumulatedReturn: accumulatedReturn != null ? Number(accumulatedReturn) : null,
      userId: user.id,
    },
  })

  return NextResponse.json(lot, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const body = await req.json()
  const { id, name, investedValue, annualRate, startDate, maturityDate, accumulatedReturn } = body

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
      ...(annualRate !== undefined && { annualRate: annualRate !== '' ? Number(annualRate) : null }),
      ...(startDate !== undefined && { startDate: startDate ? new Date(startDate) : null }),
      ...(maturityDate !== undefined && { maturityDate: maturityDate ? new Date(maturityDate) : null }),
      ...(accumulatedReturn !== undefined && { accumulatedReturn: accumulatedReturn !== '' ? Number(accumulatedReturn) : null }),
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
