---
entity: "AllocationChart"
entity_type: artifact
community: 0
degree: 15
---

# AllocationChart

**Type:** artifact  
**Community:** [[community-0]]  
**Degree:** 15

## Description

- AllocationChart is a React functional component responsible for rendering a portfolio allocation pie chart.

## Related

- [[entities/active-index|Active Index]] — AllocationChart manages the Active Index state to control the visual emphasis of pie chart segments.
- [[entities/components-allocation-charttsx|components/allocation-chart.tsx]] — The file components/allocation-chart.tsx defines the AllocationChart React component.
- [[entities/usequery|useQuery]] — AllocationChart utilizes the useQuery hook for fetching portfolio data.
- [[entities/usestate|useState]] — AllocationChart utilizes the useState hook for managing local component state, such as activeIndex.
- [[entities/portfolio|Portfolio]] — AllocationChart processes the fetched Portfolio data to prepare it for visualization.
- [[entities/type_labels|TYPE_LABELS]] — AllocationChart uses TYPE_LABELS to map asset types to user-friendly display names in the chart.
- [[entities/type_colors|TYPE_COLORS]] — AllocationChart uses TYPE_COLORS to apply specific colors to different asset types in the chart.
- [[entities/fallback_colors|FALLBACK_COLORS]] — AllocationChart uses FALLBACK_COLORS as a fallback option for chart segment colors when specific type colors are not defined.
- [[entities/formatbrl|formatBRL]] — AllocationChart uses the formatBRL function to display currency values in the Brazilian Real format.
- [[entities/responsivecontainer|ResponsiveContainer]] — AllocationChart renders a ResponsiveContainer to ensure the pie chart adapts to its parent container's size.
- [[entities/alocao-por-classe|Alocação Por Classe]] — AllocationChart displays "Alocação Por Classe" as the title for the portfolio distribution chart.
- [[entities/tanstack-react-query|Tanstack React Query]] — AllocationChart uses Tanstack React Query for its data fetching and caching logic.
- [[entities/recharts|Recharts]] — AllocationChart uses Recharts components to render the pie chart visualization.
- [[entities/use-client-directive|Use Client Directive]] — AllocationChart employs the Use Client Directive to ensure client-side rendering capabilities.
- [[entities/is-loading|Is Loading]] — AllocationChart monitors the Is Loading state to display appropriate UI feedback during data fetching.

## Appears in

- `components/allocation-chart.tsx`
