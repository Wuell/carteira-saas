---
entity: "Edit Fixed Mutation"
entity_type: method
community: 76
degree: 6
---

# Edit Fixed Mutation

**Type:** method  
**Community:** [[community-76]]  
**Degree:** 6

## Description

- An asynchronous operation for updating existing fixed-income investments via a PATCH request to the /api/fixed-income endpoint.

## Related

- [[entities/query-client|Query Client]] — The Edit Fixed Mutation invalidates queries on the Query Client after a successful operation.
- [[entities/error-state|Error State]] — The Edit Fixed Mutation updates the Error State with an error message if the operation fails.
- [[entities/fixed-income-api-endpoint|Fixed-Income API Endpoint]] — The Edit Fixed Mutation sends a PATCH request to the Fixed-Income API Endpoint to update fixed-income data.
- [[entities/edit-fixed-modal-component|Edit Fixed Modal Component]] — The Edit Fixed Modal Component triggers the Edit Fixed Mutation on save.
- [[entities/use-mutation-hook|Use Mutation Hook]] — The Edit Fixed Mutation is created and managed using the Use Mutation Hook.
- [[entities/edit-fixed-state|Edit Fixed State]] — The Edit Fixed Mutation uses the 'id' from the Edit Fixed State to identify the fixed-income investment to be updated.

## Appears in

- `components/asset-manager.tsx`
