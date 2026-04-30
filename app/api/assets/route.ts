import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getOrCreateUser } from '@/lib/user'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const user = await getOrCreateUser(userId)
  const assets = await prisma.asset.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } })

  return NextResponse.json(assets)
}

export async function PATCH(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { id, quantity, avgPrice, assetSubType, sector, notes } = await req.json()
  const user = await getOrCreateUser(userId)
  const asset = await prisma.asset.findUnique({ where: { id } })

  if (!asset || asset.userId !== user.id) {
    return NextResponse.json({ error: 'Ativo não encontrado' }, { status: 404 })
  }

  const updated = await prisma.asset.update({
    where: { id },
    data: {
      ...(quantity !== undefined && { quantity: Number(quantity) }),
      ...(avgPrice !== undefined && { avgPrice: Number(avgPrice) }),
      ...(assetSubType !== undefined && { assetSubType }),
      ...(sector !== undefined && { sector }),
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
  const asset = await prisma.asset.findUnique({ where: { id } })

  if (!asset || asset.userId !== user.id) {
    return NextResponse.json({ error: 'Ativo não encontrado' }, { status: 404 })
  }

  await prisma.asset.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
