---
entity: "Active Index"
entity_type: concept
community: 0
degree: 2
---

# Active Index

**Type:** concept  
**Community:** [[community-0]]  
**Degree:** 2

## Description

- A state variable (`activeIndex`) that tracks which `Legend Entry` is currently highlighted or active, influencing the visual opacity of its corresponding `Legend Item Container`.
- Active Index is a state variable (number or null) that tracks the currently hovered or active segment in the pie chart.

## Related

- [[entities/legend-item-container|Legend Item Container]] — The `Legend Item Container` modifies the `Active Index` state variable in response to `onMouseEnter` and `onMouseLeave` events.
- [[entities/allocationchart|AllocationChart]] — AllocationChart manages the Active Index state to control the visual emphasis of pie chart segments.

## Appears in

- `components/allocation-chart.tsx`
