---
entity: "NextResponse Object"
entity_type: data
community: 2
degree: 4
---

# NextResponse Object

**Type:** data  
**Community:** [[community-2]]  
**Degree:** 4

## Description

- An object used to construct and return HTTP responses, including JSON data and status codes.

## Related

- [[entities/http-get-method|HTTP GET Method]] — The `HTTP GET Method` constructs and returns a `NextResponse Object` containing the retrieved fixed income lots.
- [[entities/http-post-method|HTTP POST Method]] — The `HTTP POST Method` returns a `NextResponse Object` with the newly created lot and an `HTTP Status Code` of 201.
- [[entities/http-patch-method|HTTP PATCH Method]] — The `HTTP PATCH Method` returns a `NextResponse Object` with the updated lot.
- [[entities/http-delete-method|HTTP DELETE Method]] — The `HTTP DELETE Method` returns a `NextResponse Object` indicating the success of the deletion.

## Appears in

- `app/api/fixed-income/route.ts`
