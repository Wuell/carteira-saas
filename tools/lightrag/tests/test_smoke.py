"""Smoke tests — só verifica que módulos importam."""
import importlib


def test_imports():
    for mod in ["lightrag_kg", "lightrag_kg.config", "lightrag_kg.llm",
                "lightrag_kg.rag", "lightrag_kg.index", "lightrag_kg.server",
                "lightrag_kg.to_obsidian", "lightrag_kg.cli"]:
        importlib.import_module(mod)
