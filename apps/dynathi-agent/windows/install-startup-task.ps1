# Dynathi Agent - Windows Startup Task Installer
# Run PowerShell as Administrator if normal install fails.

$ErrorActionPreference = "Stop"

$TaskName = "DynathiAgent"
$AgentDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$RunnerFile = Join-Path $AgentDir "windows\run-agent.cmd"
$LogDir = Join-Path $AgentDir "logs"

if (!(Test-Path $LogDir)) {
  New-Item -ItemType Directory -Path $LogDir | Out-Null
}

if (!(Test-Path $RunnerFile)) {
  Write-Host "Runner file not found: $RunnerFile" -ForegroundColor Red
  exit 1
}

$Action = New-ScheduledTaskAction `
  -Execute $RunnerFile `
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
Write-Host "Runner: $RunnerFile"
Write-Host "Logs: $LogDir"
Write-Host "Start task manually with: Start-ScheduledTask -TaskName $TaskName"
