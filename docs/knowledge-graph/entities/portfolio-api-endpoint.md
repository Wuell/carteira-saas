---
entity: "Portfolio API Endpoint"
entity_type: location
community: 68
degree: 3
---

# Portfolio API Endpoint

**Type:** location  
**Community:** [[community-68]]  
**Degree:** 3

## Description

- The API endpoint (`/api/portfolio`) from which portfolio data is retrieved by the `fetchPortfolio` method.
- The `/api/portfolio` endpoint from which the application fetches portfolio data.
- A network endpoint from which asset portfolio data is fetched.

## Related

- [[entities/fetch-portfolio-method|Fetch Portfolio Method]] — The `Fetch Portfolio Method` retrieves data by accessing the `Portfolio API Endpoint`.
- [[entities/fetch-portfolio-function|Fetch Portfolio Function]] — The Fetch Portfolio Function fetches its data from the Portfolio API Endpoint.
- [[entities/fetch-assets-function|Fetch Assets (Function)]] — The `fetchAssets` function retrieves asset data from the Portfolio API Endpoint.

## Appears in

- `components/asset-manager.tsx`
- `components/portfolio-cards.tsx`
- `components/dividend-manager.tsx`
