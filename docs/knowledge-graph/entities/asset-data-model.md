---
entity: "Asset Data Model"
entity_type: data
community: 67
degree: 5
---

# Asset Data Model

**Type:** data  
**Community:** [[community-67]]  
**Degree:** 5

## Description

- A data model representing an investment asset, including properties like `userId`, `ticker`, `type`, `quantity`, `avgPrice`, `cachedPrice`, and `cachedPriceAt`.

## Related

- [[entities/user|User]] — A `User` owns multiple `Asset Data Model` entries in their portfolio.
- [[entities/database|Database]] — Records conforming to the `Asset Data Model` are stored in and retrieved from the `Database`.
- [[entities/cache_ttl_ms|CACHE_TTL_MS]] — The `Asset Data Model` utilizes `CACHE_TTL_MS` to determine when cached prices expire.
- [[entities/portfolio-summary|Portfolio Summary]] — The `Portfolio Summary` includes aggregated data from the `Asset Data Model`.
- [[entities/prisma-client-library|Prisma Client Library]] — The `Asset Data Model` type is defined by and imported from `Prisma Client Library`.

## Appears in

- `app/api/portfolio/route.ts`
