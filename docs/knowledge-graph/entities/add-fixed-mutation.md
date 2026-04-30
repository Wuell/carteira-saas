---
entity: "Add Fixed Mutation"
entity_type: method
community: 76
degree: 6
---

# Add Fixed Mutation

**Type:** method  
**Community:** [[community-76]]  
**Degree:** 6

## Description

- An asynchronous operation for adding new fixed-income investments, which invalidates the portfolio query on success.

## Related

- [[entities/handle-submit-function|Handle Submit Function]] — The Handle Submit Function calls the Add Fixed Mutation when the selected category is 'fixed'.
- [[entities/name-field|Name Field]] — The Add Fixed Mutation uses the Name Field, derived from the form's ticker, as input.
- [[entities/sub-type-field|Sub Type Field]] — The Add Fixed Mutation uses the Sub Type Field as input.
- [[entities/invested-value-field|Invested Value Field]] — The Add Fixed Mutation uses the Invested Value Field, derived from the form's price, as input.
- [[entities/use-mutation-hook|Use Mutation Hook]] — The Add Fixed Mutation is created and managed using the Use Mutation Hook.
- [[entities/is-pending-fixed-state|Is Pending Fixed State]] — The Is Pending Fixed State reflects whether the Add Fixed Mutation is currently active.

## Appears in

- `components/asset-manager.tsx`
