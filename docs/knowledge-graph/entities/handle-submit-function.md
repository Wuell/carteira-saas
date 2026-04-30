---
entity: "Handle Submit Function"
entity_type: method
community: 76
degree: 7
---

# Handle Submit Function

**Type:** method  
**Community:** [[community-76]]  
**Degree:** 7

## Description

- A function that processes form submissions, differentiating between fixed and other asset categories, and triggers appropriate add mutations.
- A function (`handleSubmit`) that processes the dividend form submission, performs validation, and triggers the add dividend mutation.

## Related

- [[entities/add-mutation|Add Mutation]] — The Handle Submit Function calls the Add Mutation when the selected category is not 'fixed'.
- [[entities/form-state|Form State]] — The Handle Submit Function processes data from the Form State to add new assets or fixed-income investments.
- [[entities/error-state|Error State]] — The Handle Submit Function updates the Error State if form validation fails.
- [[entities/selected-category-state|Selected Category State]] — The Handle Submit Function uses the Selected Category State to determine which mutation to call.
- [[entities/add-fixed-mutation|Add Fixed Mutation]] — The Handle Submit Function calls the Add Fixed Mutation when the selected category is 'fixed'.
- [[entities/dividend-form-state|Dividend Form State]] — The Handle Submit Function uses the Dividend Form State for validation and mutation payload.
- [[entities/add-dividend-mutation|Add Dividend Mutation]] — The Handle Submit Function triggers the Add Dividend Mutation after form validation.

## Appears in

- `components/asset-manager.tsx`
- `components/dividend-manager.tsx`
