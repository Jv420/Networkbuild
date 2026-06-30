# Dynathi Agent installeren op Windows 10

Deze handleiding is voor je Windows 10 i3 / 10GB RAM machine.

## 1. Installeer Node.js

Download en installeer de LTS-versie van Node.js:

```text
https://nodejs.org/
```

Controleer daarna in PowerShell:

```powershell
node -v
npm -v
```

## 2. Repository downloaden

Optie A met Git:

```powershell
git clone https://github.com/Jv420/Networkbuild.git
cd Networkbuild\apps\dynathi-agent
```

Optie B zonder Git:

- Download ZIP via GitHub
- Pak uit
- Open PowerShell in `apps\dynathi-agent`

## 3. Dependencies installeren

```powershell
npm install
```

## 4. Config maken

```powershell
copy .env.example .env
notepad .env
```

Pas minimaal aan:

```env
AGENT_NAME=compute-nl-01
CONTROL_PANEL_URL=http://localhost:3000
AGENT_TOKEN=maak-hier-een-lange-random-token
REPORT_INTERVAL_SECONDS=30
CPU_PAUSE_PERCENT=85
RAM_PAUSE_PERCENT=85
```

Gebruik dezelfde `AGENT_TOKEN` ook in de `.env` van het control panel.

## 5. Config controleren

```powershell
npm run check
```

## 6. Agent starten

```powershell
npm start
```

Als alles werkt zie je logs zoals:

```text
Dynathi Agent starting: compute-nl-01
Reported compute-nl-01
```

## 7. Control panel starten

Open een tweede PowerShell:

```powershell
cd Networkbuild\apps\networkbuild-node
npm install
copy .env.example .env
notepad .env
npm start
```

Open daarna:

```text
http://localhost:3000
```

Controleer agents via:

```text
http://localhost:3000/api/agents
```

## 8. Later als Windows startup taak

Voor nu handmatig starten. Later voegen we een Windows service of taakplanner-script toe.

## Belangrijk

Zet in `.env` nooit echte wallet seeds, private keys of gevoelige gegevens. De agent mag taken starten/stoppen, maar echte miner configs blijven lokaal en buiten GitHub.
