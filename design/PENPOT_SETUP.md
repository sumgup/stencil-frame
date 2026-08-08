# Penpot local setup

A local, self-hosted Penpot instance for Stencil design work. Runs entirely
in Docker on your machine — no account, no cloud dependency, no cost.

## Why this approach

Penpot's own [self-hosting guide](https://help.penpot.app/technical-guide/getting-started/docker/)
recommends Docker Compose with the official all-in-one images as the
supported path for local/single-host installs (the alternative — Kubernetes —
is for multi-node production clusters and is overkill here). This setup uses
that official `docker-compose.yaml` almost unmodified, with one change:
named Docker volumes are replaced with **bind mounts** to `docker/data/` so
that backup is a plain file copy instead of a `docker run --volumes-from`
dance.

## Architecture

Seven containers, one Docker network (`penpot`):

| Service | Image | Role |
|---|---|---|
| `penpot-frontend` | `penpotapp/frontend` | Web UI, reverse-proxies to backend/exporter/mcp. The main port you talk to directly. |
| `penpot-backend` | `penpotapp/backend` | API, business logic, auth |
| `penpot-mcp` | `penpotapp/mcp` | Internal MCP service the frontend proxies to — not the client-facing endpoint (see MCP section below) |
| `penpot-exporter` | `penpotapp/exporter` | Renders PNG/SVG/PDF exports |
| `penpot-postgres` | `postgres:15` | All project/file/user data |
| `penpot-valkey` | `valkey/valkey:8.1` | Pub/sub for realtime collab + caching |
| `penpot-mailcatch` | `sj26/mailcatcher` | Catches signup/invite emails (no real SMTP needed locally) |
| `penpot-caddy` | `caddy:2` | HTTPS reverse proxy in front of the frontend, for tools that require an `https://` URL (see below) |

Data flow: browser → frontend (`:9001`) → backend/exporter/mcp over the
internal `penpot` network → Postgres (files, users) + filesystem assets
volume (images, uploaded SVGs).

## Ports

| Port | Service | Purpose |
|---|---|---|
| `9001` | frontend | Penpot web UI — **http://localhost:9001** — use this for normal browsing/design work |
| `9443` | caddy | HTTPS-wrapped access to the same frontend — **https://localhost:9443** — use this only when a tool requires HTTPS (e.g. Claude's MCP connector) |
| `1080` | mailcatch | View caught signup/invite emails in a browser |

No other ports are published to the host.

## Connecting Claude's MCP to Penpot

Penpot has its own MCP server, separate from the `penpot-mcp` Docker
container (that one's internal — the frontend proxies to it, you never
address it directly). Penpot documents two modes: **remote** (a hosted
server URL + `userToken`) and **local** (a separate npm-run process +
in-app plugin, no token, no OAuth surface at all).

### Remote mode — attempted, currently blocked by a Claude bug

We went through the full remote-mode path: enabled MCP in Penpot's
**Integrations** page, generated a key, hit an HTTPS-only requirement in
Claude's desktop connector, worked around it with a local Caddy HTTPS
proxy (`penpot-caddy`, port `9443`) and then `mkcert` for a properly
browser-trusted cert (confirmed working — no warnings), then worked around
Claude's apparent block on `localhost`/private-network targets with a
[cloudflared](https://github.com/cloudflare/cloudflared) quick tunnel for
a real public URL. Every step of that chain worked as designed — and it
still failed, with **"Couldn't register with \[name\]'s sign-in
service"**, reference IDs like `ofid_...`.

That error is a confirmed, open bug in Claude's connector, not anything
wrong with this setup: Claude's custom connector always probes for OAuth
discovery endpoints before connecting, and per multiple open issues on
[anthropics/claude-ai-mcp](https://github.com/anthropics/claude-ai-mcp)
(e.g. #457, #697, #402), it sometimes forces OAuth registration and fails
this way even against servers — like Penpot's — that implement no OAuth
at all and only expect a `userToken` query param. There is no OAuth
Client ID to enter to fix this; Penpot's MCP server isn't an OAuth
provider and has none to give you. `penpot-caddy`, `docker/certs/`, and
`scripts\start-mcp-tunnel.ps1` are left in the repo (they work correctly
for what they do) in case this Claude-side bug gets fixed and remote mode
becomes viable again — check
[the GitHub issues above](https://github.com/anthropics/claude-ai-mcp/issues/457)
for status before retrying.

### Local mode — the current working path, via Claude Code

Local MCP mode sidesteps the OAuth-probe bug entirely: no server URL for
Claude to run discovery against, no token, no remote endpoint. It's a
process you run locally that bridges Claude Code to a plugin running
inside your open Penpot tab.

**Note:** this only works with **Claude Code** (the CLI), not the desktop
app / Cowork connector UI that failed above — Claude Code reads MCP server
definitions from `.mcp.json` directly rather than going through that
connector dialog's OAuth-probing logic.

1. Confirm Node.js is installed: `node --version` (Penpot's docs mention
   testing with v22, v20 should also work).
2. With Penpot running (`scripts\start-penpot.bat`), start the local MCP
   process in its own terminal and leave it running:
   ```powershell
   npx @penpot/mcp@stable
   ```
3. In Penpot (`http://localhost:9001`), open a design file, then
   **Plugins → Load from URL** → `http://localhost:4400/manifest.json` →
   run the plugin → **Connect to MCP server**. Confirm it shows
   **Connected**, and keep that plugin window open.
4. This repo's `.mcp.json` already points at
   `${PENPOT_MCP_URL}` — set that env var to the local endpoint before
   starting Claude Code:
   ```powershell
   $env:PENPOT_MCP_URL = "http://localhost:4401/mcp"
   cd C:\Users\sumit\Documents\Claude\Projects\stencil-frame\stencil-frame
   claude
   ```
5. Inside Claude Code, check `/mcp` to confirm `penpot` shows as
   connected, then test with a read-only prompt: "list pages in this
   Penpot file."

Local MCP's tool set is narrower than remote mode's would have been
(`execute_code`, `high_level_overview`, `penpot_api_info`, `export_shape`,
`import_image`) but covers the core read/analyze/export workflows.

**Known friction:** some Chromium-based browsers block the connection
from `localhost:9001` to `localhost:4400` (blocks local-network access
from a page). If the plugin won't connect, either allow local network
access when prompted, or use Firefox for this specific step, per Penpot's
own docs.

## Folder layout

```
stencil-frame/
  docker/
    docker-compose.yml   # versioned — the stack definition
    .env.example          # versioned — template for secrets/version pin
    .env                  # gitignored — your real secret key, not committed
    data/
      postgres/           # gitignored — Postgres data directory (bind mount)
      assets/              # gitignored — uploaded images/SVGs (bind mount)
    backups/               # gitignored — zip backups land here
    certs/                  # gitignored — mkcert-issued localhost cert + key (not used by the working MCP path, kept for optional local HTTPS)
    Caddyfile               # versioned — local HTTPS proxy config (optional, not the MCP connector path — see above)
  scripts/
    start-penpot.ps1 / .bat
    stop-penpot.ps1 / .bat
    backup-penpot.ps1 / .bat
    restore-penpot.ps1 / .bat
    start-mcp-tunnel.ps1 / .bat   # Cloudflare tunnel for Claude's MCP connector
  penpot/
    README.md             # place for exported assets/notes, not runtime data
  design/
    PENPOT_SETUP.md        # this file
```

`docker/data/` and `docker/backups/` are gitignored (with `.gitkeep`
placeholders so the empty folders still exist after a fresh clone) — this is
runtime data and backups, not source. `docker/.env` is also gitignored
because it holds a real secret key; `docker/.env.example` is the versioned
template.

## First-time setup

1. Install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) if not already installed, and make sure it's running.
2. `docker/.env` was created for you with a freshly generated `PENPOT_SECRET_KEY`. If you ever need to regenerate it:
   ```powershell
   python3 -c "import secrets; print(secrets.token_urlsafe(64))"
   ```
   and paste the result into `docker/.env`.

## Startup

Double-click `scripts\start-penpot.bat`, or from PowerShell:

```powershell
scripts\start-penpot.ps1
```

This creates the `docker/data` folders if missing, runs
`docker compose up -d`, waits for the frontend to respond, and opens
`http://localhost:9001` in your default browser. First run pulls ~6 images
(a few minutes depending on connection); subsequent starts are seconds.

## Shutdown

```powershell
scripts\stop-penpot.ps1
```

Runs `docker compose down`. **This does not delete data** — Postgres and
assets live in `docker/data/` on disk, independent of the containers.

## Backup procedure

```powershell
scripts\backup-penpot.ps1
```

This stops the stack (for a consistent snapshot — Postgres shouldn't be
written to mid-copy), copies `docker/data/postgres` and `docker/data/assets`
into a timestamped zip under `docker/backups/`, then restarts the stack.
Copy `docker/backups/*.zip` files off-machine periodically (external drive,
cloud storage) — they are not committed to git.

## Restore procedure

```powershell
scripts\restore-penpot.ps1                          # restores the most recent backup
scripts\restore-penpot.ps1 -BackupFile "docker\backups\penpot-backup-2026-08-06_120000.zip"
```

This stops the stack, **replaces** `docker/data/postgres` and
`docker/data/assets` with the backup's contents, and restarts. You'll be
asked to type `YES` to confirm since this overwrites current data.

## Upgrade procedure

1. Check the [Penpot releases page](https://github.com/penpot/penpot/releases) for the latest version tag.
2. Take a backup first: `scripts\backup-penpot.ps1`.
3. Edit `docker/.env` and bump `PENPOT_VERSION` to the new tag. Upgrade in small increments (e.g. don't jump more than a few minor versions at once) — Penpot's own guidance.
4. Pull and restart:
   ```powershell
   cd docker
   docker compose -p penpot -f docker-compose.yml --env-file .env pull
   cd ..
   scripts\start-penpot.ps1
   ```
5. Confirm the UI loads and a project opens correctly before deleting the pre-upgrade backup.

## Verifying data survives a restart

1. Start Penpot, sign up (email goes to the mailcatch inbox at `http://localhost:1080` if you need to click a verification link), create a project and a file.
2. `scripts\stop-penpot.ps1`
3. `scripts\start-penpot.ps1`
4. Confirm the project and file are still there.

## Troubleshooting

- **Postgres container is "unhealthy" on first start, log shows `initdb: error: directory "/var/lib/postgresql/data" exists but is not empty` / `contains a dot-prefixed/invisible file, perhaps due to it being a mount point`** — this is a known Windows/WSL2 quirk: a Windows folder bind-mounted directly onto Postgres's data directory confuses `initdb` because Windows leaves an invisible marker at the mount root. Fixed by mounting `docker/data/postgres` to a subdirectory (`/var/lib/postgresql/data/pgdata`, via `PGDATA` env var) instead of the data directory root — already configured in `docker-compose.yml`. If you still hit this, delete everything under `docker/data/postgres/` and retry.
- **`docker compose up` fails immediately** — Docker Desktop isn't running. Start it and retry.
- **Frontend never becomes healthy** — check `docker compose -p penpot -f docker\docker-compose.yml ps` for a container stuck restarting; `docker compose -p penpot -f docker\docker-compose.yml logs penpot-backend` is the usual place to look first.
- **Forgot to verify email / registration disabled** — create a user directly:
  ```powershell
  docker exec -ti penpot-penpot-backend-1 python3 manage.py create-profile --skip-tutorial --skip-walkthrough
  ```
  (container name may differ — check with `docker ps`).
