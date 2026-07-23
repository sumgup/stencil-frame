#!/usr/bin/env python3
"""Download Fraunces (correct axis) and Caveat fonts from Google Fonts"""

import urllib.request
import os

fonts_to_fetch = [
    ("fraunces", "Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf", "Fraunces[SOFT,WONK,opsz,wght].ttf"),
    ("fraunces", "Fraunces-Italic%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf", "Fraunces-Italic[SOFT,WONK,opsz,wght].ttf"),
    ("caveat", "Caveat%5Bwght%5D.ttf", "Caveat[wght].ttf"),
]

GF_BASE = "https://raw.githubusercontent.com/google/fonts/main/ofl"

print("Fetching missing fonts...")

for family, remote_name, local_name in fonts_to_fetch:
    url = f"{GF_BASE}/{family}/{remote_name}"
    output_path = os.path.join("design/fonts", family, local_name)

    try:
        print(f"  {local_name}...", end=" ")
        urllib.request.urlretrieve(url, output_path)
        size_kb = os.path.getsize(output_path) / 1024
        print(f"OK ({size_kb:.1f}KB)")
    except Exception as e:
        print(f"FAIL ({e})")

print("\nVerifying folders...")
for family in ["fraunces", "caveat"]:
    fonts = [f for f in os.listdir(f"design/fonts/{family}") if f.endswith(".ttf")]
    ofl = os.path.exists(f"design/fonts/{family}/OFL.txt")
    status = "OK" if fonts and ofl else "MISSING"
    print(f"  {family}: {len(fonts)} font(s), OFL: {'yes' if ofl else 'no'} [{status}]")

print("\nNext: git add -A && git commit && git push")
