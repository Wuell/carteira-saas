---
entity: "GlobalForPrisma"
entity_type: concept
community: 89
degree: 3
---

# GlobalForPrisma

**Type:** concept  
**Community:** [[community-89]]  
**Degree:** 3

## Description

- A global variable, cast to include a `prisma` property of type `PrismaClient`, used to store and retrieve the Prisma client instance.

## Related

- [[entities/prisma|Prisma]] — The `prisma` instance is stored in `globalForPrisma` for singleton management.
- [[entities/globalthis|GlobalThis]] — GlobalForPrisma is a type assertion of the globalThis object, extending it with a PrismaClient property.
- [[entities/node-env|Node Env]] — The assignment to `globalForPrisma.prisma` is conditional based on the `Node Env`.

## Appears in

- `lib/db.ts`
