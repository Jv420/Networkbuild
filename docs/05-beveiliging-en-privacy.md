# Beveiliging en privacy

Deze repository is publiek. Daarom moet je echte configuratie altijd lokaal houden.

## Nooit in GitHub zetten

- `.env`
- wallet seed phrase
- private keys
- API keys
- Discord bot tokens
- databasewachtwoorden
- RCON-wachtwoorden
- WireGuard private keys
- klantgegevens
- echte thuis-IP-adressen

## Wel in GitHub zetten

- `.env.example`
- voorbeeldconfiguraties
- scripts zonder geheimen
- documentatie
- placeholders

## Sterke AGENT_TOKEN maken

Gebruik minimaal 24 tekens.

Voorbeeld:

```text
Dynathi-2026-Agent-Token-Extra-Lang-8472
```

Gebruik nooit hetzelfde wachtwoord als je e-mail, GitHub of wallet.

## Windows Firewall

Voor lokaal gebruik hoeft poort 3000 meestal alleen op je eigen pc bereikbaar te zijn.

Maak het panel niet zomaar publiek op internet.

Voor later publiek gebruik:

- gebruik HTTPS
- gebruik een reverse proxy
- voeg dashboard-login toe
- gebruik rate limiting
- gebruik per-agent tokens

## Screenshots delen

Controleer screenshots altijd op:

- IP-adressen
- tokens
- e-mailadressen
- bestandsnamen met persoonsinformatie
- walletgegevens

Maak gevoelige informatie zwart voordat je screenshots deelt.

## Back-ups

Maak lokaal een back-up van:

- `.env` bestanden
- Mysterium-configuratie
- Control Panel data-map
- belangrijke scripts

Bewaar die back-up versleuteld en niet in de publieke repository.
