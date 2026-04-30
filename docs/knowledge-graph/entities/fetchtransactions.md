---
entity: "fetchTransactions"
entity_type: method
community: 0
degree: 4
---

# fetchTransactions

**Type:** method  
**Community:** [[community-0]]  
**Degree:** 4

## Description

- An asynchronous function responsible for fetching an array of `Transaction` objects from the `/api/transactions` endpoint and handling potential network errors.

## Related

- [[entities/transaction|Transaction]] — The `fetchTransactions` function is designed to return an array of `Transaction` objects.
- [[entities/usequery|useQuery]] — The `useQuery` hook executes `fetchTransactions` as its query function to retrieve transaction data.
- [[entities/components-transaction-listtsx|components/transaction-list.tsx]] — The file `components/transaction-list.tsx` defines the `fetchTransactions` utility function.
- [[entities/api-transactions|/api/transactions]] — The `fetchTransactions` function makes a network request to the `/api/transactions` endpoint to retrieve data.

## Appears in

- `components/transaction-list.tsx`
