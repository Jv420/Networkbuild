# Dynathi Control Panel - Windows Startup Task Uninstaller

$TaskName = "DynathiControlPanel"

if (Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
  Write-Host "Dynathi Control Panel startup task removed: $TaskName" -ForegroundColor Green
} else {
  Write-Host "Task not found: $TaskName" -ForegroundColor Yellow
}
