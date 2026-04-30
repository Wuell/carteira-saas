---
entity: "Form State"
entity_type: data
community: 76
degree: 9
---

# Form State

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 9

## Description

- A state object holding input values for asset submission, including ticker and price.
- A data object (`form`) that holds the current input values for "Valor recebido" (amount) and "Data de pagamento" (paidAt) in the registration form.

## Related

- [[entities/add-mutation|Add Mutation]] — The Add Mutation receives the entire Form State as input for its operation when adding a general asset.
- [[entities/handle-submit-function|Handle Submit Function]] — The Handle Submit Function processes data from the Form State to add new assets or fixed-income investments.
- [[entities/ticker-field|Ticker Field]] — The Form State includes the Ticker Field for asset identification.
- [[entities/price-field|Price Field]] — The Form State includes the Price Field for monetary values.
- [[entities/type-field|Type Field]] — The Form State includes the Type Field for asset classification.
- [[entities/quantity-field|Quantity Field]] — The Form State includes the Quantity Field for asset quantity.
- [[entities/received-value|Received Value]] — The value of `Received Value` updates the `amount` property of the `Form State`.
- [[entities/payment-date|Payment Date]] — The value of `Payment Date` updates the `paidAt` property of the `Form State`.
- [[entities/set-form-state|Set Form State]] — The `Set Form State` method is responsible for updating the `Form State` object.

## Appears in

- `components/asset-manager.tsx`
- `components/dividend-manager.tsx`
