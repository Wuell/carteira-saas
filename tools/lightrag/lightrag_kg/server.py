"""MCP server stdio — expõe kg_query, kg_insert_text, kg_stats."""
from __future__ import annotations
import asyncio
import json
import sys

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

from . import rag as rag_mod

server = Server("lightrag-kg")


@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="kg_query",
            description=(
                "Consulta o knowledge graph LightRAG do projeto. "
                "Use modo 'hybrid' (default) para resposta sintetizada com citações, "
                "'local' para vizinhança de entidades, 'global' para temas/comunidades, "
                "'naive' para vector search puro."
            ),
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Pergunta ou termo de busca"},
                    "mode": {
                        "type": "string",
                        "enum": ["hybrid", "local", "global", "naive"],
                        "default": "hybrid",
                    },
                },
                "required": ["query"],
            },
        ),
        Tool(
            name="kg_insert_text",
            description=(
                "Insere texto ad-hoc no knowledge graph (ex: notas de chat, decisões). "
                "Use 'source' como label descritivo (ex: 'chat-2026-04-29')."
            ),
            inputSchema={
                "type": "object",
                "properties": {
                    "text": {"type": "string"},
                    "source": {"type": "string", "default": "ad-hoc"},
                },
                "required": ["text"],
            },
        ),
        Tool(
            name="kg_stats",
            description="Retorna estatísticas do knowledge graph (entidades, relações, docs, modelos).",
            inputSchema={"type": "object", "properties": {}},
        ),
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    try:
        if name == "kg_query":
            ans = await rag_mod.query(arguments["query"], mode=arguments.get("mode", "hybrid"))
            return [TextContent(type="text", text=ans)]
        if name == "kg_insert_text":
            res = await rag_mod.insert_text(arguments["text"], source=arguments.get("source", "ad-hoc"))
            return [TextContent(type="text", text=json.dumps(res))]
        if name == "kg_stats":
            res = await rag_mod.stats()
            return [TextContent(type="text", text=json.dumps(res, indent=2))]
        return [TextContent(type="text", text=f"Tool desconhecida: {name}")]
    except Exception as e:
        return [TextContent(type="text", text=f"ERRO: {type(e).__name__}: {e}")]


async def _run():
    async with stdio_server() as (read, write):
        await server.run(read, write, server.create_initialization_options())


def main():
    asyncio.run(_run())


if __name__ == "__main__":
    main()
