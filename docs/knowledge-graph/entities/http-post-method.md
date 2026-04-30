---
entity: "HTTP POST Method"
entity_type: method
community: 2
degree: 7
---

# HTTP POST Method

**Type:** method  
**Community:** [[community-2]]  
**Degree:** 7

## Description

- An asynchronous function in the `Fixed-Income API Route` designed to handle HTTP POST requests for creating new fixed income lots.

## Related

- [[entities/fixed-income-api-route|Fixed-Income API Route]] — The `Fixed-Income API Route` defines and includes the `HTTP POST Method` to create data.
- [[entities/getorcreateuser-function|getOrCreateUser Function]] — The `HTTP POST Method` calls the `getOrCreateUser Function` to associate new lots with a user.
- [[entities/nextrequest-object|NextRequest Object]] — The `HTTP POST Method` processes data from the `NextRequest Object` to create new fixed income lots.
- [[entities/authentication-logic|Authentication Logic]] — The `HTTP POST Method` implements `Authentication Logic` to secure the creation of fixed income lots.
- [[entities/nextresponse-object|NextResponse Object]] — The `HTTP POST Method` returns a `NextResponse Object` with the newly created lot and an `HTTP Status Code` of 201.
- [[entities/error-handling|Error Handling]] — The `HTTP POST Method` uses `Error Handling` for missing mandatory fields and unauthorized access.
- [[entities/database-operations|Database Operations]] — The `HTTP POST Method` performs `Database Operations` to create new `FixedIncomeLot Data Model` records.

## Appears in

- `app/api/fixed-income/route.ts`
