#Requires -Version 5.1
<#
.SYNOPSIS
    Starts the local Penpot stack for Stencil + Frame and opens it in the browser.
#>

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$DockerDir = Join-Path $RepoRoot "docker"
$ComposeFile = Join-Path $DockerDir "docker-compose.yml"
$EnvFile = Join-Path $DockerDir ".env"

if (-not (Test-Path $EnvFile)) {
    Write-Error "Missing $EnvFile. Copy docker\.env.example to docker\.env and set a real PENPOT_SECRET_KEY first."
    exit 1
}

# Make sure the bind-mount data folders exist so Docker doesn't create them as root-owned.
$DataDirs = @("data\postgres", "data\assets")
foreach ($dir in $DataDirs) {
    $full = Join-Path $DockerDir $dir
    if (-not (Test-Path $full)) {
        New-Item -ItemType Directory -Path $full -Force | Out-Null
    }
}

Write-Host "Starting Penpot..." -ForegroundColor Cyan
Push-Location $DockerDir
try {
    docker compose -p penpot -f $ComposeFile --env-file $EnvFile up -d
    if ($LASTEXITCODE -ne 0) {
        throw "docker compose up failed (exit code $LASTEXITCODE). Is Docker Desktop running?"
    }
}
finally {
    Pop-Location
}

Write-Host "Waiting for Penpot to become healthy..." -ForegroundColor Cyan
$MaxWaitSeconds = 90
$Elapsed = 0
$Ready = $false

while ($Elapsed -lt $MaxWaitSeconds) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:9001" -UseBasicParsing -TimeoutSec 3
        if ($response.StatusCode -eq 200) {
            $Ready = $true
            break
        }
    } catch {
        # not ready yet
    }
    Start-Sleep -Seconds 3
    $Elapsed += 3
}

if ($Ready) {
    Write-Host "Penpot is up: http://localhost:9001" -ForegroundColor Green
    Start-Process "http://localhost:9001"
} else {
    Write-Warning "Penpot didn't respond within $MaxWaitSeconds seconds. Check container status with:`n  docker compose -p penpot -f `"$ComposeFile`" ps"
}
