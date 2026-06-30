# Problemen oplossen

Hier staan de meest voorkomende problemen en oplossingen.

## Probleem: `node is not recognized`

Oorzaak:

- Node.js is niet goed geïnstalleerd
- Windows is nog niet opnieuw gestart
- PATH is niet bijgewerkt

Oplossing:

1. Installeer Node.js LTS opnieuw
2. Start Windows opnieuw op
3. Open een nieuw PowerShell-venster
4. Test:

```powershell
node -v
npm -v
```

---

## Probleem: `npm install` geeft fouten

Controleer eerst:

```powershell
node -v
npm -v
```

Ga daarna naar de juiste map:

```powershell
cd C:\Projects\Networkbuild\apps\networkbuild-node
npm install
```

Of voor de Agent:

```powershell
cd C:\Projects\Networkbuild\apps\dynathi-agent
npm install
```

Verwijder bij vreemde fouten eventueel lokaal:

```powershell
rmdir /s /q node_modules
 del package-lock.json
npm install
```

Voer dit alleen uit in de juiste app-map.

---

## Probleem: Control Panel start niet in LIVE_MODE

Controleer `.env`:

```env
LIVE_MODE=true
AGENT_TOKEN=een-lange-token-van-minimaal-24-tekens
PORT=3000
```

Veelvoorkomende oorzaak:

- token bevat nog `CHANGE_ME`
- token is te kort
- poort is ongeldig

---

## Probleem: `http://localhost:3000` opent niet

Controleer of het panel nog draait.

Start opnieuw:

```powershell
cd C:\Projects\Networkbuild\apps\networkbuild-node
npm start
```

Controleer of poort 3000 al bezet is:

```powershell
netstat -ano | findstr :3000
```

Gebruik anders tijdelijk een andere poort:

```env
PORT=3001
```

Open dan:

```text
http://localhost:3001
```

---

## Probleem: Agent verschijnt niet

Controleer deze punten:

- Control Panel draait
- Agent draait
- `CONTROL_PANEL_URL` klopt
- `AGENT_TOKEN` is exact hetzelfde
- Windows Firewall blokkeert de verbinding niet

Voor dezelfde pc:

```env
CONTROL_PANEL_URL=http://localhost:3000
```

Test eerst:

```text
http://localhost:3000/api/health
```

Daarna:

```text
http://localhost:3000/api/agents
```

---

## Probleem: Agent is offline

De agent wordt offline gemarkeerd als hij te lang niets rapporteert.

Controleer:

- Agent PowerShell-venster
- `REPORT_INTERVAL_SECONDS`
- internet/lokaal netwerk
- foutmeldingen in logs

Agent logs:

```text
apps\dynathi-agent\logs\agent.log
apps\dynathi-agent\logs\agent-error.log
```

---

## Probleem: Windows startup task werkt niet

Controleer taak:

```powershell
Get-ScheduledTask -TaskName DynathiAgent
Get-ScheduledTask -TaskName DynathiControlPanel
```

Start handmatig:

```powershell
Start-ScheduledTask -TaskName DynathiAgent
Start-ScheduledTask -TaskName DynathiControlPanel
```

Als de taak niet bestaat, installeer opnieuw.

---

## Probleem: CPU-meting lijkt vreemd

Wacht minimaal twee rapportages af. De eerste CPU-meting kan tijdelijk 0 zijn omdat de Agent eerst een meetverschil nodig heeft.

---

## Probleem: Mysterium start/stop command werkt niet

Laat voorlopig:

```env
MANAGE_CPU_TASK=false
```

Test je commands eerst handmatig in PowerShell. Zet pas daarna task-management aan.

---

## Hulp vragen

Deel bij hulpvragen alleen:

- foutmelding
- Node.js versie
- Windows-versie
- welke stap je uitvoerde

Deel nooit:

- `.env`
- tokens
- wallet seeds
- private keys
- echte thuis-IP's
