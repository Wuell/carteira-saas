---
entity: "QueryClient"
entity_type: concept
community: 14
degree: 5
---

# QueryClient

**Type:** concept  
**Community:** [[community-14]]  
**Degree:** 5

## Description

- An instance of the React Query client, used to interact with the query cache and perform operations like invalidating queries.
- QueryClient is a class imported from `@tanstack/react-query` used to manage data queries.

## Related

- [[entities/addmutation|AddMutation]] — The `AddMutation` function uses `QueryClient` to manage cache on success.
- [[entities/addfixedmutation|AddFixedMutation]] — The `AddFixedMutation` function uses `QueryClient` to manage cache on success.
- [[entities/invalidatequeries|InvalidateQueries]] — The `QueryClient` executes `InvalidateQueries` to refresh data.
- [[entities/tanstack-react-query|Tanstack React Query]] — QueryClient is a component imported from `@tanstack/react-query`.
- [[entities/queryclientprovider|QueryClientProvider]] — QueryClientProvider requires an instance of `QueryClient` to function.

## Appears in

- `components/asset-manager.tsx`
- `components/query-provider.tsx`
