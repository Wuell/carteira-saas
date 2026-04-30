---
entity: "QueryKey"
entity_type: concept
community: 14
degree: 4
---

# QueryKey

**Type:** concept  
**Community:** [[community-14]]  
**Degree:** 4

## Description

- A unique identifier used by React Query to identify and manage cached data for a specific query.

## Related

- [[entities/usequery|UseQuery]] — The `useQuery` hook identifies its cached data using a `QueryKey`.
- [[entities/addmutation|AddMutation]] — The `AddMutation` invalidates cached data identified by specific `QueryKey` values on success.
- [[entities/invalidatequeries|InvalidateQueries]] — The `InvalidateQueries` method uses a `QueryKey` to identify which cached queries to mark as stale.
- [[entities/addfixedmutation|AddFixedMutation]] — The `AddFixedMutation` invalidates cached data identified by specific `QueryKey` values on success.

## Appears in

- `components/asset-manager.tsx`
