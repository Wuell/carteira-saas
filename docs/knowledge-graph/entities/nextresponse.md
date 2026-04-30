---
entity: "NextResponse"
entity_type: data
community: 89
degree: 12
---

# NextResponse

**Type:** data  
**Community:** [[community-89]]  
**Degree:** 12

## Description

- Represents an outgoing HTTP response in a Next.js environment, used for sending data and status codes.
- NextResponse represents an outgoing HTTP response in a Next.js API route, used to send data or errors.
- An object used to construct the HTTP response in a Next.js environment.
- An object used to create and send an HTTP response from a Next.js API route.

## Related

- [[entities/nextjs|Next.js]] — `Next.js` provides the `NextResponse` object.
- [[entities/post-handler|POST Handler]] — The `POST Handler` uses `NextResponse` to return transaction status or errors.
- [[entities/get-handler|GET Handler]] — The `GET Handler` uses `NextResponse` to return transaction data or errors.
- [[entities/next-server|Next/Server]] — NextResponse is provided by the Next/Server module.
- [[entities/post-function|POST Function]] — The POST function returns a NextResponse containing the created dividend or an error.
- [[entities/get-function|GET Function]] — The GET function returns a NextResponse containing data or an error.
- [[entities/delete-function|DELETE Function]] — The DELETE function returns a NextResponse indicating success or an error.
- [[entities/get-request-handler|GET Request Handler]] — The GET Request Handler uses `NextResponse` to construct and return responses.
- [[entities/patch-api-handler|PATCH API Handler]] — The `PATCH API Handler` returns the updated `Asset Object` wrapped in a `NextResponse`.
- [[entities/delete-api-handler|DELETE API Handler]] — The `DELETE API Handler` returns a `Success Response` wrapped in a `NextResponse`.
- [[entities/get-api-handler|GET API Handler]] — The `GET API Handler` returns an `Assets Collection` wrapped in a `NextResponse`.
- [[entities/app-api-assets-routets|App/Api/Assets/Route.Ts]] — The API route file imports and utilizes `NextResponse` for constructing HTTP responses.

## Appears in

- `app/api/transactions/route.ts`
- `app/api/dividends/route.ts`
- `app/api/quote/[ticker]/route.ts`
- `app/api/assets/route.ts`
