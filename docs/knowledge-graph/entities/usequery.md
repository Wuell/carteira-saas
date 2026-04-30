---
entity: "useQuery"
entity_type: method
community: 0
degree: 8
---

# useQuery

**Type:** method  
**Community:** [[community-0]]  
**Degree:** 8

## Description

- useQuery is a hook from `@tanstack/react-query` used for data fetching, caching, and synchronization with a query key.
- A React hook used for fetching, caching, and synchronizing data, handling loading and error states within React components.

## Related

- [[entities/transactionlist|TransactionList]] — The `TransactionList` component utilizes the `useQuery` hook to manage the fetching and loading state of its transaction data.
- [[entities/allocationchart|AllocationChart]] — AllocationChart utilizes the useQuery hook for fetching portfolio data.
- [[entities/fetchportfolio|fetchPortfolio]] — The useQuery hook calls the fetchPortfolio function to retrieve data.
- [[entities/query-key|Query Key]] — The useQuery hook uses a Query Key to identify and manage the cached data.
- [[entities/query-function|Query Function]] — The useQuery hook executes the specified Query Function to fetch data.
- [[entities/refetch-interval|Refetch Interval]] — The useQuery hook is configured with a Refetch Interval to periodically update data.
- [[entities/tanstack-react-query|@tanstack/react-query]] — The `useQuery` hook is a core feature provided by the `@tanstack/react-query` library.
- [[entities/fetchtransactions|fetchTransactions]] — The `useQuery` hook executes `fetchTransactions` as its query function to retrieve transaction data.

## Appears in

- `components/allocation-chart.tsx`
- `components/transaction-list.tsx`
