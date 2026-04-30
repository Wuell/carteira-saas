---
entity: "Selected Asset ID"
entity_type: data
community: 17
degree: 4
---

# Selected Asset ID

**Type:** data  
**Community:** [[community-17]]  
**Degree:** 4

## Description

- The unique identifier of the asset currently highlighted or chosen in the assets table.

## Related

- [[entities/edit-asset-button|Edit Asset Button]] — The Edit Asset Button is disabled if no asset is selected (Selected Asset ID is null).
- [[entities/remove-asset-button|Remove Asset Button]] — The Remove Asset Button is disabled if no asset is selected (Selected Asset ID is null).
- [[entities/assets-table|Assets Table]] — The Assets Table updates the Selected Asset ID when a row is clicked.
- [[entities/asset-object|Asset Object]] — The `id` property of an Asset Object is used to determine the Selected Asset ID.

## Appears in

- `components/asset-manager.tsx`
