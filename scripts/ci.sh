#!/usr/bin/env bash
# Local CI: run before committing (Linux / macOS).
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> npm run lint"
npm run lint

echo "==> npm run build"
npm run build

echo "==> CI OK"
