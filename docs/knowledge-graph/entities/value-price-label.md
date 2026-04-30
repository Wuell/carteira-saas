---
entity: "Value Price Label"
entity_type: artifact
community: 1
degree: 4
---

# Value Price Label

**Type:** artifact  
**Community:** [[community-1]]  
**Degree:** 4

## Description

- A label for the Value Price Input Field, dynamically changing its text based on the selected category.

## Related

- [[entities/value-price-input-field|Value Price Input Field]] — The Value Price Input Field is associated with the Value Price Label for user guidance.
- [[entities/selected-category-form|Selected Category (Form)]] — The text of the Value Price Label adapts based on the Selected Category (Form).
- [[entities/invested-value-concept|Invested Value Concept]] — The Value Price Label shows "Valor investido (R$)" when the selected category is 'fixed'.
- [[entities/unit-price-concept|Unit Price Concept]] — The Value Price Label shows "Preço unitário (R$)" when the selected category is not 'fixed'.

## Appears in

- `components/asset-manager.tsx`
