#!/bin/bash
# Download Fraunces and Caveat fonts from GitHub raw content
# Run from repo root: bash design/fonts/fetch-missing.sh

GF_BASE="https://github.com/google/fonts/raw/main/ofl"

echo "Fetching Fraunces..."
curl -L "$GF_BASE/fraunces/Fraunces%5BOPSZ%2CSOFT%2Cwght%5D.ttf" -o "design/fonts/fraunces/Fraunces[OPSZ,SOFT,wght].ttf" && echo "✓ Fraunces[OPSZ,SOFT,wght].ttf" || echo "✗ Failed"
curl -L "$GF_BASE/fraunces/Fraunces-Italic%5BOPSZ%2CSOFT%2Cwght%5D.ttf" -o "design/fonts/fraunces/Fraunces-Italic[OPSZ,SOFT,wght].ttf" && echo "✓ Fraunces-Italic[OPSZ,SOFT,wght].ttf" || echo "✗ Failed"

echo "Fetching Caveat..."
curl -L "$GF_BASE/caveat/Caveat-VariableFont_wght.ttf" -o "design/fonts/caveat/Caveat[wght].ttf" && echo "✓ Caveat[wght].ttf" || echo "✗ Failed"

echo "Done. Run: git add design/fonts && git commit --amend --no-edit && git push"
