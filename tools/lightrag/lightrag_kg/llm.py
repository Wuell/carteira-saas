"""Wrappers de LLM e embedding para o Gemini, com retry e fallback de modelo."""
from __future__ import annotations
import asyncio
import numpy as np
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from google import genai
from google.genai import types as gtypes

from . import config

_client: genai.Client | None = None
_llm_model: str = config.LLM_MODEL_PRIMARY
_embed_model: str = config.EMBED_MODEL_PRIMARY
_llm_fallback_used = False
_embed_fallback_used = False


def _get_client() -> genai.Client:
    global _client
    if _client is None:
        if not config.GOOGLE_API_KEY:
            raise RuntimeError("GOOGLE_API_KEY ausente — adicione ao .env.local")
        _client = genai.Client(api_key=config.GOOGLE_API_KEY)
    return _client


class TransientError(Exception):
    pass


def _is_transient(e: BaseException) -> bool:
    msg = str(e).lower()
    return any(x in msg for x in ("429", "500", "503", "504", "unavailable", "deadline", "rate"))


@retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=1.5, min=2, max=30),
    retry=retry_if_exception_type(TransientError),
    reraise=True,
)
async def _llm_call(model: str, prompt: str, system_prompt: str | None, history: list | None) -> str:
    client = _get_client()
    contents: list = []
    if history:
        for h in history:
            role = "user" if h.get("role") == "user" else "model"
            contents.append(gtypes.Content(role=role, parts=[gtypes.Part.from_text(text=h.get("content", ""))]))
    contents.append(gtypes.Content(role="user", parts=[gtypes.Part.from_text(text=prompt)]))

    cfg_kwargs = {}
    if system_prompt:
        cfg_kwargs["system_instruction"] = system_prompt

    try:
        resp = await asyncio.to_thread(
            client.models.generate_content,
            model=model,
            contents=contents,
            config=gtypes.GenerateContentConfig(**cfg_kwargs) if cfg_kwargs else None,
        )
        return resp.text or ""
    except Exception as e:
        if _is_transient(e):
            raise TransientError(str(e)) from e
        raise


async def llm_func(
    prompt: str,
    system_prompt: str | None = None,
    history_messages: list | None = None,
    keyword_extraction: bool = False,
    **kwargs,
) -> str:
    """Função LLM consumida pelo LightRAG."""
    global _llm_model, _llm_fallback_used
    try:
        return await _llm_call(_llm_model, prompt, system_prompt, history_messages)
    except Exception as e:
        if not _llm_fallback_used and "404" in str(e):
            _llm_fallback_used = True
            _llm_model = config.LLM_MODEL_FALLBACK
            return await _llm_call(_llm_model, prompt, system_prompt, history_messages)
        raise


@retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=1.5, min=2, max=30),
    retry=retry_if_exception_type(TransientError),
    reraise=True,
)
async def _embed_call(model: str, texts: list[str]) -> np.ndarray:
    client = _get_client()
    try:
        resp = await asyncio.to_thread(
            client.models.embed_content,
            model=model,
            contents=texts,
            config=gtypes.EmbedContentConfig(output_dimensionality=config.EMBED_DIM),
        )
        vectors = [e.values for e in resp.embeddings]
        return np.array(vectors, dtype=np.float32)
    except Exception as e:
        if _is_transient(e):
            raise TransientError(str(e)) from e
        raise


async def embed_func(texts: list[str]) -> np.ndarray:
    global _embed_model, _embed_fallback_used
    try:
        return await _embed_call(_embed_model, texts)
    except Exception as e:
        if not _embed_fallback_used and "404" in str(e):
            _embed_fallback_used = True
            _embed_model = config.EMBED_MODEL_FALLBACK
            return await _embed_call(_embed_model, texts)
        raise


def resolved_models() -> dict:
    return {"llm": _llm_model, "embedding": _embed_model, "embed_dim": config.EMBED_DIM}
