---
entity: "Transaction"
entity_type: data
community: 0
degree: 11
---

# Transaction

**Type:** data  
**Community:** [[community-0]]  
**Degree:** 11

## Description

- A data entity representing a single financial transaction record within the application.
- A TypeScript type defining the structure of a financial transaction, including properties like `id`, `ticker`, `type`, `operation`, `quantity`, `price`, and `date`.

## Related

- [[entities/transactionlist|TransactionList]] — The `TransactionList` component iterates through and displays individual `Transaction` objects within its table.
- [[entities/get-handler|GET Handler]] — The `GET Handler` retrieves `Transaction` records.
- [[entities/post-handler|POST Handler]] — The `POST Handler` creates new `Transaction` records.
- [[entities/user|User]] — A `User` is associated with multiple `Transaction` records.
- [[entities/fetchtransactions|fetchTransactions]] — The `fetchTransactions` function is designed to return an array of `Transaction` objects.
- [[entities/transaction-table|Transaction Table]] — The `Transaction Table` within the `TransactionList` component displays individual `Transaction` entries.
- [[entities/compra|Compra]] — A `Transaction` with `operation` 'BUY' is displayed as 'Compra'.
- [[entities/venda|Venda]] — A `Transaction` with `operation` not 'BUY' is displayed as 'Venda'.
- [[entities/formatdate|formatDate]] — The `formatDate` function formats the `date` property of a `Transaction` object.
- [[entities/formatbrl|formatBRL]] — The `formatBRL` function formats the calculated total (`price * quantity`) for a `Transaction` object.
- [[entities/type_labels|TYPE_LABELS]] — The `type` property of a `Transaction` is interpreted using the `TYPE_LABELS` map for display.

## Appears in

- `app/api/transactions/route.ts`
- `components/transaction-list.tsx`
