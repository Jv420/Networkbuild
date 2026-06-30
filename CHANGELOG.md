# Changelog

## v1.0.0

Eerste public-safe live basisrelease van Dynathi Networkbuild.

### Toegevoegd

- Node.js Control Panel
- Dynathi Agent
- Agent reporting API
- Health endpoint
- Status endpoint
- Agents endpoint
- Live mode configuratie
- Windows startup task voor Control Panel
- Windows startup task voor Agent
- Agent log wrapper
- Public-safe security documentatie
- Privacy richtlijnen
- Multi-location architectuur
- Monitoring documentatie
- Backup documentatie
- Compute module documentatie
- Gaming module documentatie
- Development module documentatie

### Veiligheidskeuzes

- Geen echte secrets in de repository
- Alleen `.example` configuraties
- `.env` bestanden uitgesloten via `.gitignore`
- Agent authenticatie met gedeelde bearer token
- Live mode weigert placeholder tokens
- Agent task management standaard uitgeschakeld

### Bekende beperkingen

- Nog geen gebruikers-login voor dashboard
- Nog geen database-authenticatie of rollen
- Nog geen automatische GitHub updater
- Nog geen echte MYST API-integratie
- Nog geen grafieken met historie
- Nog geen native Windows service, alleen Taakplanner
