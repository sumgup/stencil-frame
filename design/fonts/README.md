# Design System Webfonts

Vendored font families for Stencil + Frame design system (v0.2 Typography). All licenses are open (OFL / Mona Sans license).

## Font Roles (from DESIGN.md Typography v2)

### Mona Sans — Workhorse
- **Job**: Primary typography for body text, secondary hierarchy, and condensed display duty
- **Variants**: Variable (wdth 75 / wght 900 uppercase for condensed display)
- **Usage**: Body copy, labels, UI text, secondary heads
- **License**: GitHub Mona Sans License (see LICENSE file)

### DM Mono — Technical Layer
- **Job**: Data, code, metadata, system labels, technical UI
- **Variants**: Light, Regular, Medium + italics
- **Usage**: Code blocks, data tables, system UI, metadata
- **License**: OFL (SIL Open Font License)

### Fraunces — Reveal Moments Only
- **Job**: Leashed to reveal-line moments only (emotional peaks, discovery beats)
- **Variants**: Variable (SOFT, opsz, wght axes); roman + italic
- **Constraint**: SOFT 0 in glare register (no italic quirks during peak emotional beats)
- **Usage**: Very rare; punctuation and reveal moments only
- **License**: OFL

### Anton — Digital Stand-In for Hand-Made Display
- **Job**: Signature moments and headlines until hand-made type assets exist
- **Variants**: Anton-Regular.ttf
- **Lineage**: Condensed, geometric, architectural (Scher register)
- **Constraint**: Temporary. Will be replaced by Sumit's hand-made typography.
- **Usage**: Hero headlines, brand marks
- **License**: OFL

### Caveat — Placeholder (Do Not Use)
- **Job**: PLACEHOLDER ONLY for Sumit's real handwriting
- **Status**: To be replaced. Do not use this font in production.
- **Real marginalia**: Sumit's real handwriting rendered as one-off SVGs per session (see skills/copy-engine/register-marginalia.md)
- **License**: OFL

---

## Setup

All font files are vendored with their licenses in per-family folders:
- `mona-sans/` — Mona Sans variable font + LICENSE
- `dm-mono/` — DM Mono variants + OFL.txt
- `fraunces/` — Fraunces variable + OFL.txt
- `anton/` — Anton-Regular + OFL.txt
- `caveat/` — Caveat variable + OFL.txt (placeholder)

To fetch the actual font files from upstream:
```powershell
powershell -ExecutionPolicy Bypass -File design/fonts/fetch-fonts.ps1
```

Or manually download from:
- **Mona Sans**: https://github.com/github/mona-sans
- **Google Fonts (DM Mono, Fraunces, Anton, Caveat)**: https://github.com/google/fonts/tree/main/ofl/

---

## References

- Full typography specification: `DESIGN.md` §4 (Typography v2)
- Marginalia execution: `skills/copy-engine/register-marginalia.md`
- Art direction process: `skills/art-directing-web/SKILL.md`

