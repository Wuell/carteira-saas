import { prisma } from './db'

export async function getOrCreateUser(clerkId: string) {
  const existing = await prisma.user.findUnique({ where: { clerkId } })
  if (existing) return existing

  return prisma.user.create({ data: { clerkId } })
}
