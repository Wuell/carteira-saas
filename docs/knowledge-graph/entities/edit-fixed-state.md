---
entity: "Edit Fixed State"
entity_type: data
community: 76
degree: 2
---

# Edit Fixed State

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 2

## Description

- A state variable that holds the fixed-income investment object currently being edited in the modal.

## Related

- [[entities/edit-fixed-mutation|Edit Fixed Mutation]] — The Edit Fixed Mutation uses the 'id' from the Edit Fixed State to identify the fixed-income investment to be updated.
- [[entities/edit-fixed-modal-component|Edit Fixed Modal Component]] — The Edit Fixed Modal Component is rendered based on the presence and content of the Edit Fixed State.

## Appears in

- `components/asset-manager.tsx`
