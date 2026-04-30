---
entity: "CreatePrismaClient"
entity_type: method
community: 89
degree: 3
---

# CreatePrismaClient

**Type:** method  
**Community:** [[community-89]]  
**Degree:** 3

## Description

- A function responsible for creating and configuring a new `PrismaClient` instance with the `PrismaNeonHttp` adapter.

## Related

- [[entities/prisma|Prisma]] — The `prisma` instance is initialized by calling `createPrismaClient` if not already present globally.
- [[entities/prismaclient|PrismaClient]] — The `createPrismaClient` function returns a new `PrismaClient` instance.
- [[entities/adapter|Adapter]] — The `createPrismaClient` function creates an `Adapter` instance.

## Appears in

- `lib/db.ts`
