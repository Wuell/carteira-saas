---
entity: "Selected Dividend ID"
entity_type: data
community: 75
degree: 3
---

# Selected Dividend ID

**Type:** data  
**Community:** [[community-75]]  
**Degree:** 3

## Description

- An identifier for a specific `Dividend Record` that has been selected by the user, enabling operations like deletion via the `Remove Button`.

## Related

- [[entities/delete-mutation|Delete Mutation]] — The `Delete Mutation` uses the `Selected Dividend ID` to identify which `Dividend Record` to delete.
- [[entities/dividend-record|Dividend Record]] — The `Selected Dividend ID` uniquely identifies a `Dividend Record` for user interaction.
- [[entities/set-selected-dividend-id|Set Selected Dividend ID]] — The `Set Selected Dividend ID` method updates the value of the `Selected Dividend ID`.

## Appears in

- `components/dividend-manager.tsx`
