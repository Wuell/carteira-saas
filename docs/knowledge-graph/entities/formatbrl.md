---
entity: "formatBRL"
entity_type: method
community: 0
degree: 4
---

# formatBRL

**Type:** method  
**Community:** [[community-0]]  
**Degree:** 4

## Description

- formatBRL is a utility function used to format a numerical value into Brazilian Real currency string.
- A function that formats a given numeric value into a Brazilian Real (BRL) currency string for display.

## Related

- [[entities/transactionlist|TransactionList]] — The `TransactionList` component uses the `formatBRL` function to format transaction prices and totals for display.
- [[entities/transaction|Transaction]] — The `formatBRL` function formats the calculated total (`price * quantity`) for a `Transaction` object.
- [[entities/allocationchart|AllocationChart]] — AllocationChart uses the formatBRL function to display currency values in the Brazilian Real format.
- [[entities/components-transaction-listtsx|components/transaction-list.tsx]] — The file `components/transaction-list.tsx` defines the `formatBRL` utility function.

## Appears in

- `components/allocation-chart.tsx`
- `components/transaction-list.tsx`
