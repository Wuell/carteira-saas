---
entity: "Query Client"
entity_type: concept
community: 76
degree: 7
---

# Query Client

**Type:** concept  
**Community:** [[community-76]]  
**Degree:** 7

## Description

- An object used to manage data queries, caching, and invalidation.
- An instance of a query client used for invalidating and managing data queries, typically from a library like React Query.

## Related

- [[entities/dividend-manager|Dividend Manager]] — The Dividend Manager component uses the Query Client to manage its data queries.
- [[entities/add-mutation|Add Mutation]] — The Add Mutation invalidates queries on the Query Client after a successful operation.
- [[entities/edit-asset-mutation|Edit Asset Mutation]] — The Edit Asset Mutation invalidates queries on the Query Client after a successful operation.
- [[entities/edit-fixed-mutation|Edit Fixed Mutation]] — The Edit Fixed Mutation invalidates queries on the Query Client after a successful operation.
- [[entities/delete-asset-mutation|Delete Asset Mutation]] — The Delete Asset Mutation invalidates queries on the Query Client after a successful operation.
- [[entities/delete-fixed-mutation|Delete Fixed Mutation]] — The Delete Fixed Mutation invalidates queries on the Query Client after a successful operation.
- [[entities/query-key|Query Key]] — The Query Client uses Query Keys to manage and invalidate cached query data.

## Appears in

- `components/asset-manager.tsx`
- `components/dividend-manager.tsx`
