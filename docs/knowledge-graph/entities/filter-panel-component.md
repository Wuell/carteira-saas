---
entity: "Filter Panel (Component)"
entity_type: artifact
community: 70
degree: 8
---

# Filter Panel (Component)

**Type:** artifact  
**Community:** [[community-70]]  
**Degree:** 8

## Description

- A React functional component responsible for rendering and managing dividend filters, including month and ticker options, with an open/close toggle and clear functionality.

## Related

- [[entities/dividend-manager-component|Dividend Manager Component]] — The Dividend Manager Component implements the Filter Panel as part of its UI.
- [[entities/use-state-hook|Use State (Hook)]] — The Filter Panel Component uses the `useState` hook for managing its internal state.
- [[entities/use-ref-hook|Use Ref (Hook)]] — The Filter Panel Component uses the `useRef` hook for direct DOM interaction, specifically for click-outside detection.
- [[entities/use-effect-hook|Use Effect (Hook)]] — The Filter Panel Component uses the `useEffect` hook to manage side effects, such as event listeners.
- [[entities/filter-icon-svg|Filter Icon (SVG)]] — The Filter Panel Component displays an SVG element as its filter icon.
- [[entities/filtros-label|Filtros (Label)]] — The Filter Panel Component displays the "Filtros" label on its button and as a section title.
- [[entities/ms-label|Mês (Label)]] — The Filter Panel Component displays the "Mês" label for its month filter.
- [[entities/limpar-label|Limpar (Label)]] — The Filter Panel Component displays the "Limpar" label for its clear filters button.

## Appears in

- `components/dividend-manager.tsx`
