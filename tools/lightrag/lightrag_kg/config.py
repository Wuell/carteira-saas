"""Configuração central — paths, modelos, padrões de include/exclude."""
from __future__ import annotations
import os
from pathlib import Path
from dotenv import load_dotenv

PKG_DIR = Path(__file__).resolve().parent
TOOLS_DIR = PKG_DIR.parent
PROJECT_ROOT = TOOLS_DIR.parent.parent

# Carrega .env.local da raiz do projeto + .env do pacote (fallback)
load_dotenv(PROJECT_ROOT / ".env.local")
load_dotenv(PROJECT_ROOT / ".env")
load_dotenv(TOOLS_DIR / ".env")

# Storage
STORAGE_DIR = TOOLS_DIR / "rag_storage"
MANIFEST_PATH = TOOLS_DIR / ".index_manifest.json"
VAULT_DIR = PROJECT_ROOT / "docs" / "knowledge-graph"

# Modelos (com fallbacks)
LLM_MODEL_PRIMARY = os.getenv("LIGHTRAG_LLM_MODEL", "gemini-2.5-flash")
LLM_MODEL_FALLBACK = "gemini-1.5-flash"
EMBED_MODEL_PRIMARY = os.getenv("LIGHTRAG_EMBED_MODEL", "gemini-embedding-001")
EMBED_MODEL_FALLBACK = "text-embedding-004"
EMBED_DIM = 768

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")

# Include/exclude (Next.js + Prisma stack)
INCLUDE_GLOBS = [
    "app/**/*.ts", "app/**/*.tsx",
    "components/**/*.ts", "components/**/*.tsx",
    "lib/**/*.ts", "lib/**/*.tsx",
    "src/**/*.ts", "src/**/*.tsx",
    "pages/**/*.ts", "pages/**/*.tsx",
    "prisma/schema.prisma",
    "*.md",
    "docs/**/*.md",
    "package.json",
    "tsconfig.json",
    "next.config.*",
    "tailwind.config.*",
    "postcss.config.*",
]

EXCLUDE_PARTS = {
    "node_modules", ".next", "dist", "build", ".git", "target",
    "__pycache__", ".venv", "tests", "__tests__", "_generated",
    ".turbo", ".vercel", "coverage",
}
EXCLUDE_SUFFIXES = {".lock", ".tsbuildinfo", ".log", ".map"}
EXCLUDE_PATH_PREFIXES = (
    "tools/lightrag/",
    "docs/knowledge-graph/",
)

LANG_BY_EXT = {
    ".ts": "typescript", ".tsx": "tsx",
    ".js": "javascript", ".jsx": "jsx",
    ".py": "python",
    ".md": "markdown",
    ".prisma": "prisma",
    ".json": "json",
    ".sql": "sql",
    ".css": "css",
    ".sh": "bash",
}

STORAGE_DIR.mkdir(parents=True, exist_ok=True)
VAULT_DIR.mkdir(parents=True, exist_ok=True)
