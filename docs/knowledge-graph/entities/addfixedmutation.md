---
entity: "AddFixedMutation"
entity_type: method
community: 14
degree: 4
---

# AddFixedMutation

**Type:** method  
**Community:** [[community-14]]  
**Degree:** 4

## Description

- A mutation function configured to handle the addition of new fixed income entries.

## Related

- [[entities/usemutation|UseMutation]] — The `useMutation` hook creates and implements the `AddFixedMutation` function for fixed income.
- [[entities/queryclient|QueryClient]] — The `AddFixedMutation` function uses `QueryClient` to manage cache on success.
- [[entities/apifixedincome|ApiFixedIncome]] — The `AddFixedMutation` function sends data to the `ApiFixedIncome` endpoint.
- [[entities/querykey|QueryKey]] — The `AddFixedMutation` invalidates cached data identified by specific `QueryKey` values on success.

## Appears in

- `components/asset-manager.tsx`
