---
entity: "PATCH API Handler"
entity_type: method
community: 89
degree: 8
---

# PATCH API Handler

**Type:** method  
**Community:** [[community-89]]  
**Degree:** 8

## Description

- An asynchronous function that processes HTTP PATCH requests to update specific asset details.

## Related

- [[entities/nextrequest|NextRequest]] — The `PATCH API Handler` processes data from `NextRequest`, including `Asset Id`, `Asset Quantity`, and `Asset Average Price`.
- [[entities/nextresponse|NextResponse]] — The `PATCH API Handler` returns the updated `Asset Object` wrapped in a `NextResponse`.
- [[entities/prisma-client|Prisma Client]] — The `PATCH API Handler` uses the `Prisma Client` to update an asset.
- [[entities/app-api-assets-routets|App/Api/Assets/Route.Ts]] — The `app/api/assets/route.ts` file defines the `PATCH API Handler`.
- [[entities/auth-function|Auth Function]] — The `PATCH API Handler` uses the `Auth Function` to obtain the `User Id`.
- [[entities/asset-model|Asset Model]] — The `PATCH API Handler` performs an `update` operation on the `Asset Model`.
- [[entities/unauthorized-error-401|Unauthorized Error (401)]] — The `PATCH API Handler` returns an `Unauthorized Error (401)` if `User Id` is missing.
- [[entities/not-found-error-404|Not Found Error (404)]] — The `PATCH API Handler` returns a `Not Found Error (404)` if the `Asset Object` is not found or user access is unauthorized.

## Appears in

- `app/api/assets/route.ts`
