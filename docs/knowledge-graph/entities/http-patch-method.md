---
entity: "HTTP PATCH Method"
entity_type: method
community: 2
degree: 10
---

# HTTP PATCH Method

**Type:** method  
**Community:** [[community-2]]  
**Degree:** 10

## Description

- An asynchronous function in the `Fixed-Income API Route` designed to handle HTTP PATCH requests for updating existing fixed income lots.
- An HTTP request method used for partially updating resources.

## Related

- [[entities/fixed-income-api-route|Fixed-Income API Route]] — The `Fixed-Income API Route` defines and includes the `HTTP PATCH Method` to update data.
- [[entities/getorcreateuser-function|getOrCreateUser Function]] — The `HTTP PATCH Method` calls the `getOrCreateUser Function` to verify user ownership before updating lots.
- [[entities/nextrequest-object|NextRequest Object]] — The `HTTP PATCH Method` processes update data from the `NextRequest Object`.
- [[entities/authentication-logic|Authentication Logic]] — The `HTTP PATCH Method` implements `Authentication Logic` to secure updates to fixed income lots.
- [[entities/nextresponse-object|NextResponse Object]] — The `HTTP PATCH Method` returns a `NextResponse Object` with the updated lot.
- [[entities/error-handling|Error Handling]] — The `HTTP PATCH Method` uses `Error Handling` for lots not found or unauthorized access.
- [[entities/database-operations|Database Operations]] — The `HTTP PATCH Method` performs `Database Operations` to update `FixedIncomeLot Data Model` records.
- [[entities/assets-api-endpoint|Assets API Endpoint]] — The HTTP PATCH Method is used for requests to the Assets API Endpoint.
- [[entities/json-content-type|JSON Content Type]] — The JSON Content Type is specified in the headers of requests using the HTTP PATCH Method.
- [[entities/fixed-income-api-endpoint|Fixed-Income API Endpoint]] — The HTTP PATCH Method is used for requests to the Fixed-Income API Endpoint.

## Appears in

- `app/api/fixed-income/route.ts`
- `components/asset-manager.tsx`
