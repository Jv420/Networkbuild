# Dynathi Infrastructure Architecture

## Doel

Een schaalbare infrastructuur bouwen voor:

- Gaming servers
- Development projecten
- Hosting/websites
- Compute taken
- Monitoring
- Backups
- Multi-location failover

## Basisprincipes

- Public-safe documentatie
- Geen secrets in GitHub
- Scheiding tussen privé, zakelijk en test
- Elke service draait in eigen VM/container waar mogelijk
- Backups naar minimaal één andere locatie
- Monitoring centraal
- VPN-only beheer

## High-level ontwerp

```text
Internet
│
├── Public VPS / Gateway
│   ├── Reverse proxy
│   ├── Websites
│   ├── API gateway
│   └── Status page
│
├── Home NL Location
│   ├── Proxmox host
│   ├── Minecraft servers
│   ├── Docker services
│   ├── Monitoring node
│   └── Local backup storage
│
├── Germany Node
│   ├── Compute services
│   ├── Backup mirror
│   └── Failover services
│
└── Belgium Node
    ├── Disaster recovery
    ├── Secondary monitoring
    └── Backup mirror
```

## Servicegroepen

### Gaming

- Minecraft Java
- Bedrock/Geyser
- Discord bot
- RCON worker
- Store integration

### Development

- Git tools
- Test deployments
- Databases
- CI/CD runners

### Hosting

- Websites
- Reverse proxy
- SSL certificates
- API gateway

### Compute

- Batch jobs
- Approved blockchain/compute nodes
- Rendering/AI tasks later

### Monitoring

- Uptime Kuma
- Prometheus later
- Grafana later
- Alerts via Discord/Email

## Voorkeurslocaties

### Nederland

Sterk voor:

- lage latency Benelux
- Minecraft/community
- websites
- centrale gateway

### Duitsland

Sterk voor:

- goede prijs/prestatie
- compute
- backup/failover
- Europese dekking

### België

Sterk voor:

- extra geografische spreiding
- disaster recovery
- Benelux latency

## Security zones

```text
Zone 1: Management
Zone 2: Public services
Zone 3: Gaming
Zone 4: Development
Zone 5: Compute
Zone 6: Backup
Zone 7: Guest/IoT
```

Management mag naar alles. Andere zones mogen alleen wat nodig is.

## Versie 0.1 scope

- Docker starter stack
- WireGuard mesh template
- Monitoring template
- Backup plan
- Security checklist
