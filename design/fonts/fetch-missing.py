#!/usr/bin/env python3
"""Download missing Fraunces and Caveat fonts from Google Fonts"""

import urllib.request
import os
import sys

GF_BASE = "https://github.com/google/fonts/raw/main/ofl"

fonts_to_fetch = [
    ("fraunces", "Fraunces%5BOPSZ%2CSOFT%2Cwght%5D.ttf", "Fraunces[OPSZ,SOFT,wght].ttf"),
    ("fraunces", "Fraunces-Italic%5BOPSZ%2CSOFT%2Cwght%5D.ttf", "Fraunces-Italic[OPSZ,SOFT,wght].ttf"),
    ("caveat", "Caveat-VariableFont_wght.ttf", "Caveat[wght].ttf"),
]

def download_file(url, output_path):
    """Download a file from URL to output_path"""
    try:
        print(f"Downloading {url}...", end=" ")
        urllib.request.urlretrieve(url, output_path)
        file_size = os.path.getsize(output_path) / 1024
        print(f"OK ({file_size:.1f}KB)")
        return True
    except Exception as e:
        print(f"FAIL ({str(e)})")
        return False

def main():
    base_dir = "design/fonts"
    success_count = 0

    for family, remote_name, local_name in fonts_to_fetch:
        url = f"{GF_BASE}/{family}/{remote_name}"
        output_path = os.path.join(base_dir, family, local_name)

        # Create directory if needed
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        if download_file(url, output_path):
            success_count += 1

    print(f"\nDownloaded {success_count}/{len(fonts_to_fetch)} fonts")

    if success_count == len(fonts_to_fetch):
        print("\nNext: git add design/fonts && git commit --amend --no-edit && git push")

    return 0 if success_count == len(fonts_to_fetch) else 1

if __name__ == "__main__":
    sys.exit(main())
