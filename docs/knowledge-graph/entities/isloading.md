---
entity: "IsLoading"
entity_type: data
community: 14
degree: 2
---

# IsLoading

**Type:** data  
**Community:** [[community-14]]  
**Degree:** 2

## Description

- A boolean state indicating whether the `useQuery` hook is currently fetching data.
- A boolean state variable indicating whether transaction data is currently being fetched.

## Related

- [[entities/transactionlist|TransactionList]] — The `TransactionList` component uses the `isLoading` state to conditionally render content.
- [[entities/usequery|UseQuery]] — The `useQuery` hook provides the `IsLoading` state.

## Appears in

- `components/asset-manager.tsx`
- `components/transaction-list.tsx`
