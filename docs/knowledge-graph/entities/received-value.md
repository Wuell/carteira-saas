---
entity: "Received Value"
entity_type: data
community: 75
degree: 3
---

# Received Value

**Type:** data  
**Community:** [[community-75]]  
**Degree:** 3

## Description

- A numerical input field in the `Form` for the amount received, formatted in Brazilian Real (R$), corresponding to `form.amount`.

## Related

- [[entities/form|Form]] — The `Form` provides an input field for the `Received Value`.
- [[entities/form-state|Form State]] — The value of `Received Value` updates the `amount` property of the `Form State`.
- [[entities/brazilian-real-format|Brazilian Real Format]] — The `Brazilian Real Format` method is applied to the `Received Value` for display.

## Appears in

- `components/dividend-manager.tsx`
