---
entity: "Chart Data"
entity_type: data
community: 0
degree: 3
---

# Chart Data

**Type:** data  
**Community:** [[community-0]]  
**Degree:** 3

## Description

- An array (`chartData`) that provides the source information for rendering multiple `Legend Entry` elements in a chart legend.
- Chart Data is the final processed array of objects, formatted for direct consumption by the Recharts Pie component.

## Related

- [[entities/legend-entry|Legend Entry]] — The `Chart Data` array contains multiple `Legend Entry` objects, which are iterated over to render the legend.
- [[entities/grouped-data|Grouped Data]] — Grouped Data is further processed and transformed into Chart Data suitable for visualization.
- [[entities/pie|Pie]] — Chart Data provides the data points for the Pie component to render the allocation.

## Appears in

- `components/allocation-chart.tsx`
