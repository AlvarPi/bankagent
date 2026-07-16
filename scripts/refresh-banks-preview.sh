#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

NODE_BIN="${NODE_BIN:-$(command -v node)}"
LOG_DIR="$ROOT/logs"
LOG_FILE="$LOG_DIR/banks-preview.log"

mkdir -p "$LOG_DIR"

{
  echo "=== $(date -Is) scheduled refresh ==="
  "$NODE_BIN" scripts/generate-bank-previews.js
  echo "=== $(date -Is) refresh done ==="
} >>"$LOG_FILE" 2>&1
