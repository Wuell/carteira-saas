---
entity: "Legend Entry"
entity_type: data
community: 0
degree: 2
---

# Legend Entry

**Type:** data  
**Community:** [[community-0]]  
**Degree:** 2

## Description

- An individual object iterated from `Chart Data`, representing one item in the legend and possessing attributes like `color`, `name`, and `pct`.

## Related

- [[entities/chart-data|Chart Data]] — The `Chart Data` array contains multiple `Legend Entry` objects, which are iterated over to render the legend.
- [[entities/legend-item-container|Legend Item Container]] — Each `Legend Item Container` visually represents and displays the data from a single `Legend Entry`.

## Appears in

- `components/allocation-chart.tsx`
