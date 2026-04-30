---
entity: "HTTP Status 404"
entity_type: concept
community: 8
degree: 2
---

# HTTP Status 404

**Type:** concept  
**Community:** [[community-8]]  
**Degree:** 2

## Description

- An HTTP status code indicating that the requested resource (ticker) was not found.

## Related

- [[entities/get-request-handler|GET Request Handler]] — The GET Request Handler returns an HTTP Status 404 if a ticker is not found or a quote cannot be retrieved.
- [[entities/error-message-portuguese|Error Message (Portuguese)]] — The Portuguese error message is accompanied by the HTTP Status 404 when a ticker is not found.

## Appears in

- `app/api/quote/[ticker]/route.ts`
