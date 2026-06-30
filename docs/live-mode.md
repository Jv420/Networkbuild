# Live Mode Setup

Deze handleiding zet Dynathi Networkbuild klaar voor een eerste live test op Windows 10.

## Wat is live mode?

`LIVE_MODE=true` betekent dat de software weigert te starten met onveilige placeholder-configuratie.

Live mode checkt onder andere:

- `AGENT_TOKEN` is geen `CHANGE_ME`
- token is minimaal 24 tekens
- `CONTROL_PANEL_URL` is geldig
- poort is geldig

## 1. Control panel installeren

```powershell
cd Networkbuild\apps\networkbuild-node
npm install
copy .env.example .env
notepad .env
```

Zet bijvoorbeeld:

```env
LIVE_MODE=true
PORT=3000
AGENT_TOKEN=maak-hier-een-lange-random-token-van-minimaal-24-tekens
```

Starten:

```powershell
npm start
```

Open:

```text
http://localhost:3000
```

## 2. Agent installeren

```powershell
cd Networkbuild\apps\dynathi-agent
npm install
copy .env.example .env
notepad .env
```

Zet bijvoorbeeld:

```env
LIVE_MODE=true
AGENT_NAME=compute-nl-01
CONTROL_PANEL_URL=http://localhost:3000
AGENT_TOKEN=dezelfde-token-als-in-control-panel
REPORT_INTERVAL_SECONDS=30
CPU_PAUSE_PERCENT=85
RAM_PAUSE_PERCENT=85
MANAGE_CPU_TASK=false
```

Check:

```powershell
npm run check
```

Start:

```powershell
npm start
```

Controleer:

```text
http://localhost:3000/api/agents
```

## 3. Automatisch starten bij Windows login

Control panel:

```powershell
cd Networkbuild\apps\networkbuild-node
powershell -ExecutionPolicy Bypass -File .\windows\install-panel-startup-task.ps1
Start-ScheduledTask -TaskName DynathiControlPanel
```

Agent:

```powershell
cd Networkbuild\apps\dynathi-agent
powershell -ExecutionPolicy Bypass -File .\windows\install-startup-task.ps1
Start-ScheduledTask -TaskName DynathiAgent
```

## 4. Logs bekijken

Agent logs:

```text
Networkbuild\apps\dynathi-agent\logs\agent.log
Networkbuild\apps\dynathi-agent\logs\agent-error.log
```

Control panel logs zie je in het PowerShell-venster wanneer je handmatig start.

## 5. Optionele compute task aanzetten

Laat dit eerst uit:

```env
MANAGE_CPU_TASK=false
```

Pas als je zeker weet dat je start/stop commands kloppen:

```env
MANAGE_CPU_TASK=true
CPU_TASK_START_COMMAND=echo Start mijn compute taak
CPU_TASK_STOP_COMMAND=echo Stop mijn compute taak
```

Gebruik voor echte miners/nodes alleen lokale paden en configs. Commit die nooit naar GitHub.

## 6. Veiligheidsregels

- Nooit wallet seed phrase in `.env` zetten.
- Nooit private keys in GitHub zetten.
- Eerst handmatig testen, daarna pas startup task.
- Begin met `MANAGE_CPU_TASK=false`.
- Pas echte start/stop commands toe als je weet dat ze werken.
