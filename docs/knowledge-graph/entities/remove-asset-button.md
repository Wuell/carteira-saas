---
entity: "Remove Asset Button"
entity_type: artifact
community: 17
degree: 3
---

# Remove Asset Button

**Type:** artifact  
**Community:** [[community-17]]  
**Degree:** 3

## Description

- A button to initiate the deletion process for a selected asset from the assets table.

## Related

- [[entities/selected-asset-id|Selected Asset ID]] — The Remove Asset Button is disabled if no asset is selected (Selected Asset ID is null).
- [[entities/delete-asset-mutation-pending-status|Delete Asset Mutation Pending Status]] — The Remove Asset Button is disabled while a Delete Asset Mutation Pending Status is active.
- [[entities/delete-asset-mutation-method|Delete Asset Mutation Method]] — Clicking the Remove Asset Button invokes the Delete Asset Mutation Method.

## Appears in

- `components/asset-manager.tsx`
