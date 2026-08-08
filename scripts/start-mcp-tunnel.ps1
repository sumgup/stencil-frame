#Requires -Version 5.1
<#
.SYNOPSIS
    Starts a Cloudflare quick tunnel exposing local Penpot (for Claude's
    MCP connector, which requires a real public https:// URL — localhost
    and self-signed certs are rejected regardless of OS-level trust).
.DESCRIPTION
    Prints a https://<random-words>.trycloudflare.com URL. Use that as the
    host in Claude's connector, e.g.:
      https://<random-words>.trycloudflare.com/mcp/stream?userToken=YOUR_KEY

    The URL changes every time this script restarts — there's no free
    stable-subdomain option with cloudflared quick tunnels, so you'll need
    to re-paste the URL into Claude's connector settings after a restart.

    Requires Penpot to already be running (scripts\start-penpot.ps1) and
    cloudflared installed (choco install cloudflared, or download from
    https://github.com/cloudflare/cloudflared/releases).

    Leave this window open while using Claude's Penpot MCP tools. Ctrl+C
    to stop the tunnel — this does not affect Penpot itself, only remote
    MCP access to it.
#>

$ErrorActionPreference = "Stop"

if (-not (Get-Command cloudflared -ErrorAction SilentlyContinue)) {
    Write-Error "cloudflared not found on PATH. Install with:`n  choco install cloudflared`nor download from https://github.com/cloudflare/cloudflared/releases"
    exit 1
}

try {
    Invoke-WebRequest -Uri "http://localhost:9001" -UseBasicParsing -TimeoutSec 3 | Out-Null
} catch {
    Write-Warning "Penpot doesn't appear to be running at http://localhost:9001. Start it first with scripts\start-penpot.ps1."
}

Write-Host "Starting Cloudflare tunnel to local Penpot (localhost:9001)..." -ForegroundColor Cyan
Write-Host "Watch for a line like: https://<random-words>.trycloudflare.com" -ForegroundColor Yellow
Write-Host "Use that as the host in Claude's MCP connector URL, e.g.:" -ForegroundColor Yellow
Write-Host "  https://<random-words>.trycloudflare.com/mcp/stream?userToken=YOUR_KEY" -ForegroundColor Yellow
Write-Host ""

cloudflared tunnel --url http://localhost:9001
