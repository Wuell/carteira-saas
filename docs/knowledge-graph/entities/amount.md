---
entity: "Amount"
entity_type: concept
community: 82
degree: 3
---

# Amount

**Type:** concept  
**Community:** [[community-82]]  
**Degree:** 3

## Description

- Amount represents the monetary value of a dividend, a property of a `Dividend` record.
- A numerical value representing a quantity of money, typically associated with a dividend payment.

## Related

- [[entities/dividend|Dividend]] — A Dividend record has an Amount property.
- [[entities/dividends|Dividends]] — Each record within `Dividends` has an `Amount` property.
- [[entities/format-brl-method|Format BRL Method]] — The `Format BRL Method` is used to format monetary `Amount` values for display.

## Appears in

- `app/api/dividends/route.ts`
- `components/dividend-manager.tsx`
