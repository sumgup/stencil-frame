# penpot/

Place for anything related to Penpot design work that should live in version
control — exported assets, design token exports, notes on file/project
organization inside Penpot, links to shared Penpot files, etc.

This folder does **not** contain Penpot's runtime data. That lives in
`docker/data/` (gitignored) and is managed by the scripts in `scripts/`.
See `design/PENPOT_SETUP.md` for the full setup, backup, and restore guide.

## How Penpot fits into this repo

Penpot is the visual design tool for this project — where carousels,
mockups, and components actually get drawn, in the same role Figma would
otherwise play. It runs locally in Docker and is **not** part of the
generation pipeline: Frame reads `brand.md` and prompt templates, never
Penpot files directly.

The split:

- **`brand.md` / `design/tokens.json` / `design/*.md`** — versioned, portable
  source of truth. Written specs and tokens that Frame's prompts are built
  from. These stay text/JSON so they diff cleanly in git.
- **Penpot (`localhost:9001`)** — the working canvas. Live, mutable design
  files stored in a local Postgres database (`docker/data/postgres/`, never
  committed — see below). This is where exploration and iteration happen.
- **`penpot/` (this folder)** — the bridge. When a Penpot frame reaches a
  state worth preserving in git history (a finished component, a reference
  mockup, an exported asset), export it from Penpot (PNG/SVG/PDF) and drop
  it here, or update `design/tokens.json` / `brand.md` by hand to reflect
  what changed.

## Why Penpot's actual design data isn't in git

Unlike a Figma file or a Sketch `.sketch` file, Penpot doesn't store a
project as one exportable document by default — everything (shapes,
components, history) lives inside the Postgres container's data directory.
That data:

- is **not human-diffable** (it's a database, not text)
- is **large and constantly changing** (bad fit for git, which assumes
  discrete, meaningful commits — not "every autosave"). Measured on this
  machine: an empty, freshly-signed-up instance is already ~34MB of real
  data before write-ahead-log churn, and it only grows from there as
  projects are added. Committing that wholesale would bloat `.git` fast
  and slow down every clone/fetch of the whole repo, code included.
- is fully reproducible from `docker/data/postgres/` on this machine —
  the disaster-recovery backup below covers *that*, not readability.

**Two separate safety nets, for two separate purposes:**

### 1. Full instance backup (disaster recovery, not a doc)

Run `scripts\backup-penpot.ps1` periodically (weekly, or before anything
risky like a Penpot version upgrade) — it zips `docker/data/postgres` and
`docker/data/assets` into `docker/backups/`. This is a full-instance
restore point, not readable, not diffable, not meant for git. It's
**gitignored on purpose**. Copy `docker/backups/*.zip` out to Dropbox or
an external drive periodically — Dropbox is already set up on this
machine, so `docker/backups/` could be pointed there directly if you want
that automatic. Ask if you want that wired up.

### 2. Per-file exports (the readable, versionable, importable doc)

Penpot has a real answer for "document I can read and re-import": each
file can be exported from the workspace or dashboard (download icon) in
two formats:

- **`.penpot`** — fast, binary, efficient, but opaque. Only openable in
  Penpot. Good for a quick personal backup, bad as a "doc."
- **`.zip` (standard format)** — SVG + JSON, the open format. Penpot's own
  docs call this out as enabling "automations and integrations." This is
  the one that's actually inspectable and meaningfully re-importable —
  use this for anything going into git.

Workflow: when a Penpot file/project reaches a state worth preserving,
export it as the `.zip` standard format and drop it in
`penpot/exports/<project-name>_<date>.zip`, commit it. To bring it back
(new machine, after a wipe, or just reviewing an old version), use
Penpot's **Import files** option from the projects menu and select the zip.

As of writing, export/import is a UI action (workspace or dashboard menu)
— Penpot's docs don't document a CLI/API path for this, so "periodic"
means a habit (do it when a design milestone lands), not a scheduled
script. Worth re-checking Penpot's docs occasionally in case that changes.

**If you skip both:** anything drawn purely in Penpot, never exported, and
the instance gets wiped without a `backup-penpot.ps1` run first — that
work is gone for good.
