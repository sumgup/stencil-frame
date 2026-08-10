@echo off
REM Starts a Cloudflare tunnel so Claude's MCP connector can reach local
REM Penpot. Requires Penpot already running (start-penpot.bat) and
REM cloudflared installed. Keep this window open while using MCP.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-mcp-tunnel.ps1"
pause
