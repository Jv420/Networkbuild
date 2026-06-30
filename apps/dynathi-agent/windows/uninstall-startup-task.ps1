# Dynathi Agent - Windows Startup Task Uninstaller

$TaskName = "DynathiAgent"

if (Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
  Write-Host "Dynathi Agent startup task removed: $TaskName" -ForegroundColor Green
} else {
  Write-Host "Task not found: $TaskName" -ForegroundColor Yellow
}
