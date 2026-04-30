---
entity: "Rag MCP-Check Command"
entity_type: method
community: 60
degree: 8
---

# Rag MCP-Check Command

**Type:** method  
**Community:** [[community-60]]  
**Degree:** 8

## Description

- A command used for the final validation of the MCP configuration, ensuring the `.mcp.json` file exists and the `kg-server` functions correctly.
- A subcommand of `Rag CLI` to verify if the MCP is registered in `.mcp.json`.

## Related

- [[entities/mcp|MCP]] — The `Rag MCP-Check Command` performs final validation of the `MCP` configuration.
- [[entities/mcpjson-file|Mcp.Json File]] — The `Rag MCP-Check Command` checks for the existence and integrity of the `Mcp.Json File`.
- [[entities/kg-server|Kg-Server]] — The `Rag MCP-Check Command` ensures that the `Kg-Server` does not crash during execution.
- [[entities/uv-run-kg-server-help-command|Uv Run Kg-Server Help Command]] — The `Rag MCP-Check Command` uses the `Uv Run Kg-Server Help Command` for validation.
- [[entities/rag-cli|Rag CLI]] — The `Rag CLI` includes `Rag MCP-Check Command` as one of its subcommands.
- [[entities/mcpjson-file|.mcp.json File]] — `Rag MCP-Check Command` reads the `.mcp.json File` to verify configurations.
- [[entities/lightrag-entry|Lightrag Entry]] — `Rag MCP-Check Command` verifies a `Lightrag Entry` within the configuration file.
- [[entities/lightrag_kgserver-module|lightrag_kg.server Module]] — `Rag MCP-Check Command` attempts to import `lightrag_kg.server Module` as part of its verification.

## Appears in

- `RAG-INIT.md`
