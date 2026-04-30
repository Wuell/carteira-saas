---
entity: "Payment Date"
entity_type: data
community: 75
degree: 3
---

# Payment Date

**Type:** data  
**Community:** [[community-75]]  
**Degree:** 3

## Description

- A date input field in the `Form` for the date of payment of a dividend, corresponding to `form.paidAt`.

## Related

- [[entities/form|Form]] — The `Form` provides an input field for the `Payment Date`.
- [[entities/form-state|Form State]] — The value of `Payment Date` updates the `paidAt` property of the `Form State`.
- [[entities/date-format|Date Format]] — The `Date Format` method is applied to the `Payment Date` for display.

## Appears in

- `components/dividend-manager.tsx`
