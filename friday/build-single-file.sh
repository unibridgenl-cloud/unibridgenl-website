#!/usr/bin/env bash
# Build a standalone index.html with the voice clip inlined as a data URI.
#
# Cloudflare's drag-and-drop uploader takes HTML, CSS and JS only, so the mp3
# would be dropped and the boot greeting would 404. Inlining it means the whole
# dashboard is one file with no external references at all — which is also how
# it was specified in the first place.
#
# Usage:  ./friday/build-single-file.sh  →  dist/index.html
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="friday/index.html"
MP3="friday/assets/voice-sample.mp3"
OUT_DIR="dist"
OUT="$OUT_DIR/index.html"

mkdir -p "$OUT_DIR"
B64=$(base64 -w0 "$MP3")

python3 - "$SRC" "$OUT" "$B64" <<'PY'
import sys
src, out, b64 = sys.argv[1], sys.argv[2], sys.argv[3]
html = open(src).read()
needle = "sampleClip: 'assets/voice-sample.mp3',"
if needle not in html:
    raise SystemExit('sampleClip line not found — did index.html change?')
html = html.replace(needle, "sampleClip: 'data:audio/mpeg;base64," + b64 + "',")
open(out, 'w').write(html)
print(f'wrote {out} ({len(html)/1024:.0f} KB, audio inlined)')
PY
