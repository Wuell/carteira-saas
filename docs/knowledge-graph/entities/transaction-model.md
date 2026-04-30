---
entity: "Transaction Model"
entity_type: concept
community: 89
degree: 4
---

# Transaction Model

**Type:** concept  
**Community:** [[community-89]]  
**Degree:** 4

## Description

- A data model representing a financial transaction, including details such as `ticker`, `type`, `operation`, `quantity`, `price`, and `date`, linked to a `User`.

## Related

- [[entities/prisma-schema-file|Prisma Schema File]] — The Prisma Schema File defines the Transaction data model.
- [[entities/user-model|User Model]] — The User Model has a one-to-many relationship with the Transaction Model.
- [[entities/cuid-function|Cuid Function]] — The 'id' field of the Transaction Model uses the Cuid Function as its default value.
- [[entities/now-function|Now Function]] — The 'date' and 'createdAt' fields of the Transaction Model use the Now Function as their default values.

## Appears in

- `prisma/schema.prisma`
