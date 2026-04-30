---
entity: "Get Function"
entity_type: method
community: 67
degree: 15
---

# Get Function

**Type:** method  
**Community:** [[community-67]]  
**Degree:** 15

## Description

- The asynchronous function that handles HTTP GET requests to the portfolio API route, fetching and processing user financial data.

## Related

- [[entities/auth|Auth]] — The `Get Function` uses `Auth` to authenticate the user making the request.
- [[entities/user|User]] — The `Get Function` retrieves and manages data for a specific `User`.
- [[entities/database|Database]] — The `Get Function` updates cached prices for stale assets in the `Database` in a background process.
- [[entities/prisma-orm|Prisma ORM]] — The `Get Function` interacts with the database via `Prisma ORM`.
- [[entities/get-or-create-user-function|Get Or Create User Function]] — The `Get Function` relies on `Get Or Create User Function` to obtain user information.
- [[entities/app-api-portfolio-route-ts|App Api Portfolio Route Ts]] — The `Get Function` is defined and implemented within `app/api/portfolio/route.ts`.
- [[entities/next-response|Next Response]] — The `Get Function` uses `Next Response` to construct and return the HTTP response.
- [[entities/cache_ttl_ms|CACHE_TTL_MS]] — The `Get Function` uses `CACHE_TTL_MS` to filter assets whose cached prices have expired.
- [[entities/get-batch-stock-quotes-function|Get Batch Stock Quotes Function]] — The `Get Function` uses `Get Batch Stock Quotes Function` to fetch stock prices.
- [[entities/get-batch-crypto-quotes-function|Get Batch Crypto Quotes Function]] — The `Get Function` uses `Get Batch Crypto Quotes Function` to fetch cryptocurrency prices.
- [[entities/stale-assets|Stale Assets]] — The `Get Function` identifies `Stale Assets` based on their cached price age.
- [[entities/portfolio-summary|Portfolio Summary]] — The `Get Function` calculates the `Portfolio Summary` from asset and fixed income data.
- [[entities/promise-all|Promise All]] — The `Get Function` invokes `Promise All` to concurrently fetch initial data and quotes.
- [[entities/http-status-401|HTTP Status 401]] — The `Get Function` returns an `HTTP Status 401` response if the user is not authorized.
- [[entities/fresh-prices|Fresh Prices]] — The `Get Function` uses `Fresh Prices` to update the `Asset Data Model` in the database.

## Appears in

- `app/api/portfolio/route.ts`
