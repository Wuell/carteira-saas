---
entity: "HTTP 400 Bad Request"
entity_type: concept
community: 88
degree: 1
---

# HTTP 400 Bad Request

**Type:** concept  
**Community:** [[community-88]]  
**Degree:** 1

## Description

- An HTTP status code (400) returned for invalid client requests, such as missing fields ('Campos obrigatórios ausentes'), asset not found ('Ativo não encontrado na carteira'), or insufficient quantity ('Quantidade insuficiente').

## Related

- [[entities/post-handler|POST Handler]] — The `POST Handler` returns `HTTP 400 Bad Request` for various validation failures, such as missing fields, asset not found during sell, or insufficient quantity.

## Appears in

- `app/api/transactions/route.ts`
