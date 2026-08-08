@echo off
REM Usage: restore-penpot.bat [path\to\backup.zip]
REM If no path is given, restores the most recent backup in docker\backups\.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0restore-penpot.ps1" %*
pause
