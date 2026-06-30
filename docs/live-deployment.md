# Live deployment checklist

Deze checklist maakt de Node.js control panel + agent setup geschikt om live te gebruiken.

## 1. Maak een lang token

Gebruik een lange random token van minimaal 24 tekens. Voorbeeld in PowerShell:

```powershell
-join ((48..57)+(65..90)+(97..122) | Get-Random -Count 48 | ForEach-Object {[char]$_})
```

Zet dezelfde token in:

```text
apps/networkbuild-node/.env
apps/dynathi-agent/.env
```

Bijvoorbeeld:

```env
AGENT_TOKEN=PASTE_LONG_RANDOM_TOKEN_HERE
```

## 2. Control panel configuratie

```powershell
cd Networkbuild\apps\networkbuild-node
copy .env.example .env
notepad .env
npm install
npm run check
```

Zet in `.env`:

```env
LIVE_MODE=true
PORT=3000
AGENT_TOKEN=PASTE_LONG_RANDOM_TOKEN_HERE
```

Start live:

```powershell
$env:LIVE_MODE="true"
npm start
```

Open:

```text
http://localhost:3000
```

## 3. Agent configuratie

```powershell
cd Networkbuild\apps\dynathi-agent
copy .env.example .env
notepad .env
npm install
npm run check
```

Zet in `.env`:

```env
LIVE_MODE=true
AGENT_NAME=compute-nl-01
CONTROL_PANEL_URL=http://localhost:3000
AGENT_TOKEN=PASTE_LONG_RANDOM_TOKEN_HERE
REPORT_INTERVAL_SECONDS=30
MANAGE_CPU_TASK=false
```

Start live:

```powershell
$env:LIVE_MODE="true"
npm start
```

## 4. Controleer agentmelding

Open:

```text
http://localhost:3000/api/agents
```

Of kijk in het dashboard:

```text
http://localhost:3000
```

## 5. Windows automatisch starten

Installeer eerst handmatig en test alles. Daarna:

```powershell
cd Networkbuild\apps\dynathi-agent
powershell -ExecutionPolicy Bypass -File .\windows\install-startup-task.ps1
Start-ScheduledTask -TaskName DynathiAgent
```

## 6. Belangrijke veiligheidsregels

- Zet `.env` nooit in GitHub.
- Zet wallet seeds/private keys nooit in `.env` of GitHub.
- Laat `MANAGE_CPU_TASK=false` totdat je zeker weet dat je start/stop commands veilig zijn.
- Gebruik live mode alleen met een echte lange token.
- Zet het control panel achter HTTPS als je het via internet bereikbaar maakt.
- Gebruik liever WireGuard/VPN voor beheer dan publiek open beheer.

## 7. Wat is nu live-ready?

- Agent auth met bearer token.
- Live mode weigert placeholder tokens.
- Windows-vriendelijke CPU meting.
- Agent status blijft opgeslagen in `apps/networkbuild-node/data/agents.json`.
- Dashboard toont agents met online/offline, CPU en RAM.
