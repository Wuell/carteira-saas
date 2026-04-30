---
entity: "Dividend"
entity_type: concept
community: 89
degree: 9
---

# Dividend

**Type:** concept  
**Community:** [[community-89]]  
**Degree:** 9

## Description

- Dividend represents a financial record, containing details such as ticker, type, amount, paid date, and associated user ID.

## Related

- [[entities/ticker|Ticker]] — A Dividend record has a Ticker property.
- [[entities/type|Type]] — A Dividend record has a Type property.
- [[entities/get-function|GET Function]] — The GET function retrieves Dividend records.
- [[entities/post-function|POST Function]] — The POST function creates a new Dividend record.
- [[entities/delete-function|DELETE Function]] — The DELETE function deletes a Dividend record.
- [[entities/userid|UserId]] — A Dividend record is associated with a UserId, indicating ownership.
- [[entities/amount|Amount]] — A Dividend record has an Amount property.
- [[entities/paid-at|Paid At]] — A Dividend record has a Paid At property.
- [[entities/database|Database]] — The database stores Dividend records.

## Appears in

- `app/api/dividends/route.ts`
