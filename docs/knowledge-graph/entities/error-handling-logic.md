---
entity: "Error Handling Logic"
entity_type: method
community: 87
degree: 4
---

# Error Handling Logic

**Type:** method  
**Community:** [[community-87]]  
**Degree:** 4

## Description

- The code segments responsible for checking for errors (e.g., empty input, non-ok response, exceptions) and returning an empty object.

## Related

- [[entities/gecko-ids|Gecko IDs]] — The Error Handling Logic checks if the Gecko IDs input is empty at the start, returning an empty result if so.
- [[entities/fetch-response|Fetch Response]] — The Fetch Response's 'ok' status is evaluated by the Error Handling Logic to detect request failures.
- [[entities/output-result|Output Result]] — The Error Handling Logic returns an empty Output Result in case of errors.
- [[entities/cryptocurrency-price-fetcher|Cryptocurrency Price Fetcher]] — The Cryptocurrency Price Fetcher incorporates Error Handling Logic to manage potential issues during execution.

## Appears in

- `lib/quotes.ts`
