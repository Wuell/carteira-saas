---
entity: "TYPE_LABELS"
entity_type: data
community: 0
degree: 7
---

# TYPE_LABELS

**Type:** data  
**Community:** [[community-0]]  
**Degree:** 7

## Description

- TYPE_LABELS is a constant record mapping asset type keys to their Portuguese display labels, such as 'Ações' for 'stock_br'.
- A constant JavaScript object mapping internal transaction type identifiers to user-friendly display labels in Portuguese, such as 'Ação BR' and 'Cripto'.

## Related

- [[entities/transactionlist|TransactionList]] — The `TransactionList` component uses `TYPE_LABELS` to display user-friendly names for transaction types.
- [[entities/transaction|Transaction]] — The `type` property of a `Transaction` is interpreted using the `TYPE_LABELS` map for display.
- [[entities/renda-fixa|Renda Fixa]] — TYPE_LABELS provides the display label 'Renda Fixa' which is represented as 'Renda Fixa'.
- [[entities/allocationchart|AllocationChart]] — AllocationChart uses TYPE_LABELS to map asset types to user-friendly display names in the chart.
- [[entities/stock-br|Stock BR]] — TYPE_LABELS provides the display label 'Ação BR' which is represented as 'Stock BR'.
- [[entities/crypto|Crypto]] — TYPE_LABELS provides the display label 'Cripto' which is represented as 'Crypto'.
- [[entities/stock-eua|Stock EUA]] — TYPE_LABELS provides the display label 'Ação EUA' which is represented as 'Stock EUA'.

## Appears in

- `components/allocation-chart.tsx`
- `components/transaction-list.tsx`
