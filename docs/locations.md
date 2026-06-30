# Locations

Deze file beschrijft locaties zonder gevoelige informatie.

Gebruik alleen publieke, veilige namen.

## Locatie-indeling

```text
home-nl-01
├── Rol: lab / gaming / development
├── Type: thuislocatie
├── Public IP: niet publiceren
└── Beheer: WireGuard only

vps-nl-01
├── Rol: gateway / websites / status
├── Type: VPS of dedicated server
├── Public IP: gebruik placeholder in docs
└── Beheer: SSH key + WireGuard

node-de-01
├── Rol: compute / backup / failover
├── Type: VPS / mini server / dedicated
└── Beheer: WireGuard only

node-be-01
├── Rol: disaster recovery / secondary backup
├── Type: VPS / mini server / partnerlocatie
└── Beheer: WireGuard only
```

## Naming convention

```text
<type>-<country>-<number>
```

Voorbeelden:

- `vps-nl-01`
- `node-de-01`
- `backup-be-01`
- `game-nl-01`
- `compute-de-01`

## Locatiekeuze

### Nederland

Goed voor:

- Minecraft Benelux
- websites
- centrale gateway
- lage latency

### Duitsland

Goed voor:

- compute
- backup
- prijs/prestatie
- failover

### België

Goed voor:

- disaster recovery
- geografische spreiding
- Benelux diensten

## Public-safe regel

Nooit echte adressen, privé IP's, thuis IP's of namen van externe locaties publiceren zonder reden.
