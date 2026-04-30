---
entity: "Assets Table"
entity_type: artifact
community: 17
degree: 6
---

# Assets Table

**Type:** artifact  
**Community:** [[community-17]]  
**Degree:** 6

## Description

- A tabular display showing details of registered assets like ticker, type, quantity, prices, and value.

## Related

- [[entities/assets-table-container|Assets Table Container]] — The Assets Table is visually contained within the Assets Table Container.
- [[entities/assets-list|Assets List]] — The Assets Table presents the data from the Assets List.
- [[entities/sort-header-component|Sort Header Component]] — The Assets Table utilizes Sort Header Components for its column headers to enable sorting.
- [[entities/table-loading-status|Table Loading Status]] — The Assets Table shows a loading message when the Table Loading Status is active.
- [[entities/no-assets-display-status|No Assets Display Status]] — The Assets Table shows a message indicating no assets when the No Assets Display Status is active.
- [[entities/selected-asset-id|Selected Asset ID]] — The Assets Table updates the Selected Asset ID when a row is clicked.

## Appears in

- `components/asset-manager.tsx`
