---
entity: "Dividend Record"
entity_type: data
community: 75
degree: 4
---

# Dividend Record

**Type:** data  
**Community:** [[community-75]]  
**Degree:** 4

## Description

- An individual entry representing a dividend, containing properties such as `id`, `ticker`, `type`, `paidAt` (payment date), and `amount` (value), displayed in the `Table Display`.

## Related

- [[entities/table-display|Table Display]] — The `Table Display` visually presents `Dividend Record`s.
- [[entities/selected-dividend-id|Selected Dividend ID]] — The `Selected Dividend ID` uniquely identifies a `Dividend Record` for user interaction.
- [[entities/date-format|Date Format]] — The `Date Format` method is used to format the `paidAt` property of a `Dividend Record`.
- [[entities/type-labels-mapping|Type Labels Mapping]] — A `Dividend Record` uses `Type Labels Mapping` to display its `type` in a readable format.

## Appears in

- `components/dividend-manager.tsx`
