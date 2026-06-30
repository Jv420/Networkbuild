# Dynathi Control Panel - Windows Startup Task Installer

$ErrorActionPreference = "Stop"

$TaskName = "DynathiControlPanel"
$PanelDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$NodeExe = (Get-Command node).Source
$ServerFile = Join-Path $PanelDir "src\server.js"
$DataDir = Join-Path $PanelDir "data"
$LogDir = Join-Path $PanelDir "logs"

if (!(Test-Path $DataDir)) {
  New-Item -ItemType Directory -Path $DataDir | Out-Null
}

if (!(Test-Path $LogDir)) {
  New-Item -ItemType Directory -Path $LogDir | Out-Null
}

if (!(Test-Path $ServerFile)) {
  Write-Host "Server file not found: $ServerFile" -ForegroundColor Red
  exit 1
}

$Action = New-ScheduledTaskAction `
  -Execute $NodeExe `
  -Argument "`"$ServerFile`"" `
  -WorkingDirectory $PanelDir

$Trigger = New-ScheduledTaskTrigger -AtLogOn

$Settings = New-ScheduledTaskSettingsSet `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries `
  -StartWhenAvailable `
  -RestartCount 3 `
  -RestartInterval (New-TimeSpan -Minutes 1)

$Principal = New-ScheduledTaskPrincipal `
  -UserId $env:USERNAME `
  -LogonType Interactive `
  -RunLevel LeastPrivilege

Register-ScheduledTask `
  -TaskName $TaskName `
  -Action $Action `
  -Trigger $Trigger `
  -Settings $Settings `
  -Principal $Principal `
  -Force | Out-Null

Write-Host "Dynathi Control Panel startup task installed: $TaskName" -ForegroundColor Green
Write-Host "Panel directory: $PanelDir"
Write-Host "Start task manually with: Start-ScheduledTask -TaskName $TaskName"
