---
entity: "Sort"
entity_type: data
community: 14
degree: 4
---

# Sort

**Type:** data  
**Community:** [[community-14]]  
**Degree:** 4

## Description

- A state variable containing the current sorting key and direction ('asc' or 'desc') for data display.

## Related

- [[entities/usestate|UseState]] — The `useState` hook is used to manage the `Sort` state variable.
- [[entities/assets|Assets]] — The `Assets` are sorted based on the `Sort` state.
- [[entities/setsort|SetSort]] — The `SetSort` method updates the `Sort` state.
- [[entities/togglesort|ToggleSort]] — The `ToggleSort` method updates the `Sort` state based on current key and direction.

## Appears in

- `components/asset-manager.tsx`
