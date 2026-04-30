---
entity: "Dividend Model"
entity_type: concept
community: 89
degree: 4
---

# Dividend Model

**Type:** concept  
**Community:** [[community-89]]  
**Degree:** 4

## Description

- A data model representing a dividend payment, including `ticker`, `type`, `amount`, and `paidAt` date, linked to a `User`.

## Related

- [[entities/prisma-schema-file|Prisma Schema File]] — The Prisma Schema File defines the Dividend data model.
- [[entities/user-model|User Model]] — The User Model has a one-to-many relationship with the Dividend Model.
- [[entities/now-function|Now Function]] — The 'createdAt' field of the Dividend Model uses the Now Function as its default value.
- [[entities/cuid-function|Cuid Function]] — The 'id' field of the Dividend Model uses the Cuid Function as its default value.

## Appears in

- `prisma/schema.prisma`
