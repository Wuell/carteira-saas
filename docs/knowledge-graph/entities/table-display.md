---
entity: "Table Display"
entity_type: artifact
community: 75
degree: 5
---

# Table Display

**Type:** artifact  
**Community:** [[community-75]]  
**Degree:** 5

## Description

- A structured grid within the `History Section` used to present dividend records with columns for Ticker, Tipo (Type), Data (Date), and Valor (Value).

## Related

- [[entities/loading-state|Loading State]] — The `Loading State` determines whether a "Carregando..." message is shown in the `Table Display`.
- [[entities/history-section|History Section]] — The `History Section` displays historical data using the `Table Display`.
- [[entities/dividend-record|Dividend Record]] — The `Table Display` visually presents `Dividend Record`s.
- [[entities/filtered-records-list|Filtered Records List]] — The `Table Display` is populated with `Dividend Record`s from the `Filtered Records List`.
- [[entities/active-filters-indicator|Active Filters Indicator]] — The `Table Display` shows a "no results" message based on `Active Filters Indicator` and `Filtered Records List` length.

## Appears in

- `components/dividend-manager.tsx`
