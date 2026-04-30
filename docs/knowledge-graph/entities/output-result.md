---
entity: "Output Result"
entity_type: data
community: 87
degree: 4
---

# Output Result

**Type:** data  
**Community:** [[community-87]]  
**Degree:** 4

## Description

- The final object that maps cryptocurrency ticker symbols to their respective prices in Brazilian Real (BRL).

## Related

- [[entities/ticker-symbol|Ticker Symbol]] — The Ticker Symbol serves as a key in the Output Result to store the corresponding cryptocurrency price.
- [[entities/error-handling-logic|Error Handling Logic]] — The Error Handling Logic returns an empty Output Result in case of errors.
- [[entities/brazilian-real-brl|Brazilian Real (BRL)]] — The price in Brazilian Real (BRL) is stored as a value in the Output Result.
- [[entities/cryptocurrency-price-fetcher|Cryptocurrency Price Fetcher]] — The Cryptocurrency Price Fetcher produces the Output Result containing the processed cryptocurrency prices.

## Appears in

- `lib/quotes.ts`
