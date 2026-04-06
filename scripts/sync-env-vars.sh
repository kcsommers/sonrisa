#!/usr/bin/env bash
# Pull env vars from Vercel into local package env files.
# Requires: Vercel CLI (`npm i -g vercel`), `vercel login`, and `vercel link`
# in the repo root or in packages/sonrisa-client (wherever your project is linked).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

target="${1:-development}"
case "$target" in
  development)
    vercel_env="development"
    out_name=".env.development.local"
    ;;
  production)
    vercel_env="production"
    out_name=".env.production.local"
    ;;
  *)
    echo "usage: $(basename "$0") [development|production]" >&2
    exit 1
    ;;
esac

if [[ -d "$ROOT/.vercel" ]]; then
  vercel_root="$ROOT"
elif [[ -d "$ROOT/packages/sonrisa-client/.vercel" ]]; then
  vercel_root="$ROOT/packages/sonrisa-client"
else
  echo "error: no .vercel project found. Run \`vercel link\` from the repo root or packages/sonrisa-client." >&2
  exit 1
fi

cd "$vercel_root"
npx vercel env pull .env.local --environment="$vercel_env" --yes

pulled="$vercel_root/.env.local"
client_out="$ROOT/packages/sonrisa-client/$out_name"
server_out="$ROOT/packages/sonrisa-server/$out_name"

cp "$pulled" "$client_out"
cp "$pulled" "$server_out"
rm "$pulled"

echo "Wrote $client_out and $server_out (from Vercel environment: $vercel_env)."
