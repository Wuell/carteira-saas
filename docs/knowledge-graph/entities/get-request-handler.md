---
entity: "GET Request Handler"
entity_type: method
community: 8
degree: 9
---

# GET Request Handler

**Type:** method  
**Community:** [[community-8]]  
**Degree:** 9

## Description

- The asynchronous function within `route.ts` that processes HTTP GET requests for ticker quotes.

## Related

- [[entities/nextrequest|NextRequest]] — The GET Request Handler receives a `NextRequest` object as input.
- [[entities/nextresponse|NextResponse]] — The GET Request Handler uses `NextResponse` to construct and return responses.
- [[entities/file-app-api-quote-ticker-routets|File: App/Api/Quote/[Ticker]/Route.Ts]] — The file defines and implements the GET Request Handler function.
- [[entities/getquote-function|GetQuote Function]] — The GET Request Handler calls `getQuote` to retrieve the price.
- [[entities/detecttickertype-function|DetectTickerType Function]] — The GET Request Handler calls `detectTickerType` if the type parameter is not provided.
- [[entities/ticker-parameter|Ticker Parameter]] — The GET Request Handler extracts and processes the `ticker` parameter from the route.
- [[entities/type-query-parameter|Type Query Parameter]] — The GET Request Handler extracts and processes the `type` query parameter from the request URL.
- [[entities/http-status-404|HTTP Status 404]] — The GET Request Handler returns an HTTP Status 404 if a ticker is not found or a quote cannot be retrieved.
- [[entities/error-message-portuguese|Error Message (Portuguese)]] — The GET Request Handler returns a Portuguese error message when a ticker is not found.

## Appears in

- `app/api/quote/[ticker]/route.ts`
