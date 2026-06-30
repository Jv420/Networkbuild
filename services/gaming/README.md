# Gaming Services

Deze map is voor Dynathi gaming-infrastructuur zoals Minecraft, Discord bots, RCON workers en game dashboards.

## Doel

Gaming services gescheiden houden van development, compute en privé-netwerk.

## Aanbevolen onderdelen

```text
Gaming VLAN / VM
├── Minecraft Java
├── Geyser/Floodgate
├── RCON worker
├── Discord bot
├── Webshop webhook receiver
└── Backups
```

## Public-safe regels

Niet committen:

- `server.properties` met echte IP's of RCON gegevens
- plugin configs met tokens
- Discord bot token
- RCON wachtwoord
- database gegevens
- playerdata of worlds

Wel committen:

- voorbeeldconfiguraties
- scripts zonder secrets
- documentatie
- plugin-lijsten

## Eerste services

- Minecraft server template
- RCON worker template
- backup script template
- monitoring endpoints
