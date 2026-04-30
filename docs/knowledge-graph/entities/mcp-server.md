---
entity: "MCP Server"
entity_type: artifact
community: 33
degree: 9
---

# MCP Server

**Type:** artifact  
**Community:** [[community-33]]  
**Degree:** 9

## Description

- A server component (Master Control Program) that uses standard input/output.
- A server component integrated with Claude Code, part of the LightRAG pipeline.
- A server component that selectively exposes a limited set of tools to prevent costly erroneous calls.

## Related

- [[entities/detalhes-crticos|Detalhes Críticos]] — Critical details mention the MCP server.
- [[entities/lightrag|LightRAG]] — The LightRAG pipeline integrates with an MCP server.
- [[entities/kg_query|kg_query]] — The `MCP Server` exposes `kg_query` as an accessible tool.
- [[entities/kg_insert_text|kg_insert_text]] — The `MCP Server` exposes `kg_insert_text` as an accessible tool.
- [[entities/kg_stats|kg_stats]] — The `MCP Server` exposes `kg_stats` as an accessible tool.
- [[entities/reindex-operation|Reindex Operation]] — The `MCP Server` explicitly does not expose `Reindex Operation`.
- [[entities/export-operation|Export Operation]] — The `MCP Server` explicitly does not expose `Export Operation`.
- [[entities/mcpjson|Mcp.json]] — The MCP server is configured via the `.mcp.json` file.
- [[entities/claude-code|Claude Code]] — The MCP server is integrated with Claude Code via `.mcp.json`.

## Appears in

- `RAG-INIT.md`
