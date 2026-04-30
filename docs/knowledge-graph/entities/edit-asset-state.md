---
entity: "Edit Asset State"
entity_type: data
community: 76
degree: 2
---

# Edit Asset State

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 2

## Description

- A state variable that holds the asset object currently being edited in the modal.

## Related

- [[entities/edit-asset-modal-component|Edit Asset Modal Component]] — The Edit Asset Modal Component is rendered based on the presence and content of the Edit Asset State.
- [[entities/edit-asset-mutation|Edit Asset Mutation]] — The Edit Asset Mutation uses the 'id' from the Edit Asset State to identify the asset to be updated.

## Appears in

- `components/asset-manager.tsx`
