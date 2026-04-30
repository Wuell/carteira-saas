---
entity: "Query Key"
entity_type: concept
community: 76
degree: 6
---

# Query Key

**Type:** concept  
**Community:** [[community-76]]  
**Degree:** 6

## Description

- Query Key is an identifier (e.g., `['portfolio']`) used by Tanstack React Query to uniquely identify and cache data for a specific query.
- A unique array of identifiers used by React Query to cache and manage data for specific queries.

## Related

- [[entities/query-client|Query Client]] — The Query Client uses Query Keys to manage and invalidate cached query data.
- [[entities/usequery|useQuery]] — The useQuery hook uses a Query Key to identify and manage the cached data.
- [[entities/use-query-hook|Use Query Hook]] — The Use Query Hook uses a Query Key to identify and manage the cached data for its query.
- [[entities/fetch-dividends-function|Fetch Dividends Function]] — The Fetch Dividends Function is associated with a specific Query Key for data caching and retrieval.
- [[entities/delete-dividend-mutation|Delete Dividend Mutation]] — The Delete Dividend Mutation invalidates data associated with a Query Key upon success to ensure fresh data is fetched.
- [[entities/add-dividend-mutation|Add Dividend Mutation]] — The Add Dividend Mutation invalidates data associated with a Query Key upon success to ensure fresh data is fetched.

## Appears in

- `components/allocation-chart.tsx`
- `components/dividend-manager.tsx`
