# Automatisch starten op Windows 10

Laat eerst Control Panel en Agent handmatig werken voordat je autostart installeert.

## Control Panel automatisch starten

Open PowerShell:

```powershell
cd C:\Projects\Networkbuild\apps\networkbuild-node
```

Installeer de taak:

```powershell
powershell -ExecutionPolicy Bypass -File .\windows\install-panel-startup-task.ps1
```

Start hem direct:

```powershell
Start-ScheduledTask -TaskName DynathiControlPanel
```

Controleer:

```powershell
Get-ScheduledTask -TaskName DynathiControlPanel
```

Verwijderen:

```powershell
powershell -ExecutionPolicy Bypass -File .\windows\uninstall-panel-startup-task.ps1
```

---

## Agent automatisch starten

Open PowerShell:

```powershell
cd C:\Projects\Networkbuild\apps\dynathi-agent
```

Installeer de taak:

```powershell
powershell -ExecutionPolicy Bypass -File .\windows\install-startup-task.ps1
```

Start direct:

```powershell
Start-ScheduledTask -TaskName DynathiAgent
```

Controleer:

```powershell
Get-ScheduledTask -TaskName DynathiAgent
```

Verwijderen:

```powershell
powershell -ExecutionPolicy Bypass -File .\windows\uninstall-startup-task.ps1
```

---

## Na een herstart testen

1. Herstart Windows
2. Wacht ongeveer één minuut
3. Open:

```text
http://localhost:3000
```

4. Controleer:

```text
http://localhost:3000/api/agents
```

Als het panel niet opent, start beide onderdelen nogmaals handmatig en controleer de `.env` bestanden.
