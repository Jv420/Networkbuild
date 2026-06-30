# Dynathi Agent - Windows Startup Task Installer
# Run PowerShell as Administrator if normal install fails.

$ErrorActionPreference = "Stop"

$TaskName = "DynathiAgent"
$AgentDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$NodeExe = (Get-Command node).Source
$AgentFile = Join-Path $AgentDir "src\agent.js"
$LogDir = Join-Path $AgentDir "logs"
$LogFile = Join-Path $LogDir "agent-startup.log"

if (!(Test-Path $LogDir)) {
  New-Item -ItemType Directory -Path $LogDir | Out-Null
}

if (!(Test-Path $AgentFile)) {
  Write-Host "Agent file not found: $AgentFile" -ForegroundColor Red
  exit 1
}

$Action = New-ScheduledTaskAction `
  -Execute $NodeExe `
  -Argument "`"$AgentFile`"" `
  -WorkingDirectory $AgentDir

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

Write-Host "Dynathi Agent startup task installed: $TaskName" -ForegroundColor Green
Write-Host "Agent directory: $AgentDir"
Write-Host "Node executable: $NodeExe"
Write-Host "Start task manually with: Start-ScheduledTask -TaskName $TaskName"
