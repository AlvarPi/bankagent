#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

NODE_BIN="${NODE_BIN:-$(command -v node)}"
LOG_DIR="$ROOT/logs"
LOG_FILE="$LOG_DIR/banks-preview.log"

# systemd-i all pole login-shelli: HOME on vaja ~/.gitconfig-i (Origini
# credential-helper) jaoks ja ~/.local/bin origin-binaari jaoks.
export HOME="${HOME:-/home/agent}"
export PATH="$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

mkdir -p "$LOG_DIR"

# Commiti skanni tulemus ja pushi (origin = Cursor Origin + GitHubi peegel).
# Ainult static/banks — kasutaja pooleliolevaid muudatusi mujal ei puutu.
sync_git() {
  if [ -z "$(git status --porcelain -- static/banks)" ]; then
    echo "git: static/banks muudatusteta — commit vahele jäetud"
    return 0
  fi

  git add -A -- static/banks

  local files subst body
  files="$(git diff --cached --name-only -- static/banks | wc -l)"
  # Sisuline muutus = diffis on rida, mis pole pelk ajatempel.
  # NB: mitte `grep -q` — pipefail + SIGPIPE annaks alati "ainult ajatemplid".
  subst="$(git diff --cached --name-only -- static/banks | while read -r f; do
    real="$(git diff --cached -U0 -- "$f" | grep -E '^[-+]' \
      | grep -vE '^(\+\+\+|---)' \
      | grep -vE '"(fetchedAt|generatedAt)"|Uuendatud: ' || true)"
    if [ -n "$real" ]; then printf '  - %s\n' "$f"; fi
  done)"

  if [ -n "$subst" ]; then
    body="Sisulised muutused (mitte ainult ajatemplid):"$'\n'"$subst"
  else
    body="Ainult fetchedAt/generatedAt ajatemplid — sisu ei muutunud."
  fi

  git commit -q \
    -m "Pangaandmed: automaatne skann $(date +%F)" \
    -m "$files faili muutunud. $body" \
    -- static/banks
  echo "git: commit $(git rev-parse --short HEAD)"

  # -v näitab logis mõlemat push-sihtkohta (Origin ja GitHub) eraldi
  if git push -v origin HEAD; then
    echo "git: push OK (Origin + GitHubi peegel)"
  else
    echo "git: HOIATUS — push ebaõnnestus, commit jäi lokaalseks ($(git rev-parse --short HEAD)); pushi käsitsi"
  fi
}

{
  echo "=== $(date -Is) scheduled refresh ==="
  "$NODE_BIN" scripts/generate-bank-previews.js
  echo "=== $(date -Is) refresh done ==="
  # Git-sünk ei tohi skanni ebaõnnestunuks lugeda — andmed on kettal juba LIVE.
  sync_git || echo "git: HOIATUS — sünkroniseerimine kukkus (vt viga ülal)"
  echo "=== $(date -Is) git sync done ==="
} >>"$LOG_FILE" 2>&1
