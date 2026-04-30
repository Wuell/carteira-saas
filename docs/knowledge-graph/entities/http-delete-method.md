---
entity: "HTTP DELETE Method"
entity_type: method
community: 2
degree: 10
---

# HTTP DELETE Method

**Type:** method  
**Community:** [[community-2]]  
**Degree:** 10

## Description

- An asynchronous function in the `Fixed-Income API Route` designed to handle HTTP DELETE requests for removing fixed income lots.
- An HTTP request method used for deleting resources.

## Related

- [[entities/fixed-income-api-route|Fixed-Income API Route]] — The `Fixed-Income API Route` defines and includes the `HTTP DELETE Method` to delete data.
- [[entities/getorcreateuser-function|getOrCreateUser Function]] — The `HTTP DELETE Method` calls the `getOrCreateUser Function` to verify user ownership before deleting lots.
- [[entities/nextrequest-object|NextRequest Object]] — The `HTTP DELETE Method` processes the ID from the `NextRequest Object` to identify the lot for deletion.
- [[entities/authentication-logic|Authentication Logic]] — The `HTTP DELETE Method` implements `Authentication Logic` to secure the deletion of fixed income lots.
- [[entities/nextresponse-object|NextResponse Object]] — The `HTTP DELETE Method` returns a `NextResponse Object` indicating the success of the deletion.
- [[entities/error-handling|Error Handling]] — The `HTTP DELETE Method` uses `Error Handling` for lots not found or unauthorized access.
- [[entities/database-operations|Database Operations]] — The `HTTP DELETE Method` performs `Database Operations` to delete `FixedIncomeLot Data Model` records.
- [[entities/json-content-type|JSON Content Type]] — The JSON Content Type is specified in the headers of requests using the HTTP DELETE Method.
- [[entities/assets-api-endpoint|Assets API Endpoint]] — The HTTP DELETE Method is used for requests to the Assets API Endpoint.
- [[entities/fixed-income-api-endpoint|Fixed-Income API Endpoint]] — The HTTP DELETE Method is used for requests to the Fixed-Income API Endpoint.

## Appears in

- `app/api/fixed-income/route.ts`
- `components/asset-manager.tsx`
