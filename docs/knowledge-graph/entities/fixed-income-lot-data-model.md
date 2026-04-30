---
entity: "Fixed Income Lot Data Model"
entity_type: data
community: 67
degree: 4
---

# Fixed Income Lot Data Model

**Type:** data  
**Community:** [[community-67]]  
**Degree:** 4

## Description

- A data model representing a lot of fixed income investments, including properties like `userId`, `name`, `subType`, `investedValue`, and `currentValue`.

## Related

- [[entities/user|User]] — A `User` owns multiple `Fixed Income Lot Data Model` entries in their portfolio.
- [[entities/database|Database]] — Records conforming to the `Fixed Income Lot Data Model` are stored in and retrieved from the `Database`.
- [[entities/portfolio-summary|Portfolio Summary]] — The `Portfolio Summary` includes aggregated data from the `Fixed Income Lot Data Model`.
- [[entities/prisma-client-library|Prisma Client Library]] — The `Fixed Income Lot Data Model` type is defined by and imported from `Prisma Client Library`.

## Appears in

- `app/api/portfolio/route.ts`
