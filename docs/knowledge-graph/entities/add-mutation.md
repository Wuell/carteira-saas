---
entity: "Add Mutation"
entity_type: method
community: 76
degree: 8
---

# Add Mutation

**Type:** method  
**Community:** [[community-76]]  
**Degree:** 8

## Description

- An asynchronous operation for adding new assets, which invalidates the portfolio query on success.
- An asynchronous operation responsible for registering or adding new dividend records to the system, whose pending state (`isPending`) affects UI elements like the "Registrar" button.

## Related

- [[entities/form|Form]] — The `Add Mutation` processes the data submitted through the `Form`.
- [[entities/query-client|Query Client]] — The Add Mutation invalidates queries on the Query Client after a successful operation.
- [[entities/error-state|Error State]] — The Add Mutation updates the Error State with an error message if the operation fails.
- [[entities/handle-submit-function|Handle Submit Function]] — The Handle Submit Function calls the Add Mutation when the selected category is not 'fixed'.
- [[entities/use-mutation-hook|Use Mutation Hook]] — The Add Mutation is created and managed using the Use Mutation Hook.
- [[entities/form-state|Form State]] — The Add Mutation receives the entire Form State as input for its operation when adding a general asset.
- [[entities/is-pending-fixed-state|Is Pending Fixed State]] — The Is Pending Fixed State reflects whether the Add Mutation is currently active.
- [[entities/register-button|Register Button]] — The `Register Button` initiates the `Add Mutation` when clicked.

## Appears in

- `components/asset-manager.tsx`
- `components/dividend-manager.tsx`
