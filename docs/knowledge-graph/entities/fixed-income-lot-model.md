---
entity: "Fixed Income Lot Model"
entity_type: concept
community: 89
degree: 5
---

# Fixed Income Lot Model

**Type:** concept  
**Community:** [[community-89]]  
**Degree:** 5

## Description

- A data model representing a fixed income investment lot, including `name`, `subType`, `investedValue`, and `currentValue`, linked to a `User`.

## Related

- [[entities/prisma-schema-file|Prisma Schema File]] — The Prisma Schema File defines the Fixed Income Lot data model.
- [[entities/user-model|User Model]] — The User Model has a one-to-many relationship with the Fixed Income Lot Model.
- [[entities/now-function|Now Function]] — The 'createdAt' field of the Fixed Income Lot Model uses the Now Function as its default value.
- [[entities/updatedat-function|UpdatedAt Function]] — The `updatedAt` field of the Fixed Income Lot Model is automatically managed by the UpdatedAt Function.
- [[entities/cuid-function|Cuid Function]] — The 'id' field of the Fixed Income Lot Model uses the Cuid Function as its default value.

## Appears in

- `prisma/schema.prisma`
