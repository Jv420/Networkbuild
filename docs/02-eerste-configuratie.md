# Eerste configuratie van Dynathi Networkbuild

Deze handleiding legt uit wat de belangrijkste instellingen betekenen.

## Control Panel `.env`

Bestand:

```text
apps/networkbuild-node/.env
```

Belangrijkste instellingen:

```env
APP_NAME=Dynathi Networkbuild
NODE_ENV=production
LIVE_MODE=true
PORT=3000
PUBLIC_BASE_URL=http://localhost:3000
ADMIN_CONTACT=admin@example.com
AGENT_TOKEN=JOUW_LANGE_TOKEN
```

### APP_NAME

Naam die het Control Panel gebruikt.

### NODE_ENV

Gebruik voor live gebruik:

```env
NODE_ENV=production
```

### LIVE_MODE

Gebruik:

```env
LIVE_MODE=true
```

Dan weigert het panel te starten als de token onveilig of nog een placeholder is.

### PORT

Standaard:

```env
PORT=3000
```

Open dan:

```text
http://localhost:3000
```

### AGENT_TOKEN

Dit is het gedeelde geheim tussen Control Panel en Agent.

Regels:

- minimaal 24 tekens
- niet in GitHub zetten
- niet delen in screenshots
- exact hetzelfde invullen bij Agent en Panel

---

## Agent `.env`

Bestand:

```text
apps/dynathi-agent/.env
```

Voorbeeld:

```env
LIVE_MODE=true
AGENT_NAME=compute-nl-01
CONTROL_PANEL_URL=http://localhost:3000
AGENT_TOKEN=DEZELFDE_TOKEN
REPORT_INTERVAL_SECONDS=30
CPU_PAUSE_PERCENT=85
RAM_PAUSE_PERCENT=85
MANAGE_CPU_TASK=false
```

### AGENT_NAME

Geef iedere machine een unieke naam.

Voorbeelden:

```text
compute-nl-01
compute-de-01
game-nl-01
backup-be-01
```

### CONTROL_PANEL_URL

Zelfde pc:

```env
CONTROL_PANEL_URL=http://localhost:3000
```

Andere pc op lokaal netwerk:

```env
CONTROL_PANEL_URL=http://192.168.1.50:3000
```

Gebruik voor publieke handleidingen nooit je echte thuis-IP.

### REPORT_INTERVAL_SECONDS

Hoe vaak de Agent rapporteert.

Aanbevolen:

```env
REPORT_INTERVAL_SECONDS=30
```

### CPU_PAUSE_PERCENT

Bij deze CPU-belasting wordt een optionele low-priority taak gestopt.

Aanbevolen:

```env
CPU_PAUSE_PERCENT=85
```

### RAM_PAUSE_PERCENT

Bij deze RAM-belasting wordt een optionele taak gestopt.

Aanbevolen:

```env
RAM_PAUSE_PERCENT=85
```

### MANAGE_CPU_TASK

Eerste installatie:

```env
MANAGE_CPU_TASK=false
```

Pas later inschakelen wanneer start/stop commands getest zijn.
