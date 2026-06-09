# Stencil + Frame — Investigate Step

## Schema Design (Step 2)

_Completed: May 2026_

---

## brand.md — Investigate Section

```yaml
investigate:

  # Act 0 — Who are you?
  identity:
    values:                 # List of what the brand believes. Plain language.
      - string
    purpose: string         # Who it is really for and what they deserve. Single statement.
    one_liner: string       # What it does. One sentence. No industry words.

  # Act 1 — Warm up
  research_raw:
    facts:                  # Discrete statements about the brand and market.
      - string
    obstacles:              # Each obstacle named separately.
      - string
    opportunities:          # Each opportunity named separately.
      - string

  # Act 2 — The Gap Map
  market:
    competitors:            # Shared across all gap map variations.
      - name: string        # Brand name.
        descriptor: string  # One-line plain description.
        colour: string      # Dominant hex colour from their website.
        position:
          x: string         # Plain label on horizontal axis.
          y: string         # Plain label on vertical axis.

    gap_maps:               # Multiple axis variations. One primary at any time.
      - id: integer
        axes:
          x:
            left: string    # Left end of horizontal axis.
            right: string   # Right end of horizontal axis.
          y:
            bottom: string  # Bottom end of vertical axis.
            top: string     # Top end of vertical axis.
        gap: string         # One plain sentence naming the empty space.
        primary: boolean    # Only one true allowed at any time.

  # Act 3 — Confirm
  synthesis:
    gap_identity_connection: string   # Why this brand belongs in this gap.

```

---

## Rules

- Only one `gap_maps` entry may have `primary: true` at any time. Promoting a secondary automatically demotes the previous primary.
- `position.x` and `position.y` store plain descriptive labels, not pixel coordinates. The UI layer (Step 4) converts these to canvas coordinates.
- `competitors` is shared across all gap map variations. The same brands are plotted differently depending on which axes are selected.
- The Investigate section is additive. Later steps append their own sections to `brand.md`. This section is never overwritten.
- `research_raw` is scaffolding made permanent. It fed Act 2 and now serves as a record of original thinking.
- `values` is a list — a brand rarely has just one value.
- `purpose` stays a single statement — purpose is one clear north star.

---

## Stencil + Frame — Live Example

```yaml
investigate:

  identity:
    values:
      - "Brand is identity first, market mechanics second."
      - "Honest tools for honest builders."
      - "The why we are here question is never optional."
    purpose: "For solo founders and small brands who deserve a
              coherent identity from day one — not after they
              can afford an agency."
    one_liner: "DIY branding for people starting fresh."

  research_raw:
    facts:
      - "Most branding tools are visual factories or voice engines."
      - "No tool starts at the beginning with the founder."
      - "Solo founders cannot afford branding agencies."
      - "Impostor syndrome is acute at brand launch."
    obstacles:
      - "Users don't know what they don't know about branding."
      - "Impostor syndrome stops people before they start."
      - "Professional branding feels expensive and out of reach."
    opportunities:
      - "No tool combines strategic methodology with AI co-thinking."
      - "Pain is acute at day one — perfect timing for Stencil."
      - "Killing impostor syndrome is an emotional hook, not just functional."

  market:
    competitors:
      - name: Canva
        descriptor: "Design platform for non-designers."
        colour: "#00C4CC"
        position:
          x: visual
          y: assumes_brand_exists
      - name: Looka
        descriptor: "AI logo maker and brand kit."
        colour: "#FF6B6B"
        position:
          x: visual
          y: assumes_brand_exists
      - name: Jasper
        descriptor: "AI writing tool with brand voice settings."
        colour: "#FF6B35"
        position:
          x: strategic
          y: assumes_brand_exists
      - name: Copy.ai
        descriptor: "AI content generator with brand voice."
        colour: "#6B4FBB"
        position:
          x: strategic
          y: assumes_brand_exists
      - name: Tailor Brands
        descriptor: "All-in-one AI branding and business platform."
        colour: "#2D6CDF"
        position:
          x: visual
          y: assumes_brand_exists
      - name: Standards
        descriptor: "Online brand guidelines builder."
        colour: "#1A1A1A"
        position:
          x: strategic
          y: assumes_brand_exists

    gap_maps:
      - id: 1
        axes:
          x:
            left: "visual execution"
            right: "strategic thinking"
          y:
            bottom: "assumes brand exists"
            top: "builds from scratch"
        gap: "The only tool that helps you think before you build."
        primary: true

      - id: 2
        axes:
          x:
            left: "DIY"
            right: "agency-led"
          y:
            bottom: "cheap"
            top: "premium"
        gap: "Affordable strategic thinking for solo founders."
        primary: false

      - id: 3
        axes:
          x:
            left: "fast"
            right: "considered"
          y:
            bottom: "generic"
            top: "values-driven"
        gap: "The only considered, values-driven branding tool built for one."
        primary: false

  synthesis:
    gap_identity_connection: "Stencil + Frame belongs in this gap
      because it was built by someone who believes brand is identity
      first and market mechanics second. Every competitor executes.
      None of them start at the beginning with you."

```

---

## Field Summary

|Field|Type|Notes|
|---|---|---|
|`values`|list of strings|Multiple values allowed|
|`purpose`|string|Single north star statement|
|`one_liner`|string|Single sentence|
|`facts`|list of strings|Discrete statements|
|`obstacles`|list of strings|Each named separately|
|`opportunities`|list of strings|Each named separately|
|`competitors`|list of objects|Shared across all gap maps|
|`gap_maps`|list of objects|Multiple variations, one primary|
|`gap_identity_connection`|string|Single synthesis statement|