---
entity: "AddMutation"
entity_type: method
community: 14
degree: 5
---

# AddMutation

**Type:** method  
**Community:** [[community-14]]  
**Degree:** 5

## Description

- A mutation function configured to handle the addition of new stock or cryptocurrency transactions.

## Related

- [[entities/form|Form]] — The `AddMutation` function processes `Form` data for transactions.
- [[entities/usemutation|UseMutation]] — The `useMutation` hook creates and implements the `AddMutation` function for stock/crypto transactions.
- [[entities/apitransactions|ApiTransactions]] — The `AddMutation` function sends data to the `ApiTransactions` endpoint.
- [[entities/queryclient|QueryClient]] — The `AddMutation` function uses `QueryClient` to manage cache on success.
- [[entities/querykey|QueryKey]] — The `AddMutation` invalidates cached data identified by specific `QueryKey` values on success.

## Appears in

- `components/asset-manager.tsx`
