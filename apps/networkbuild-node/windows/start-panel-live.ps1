# Dynathi Control Panel - Live Start Script
# Run from apps\networkbuild-node

$ErrorActionPreference = "Stop"

if (!(Test-Path ".env")) {
  Write-Host "Missing .env file. Copy .env.example to .env and configure AGENT_TOKEN first." -ForegroundColor Red
  exit 1
}

$env:NODE_ENV = "production"
$env:LIVE_MODE = "true"

Write-Host "Starting Dynathi Control Panel in live mode..." -ForegroundColor Green
npm start
