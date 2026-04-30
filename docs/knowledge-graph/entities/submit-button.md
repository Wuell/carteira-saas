---
entity: "Submit Button"
entity_type: artifact
community: 1
degree: 8
---

# Submit Button

**Type:** artifact  
**Community:** [[community-1]]  
**Degree:** 8

## Description

- A button used to submit the form data, with dynamic text for registering investments, purchases, or sales.

## Related

- [[entities/add-fixed-mutation-pending-status|Add Fixed Mutation Pending Status]] — The Submit Button is disabled while an Add Fixed Mutation Pending Status is active.
- [[entities/fetching-price-status|Fetching Price Status]] — The Submit Button is disabled while the Fetching Price Status is active.
- [[entities/buy-operation-form|Buy Operation (Form)]] — The text on the Submit Button changes based on whether a Buy Operation (Form) is selected.
- [[entities/register-investment-action|Register Investment Action]] — When clicked, the Submit Button initiates the Register Investment Action if the category is 'fixed'.
- [[entities/register-purchase-action|Register Purchase Action]] — When clicked, the Submit Button initiates the Register Purchase Action if the operation is 'BUY'.
- [[entities/register-sale-action|Register Sale Action]] — When clicked, the Submit Button initiates the Register Sale Action if the operation is 'SELL' and not 'fixed'.
- [[entities/selected-category-form|Selected Category (Form)]] — The text on the Submit Button changes based on the Selected Category (Form).
- [[entities/asset-registration-form|Asset Registration Form]] — The Asset Registration Form contains the Submit Button.

## Appears in

- `components/asset-manager.tsx`
