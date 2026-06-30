# Privacy Guidelines

Deze richtlijnen zijn bedoeld om de publieke repository veilig te houden en privacy te beschermen.

## Niet publiceren

- Namen/adressen van klanten
- Echte thuislocaties
- Foto's van racks met serienummers
- Exacte IP-adressen van thuisnetwerken
- Facturen
- Contracten
- Wallet adressen die privé moeten blijven
- Logs met usernames, e-mails of IP-adressen

## Wel publiceren

- Algemene architectuur
- Voorbeeld IP's uit documentatieblokken
- Scripts zonder secrets
- Config templates
- Security checklist
- Roadmap

## Voorbeeld IP-ranges voor documentatie

Gebruik alleen deze documentatie IP's in publieke voorbeelden:

- 192.0.2.0/24
- 198.51.100.0/24
- 203.0.113.0/24

## Log-anonimisering

Voordat logs gedeeld worden:

- vervang IP-adressen door `x.x.x.x`
- vervang e-mails door `user@example.com`
- vervang tokens door `REDACTED`
- vervang hostnames door `server-01.example.com`

## Publieke communicatie

Gebruik in publieke docs liever:

- `home-nl`
- `node-de-01`
- `node-be-01`
- `gateway-nl-01`

In plaats van echte plaatsnamen, adressen of providers als dat gevoelig is.
