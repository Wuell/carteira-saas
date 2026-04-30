---
entity: "Form"
entity_type: artifact
community: 14
degree: 9
---

# Form

**Type:** artifact  
**Community:** [[community-14]]  
**Degree:** 9

## Description

- A state variable representing the current input data for a transaction form, including ticker, type, operation, quantity, and price.
- An interactive section of the UI used for inputting new dividend records, containing fields for "Valor recebido" (Received Value) and "Data de pagamento" (Payment Date).

## Related

- [[entities/ticker|Ticker]] — The `Form` data structure includes a `Ticker` field.
- [[entities/price|Price]] — The `Form` data structure includes a `Price` field.
- [[entities/usestate|UseState]] — The `useState` hook is used to manage the `Form` data for transactions.
- [[entities/addmutation|AddMutation]] — The `AddMutation` function processes `Form` data for transactions.
- [[entities/useeffect|UseEffect]] — The `useEffect` hook monitors changes in the `Form` (specifically `form.ticker`) to trigger actions.
- [[entities/setform|SetForm]] — The `SetForm` function updates the `Form` state variable.
- [[entities/received-value|Received Value]] — The `Form` provides an input field for the `Received Value`.
- [[entities/payment-date|Payment Date]] — The `Form` provides an input field for the `Payment Date`.
- [[entities/add-mutation|Add Mutation]] — The `Add Mutation` processes the data submitted through the `Form`.

## Appears in

- `components/asset-manager.tsx`
- `components/dividend-manager.tsx`
