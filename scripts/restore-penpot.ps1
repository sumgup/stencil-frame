#Requires -Version 5.1
<#
.SYNOPSIS
    Restores Penpot data from a backup zip created by backup-penpot.ps1.
.PARAMETER BackupFile
    Path to the backup zip. If omitted, the most recent file in docker\backups\ is used.
#>
param(
    [string]$BackupFile
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$DockerDir = Join-Path $RepoRoot "docker"
$ComposeFile = Join-Path $DockerDir "docker-compose.yml"
$EnvFile = Join-Path $DockerDir ".env"
$DataDir = Join-Path $DockerDir "data"
$BackupDir = Join-Path $DockerDir "backups"

if (-not $BackupFile) {
    $Latest = Get-ChildItem -Path $BackupDir -Filter "penpot-backup-*.zip" |
        Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if (-not $Latest) {
        Write-Error "No backup files found in $BackupDir. Pass -BackupFile explicitly."
        exit 1
    }
    $BackupFile = $Latest.FullName
}

if (-not (Test-Path $BackupFile)) {
    Write-Error "Backup file not found: $BackupFile"
    exit 1
}

Write-Host "This will REPLACE all current Penpot data with the contents of:" -ForegroundColor Yellow
Write-Host "  $BackupFile" -ForegroundColor Yellow
$Confirm = Read-Host "Type YES to continue"
if ($Confirm -ne "YES") {
    Write-Host "Aborted."
    exit 0
}

Write-Host "Stopping Penpot..." -ForegroundColor Cyan
Push-Location $DockerDir
try {
    docker compose -p penpot -f $ComposeFile --env-file $EnvFile down
}
finally {
    Pop-Location
}

$StagingDir = Join-Path $env:TEMP "penpot-restore-$(Get-Date -Format 'yyyyMMddHHmmss')"
Write-Host "Extracting backup..." -ForegroundColor Cyan
Expand-Archive -Path $BackupFile -DestinationPath $StagingDir -Force

Write-Host "Replacing data\postgres and data\assets..." -ForegroundColor Cyan
$PostgresDir = Join-Path $DataDir "postgres"
$AssetsDir = Join-Path $DataDir "assets"

if (Test-Path $PostgresDir) { Remove-Item -Path $PostgresDir -Recurse -Force }
if (Test-Path $AssetsDir) { Remove-Item -Path $AssetsDir -Recurse -Force }

Copy-Item -Path (Join-Path $StagingDir "postgres") -Destination $PostgresDir -Recurse
Copy-Item -Path (Join-Path $StagingDir "assets") -Destination $AssetsDir -Recurse
Remove-Item -Path $StagingDir -Recurse -Force

Write-Host "Starting Penpot..." -ForegroundColor Cyan
Push-Location $DockerDir
try {
    docker compose -p penpot -f $ComposeFile --env-file $EnvFile up -d
}
finally {
    Pop-Location
}

Write-Host "Restore complete. Penpot should be available shortly at http://localhost:9001" -ForegroundColor Green
