---
entity: "Delete Asset Mutation"
entity_type: method
community: 76
degree: 4
---

# Delete Asset Mutation

**Type:** method  
**Community:** [[community-76]]  
**Degree:** 4

## Description

- An asynchronous operation for removing an existing asset via a DELETE request to the /api/assets endpoint.

## Related

- [[entities/query-client|Query Client]] — The Delete Asset Mutation invalidates queries on the Query Client after a successful operation.
- [[entities/error-state|Error State]] — The Delete Asset Mutation updates the Error State with an error message if the operation fails.
- [[entities/assets-api-endpoint|Assets API Endpoint]] — The Delete Asset Mutation sends a DELETE request to the Assets API Endpoint to remove asset data.
- [[entities/use-mutation-hook|Use Mutation Hook]] — The Delete Asset Mutation is created and managed using the Use Mutation Hook.

## Appears in

- `components/asset-manager.tsx`
