---
entity: "User Model"
entity_type: concept
community: 89
degree: 7
---

# User Model

**Type:** concept  
**Community:** [[community-89]]  
**Degree:** 7

## Description

- A data model representing a user, identified by `id` and `clerkId`, with associated `Asset`, `Transaction`, `Fixed Income Lot`, and `Dividend` records.

## Related

- [[entities/asset-model|Asset Model]] — The User Model has a one-to-many relationship with the Asset Model.
- [[entities/clerk-id|Clerk Id]] — The User Model uses `clerkId` as a unique identifier for each user.
- [[entities/prisma-schema-file|Prisma Schema File]] — The Prisma Schema File defines the User data model.
- [[entities/transaction-model|Transaction Model]] — The User Model has a one-to-many relationship with the Transaction Model.
- [[entities/cuid-function|Cuid Function]] — The 'id' field of the User Model uses the Cuid Function as its default value.
- [[entities/dividend-model|Dividend Model]] — The User Model has a one-to-many relationship with the Dividend Model.
- [[entities/fixed-income-lot-model|Fixed Income Lot Model]] — The User Model has a one-to-many relationship with the Fixed Income Lot Model.

## Appears in

- `prisma/schema.prisma`
