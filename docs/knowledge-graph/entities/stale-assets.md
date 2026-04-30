---
entity: "Stale Assets"
entity_type: data
community: 67
degree: 3
---

# Stale Assets

**Type:** data  
**Community:** [[community-67]]  
**Degree:** 3

## Description

- A subset of `Asset Data Model` whose cached price information has expired and requires an update.

## Related

- [[entities/get-function|Get Function]] — The `Get Function` identifies `Stale Assets` based on their cached price age.
- [[entities/stock-tickers|Stock Tickers]] — `Stale Assets` include `Stock Tickers` which need updated quotes.
- [[entities/crypto-tickers|Crypto Tickers]] — `Stale Assets` include `Crypto Tickers` which need updated quotes.

## Appears in

- `app/api/portfolio/route.ts`
