#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

NODE_BIN="${NODE_BIN:-$HOME/.nvm/versions/node/v20.19.0/bin/node}"
LOG_DIR="$ROOT/logs"
LOG_FILE="$LOG_DIR/banks-preview-refresh.log"

mkdir -p "$LOG_DIR"

{
  echo "=== $(date -Is) banks preview refresh ==="
  "$NODE_BIN" scripts/generate-bank-previews.js
  echo "done"
} >>"$LOG_FILE" 2>&1
