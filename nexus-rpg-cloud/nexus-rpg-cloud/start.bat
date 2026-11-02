@echo off
title NEXUS RPG Server
cd /d "%~dp0"

echo ===================================================
echo        ⚔️  NEXUS RPG - COSMIC ONLINE GAME  ⚔️
echo ===================================================
echo [1/3] Setting up environment...

set "PATH=%APPDATA%\Antigravity\bin;%LOCALAPPDATA%\Programs\antigravity;%PATH%"

echo [2/3] Checking Node.js runtime...
set NODE_CMD=

where agy-node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set "NODE_CMD=agy-node"
) else (
    where node >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        set "NODE_CMD=node"
    )
)

if "%NODE_CMD%"=="" (
    echo [ERROR] Runtime Node.js tidak ditemukan!
    echo Pastikan Antigravity atau Node.js terpasang.
    pause
    exit /b 1
)

echo [3/3] Menjalankan NEXUS RPG Server via %NODE_CMD%...
echo Membuka game di browser...
start "" "http://localhost:3000"

%NODE_CMD% server.js
pause
