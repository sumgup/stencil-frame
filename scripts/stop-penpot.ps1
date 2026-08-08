#Requires -Version 5.1
<#
.SYNOPSIS
    Stops the local Penpot stack. Data in docker\data\ is preserved.
#>

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$DockerDir = Join-Path $RepoRoot "docker"
$ComposeFile = Join-Path $DockerDir "docker-compose.yml"
$EnvFile = Join-Path $DockerDir ".env"

Write-Host "Stopping Penpot (data is preserved in docker\data\)..." -ForegroundColor Cyan
Push-Location $DockerDir
try {
    docker compose -p penpot -f $ComposeFile --env-file $EnvFile down
}
finally {
    Pop-Location
}
Write-Host "Penpot stopped." -ForegroundColor Green
