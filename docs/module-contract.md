# Module Contract

Dit document beschrijft hoe toekomstige Dynathi modules veilig moeten werken.

## Module doelen

Een module mag:

- status uitlezen
- lokale taken starten/stoppen
- logs samenvatten
- metrics rapporteren

Een module mag niet:

- wallet seed phrases opslaan
- private keys naar het control panel sturen
- echte secrets naar GitHub schrijven
- zonder expliciete configuratie miners starten
- bezoekers-CPU gebruiken zonder duidelijke toestemming

## Agent task model

Elke task/module moet minimaal hebben:

```json
{
  "name": "module-name",
  "enabled": false,
  "startCommand": "CHANGE_ME",
  "stopCommand": "CHANGE_ME",
  "statusCommand": "CHANGE_ME",
  "priority": "low"
}
```

## Prioriteiten

```text
critical = monitoring/security
high     = gaming/hosting/klanten
normal   = development/backups
low      = compute/mining/batch jobs
```

Low priority tasks moeten stoppen als CPU/RAM boven de ingestelde limieten komt.

## Public-safe regel

Alle echte commands blijven lokaal in `.env` of lokale configbestanden.

GitHub bevat alleen:

- `.example` configs
- documentatie
- veilige defaults
- placeholders

## MYST module richting

De MYST module moet starten als lokale wrapper rond de officiële Mysterium Node software.

De module mag rapporteren:

- node online/offline
- process running yes/no
- lokale status output samenvatting
- laatste check tijd

De module mag niet rapporteren:

- private keys
- wallet seed
- gevoelige accounttokens
