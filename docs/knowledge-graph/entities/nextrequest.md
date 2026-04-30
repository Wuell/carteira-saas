---
entity: "NextRequest"
entity_type: data
community: 89
degree: 9
---

# NextRequest

**Type:** data  
**Community:** [[community-89]]  
**Degree:** 9

## Description

- Represents an incoming HTTP request in a Next.js environment, carrying request data.
- NextRequest represents an incoming HTTP request in a Next.js API route.
- An object representing the incoming HTTP request in a Next.js environment.
- An object representing the incoming HTTP request in a Next.js API route.

## Related

- [[entities/nextjs|Next.js]] — `Next.js` provides the `NextRequest` object.
- [[entities/post-handler|POST Handler]] — The `POST Handler` receives incoming request data via `NextRequest`.
- [[entities/next-server|Next/Server]] — NextRequest is provided by the Next/Server module.
- [[entities/post-function|POST Function]] — The POST function receives request data via NextRequest.
- [[entities/delete-function|DELETE Function]] — The DELETE function receives request data via NextRequest.
- [[entities/get-request-handler|GET Request Handler]] — The GET Request Handler receives a `NextRequest` object as input.
- [[entities/patch-api-handler|PATCH API Handler]] — The `PATCH API Handler` processes data from `NextRequest`, including `Asset Id`, `Asset Quantity`, and `Asset Average Price`.
- [[entities/delete-api-handler|DELETE API Handler]] — The `DELETE API Handler` processes data from `NextRequest`, specifically the `Asset Id`.
- [[entities/app-api-assets-routets|App/Api/Assets/Route.Ts]] — The API route file imports and utilizes `NextRequest` for handling incoming HTTP requests.

## Appears in

- `app/api/transactions/route.ts`
- `app/api/dividends/route.ts`
- `app/api/quote/[ticker]/route.ts`
- `app/api/assets/route.ts`
