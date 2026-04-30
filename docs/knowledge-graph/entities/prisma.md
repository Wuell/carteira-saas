---
entity: "Prisma"
entity_type: artifact
community: 89
degree: 10
---

# Prisma

**Type:** artifact  
**Community:** [[community-89]]  
**Degree:** 10

## Description

- The ORM (Object-Relational Mapper) provider for database interactions.
- Prisma is a database client used for interacting with the database to perform CRUD operations on `Dividend` records.
- An ORM instance imported from the 'db' module, used for database interactions.
- The exported instance of the `PrismaClient`, ensuring a single client is used throughout the application.

## Related

- [[entities/prisma-client|Prisma Client]] — The `Prisma` organization provides the `Prisma Client` ORM.
- [[entities/post-function|POST Function]] — The POST function uses Prisma to create new dividend records.
- [[entities/get-function|GET Function]] — The GET function uses Prisma to access dividend data.
- [[entities/delete-function|DELETE Function]] — The DELETE function uses Prisma to delete dividend records.
- [[entities/database|Database]] — Prisma is used to manage and interact with the database.
- [[entities/db-module|Db Module]] — The Prisma instance is imported from the `db` module.
- [[entities/get-or-create-user-function|Get Or Create User Function]] — The `getOrCreateUser` function interacts with the Prisma ORM for database operations.
- [[entities/prismaclient|PrismaClient]] — Prisma is an instance of `PrismaClient`.
- [[entities/globalforprisma|GlobalForPrisma]] — The `prisma` instance is stored in `globalForPrisma` for singleton management.
- [[entities/createprismaclient|CreatePrismaClient]] — The `prisma` instance is initialized by calling `createPrismaClient` if not already present globally.

## Appears in

- `app/api/transactions/route.ts`
- `app/api/dividends/route.ts`
- `lib/user.ts`
- `lib/db.ts`
