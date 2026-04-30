---
entity: "Portfolio Cards Component"
entity_type: artifact
community: 68
degree: 10
---

# Portfolio Cards Component

**Type:** artifact  
**Community:** [[community-68]]  
**Degree:** 10

## Description

- A component used within the `DashboardPage Component` for displaying portfolio-related information.
- A React functional component responsible for rendering portfolio-related information cards.

## Related

- [[entities/return-percentage|Return Percentage]] — The Portfolio Cards Component displays the Return Percentage of the portfolio.
- [[entities/dashboard-page-file|Dashboard Page File]] — The `Dashboard Page File` imports the `Portfolio Cards Component` to include its functionality.
- [[entities/dashboard-page-component|Dashboard Page Component]] — The `Dashboard Page Component` integrates and renders the `Portfolio Cards Component`.
- [[entities/portfolio-cards-file|Portfolio Cards File]] — The Portfolio Cards Component is defined within the Portfolio Cards File.
- [[entities/use-query-hook|Use Query Hook]] — The Portfolio Cards Component utilizes the Use Query Hook to manage data fetching and state.
- [[entities/format-brl-function|Format BRL Function]] — The Portfolio Cards Component uses the Format BRL Function for displaying currency values.
- [[entities/total-value|Total Value]] — The Portfolio Cards Component displays the Total Value of the portfolio.
- [[entities/total-invested|Total Invested]] — The Portfolio Cards Component displays the Total Invested amount of the portfolio.
- [[entities/total-positions|Total Positions]] — The Portfolio Cards Component displays the Total Positions in the portfolio.
- [[entities/is-loading-state|Is Loading State]] — The Portfolio Cards Component manages its rendering based on the Is Loading State.

## Appears in

- `app/(dashboard)/dashboard/page.tsx`
- `components/portfolio-cards.tsx`
