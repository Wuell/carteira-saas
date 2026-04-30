---
entity: "Now Function"
entity_type: method
community: 89
degree: 4
---

# Now Function

**Type:** method  
**Community:** [[community-89]]  
**Degree:** 4

## Description

- A function used to set the current timestamp.

## Related

- [[entities/asset-model|Asset Model]] — The 'createdAt' field of the Asset Model uses the Now Function as its default value.
- [[entities/transaction-model|Transaction Model]] — The 'date' and 'createdAt' fields of the Transaction Model use the Now Function as their default values.
- [[entities/dividend-model|Dividend Model]] — The 'createdAt' field of the Dividend Model uses the Now Function as its default value.
- [[entities/fixed-income-lot-model|Fixed Income Lot Model]] — The 'createdAt' field of the Fixed Income Lot Model uses the Now Function as its default value.

## Appears in

- `prisma/schema.prisma`
