---
entity: "Legend Item Container"
entity_type: artifact
community: 0
degree: 6
---

# Legend Item Container

**Type:** artifact  
**Community:** [[community-0]]  
**Degree:** 6

## Description

- A `div` element dynamically generated for each `Legend Entry`, responsible for displaying its attributes (color, name, percentage) and responding to user `onMouseEnter` and `onMouseLeave` events.

## Related

- [[entities/legend-entry|Legend Entry]] — Each `Legend Item Container` visually represents and displays the data from a single `Legend Entry`.
- [[entities/active-index|Active Index]] — The `Legend Item Container` modifies the `Active Index` state variable in response to `onMouseEnter` and `onMouseLeave` events.
- [[entities/entry-name|Entry Name]] — The `Legend Item Container` displays the `Entry Name` as a text label.
- [[entities/entry-percentage|Entry Percentage]] — The `Legend Item Container` displays the `Entry Percentage` as a numerical value.
- [[entities/entry-color|Entry Color]] — The `Legend Item Container` uses the `Entry Color` to set the background color of a visual indicator.
- [[entities/chart-legend-wrapper|Chart Legend Wrapper]] — The `Chart Legend Wrapper` acts as a parent container for multiple `Legend Item Container` elements.

## Appears in

- `components/allocation-chart.tsx`
