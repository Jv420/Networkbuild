# Security Policy

Deze repository is public-safe. Alle echte productiegegevens blijven buiten GitHub of worden alleen opgeslagen als GitHub Secrets.

## Gouden regels

1. Commit nooit echte secrets.
2. Gebruik alleen `.example` bestanden voor configs.
3. Gebruik sterke, unieke wachtwoorden per dienst.
4. Gebruik MFA op GitHub, hosting, domeinprovider, Stripe en wallets.
5. Scheid privé, zakelijk, gaming, compute en testing.
6. Geef elke locatie een eigen firewall en VPN-toegang.
7. Maak backups buiten dezelfde locatie.
8. Test restores, niet alleen backups.
9. Log toegang tot beheerderspanelen.
10. Gebruik least privilege: accounts krijgen alleen wat ze nodig hebben.

## Secrets die nooit in deze repo mogen

- Wallet seed phrase
- Private key
- RCON password
- Database password
- Stripe secret key
- Discord bot token
- GitHub token
- WireGuard private key
- Hosting/VPS panel token
- Cloudflare API token
- Klantgegevens

## Public-safe voorbeelden

Goed:

```env
DB_PASSWORD=CHANGE_ME
SERVER_IP=203.0.113.10
WIREGUARD_PRIVATE_KEY=CHANGE_ME
```

Fout:

```env
DB_PASSWORD=een-echt-wachtwoord
SERVER_IP=echt-thuis-ip
WIREGUARD_PRIVATE_KEY=echte-private-key
```

## Netwerkscheiding

Aanbevolen zones:

```text
Management VLAN
├── Proxmox
├── Firewall
└── Monitoring

Gaming VLAN
├── Minecraft
└── Game panels

Development VLAN
├── Git runners
├── Test apps
└── Databases

Compute VLAN
├── Nodes
├── Batch jobs
└── Blockchain/compute taken

Guest/IoT VLAN
└── Geen toegang tot management
```

## Incident checklist

Als er per ongeluk een secret is gelekt:

1. Verwijder het bestand niet alleen; roteer de secret direct.
2. Maak een nieuwe key/token aan.
3. Trek de oude key/token in.
4. Controleer logs op misbruik.
5. Pas `.gitignore` aan.
6. Documenteer wat er is gebeurd.

## Productieadvies

Voor productieconfigs liever gebruiken:

- GitHub Actions Secrets
- lokale `.env` bestanden
- password manager
- aparte secret manager
- SSH keys met passphrase
