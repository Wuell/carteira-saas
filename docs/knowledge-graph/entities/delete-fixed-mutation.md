---
entity: "Delete Fixed Mutation"
entity_type: method
community: 76
degree: 4
---

# Delete Fixed Mutation

**Type:** method  
**Community:** [[community-76]]  
**Degree:** 4

## Description

- An asynchronous operation for removing an existing fixed-income investment via a DELETE request to the /api/fixed-income endpoint.

## Related

- [[entities/query-client|Query Client]] — The Delete Fixed Mutation invalidates queries on the Query Client after a successful operation.
- [[entities/error-state|Error State]] — The Delete Fixed Mutation updates the Error State with an error message if the operation fails.
- [[entities/fixed-income-api-endpoint|Fixed-Income API Endpoint]] — The Delete Fixed Mutation sends a DELETE request to the Fixed-Income API Endpoint to remove fixed-income data.
- [[entities/use-mutation-hook|Use Mutation Hook]] — The Delete Fixed Mutation is created and managed using the Use Mutation Hook.

## Appears in

- `components/asset-manager.tsx`
