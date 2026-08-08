#Requires -Version 5.1
<#
.SYNOPSIS
    Backs up Penpot's Postgres data and asset files to a timestamped zip
    under docker\backups\.
.DESCRIPTION
    Stops the stack first so Postgres isn't mid-write during the copy, then
    restarts it afterward. For a large asset library this can take a while;
    the stack is only down for the duration of the file copy + zip.
#>

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$DockerDir = Join-Path $RepoRoot "docker"
$ComposeFile = Join-Path $DockerDir "docker-compose.yml"
$EnvFile = Join-Path $DockerDir ".env"
$DataDir = Join-Path $DockerDir "data"
$BackupDir = Join-Path $DockerDir "backups"

if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
}

$Timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$StagingDir = Join-Path $env:TEMP "penpot-backup-$Timestamp"
$ZipPath = Join-Path $BackupDir "penpot-backup-$Timestamp.zip"

Write-Host "Stopping Penpot for a consistent backup..." -ForegroundColor Cyan
Push-Location $DockerDir
try {
    docker compose -p penpot -f $ComposeFile --env-file $EnvFile stop
}
finally {
    Pop-Location
}

Write-Host "Copying data..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path $StagingDir -Force | Out-Null
Copy-Item -Path (Join-Path $DataDir "postgres") -Destination (Join-Path $StagingDir "postgres") -Recurse
Copy-Item -Path (Join-Path $DataDir "assets") -Destination (Join-Path $StagingDir "assets") -Recurse

Write-Host "Compressing to $ZipPath..." -ForegroundColor Cyan
Compress-Archive -Path (Join-Path $StagingDir "*") -DestinationPath $ZipPath -Force
Remove-Item -Path $StagingDir -Recurse -Force

Write-Host "Restarting Penpot..." -ForegroundColor Cyan
Push-Location $DockerDir
try {
    docker compose -p penpot -f $ComposeFile --env-file $EnvFile start
}
finally {
    Pop-Location
}

Write-Host "Backup complete: $ZipPath" -ForegroundColor Green
