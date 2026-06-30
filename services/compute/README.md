# Compute Services

Deze map is voor vrije servercapaciteit: batch jobs, approved blockchain nodes, AI/render taken en resource orchestration.

## Belangrijk

Compute mag nooit de primaire diensten verstoren.

Prioriteit:

```text
1. Management en veiligheid
2. Gaming / klanten / websites
3. Backups
4. Compute taken
```

## Toegestane compute taken

Alleen taken die passen binnen:

- wetgeving
- provider terms
- project terms
- stroomkosten en hardwarelimieten
- netwerkveiligheid

## Resource orchestration idee

```text
Server rustig
↓
Compute taak mag draaien

Server druk
↓
Compute taak stopt automatisch
```

## Public-safe regels

Niet committen:

- wallet seed phrases
- private keys
- node identity secrets
- echte provider tokens
- echte node configs met gevoelige informatie

Wel committen:

- voorbeeldscripts
- resource manager logic
- documentatie
- monitoring templates
