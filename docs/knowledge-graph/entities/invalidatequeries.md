---
entity: "InvalidateQueries"
entity_type: method
community: 14
degree: 4
---

# InvalidateQueries

**Type:** method  
**Community:** [[community-14]]  
**Degree:** 4

## Description

- A method of `queryClient` that marks specific queries as stale, prompting a refetch of their data.

## Related

- [[entities/portfoliodata|PortfolioData]] — The `InvalidateQueries` method targets `PortfolioData` for refresh.
- [[entities/queryclient|QueryClient]] — The `QueryClient` executes `InvalidateQueries` to refresh data.
- [[entities/transactions|Transactions]] — The `InvalidateQueries` method targets `Transactions` data for refresh.
- [[entities/querykey|QueryKey]] — The `InvalidateQueries` method uses a `QueryKey` to identify which cached queries to mark as stale.

## Appears in

- `components/asset-manager.tsx`
