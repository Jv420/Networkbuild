# Dynathi Networkbuild v1.0 installeren op Windows 10

Deze handleiding is geschreven voor beginners. Volg de stappen rustig van boven naar beneden.

## Wat ga je installeren?

Je installeert twee onderdelen:

1. **Dynathi Control Panel**
   - laat status zien
   - ontvangt gegevens van agents
   - toont CPU/RAM en online/offline status

2. **Dynathi Agent**
   - draait op je Windows 10 pc
   - meet CPU en RAM
   - meldt zich bij het Control Panel
   - kan later optionele taken starten/stoppen

---

## Stap 1 - Node.js installeren

1. Ga naar `https://nodejs.org/`
2. Download de **LTS-versie**
3. Open het installatiebestand
4. Klik op `Next`
5. Laat alle standaardopties staan
6. Klik op `Install`
7. Start Windows opnieuw op als dat gevraagd wordt

Controleer daarna:

1. Open PowerShell
2. Typ:

```powershell
node -v
```

Je hoort een versienummer te zien, bijvoorbeeld:

```text
v22.12.0
```

Typ daarna:

```powershell
npm -v
```

Ook hier moet een versienummer verschijnen.

Als je `node is not recognized` ziet, herstart Windows en probeer opnieuw.

---

## Stap 2 - Git installeren

1. Ga naar `https://git-scm.com/downloads`
2. Download Git voor Windows
3. Installeer met de standaardinstellingen

Controleer in PowerShell:

```powershell
git --version
```

Je hoort iets te zien zoals:

```text
git version 2.x.x
```

---

## Stap 3 - Repository downloaden

Maak eerst een map voor projecten:

```powershell
cd C:\
mkdir Projects
cd Projects
```

Download daarna de repository:

```powershell
git clone https://github.com/Jv420/Networkbuild.git
```

Ga naar de repository:

```powershell
cd Networkbuild
```

Controleer de inhoud:

```powershell
dir
```

Je hoort onder andere deze mappen te zien:

```text
apps
docs
infrastructure
services
```

---

## Stap 4 - Control Panel installeren

Ga naar de map:

```powershell
cd C:\Projects\Networkbuild\apps\networkbuild-node
```

Installeer de benodigde Node.js pakketten:

```powershell
npm install
```

Wacht tot dit klaar is.

Maak daarna je lokale configuratiebestand:

```powershell
copy .env.example .env
```

Open het bestand:

```powershell
notepad .env
```

Gebruik bijvoorbeeld deze configuratie:

```env
APP_NAME=Dynathi Networkbuild
NODE_ENV=production
LIVE_MODE=true
PORT=3000
PUBLIC_BASE_URL=http://localhost:3000
ADMIN_CONTACT=admin@example.com
AGENT_TOKEN=VERVANG_DIT_DOOR_EEN_LANGE_RANDOM_TOKEN_VAN_MINIMAAL_24_TEKENS
DISCORD_WEBHOOK_URL=CHANGE_ME
COMPUTE_DEMO_ENABLED=true
COMPUTE_MAX_THREADS=1
COMPUTE_DEFAULT_SECONDS=15
```

Belangrijk:

- vervang `AGENT_TOKEN`
- gebruik minimaal 24 tekens
- gebruik geen simpel wachtwoord
- gebruik dezelfde token straks ook bij de Agent

Voorbeeld van een goede token:

```text
Dynathi-Node-2026-Secret-8472-Extra
```

Sla het bestand op.

---

## Stap 5 - Control Panel testen

Start het Control Panel:

```powershell
npm start
```

Je hoort iets te zien zoals:

```text
Dynathi Networkbuild running on http://localhost:3000
Live mode: enabled
```

Open daarna je browser en ga naar:

```text
http://localhost:3000
```

Controleer ook:

```text
http://localhost:3000/api/health
```

Daar hoort iets te staan zoals:

```json
{
  "ok": true
}
```

Laat dit PowerShell-venster open.

---

## Stap 6 - Agent installeren

Open een tweede PowerShell-venster.

Ga naar de Agent-map:

```powershell
cd C:\Projects\Networkbuild\apps\dynathi-agent
```

Installeer de benodigde pakketten:

```powershell
npm install
```

Maak een lokaal configuratiebestand:

```powershell
copy .env.example .env
```

Open het:

```powershell
notepad .env
```

Gebruik bijvoorbeeld:

```env
LIVE_MODE=true
AGENT_NAME=compute-nl-01
CONTROL_PANEL_URL=http://localhost:3000
AGENT_TOKEN=DEZELFDE_TOKEN_ALS_BIJ_HET_CONTROL_PANEL
REPORT_INTERVAL_SECONDS=30
CPU_PAUSE_PERCENT=85
RAM_PAUSE_PERCENT=85
MANAGE_CPU_TASK=false
MYSTERIUM_STATUS_COMMAND=echo MYST status placeholder
MYSTERIUM_START_COMMAND=echo Start MYST placeholder
MYSTERIUM_STOP_COMMAND=echo Stop MYST placeholder
CPU_TASK_NAME=example-cpu-task
CPU_TASK_START_COMMAND=echo Start CPU task placeholder
CPU_TASK_STOP_COMMAND=echo Stop CPU task placeholder
```

Belangrijk:

- `AGENT_TOKEN` moet exact gelijk zijn aan die van het Control Panel
- laat `MANAGE_CPU_TASK=false` tijdens de eerste test
- laat de placeholder commands voorlopig staan

Sla het bestand op.

---

## Stap 7 - Agent controleren en starten

Controleer de configuratie:

```powershell
npm run check
```

Start daarna de Agent:

```powershell
npm start
```

Je hoort iets te zien zoals:

```text
Dynathi Agent starting: compute-nl-01
Reported compute-nl-01
```

Open in je browser:

```text
http://localhost:3000/api/agents
```

Je hoort jouw agent te zien.

Open ook het dashboard:

```text
http://localhost:3000
```

De agent hoort daar als online te verschijnen.

---

## Stap 8 - Eerste succesvolle test

De installatie werkt als:

- het Control Panel draait
- `/api/health` `ok: true` geeft
- `/api/agents` jouw agent toont
- CPU en RAM zichtbaar zijn
- de agent online staat

Laat `MANAGE_CPU_TASK=false` totdat je de rest goed hebt getest.

---

## Stap 9 - Repository later bijwerken

Ga naar de projectmap:

```powershell
cd C:\Projects\Networkbuild
```

Haal updates binnen:

```powershell
git pull
```

Voer daarna in beide app-mappen opnieuw uit:

```powershell
npm install
```

Start daarna Control Panel en Agent opnieuw.
