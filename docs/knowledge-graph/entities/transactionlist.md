---
entity: "TransactionList"
entity_type: artifact
community: 0
degree: 14
---

# TransactionList

**Type:** artifact  
**Community:** [[community-0]]  
**Degree:** 14

## Description

- A React component imported and utilized within the `AtivosPage` to display a list of transactions.
- A React functional component that displays a historical list of financial transactions in a table format, fetching data from an API and handling loading states.

## Related

- [[entities/ativospage|AtivosPage]] — The `AtivosPage` component imports and renders the `TransactionList` component.
- [[entities/usequery|useQuery]] — The `TransactionList` component utilizes the `useQuery` hook to manage the fetching and loading state of its transaction data.
- [[entities/formatdate|formatDate]] — The `TransactionList` component uses the `formatDate` function to format transaction dates for display.
- [[entities/formatbrl|formatBRL]] — The `TransactionList` component uses the `formatBRL` function to format transaction prices and totals for display.
- [[entities/type_labels|TYPE_LABELS]] — The `TransactionList` component uses `TYPE_LABELS` to display user-friendly names for transaction types.
- [[entities/components-transaction-listtsx|components/transaction-list.tsx]] — The file `components/transaction-list.tsx` defines and exports the `TransactionList` React component.
- [[entities/histrico-de-transaes|Histórico de transações]] — The `TransactionList` component displays "Histórico de transações" as its primary title.
- [[entities/transaction-table|Transaction Table]] — The `TransactionList` component is responsible for rendering the `Transaction Table` to present transaction data.
- [[entities/isloading|IsLoading]] — The `TransactionList` component uses the `isLoading` state to conditionally render content.
- [[entities/carregando|Carregando...]] — The `TransactionList` component displays "Carregando..." when `isLoading` is true.
- [[entities/transaction|Transaction]] — The `TransactionList` component iterates through and displays individual `Transaction` objects within its table.
- [[entities/nenhuma-transao-registrada|Nenhuma Transação Registrada.]] — The `TransactionList` component displays "Nenhuma transação registrada." when no transactions are available and not loading.
- [[entities/venda|Venda]] — The `TransactionList` component displays 'Venda' for 'SELL' operations.
- [[entities/compra|Compra]] — The `TransactionList` component displays 'Compra' for 'BUY' operations.

## Appears in

- `app/(dashboard)/ativos/page.tsx`
- `components/transaction-list.tsx`
