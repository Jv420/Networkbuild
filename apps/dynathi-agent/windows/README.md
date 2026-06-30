# Windows scripts voor Dynathi Agent

Deze scripts maken het makkelijk om de agent automatisch te starten op Windows 10.

## Startup task installeren

Open PowerShell in:

```powershell
Networkbuild\apps\dynathi-agent
```

Voer uit:

```powershell
powershell -ExecutionPolicy Bypass -File .\windows\install-startup-task.ps1
```

Daarna kun je de taak direct starten:

```powershell
Start-ScheduledTask -TaskName DynathiAgent
```

Controleren:

```powershell
Get-ScheduledTask -TaskName DynathiAgent
```

## Startup task verwijderen

```powershell
powershell -ExecutionPolicy Bypass -File .\windows\uninstall-startup-task.ps1
```

## Belangrijk

Zorg dat dit eerst handmatig werkt:

```powershell
npm install
copy .env.example .env
notepad .env
npm run check
npm start
```

Pas daarna de startup task installeren.
