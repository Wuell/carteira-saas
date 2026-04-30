---
entity: "Asset Model"
entity_type: concept
community: 89
degree: 8
---

# Asset Model

**Type:** concept  
**Community:** [[community-89]]  
**Degree:** 8

## Description

- The database schema definition for assets, managed by Prisma.
- A data model representing an asset, including `ticker`, `type`, `quantity`, and `avgPrice`, linked to a `User`.

## Related

- [[entities/prisma-client|Prisma Client]] — The `Prisma Client` interacts with the `Asset Model` for database operations.
- [[entities/get-api-handler|GET API Handler]] — The `GET API Handler` performs a `findMany` operation on the `Asset Model`.
- [[entities/patch-api-handler|PATCH API Handler]] — The `PATCH API Handler` performs an `update` operation on the `Asset Model`.
- [[entities/delete-api-handler|DELETE API Handler]] — The `DELETE API Handler` performs a `delete` operation on the `Asset Model`.
- [[entities/prisma-schema-file|Prisma Schema File]] — The Prisma Schema File defines the Asset data model.
- [[entities/user-model|User Model]] — The User Model has a one-to-many relationship with the Asset Model.
- [[entities/cuid-function|Cuid Function]] — The 'id' field of the Asset Model uses the Cuid Function as its default value.
- [[entities/now-function|Now Function]] — The 'createdAt' field of the Asset Model uses the Now Function as its default value.

## Appears in

- `app/api/assets/route.ts`
- `prisma/schema.prisma`
