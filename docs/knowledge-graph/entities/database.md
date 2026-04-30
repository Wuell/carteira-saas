---
entity: "Database"
entity_type: artifact
community: 67
degree: 7
---

# Database

**Type:** artifact  
**Community:** [[community-67]]  
**Degree:** 7

## Description

- A database is a structured collection of data, managed by Prisma, where dividend records and user information are stored.
- The persistence layer managed by Prisma, where user assets and fixed income lots are stored.

## Related

- [[entities/user|User]] — The database stores User information.
- [[entities/prisma|Prisma]] — Prisma is used to manage and interact with the database.
- [[entities/dividend|Dividend]] — The database stores Dividend records.
- [[entities/prisma-orm|Prisma ORM]] — The `Prisma ORM` manages interactions with the `Database`.
- [[entities/get-function|Get Function]] — The `Get Function` updates cached prices for stale assets in the `Database` in a background process.
- [[entities/asset-data-model|Asset Data Model]] — Records conforming to the `Asset Data Model` are stored in and retrieved from the `Database`.
- [[entities/fixed-income-lot-data-model|Fixed Income Lot Data Model]] — Records conforming to the `Fixed Income Lot Data Model` are stored in and retrieved from the `Database`.

## Appears in

- `app/api/dividends/route.ts`
- `app/api/portfolio/route.ts`
