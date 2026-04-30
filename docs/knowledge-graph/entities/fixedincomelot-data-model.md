---
entity: "FixedIncomeLot Data Model"
entity_type: concept
community: 2
degree: 2
---

# FixedIncomeLot Data Model

**Type:** concept  
**Community:** [[community-2]]  
**Degree:** 2

## Description

- A database model representing a fixed income lot, with attributes such as `name`, `subType`, `investedValue`, and `currentValue`.

## Related

- [[entities/user-data-model|User Data Model]] — Each `FixedIncomeLot Data Model` record belongs to a `User Data Model` record via a `userId`.
- [[entities/database-operations|Database Operations]] — The `Database Operations` interact with the `FixedIncomeLot Data Model` for persistence.

## Appears in

- `app/api/fixed-income/route.ts`
