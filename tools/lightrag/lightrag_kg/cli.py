"""CLI unificado `rag` — interface principal pro usuário."""
from __future__ import annotations
import argparse
import asyncio
import json
import re
import sys
from pathlib import Path
from rich.console import Console
from rich.markdown import Markdown
from rich.table import Table

from . import config, rag as rag_mod

console = Console()


async def cmd_search(args):
    ans = await rag_mod.query(args.term, mode=args.mode)
    if args.json:
        print(json.dumps({"mode": args.mode, "answer": ans}, ensure_ascii=False))
    else:
        console.print(Markdown(ans))


async def cmd_stats(args):
    info = await rag_mod.stats()
    if args.json:
        print(json.dumps(info, indent=2, ensure_ascii=False))
        return
    t = Table(title="LightRAG stats")
    t.add_column("Métrica"); t.add_column("Valor", justify="right")
    for k, v in info.items():
        t.add_row(k, json.dumps(v) if isinstance(v, (dict, list)) else str(v))
    console.print(t)


async def cmd_top(args):
    import networkx as nx
    g_path = config.STORAGE_DIR / "graph_chunk_entity_relation.graphml"
    if not g_path.exists():
        console.print("[red]Grafo não encontrado. Rode `rag index --full`.[/red]")
        return
    g = nx.read_graphml(g_path)
    rows = sorted(g.degree(), key=lambda x: x[1], reverse=True)[:args.n]
    if args.json:
        out = [{"entity": str(g.nodes[n].get("entity_id", n)), "degree": d} for n, d in rows]
        print(json.dumps(out, ensure_ascii=False, indent=2))
        return
    t = Table(title=f"Top {args.n} entidades")
    t.add_column("#", justify="right"); t.add_column("Entidade"); t.add_column("Type"); t.add_column("Degree", justify="right")
    for i, (n, d) in enumerate(rows, 1):
        data = g.nodes[n]
        t.add_row(str(i), str(data.get("entity_id", n)), str(data.get("entity_type", "?")), str(d))
    console.print(t)


async def cmd_find(args):
    import networkx as nx
    g_path = config.STORAGE_DIR / "graph_chunk_entity_relation.graphml"
    if not g_path.exists():
        console.print("[red]Grafo não encontrado.[/red]")
        return
    g = nx.read_graphml(g_path)
    needle = args.term.lower()
    matches = []
    for n, data in g.nodes(data=True):
        name = str(data.get("entity_id", n))
        if needle in name.lower():
            matches.append((name, str(data.get("entity_type", "?")), g.degree(n)))
    matches.sort(key=lambda x: -x[2])
    if args.json:
        print(json.dumps([{"entity": m[0], "type": m[1], "degree": m[2]} for m in matches], ensure_ascii=False))
        return
    if not matches:
        console.print(f"[yellow]Nenhuma entidade encontrada com \"{args.term}\".[/yellow]"); return
    t = Table(title=f"Match \"{args.term}\" ({len(matches)})")
    t.add_column("Entidade"); t.add_column("Type"); t.add_column("Degree", justify="right")
    for m in matches[:50]:
        t.add_row(*[str(x) for x in m])
    console.print(t)


async def cmd_show(args):
    import networkx as nx
    g_path = config.STORAGE_DIR / "graph_chunk_entity_relation.graphml"
    if not g_path.exists():
        console.print("[red]Grafo não encontrado.[/red]"); return
    g = nx.read_graphml(g_path)
    target = None
    for n, data in g.nodes(data=True):
        if str(data.get("entity_id", n)).lower() == args.term.lower():
            target = (n, data); break
    if not target:
        console.print(f"[yellow]Entidade \"{args.term}\" não encontrada (use `rag find`).[/yellow]"); return
    n, data = target
    name = data.get("entity_id", n)
    out = {
        "entity": name,
        "type": data.get("entity_type", "?"),
        "description": str(data.get("description", "")).split("<SEP>"),
        "neighbors": [],
    }
    for u, v, edata in g.edges(n, data=True):
        other = v if u == n else u
        other_name = g.nodes[other].get("entity_id", other)
        out["neighbors"].append({
            "entity": str(other_name),
            "description": str(edata.get("description", "")).split("<SEP>")[0],
        })
    if args.json:
        print(json.dumps(out, ensure_ascii=False, indent=2)); return
    console.print(f"[bold cyan]{name}[/bold cyan] · [dim]{out['type']}[/dim] · degree {g.degree(n)}\n")
    if out["description"] and out["description"][0]:
        console.print("[bold]Description:[/bold]")
        for d in out["description"]:
            if d.strip():
                console.print(f"  • {d.strip()}")
        console.print()
    if out["neighbors"]:
        console.print("[bold]Neighbors:[/bold]")
        for nb in out["neighbors"][:50]:
            suffix = f" — {nb['description']}" if nb['description'] else ""
            console.print(f"  → {nb['entity']}{suffix}")


async def cmd_insert(args):
    res = await rag_mod.insert_text(args.term, source=args.source)
    if args.json:
        print(json.dumps(res, ensure_ascii=False))
    else:
        console.print(f"[green]✓ Inserido[/green] (source: {res['source']})")


async def cmd_index(args):
    from .index import run_index
    await run_index(full=args.full, dry_run=args.dry_run, incremental=not (args.full or args.dry_run))


async def cmd_export(args):
    from .to_obsidian import export
    export(clean=args.clean)


async def cmd_mcp_check(args):
    mcp_path = config.PROJECT_ROOT / ".mcp.json"
    checks = []
    if mcp_path.exists():
        try:
            data = json.loads(mcp_path.read_text())
            servers = data.get("mcpServers", {})
            if "lightrag" in servers:
                checks.append(("✓", ".mcp.json tem entry 'lightrag'"))
                entry = servers["lightrag"]
                args_list = entry.get("args", [])
                if any("tools/lightrag" in str(a) for a in args_list):
                    checks.append(("✓", "Aponta para tools/lightrag"))
                else:
                    checks.append(("✗", "Caminho não aponta para tools/lightrag"))
            else:
                checks.append(("✗", ".mcp.json NÃO tem entry 'lightrag'"))
        except Exception as e:
            checks.append(("✗", f"Erro ao ler .mcp.json: {e}"))
    else:
        checks.append(("✗", ".mcp.json não existe"))

    try:
        from . import server  # noqa: F401
        checks.append(("✓", "lightrag_kg.server importa OK"))
    except Exception as e:
        checks.append(("✗", f"Falha ao importar server: {e}"))

    g_path = config.STORAGE_DIR / "graph_chunk_entity_relation.graphml"
    if g_path.exists():
        checks.append(("✓", f"Grafo existe ({g_path.stat().st_size // 1024} KB)"))
    else:
        checks.append(("⚠", "Grafo ainda não foi gerado"))

    if args.json:
        print(json.dumps([{"status": s, "msg": m} for s, m in checks], ensure_ascii=False, indent=2)); return
    for status, msg in checks:
        color = {"✓": "green", "✗": "red", "⚠": "yellow"}.get(status, "white")
        console.print(f"[{color}]{status}[/{color}] {msg}")


async def cmd_shell(args):
    console.print("[bold cyan]rag shell[/bold cyan] — comandos: /local /global /chunks /stats /top /find /show /exit")
    while True:
        try:
            line = input("rag> ").strip()
        except (EOFError, KeyboardInterrupt):
            print(); break
        if not line: continue
        if line in ("/exit", "/quit"): break
        if line == "/stats":
            info = await rag_mod.stats()
            console.print(json.dumps(info, indent=2, ensure_ascii=False)); continue
        if line.startswith("/top"):
            parts = line.split()
            n = int(parts[1]) if len(parts) > 1 else 20
            class A: pass
            a = A(); a.n = n; a.json = False
            await cmd_top(a); continue
        if line.startswith("/find "):
            class A: pass
            a = A(); a.term = line[6:].strip(); a.json = False
            await cmd_find(a); continue
        if line.startswith("/show "):
            class A: pass
            a = A(); a.term = line[6:].strip(); a.json = False
            await cmd_show(a); continue
        mode = "hybrid"
        term = line
        m = re.match(r"^/(local|global|chunks)\s+(.+)$", line)
        if m:
            cmd, term = m.group(1), m.group(2)
            mode = {"chunks": "naive"}.get(cmd, cmd)
        try:
            ans = await rag_mod.query(term, mode=mode)
            console.print(Markdown(ans))
        except Exception as e:
            console.print(f"[red]ERRO: {e}[/red]")


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="rag", description="LightRAG CLI — knowledge graph do projeto")
    p.add_argument("--json", action="store_true", help="output machine-readable")
    sub = p.add_subparsers(dest="cmd", required=True)

    for name, mode in [("search", "hybrid"), ("ask", "hybrid"),
                        ("chunks", "naive"), ("local", "local"), ("global", "global")]:
        sp = sub.add_parser(name, help=f"query mode={mode}")
        sp.add_argument("term", nargs="+")
        sp.set_defaults(func=cmd_search, mode=mode)

    sub.add_parser("stats", help="contagem do grafo").set_defaults(func=cmd_stats)

    sp = sub.add_parser("top", help="top-N entidades por degree")
    sp.add_argument("n", nargs="?", type=int, default=20)
    sp.set_defaults(func=cmd_top)

    sp = sub.add_parser("find", help="procura entidade por substring")
    sp.add_argument("term", nargs="+"); sp.set_defaults(func=cmd_find)

    sp = sub.add_parser("show", help="mostra entidade + vizinhos")
    sp.add_argument("term", nargs="+"); sp.set_defaults(func=cmd_show)

    sp = sub.add_parser("insert", help="insere texto ad-hoc")
    sp.add_argument("term", nargs="+")
    sp.add_argument("--source", default="ad-hoc")
    sp.set_defaults(func=cmd_insert)

    sp = sub.add_parser("index", help="indexa repo")
    sp.add_argument("--full", action="store_true")
    sp.add_argument("--dry-run", action="store_true")
    sp.add_argument("--incremental", action="store_true")
    sp.set_defaults(func=cmd_index)

    sp = sub.add_parser("export", help="exporta para Obsidian")
    sp.add_argument("--clean", action="store_true")
    sp.set_defaults(func=cmd_export)

    sub.add_parser("mcp-check", help="valida .mcp.json + grafo").set_defaults(func=cmd_mcp_check)
    sub.add_parser("shell", help="REPL interativo").set_defaults(func=cmd_shell)

    return p


def main():
    p = build_parser()
    args = p.parse_args()
    if hasattr(args, "term") and isinstance(args.term, list):
        args.term = " ".join(args.term)
    asyncio.run(args.func(args))


if __name__ == "__main__":
    main()
