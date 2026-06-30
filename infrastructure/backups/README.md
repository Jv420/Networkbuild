# Backups

Backups zijn essentieel voor Dynathi Infrastructure.

## Backupregel 3-2-1

```text
3 kopieën van belangrijke data
2 verschillende opslagmedia/locaties
1 kopie buiten de hoofdlocatie
```

## Wat moet geback-upt worden?

### Gaming

- Minecraft worlds
- plugin configs zonder secrets
- permissions/ranks exports
- store/order database

### Development

- databases
- uploads
- deployment configs
- klantprojecten

### Infrastructure

- Proxmox VM backups
- Docker Compose files
- monitoring data
- firewall config exports

## Wat niet in GitHub hoort

- echte backup archives
- database dumps
- playerdata
- klantgegevens
- private configs

## Backup planning

```text
Dagelijks   = kleine service backups
Wekelijks   = volledige VM/container backup
Maandelijks = offline/offsite backup
Per kwartaal = restore test
```

## Restore test

Een backup is pas goed als restore werkt.

Checklist:

- backup downloaden
- uitpakken
- testomgeving starten
- controleren of service werkt
- resultaat documenteren
