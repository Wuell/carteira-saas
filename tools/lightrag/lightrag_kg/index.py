"""CLI kg-index — escaneia repo, gera batch e insere no LightRAG."""
from __future__ import annotations
import argparse
import asyncio
import hashlib
import json
import sys
from pathlib import Path
from rich.console import Console
from rich.table import Table

from . import config, rag as rag_mod

console = Console()


def _is_excluded(rel: Path) -> bool:
    parts = set(rel.parts)
    if parts & config.EXCLUDE_PARTS:
        return True
    if rel.suffix in config.EXCLUDE_SUFFIXES:
        return True
    s = rel.as_posix()
    for prefix in config.EXCLUDE_PATH_PREFIXES:
        if s.startswith(prefix):
            return True
    return False


def discover_files() -> list[Path]:
    root = config.PROJECT_ROOT
    seen: set[Path] = set()
    for pattern in config.INCLUDE_GLOBS:
        for p in root.glob(pattern):
            if not p.is_file():
                continue
            rel = p.relative_to(root)
            if _is_excluded(rel):
                continue
            seen.add(p)
    return sorted(seen)


def file_hash(p: Path) -> str:
    return hashlib.sha1(p.read_bytes()).hexdigest()[:16]


def doc_id(rel: str) -> str:
    return f"doc-{hashlib.sha1(rel.encode()).hexdigest()[:12]}"


def load_manifest() -> dict:
    if config.MANIFEST_PATH.exists():
        try:
            return json.loads(config.MANIFEST_PATH.read_text())
        except Exception:
            return {}
    return {}


def save_manifest(m: dict) -> None:
    config.MANIFEST_PATH.write_text(json.dumps(m, indent=2, sort_keys=True))


def lang_for(p: Path) -> str:
    return config.LANG_BY_EXT.get(p.suffix, "text")


def wrap_content(rel: str, lang: str, content: str) -> str:
    return f"FILE: {rel}\nLANG: {lang}\n---\n{content}"


async def run_index(full: bool, dry_run: bool, incremental: bool) -> int:
    files = discover_files()
    manifest = load_manifest() if not full else {}

    new_or_changed: list[Path] = []
    for p in files:
        rel = p.relative_to(config.PROJECT_ROOT).as_posix()
        h = file_hash(p)
        if manifest.get(rel) != h or full:
            new_or_changed.append(p)

    if dry_run:
        t = Table(title=f"kg-index plan ({'full' if full else 'incremental'})")
        t.add_column("Status"); t.add_column("Count", justify="right")
        t.add_row("Total descobertos", str(len(files)))
        t.add_row("A indexar", str(len(new_or_changed)))
        t.add_row("Inalterados", str(len(files) - len(new_or_changed)))
        console.print(t)
        sample = [p.relative_to(config.PROJECT_ROOT).as_posix() for p in new_or_changed[:10]]
        if sample:
            console.print("\n[dim]Amostra:[/dim]")
            for s in sample:
                console.print(f"  • {s}")
        return 0

    if not new_or_changed:
        console.print("[green]Nada novo para indexar.[/green]")
        return 0

    console.print(f"[cyan]Indexando {len(new_or_changed)} arquivos...[/cyan]")
    rag = await rag_mod.get_rag()

    BATCH = 20
    new_manifest = dict(manifest)
    for i in range(0, len(new_or_changed), BATCH):
        chunk = new_or_changed[i:i + BATCH]
        texts: list[str] = []
        ids: list[str] = []
        paths: list[str] = []
        for p in chunk:
            rel = p.relative_to(config.PROJECT_ROOT).as_posix()
            try:
                content = p.read_text(encoding="utf-8", errors="replace")
            except Exception as e:
                console.print(f"[yellow]Skip {rel}: {e}[/yellow]")
                continue
            if not content.strip():
                continue
            texts.append(wrap_content(rel, lang_for(p), content))
            ids.append(doc_id(rel))
            paths.append(rel)

        if not texts:
            continue

        try:
            await rag.ainsert(texts, ids=ids, file_paths=paths)
            for p in chunk:
                rel = p.relative_to(config.PROJECT_ROOT).as_posix()
                new_manifest[rel] = file_hash(p)
            save_manifest(new_manifest)
            console.print(f"[green]Batch {i // BATCH + 1}: +{len(texts)} docs[/green]")
        except Exception as e:
            console.print(f"[red]Batch falhou: {e}[/red]")

    console.print("[green]✓ Indexação concluída.[/green]")
    return 0


def main():
    p = argparse.ArgumentParser(prog="kg-index")
    p.add_argument("--full", action="store_true", help="reindexa tudo (ignora manifest)")
    p.add_argument("--dry-run", action="store_true", help="só mostra o plano")
    p.add_argument("--incremental", action="store_true", help="default: só novos/modificados")
    args = p.parse_args()
    sys.exit(asyncio.run(run_index(args.full, args.dry_run, args.incremental)))


if __name__ == "__main__":
    main()
