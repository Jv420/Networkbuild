# Dynathi Networkbuild

Public-safe repository voor de Dynathi Infrastructure / Networkbuild setup.

Doel: een veilige, schaalbare infrastructuur bouwen voor gaming, development, hosting, compute en toekomstige nodes over meerdere locaties.

## Belangrijk

Deze repository is publiek. Zet hier nooit echte geheimen of productiegegevens in.

Niet committen:

- wachtwoorden
- API keys
- private keys
- wallet seed phrases
- WireGuard private keys
- echte IP-adressen van thuislocaties
- klantgegevens
- database dumps
- `.env` bestanden
- RCON wachtwoorden
- Stripe secrets
- hosting panel tokens

Wel toegestaan:

- voorbeeldconfiguraties
- documentatie
- installatiescripts zonder secrets
- `.example` bestanden
- publieke architectuurschema's
- security-checklists

## Projectstructuur

```text
Networkbuild/
├── docs/
│   ├── architecture.md
│   ├── security.md
│   ├── privacy.md
│   └── locations.md
├── infrastructure/
│   ├── docker/
│   ├── wireguard/
│   ├── monitoring/
│   └── backups/
├── templates/
│   ├── env.example
│   ├── docker-compose.example.yml
│   └── wireguard.example.conf
└── scripts/
    └── README.md
```

## Eerste doel

Versie 0.1 bouwt een veilige starterbasis:

- public-safe documentatie
- Docker Compose template
- WireGuard template
- monitoring planning
- backup planning
- multi-location architectuur

## Visie

Dynathi Infrastructure wordt opgebouwd als een gedistribueerd netwerk:

```text
Home NL
│
├── Proxmox / Docker
├── Minecraft / Gaming
├── Development services
└── Monitoring

Netherlands VPS
│
├── Public websites
├── API gateway
└── Backup endpoint

Germany Node
│
├── Compute
├── Backup
└── Failover

Belgium Node
│
├── Disaster recovery
└── Secondary services
```

## Status

Projectfase: planning / public-safe foundation.
