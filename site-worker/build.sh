#!/usr/bin/env bash
# Copies ONLY the public site into dist/. Everything else in the repo
# (.claude, .company, friday, worker, config files) never reaches the edge.
set -euo pipefail
cd "$(dirname "$0")"
rm -rf dist && mkdir dist
SRC=..
for p in index.html ds-bundle.js styles.css robots.txt sitemap.xml \
         about apply assets book-a-call cancel contact find-my-field guide \
         my-list privacy scripts services terms tokens universities; do
  cp -R "$SRC/$p" dist/
done
cp _headers dist/_headers
# Guard rails: fail the build if anything internal slipped in.
for bad in .claude .company friday worker .git CNAME _config.yml site-worker; do
  if [ -e "dist/$bad" ]; then echo "refusing to deploy: $bad is in dist" >&2; exit 1; fi
done
if grep -rlE "unibridge\.nl([^a-z]|$)" dist --include=*.html --include=*.xml --include=*.txt >/dev/null 2>&1; then
  echo "refusing to deploy: wrong domain unibridge.nl found" >&2; exit 1
fi
echo "dist ready: $(find dist -type f | wc -l) files"
