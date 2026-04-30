---
entity: "Dividend Form State"
entity_type: data
community: 76
degree: 3
---

# Dividend Form State

**Type:** data  
**Community:** [[community-76]]  
**Degree:** 3

## Description

- A state variable (`form`) that holds the current input values for a dividend, including `ticker`, `type`, `amount`, and `paidAt`.

## Related

- [[entities/dividend-manager|Dividend Manager]] — The Dividend Manager component manages the Dividend Form State for user input.
- [[entities/handle-submit-function|Handle Submit Function]] — The Handle Submit Function uses the Dividend Form State for validation and mutation payload.
- [[entities/handle-ticker-select-function|Handle Ticker Select Function]] — The Handle Ticker Select Function updates the Dividend Form State with selected ticker and type.

## Appears in

- `components/dividend-manager.tsx`
