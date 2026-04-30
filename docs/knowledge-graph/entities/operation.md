---
entity: "Operation"
entity_type: data
community: 88
degree: 1
---

# Operation

**Type:** data  
**Community:** [[community-88]]  
**Degree:** 1

## Description

- Specifies the nature of a transaction, either 'BUY' or 'SELL'.

## Related

- [[entities/post-handler|POST Handler]] — The `POST Handler` determines its logic based on the `Operation` type ('BUY' or 'SELL').

## Appears in

- `app/api/transactions/route.ts`
