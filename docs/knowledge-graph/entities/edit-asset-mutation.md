---
entity: "Edit Asset Mutation"
entity_type: method
community: 76
degree: 6
---

# Edit Asset Mutation

**Type:** method  
**Community:** [[community-76]]  
**Degree:** 6

## Description

- An asynchronous operation for updating existing assets via a PATCH request to the /api/assets endpoint.

## Related

- [[entities/edit-asset-modal-component|Edit Asset Modal Component]] — The Edit Asset Modal Component triggers the Edit Asset Mutation on save.
- [[entities/query-client|Query Client]] — The Edit Asset Mutation invalidates queries on the Query Client after a successful operation.
- [[entities/error-state|Error State]] — The Edit Asset Mutation updates the Error State with an error message if the operation fails.
- [[entities/assets-api-endpoint|Assets API Endpoint]] — The Edit Asset Mutation sends a PATCH request to the Assets API Endpoint to update asset data.
- [[entities/use-mutation-hook|Use Mutation Hook]] — The Edit Asset Mutation is created and managed using the Use Mutation Hook.
- [[entities/edit-asset-state|Edit Asset State]] — The Edit Asset Mutation uses the 'id' from the Edit Asset State to identify the asset to be updated.

## Appears in

- `components/asset-manager.tsx`
