---
entity: "User"
entity_type: person
community: 51
degree: 20
---

# User

**Type:** person  
**Community:** [[community-51]]  
**Degree:** 20

## Description

- A data entity representing a user in the database, associated with transactions and assets.
- User represents an entity in the system, potentially stored in a database, associated with dividend records.
- The intended recipient of the instructions, assumed to be a novice without prior experience in Python, uv, or MCP.
- The individual interacting with the `rag` CLI, Obsidian, and Claude Code environment.
- An authenticated user of the application for whom the portfolio data is retrieved and managed.

## Related

- [[entities/user-id|User ID]] — The `User ID` identifies a specific `User` in the database.
- [[entities/transaction|Transaction]] — A `User` is associated with multiple `Transaction` records.
- [[entities/asset|Asset]] — A `User` owns `Asset` records in their portfolio.
- [[entities/userid|UserId]] — A User is identified by a UserId.
- [[entities/getorcreateuser|GetOrCreateUser]] — The GetOrCreateUser function creates or retrieves a User object.
- [[entities/database|Database]] — The database stores User information.
- [[entities/asset-data-model|Asset Data Model]] — A `User` owns multiple `Asset Data Model` entries in their portfolio.
- [[entities/fixed-income-lot-data-model|Fixed Income Lot Data Model]] — A `User` owns multiple `Fixed Income Lot Data Model` entries in their portfolio.
- [[entities/get-function|Get Function]] — The `Get Function` retrieves and manages data for a specific `User`.
- [[entities/permanent-alias|Permanent Alias]] — Permanent alias is presented as an advanced option for the user.
- [[entities/global-alias|Global Alias]] — A global alias might point to the wrong project for the user.
- [[entities/python|Python]] — The user is assumed to have no prior experience with Python.
- [[entities/uv|Uv]] — The user is assumed to have no prior experience with uv.
- [[entities/mcp|MCP]] — The user is assumed to have no prior experience with MCP.
- [[entities/noob-friendly-default|Noob-Friendly Default]] — The "noob-friendly default" principle assumes specific characteristics of the user.
- [[entities/installation|Installation]] — Installations are performed for the user, especially for prerequisites.
- [[entities/askuserquestion|AskUserQuestion]] — The `AskUserQuestion` function is used to interact with and ask questions to the user.
- [[entities/obsidian|Obsidian]] — The `User` interacts with `Obsidian` for knowledge management.
- [[entities/claude-code|Claude Code]] — The `User` interacts with `Claude Code` for development and MCP integration.
- [[entities/rag-cli|Rag CLI]] — The `User` interacts with the `Rag CLI` for various tasks.

## Appears in

- `app/api/transactions/route.ts`
- `app/api/dividends/route.ts`
- `RAG-INIT.md`
- `app/api/portfolio/route.ts`
