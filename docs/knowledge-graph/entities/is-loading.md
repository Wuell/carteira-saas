---
entity: "Is Loading"
entity_type: concept
community: 0
degree: 2
---

# Is Loading

**Type:** concept  
**Community:** [[community-0]]  
**Degree:** 2

## Description

- Is Loading is a boolean state variable indicating whether data is currently being fetched from the API.
- A boolean variable that, when true, triggers the display of a loading message.

## Related

- [[entities/allocationchart|AllocationChart]] — AllocationChart monitors the Is Loading state to display appropriate UI feedback during data fetching.
- [[entities/loading-message|Loading Message]] — The `Is Loading` state controls the display of the `Loading Message`.

## Appears in

- `components/allocation-chart.tsx`
- `components/asset-table.tsx`
