---
entity: "User Data Model"
entity_type: concept
community: 2
degree: 3
---

# User Data Model

**Type:** concept  
**Community:** [[community-2]]  
**Degree:** 3

## Description

- A database model representing a user, linked to `FixedIncomeLot Data Model` through a `userId`.

## Related

- [[entities/getorcreateuser-function|getOrCreateUser Function]] — The `getOrCreateUser Function` manages the creation and retrieval of `User Data Model` instances.
- [[entities/fixedincomelot-data-model|FixedIncomeLot Data Model]] — Each `FixedIncomeLot Data Model` record belongs to a `User Data Model` record via a `userId`.
- [[entities/database-operations|Database Operations]] — The `Database Operations` interact with the `User Data Model` to associate fixed income lots.

## Appears in

- `app/api/fixed-income/route.ts`
