---
entity: "Delete Mutation"
entity_type: method
community: 75
degree: 2
---

# Delete Mutation

**Type:** method  
**Community:** [[community-75]]  
**Degree:** 2

## Description

- An asynchronous operation responsible for removing a selected dividend record from the system, whose pending state (`isPending`) affects UI elements like the "Remover" button.

## Related

- [[entities/remove-button|Remove Button]] — The `Remove Button` initiates the `Delete Mutation` for a selected record.
- [[entities/selected-dividend-id|Selected Dividend ID]] — The `Delete Mutation` uses the `Selected Dividend ID` to identify which `Dividend Record` to delete.

## Appears in

- `components/dividend-manager.tsx`
