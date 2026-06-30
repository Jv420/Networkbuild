# v1.0 Live Checklist

Gebruik deze checklist voordat je Dynathi Networkbuild live draait op je Windows 10 i3.

## Voorbereiding

- [ ] Node.js LTS geïnstalleerd
- [ ] Git geïnstalleerd of repository ZIP gedownload
- [ ] Repository staat lokaal op de pc
- [ ] Geen echte secrets in GitHub
- [ ] `.env` bestanden lokaal aangemaakt

## Control Panel

- [ ] `apps/networkbuild-node/.env` bestaat
- [ ] `LIVE_MODE=true`
- [ ] `AGENT_TOKEN` is minimaal 24 tekens
- [ ] `AGENT_TOKEN` is niet gedeeld met onbevoegden
- [ ] `npm install` uitgevoerd
- [ ] `npm start` werkt handmatig
- [ ] `http://localhost:3000/api/health` geeft `ok: true`
- [ ] `http://localhost:3000/api/status` werkt

## Agent

- [ ] `apps/dynathi-agent/.env` bestaat
- [ ] `LIVE_MODE=true`
- [ ] `AGENT_NAME=compute-nl-01` of eigen naam
- [ ] `CONTROL_PANEL_URL=http://localhost:3000` of juiste URL
- [ ] `AGENT_TOKEN` is exact hetzelfde als in control panel
- [ ] `MANAGE_CPU_TASK=false` voor eerste live test
- [ ] `npm install` uitgevoerd
- [ ] `npm run check` uitgevoerd
- [ ] `npm start` werkt handmatig
- [ ] Agent verschijnt op `http://localhost:3000/api/agents`

## Windows autostart

- [ ] Control Panel startup task geïnstalleerd
- [ ] Agent startup task geïnstalleerd
- [ ] Pc herstart getest
- [ ] Dashboard komt terug na herstart
- [ ] Agent meldt zich terug na herstart

## Compute/mining taken

- [ ] MYST draait eerst los/stabiel buiten de agent
- [ ] Agent task manager blijft uit tot commands getest zijn
- [ ] Geen wallet seed/private keys in `.env`
- [ ] Geen geheime node configs in GitHub

## Klaar voor eerste live test

Als alles hierboven afgevinkt is, is v1.0 klaar voor een eerste lokale live deployment.
