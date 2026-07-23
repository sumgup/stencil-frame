# Claude Code: Fetch Missing Fonts

Use this prompt in Claude Code to download Fraunces and Caveat fonts:

```
Repo: stencil-frame
Task: Download Fraunces and Caveat variable fonts from Google Fonts to design/fonts/
- Fraunces: Fetch Fraunces[OPSZ,SOFT,wght].ttf and Fraunces-Italic[OPSZ,SOFT,wght].ttf from https://github.com/google/fonts/raw/main/ofl/fraunces/
- Caveat: Fetch Caveat-VariableFont_wght.ttf (save as Caveat[wght].ttf) from https://github.com/google/fonts/raw/main/ofl/caveat/
Store in:
- design/fonts/fraunces/ (with OFL.txt already present)
- design/fonts/caveat/ (with OFL.txt already present)

Use curl or wget to download. Print download status for each file.
```

Or run the bash script:
```bash
bash design/fonts/fetch-missing.sh
```

Then commit:
```bash
git add design/fonts
git commit --amend --no-edit
git push
```
