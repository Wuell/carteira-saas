"""Exporta knowledge graph para vault Obsidian — entidades + relações + comunidades."""
from __future__ import annotations
import argparse
import re
import shutil
import sys
from collections import defaultdict
from pathlib import Path

import networkx as nx
from networkx.algorithms.community import louvain_communities
from rich.console import Console

from . import config

console = Console()
SEP = "<SEP>"


def slugify(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"[/\\]", "-", text)
    text = re.sub(r"[^a-z0-9\s_-]", "", text)
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-_")
    return text[:180] if text else "unknown"


def split_field(value) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        items = value
    else:
        items = str(value).split(SEP)
    return [s.strip() for s in items if s and str(s).strip()]


def get_attr(node_data: dict, key: str, default: str = "") -> str:
    return str(node_data.get(key, default) or default).strip()


def export(clean: bool) -> int:
    graph_path = config.STORAGE_DIR / "graph_chunk_entity_relation.graphml"
    if not graph_path.exists():
        console.print("[red]Grafo não encontrado. Rode `rag index --full` primeiro.[/red]")
        return 1

    vault = config.VAULT_DIR
    if clean and vault.exists():
        for sub in ("entities", "communities"):
            d = vault / sub
            if d.exists():
                shutil.rmtree(d)
        for f in vault.glob("*.md"):
            f.unlink()

    (vault / "entities").mkdir(parents=True, exist_ok=True)
    (vault / "communities").mkdir(parents=True, exist_ok=True)

    g = nx.read_graphml(graph_path)
    console.print(f"[cyan]Grafo: {g.number_of_nodes()} nós, {g.number_of_edges()} arestas[/cyan]")

    name_to_slug: dict[str, str] = {}
    for node, data in g.nodes(data=True):
        name = get_attr(data, "entity_id", str(node)) or str(node)
        name_to_slug[name] = slugify(name)

    # Comunidades
    ug = g.to_undirected()
    try:
        communities = louvain_communities(ug, seed=42)
    except Exception as e:
        console.print(f"[yellow]Louvain falhou: {e}. Usando componentes conexos.[/yellow]")
        communities = list(nx.connected_components(ug))

    node_to_community: dict[str, int] = {}
    for idx, comm in enumerate(communities):
        for node in comm:
            node_to_community[node] = idx

    # Top entities (por degree)
    degree_sorted = sorted(g.degree(), key=lambda x: x[1], reverse=True)

    # Adjacência por nó
    neighbors: dict[str, list[tuple[str, dict]]] = defaultdict(list)
    for u, v, data in g.edges(data=True):
        neighbors[u].append((v, data))
        neighbors[v].append((u, data))

    # Notas de entidade
    for node, data in g.nodes(data=True):
        name = get_attr(data, "entity_id", str(node)) or str(node)
        slug = name_to_slug[name]
        etype = get_attr(data, "entity_type", "unknown")
        desc = get_attr(data, "description", "")
        source_id = get_attr(data, "source_id", "")
        file_path = get_attr(data, "file_path", "")
        comm_id = node_to_community.get(node, -1)

        appears_in = split_field(file_path) or split_field(source_id)
        descs = split_field(desc)

        lines = [
            "---",
            f"entity: \"{name}\"",
            f"entity_type: {etype}",
            f"community: {comm_id}",
            f"degree: {g.degree(node)}",
            "---",
            "",
            f"# {name}",
            "",
            f"**Type:** {etype}  ",
            f"**Community:** [[community-{comm_id}]]  ",
            f"**Degree:** {g.degree(node)}",
            "",
        ]
        if descs:
            lines.append("## Description")
            lines.append("")
            for d in descs:
                lines.append(f"- {d}")
            lines.append("")

        if neighbors[node]:
            lines.append("## Related")
            lines.append("")
            for other, edata in neighbors[node][:50]:
                other_name = get_attr(g.nodes[other], "entity_id", str(other)) or str(other)
                other_slug = name_to_slug.get(other_name, slugify(other_name))
                edge_desc = split_field(edata.get("description", ""))
                first = edge_desc[0] if edge_desc else ""
                suffix = f" — {first}" if first else ""
                lines.append(f"- [[entities/{other_slug}|{other_name}]]{suffix}")
            lines.append("")

        if appears_in:
            lines.append("## Appears in")
            lines.append("")
            for src in appears_in[:30]:
                lines.append(f"- `{src}`")
            lines.append("")

        (vault / "entities" / f"{slug}.md").write_text("\n".join(lines))

    # Notas de comunidade
    community_members: dict[int, list[str]] = defaultdict(list)
    for node, idx in node_to_community.items():
        name = get_attr(g.nodes[node], "entity_id", str(node)) or str(node)
        community_members[idx].append(name)

    for idx, members in community_members.items():
        members_sorted = sorted(members, key=lambda n: g.degree(n), reverse=True)
        lines = [
            "---",
            f"community: {idx}",
            f"size: {len(members)}",
            "---",
            "",
            f"# Community {idx}",
            "",
            f"**Members:** {len(members)}",
            "",
            "## Top entities",
            "",
        ]
        for m in members_sorted[:50]:
            slug = name_to_slug.get(m, slugify(m))
            lines.append(f"- [[entities/{slug}|{m}]] (degree {g.degree(m)})")
        (vault / "communities" / f"community-{idx}.md").write_text("\n".join(lines))

    # INDEX
    idx_lines = [
        "# Knowledge Graph Index",
        "",
        f"**Entidades:** {g.number_of_nodes()}  ",
        f"**Relações:** {g.number_of_edges()}  ",
        f"**Comunidades:** {len(communities)}",
        "",
        "## Top 30 entidades (por degree)",
        "",
    ]
    for node, deg in degree_sorted[:30]:
        name = get_attr(g.nodes[node], "entity_id", str(node)) or str(node)
        slug = name_to_slug.get(name, slugify(name))
        idx_lines.append(f"- [[entities/{slug}|{name}]] — {deg}")
    idx_lines.append("")
    idx_lines.append("## Comunidades")
    idx_lines.append("")
    for i in sorted(community_members.keys(), key=lambda x: -len(community_members[x])):
        idx_lines.append(f"- [[communities/community-{i}]] — {len(community_members[i])} entidades")

    (vault / "INDEX.md").write_text("\n".join(idx_lines))

    console.print(f"[green]✓ Vault exportado em {vault}[/green]")
    return 0


def main():
    p = argparse.ArgumentParser(prog="kg-to-obsidian")
    p.add_argument("--clean", action="store_true", help="apaga vault antes de exportar")
    args = p.parse_args()
    sys.exit(export(args.clean))


if __name__ == "__main__":
    main()
