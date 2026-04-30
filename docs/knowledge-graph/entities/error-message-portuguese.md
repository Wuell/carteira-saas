---
entity: "Error Message (Portuguese)"
entity_type: content
community: 8
degree: 3
---

# Error Message (Portuguese)

**Type:** content  
**Community:** [[community-8]]  
**Degree:** 3

## Description

- A Portuguese error message indicating that a ticker was not found, suggesting CoinGecko ID for crypto or B3 code for stocks.

## Related

- [[entities/get-request-handler|GET Request Handler]] — The GET Request Handler returns a Portuguese error message when a ticker is not found.
- [[entities/ticker-parameter|Ticker Parameter]] — The Portuguese error message includes the Ticker Parameter value when it is not found.
- [[entities/http-status-404|HTTP Status 404]] — The Portuguese error message is accompanied by the HTTP Status 404 when a ticker is not found.

## Appears in

- `app/api/quote/[ticker]/route.ts`
