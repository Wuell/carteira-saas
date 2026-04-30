---
entity: "POST Handler"
entity_type: method
community: 88
degree: 18
---

# POST Handler

**Type:** method  
**Community:** [[community-88]]  
**Degree:** 18

## Description

- The asynchronous function handling HTTP POST requests to create a new transaction and update the user's asset portfolio.

## Related

- [[entities/app-api-transactions-routets|App/Api/Transactions/Route.Ts]] — The file `App/Api/Transactions/Route.Ts` defines the `POST Handler` for creating transactions and managing assets.
- [[entities/auth|Auth]] — The `POST Handler` uses `Auth` to authenticate the user.
- [[entities/nextrequest|NextRequest]] — The `POST Handler` receives incoming request data via `NextRequest`.
- [[entities/nextresponse|NextResponse]] — The `POST Handler` uses `NextResponse` to return transaction status or errors.
- [[entities/prisma-client|Prisma Client]] — The `POST Handler` uses the `Prisma Client` for `Transaction` creation and `Asset` management.
- [[entities/get-or-create-user|Get Or Create User]] — The `POST Handler` uses `Get Or Create User` to obtain the `User` object for the given `User ID`.
- [[entities/user-id|User ID]] — The `POST Handler` requires a `User ID` to function.
- [[entities/transaction|Transaction]] — The `POST Handler` creates new `Transaction` records.
- [[entities/ticker|Ticker]] — The `POST Handler` receives and processes `Ticker` information from the request.
- [[entities/type|Type]] — The `POST Handler` receives and processes `Type` information from the request.
- [[entities/operation|Operation]] — The `POST Handler` determines its logic based on the `Operation` type ('BUY' or 'SELL').
- [[entities/quantity|Quantity]] — The `POST Handler` receives and processes `Quantity` information from the request.
- [[entities/price|Price]] — The `POST Handler` receives and processes `Price` information from the request.
- [[entities/asset|Asset]] — The POST Handler queries existing Asset records to find a matching asset for the user and ticker.
- [[entities/average-price|Average Price]] — The `POST Handler` calculates and updates the `Average Price` for assets during buy operations.
- [[entities/http-401-unauthorized|HTTP 401 Unauthorized]] — The `POST Handler` returns `HTTP 401 Unauthorized` if the `User ID` is not found.
- [[entities/http-400-bad-request|HTTP 400 Bad Request]] — The `POST Handler` returns `HTTP 400 Bad Request` for various validation failures, such as missing fields, asset not found during sell, or insufficient quantity.
- [[entities/http-201-created|HTTP 201 Created]] — The `POST Handler` returns `HTTP 201 Created` upon successful transaction creation.

## Appears in

- `app/api/transactions/route.ts`
