---
entity: "MCP Check Command"
entity_type: method
community: 38
degree: 3
---

# MCP Check Command

**Type:** method  
**Community:** [[community-38]]  
**Degree:** 3

## Description

- A LightRAG command (`rag mcp-check`) for final validation of the `Master Control Program` configuration.

## Related

- [[entities/kg-server-command|KG Server Command]] — The `MCP Check Command` validates that the `KG Server Command` does not crash.
- [[entities/mcpjson-configuration-file|.mcp.json Configuration File]] — The `MCP Check Command` validates the existence and structure of the `.mcp.json Configuration File`.
- [[entities/lightrag-mcp-server-entry|LightRAG MCP Server Entry]] — The `MCP Check Command` validates the `LightRAG MCP Server Entry` within the MCP configuration.

## Appears in

- `RAG-INIT.md`
