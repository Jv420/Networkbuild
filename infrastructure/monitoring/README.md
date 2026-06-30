# Monitoring

Monitoring houdt alle locaties, services en servers in de gaten.

## Starter stack

- Uptime Kuma voor simpele uptime checks
- Discord webhook alerts
- Later: Prometheus + Grafana
- Later: Node Exporter per server

## Te monitoren onderdelen

```text
Public Gateway
├── HTTP 80/443
├── Reverse proxy
└── Status page

Gaming
├── Minecraft Java port
├── Bedrock port
├── RCON worker health endpoint
└── Discord bot

Development
├── Staging websites
├── APIs
└── Databases

Compute
├── CPU/RAM usage
├── Docker containers
└── Node status

Backups
├── Laatste backup tijd
├── Backup grootte
└── Restore test status
```

## Alert niveaus

```text
INFO     = melding, geen actie nodig
WARNING  = controleren binnen 24 uur
CRITICAL = direct actie nodig
```

## Public-safe waarschuwing

Publiceer geen monitoring screenshots met echte IP's, tokens of klantnamen.
