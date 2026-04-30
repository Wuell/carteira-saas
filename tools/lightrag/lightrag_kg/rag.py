"""Singleton LightRAG + helpers de query e stats."""
from __future__ import annotations
import asyncio
import json
from pathlib import Path
from lightrag import LightRAG, QueryParam
from lightrag.utils import EmbeddingFunc
from lightrag.kg.shared_storage import initialize_pipeline_status

from . import config, llm

_rag: LightRAG | None = None
_lock = asyncio.Lock()


async def get_rag() -> LightRAG:
    global _rag
    async with _lock:
        if _rag is not None:
            return _rag

        embed = EmbeddingFunc(
            embedding_dim=config.EMBED_DIM,
            max_token_size=8192,
            func=llm.embed_func,
        )

        rag = LightRAG(
            working_dir=str(config.STORAGE_DIR),
            llm_model_func=llm.llm_func,
            llm_model_name=config.LLM_MODEL_PRIMARY,
            llm_model_max_async=8,
            embedding_func=embed,
            embedding_batch_num=32,
            chunk_token_size=1200,
            chunk_overlap_token_size=100,
            max_parallel_insert=6,
        )

        await rag.initialize_storages()
        await initialize_pipeline_status()
        _rag = rag
        return rag


async def query(term: str, mode: str = "hybrid") -> str:
    rag = await get_rag()
    param = QueryParam(mode=mode)
    result = await rag.aquery(term, param=param)
    return result if isinstance(result, str) else str(result)


async def insert_text(text: str, source: str = "ad-hoc") -> dict:
    rag = await get_rag()
    wrapped = f"FILE: {source}\nLANG: text\n---\n{text}"
    await rag.ainsert([wrapped], ids=[f"adhoc-{source}"], file_paths=[source])
    return {"inserted": 1, "source": source}


async def stats() -> dict:
    """Conta entities/relations/chunks/docs do storage."""
    out: dict = {}
    storage = config.STORAGE_DIR

    for fname, key in [
        ("kv_store_full_docs.json", "documents"),
        ("kv_store_text_chunks.json", "chunks"),
        ("kv_store_doc_status.json", "doc_status"),
    ]:
        p = storage / fname
        if p.exists():
            try:
                data = json.loads(p.read_text())
                out[key] = len(data) if isinstance(data, dict) else 0
            except Exception:
                out[key] = 0
        else:
            out[key] = 0

    graph_path = storage / "graph_chunk_entity_relation.graphml"
    if graph_path.exists():
        try:
            import networkx as nx
            g = nx.read_graphml(graph_path)
            out["entities"] = g.number_of_nodes()
            out["relations"] = g.number_of_edges()
        except Exception as e:
            out["entities"] = 0
            out["relations"] = 0
            out["graph_error"] = str(e)
    else:
        out["entities"] = 0
        out["relations"] = 0

    out["models"] = llm.resolved_models()
    out["storage"] = str(storage)
    return out
