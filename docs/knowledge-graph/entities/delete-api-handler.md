---
entity: "DELETE API Handler"
entity_type: method
community: 89
degree: 8
---

# DELETE API Handler

**Type:** method  
**Community:** [[community-89]]  
**Degree:** 8

## Description

- An asynchronous function that processes HTTP DELETE requests to remove an asset from the database.

## Related

- [[entities/nextrequest|NextRequest]] — The `DELETE API Handler` processes data from `NextRequest`, specifically the `Asset Id`.
- [[entities/nextresponse|NextResponse]] — The `DELETE API Handler` returns a `Success Response` wrapped in a `NextResponse`.
- [[entities/prisma-client|Prisma Client]] — The `DELETE API Handler` uses the `Prisma Client` to delete an asset.
- [[entities/app-api-assets-routets|App/Api/Assets/Route.Ts]] — The `app/api/assets/route.ts` file defines the `DELETE API Handler`.
- [[entities/auth-function|Auth Function]] — The `DELETE API Handler` uses the `Auth Function` to obtain the `User Id`.
- [[entities/asset-model|Asset Model]] — The `DELETE API Handler` performs a `delete` operation on the `Asset Model`.
- [[entities/unauthorized-error-401|Unauthorized Error (401)]] — The `DELETE API Handler` returns an `Unauthorized Error (401)` if `User Id` is missing.
- [[entities/not-found-error-404|Not Found Error (404)]] — The `DELETE API Handler` returns a `Not Found Error (404)` if the `Asset Object` is not found or user access is unauthorized.

## Appears in

- `app/api/assets/route.ts`
