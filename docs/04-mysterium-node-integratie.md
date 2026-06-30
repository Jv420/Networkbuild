# Mysterium Node integreren met Dynathi Agent

Deze integratie moet voorzichtig worden ingesteld. Laat je Mysterium Node eerst zelfstandig goed werken.

## Belangrijk

Zet nooit deze gegevens in GitHub:

- wallet seed phrase
- private key
- accounttoken
- echte node-identiteit
- gevoelige logs

## Stap 1 - Test Mysterium los

Start je officiële Mysterium Node zoals je dat normaal doet.

Controleer:

- node draait
- verbinding werkt
- uitbetalingen werken
- Windows blijft stabiel

## Stap 2 - Laat Agent-management nog uit

Gebruik eerst:

```env
MANAGE_CPU_TASK=false
```

De Agent rapporteert dan alleen systeemstatus.

## Stap 3 - Lokale commands bepalen

Je hebt uiteindelijk drie lokale commands nodig:

```env
MYSTERIUM_STATUS_COMMAND=JOUW_STATUS_COMMAND
MYSTERIUM_START_COMMAND=JOUW_START_COMMAND
MYSTERIUM_STOP_COMMAND=JOUW_STOP_COMMAND
```

De exacte commands hangen af van hoe jij Mysterium hebt geïnstalleerd.

Voorbeelden kunnen zijn:

- een Windows-service starten/stoppen
- een lokaal `.exe` bestand starten
- een bestaand script aanroepen

Gebruik geen commands die gevoelige informatie in logs afdrukken.

## Stap 4 - Commands handmatig testen

Test ieder command eerst los in PowerShell.

Voorbeeld:

```powershell
JOUW_STATUS_COMMAND
```

Daarna:

```powershell
JOUW_STOP_COMMAND
```

En daarna:

```powershell
JOUW_START_COMMAND
```

Pas als dit goed werkt, mag je de Agent-config aanpassen.

## Stap 5 - Veilig inschakelen

Gebruik eerst alleen statusrapportage.

Laat de echte start/stop-integratie pas aanzetten wanneer:

- je commands betrouwbaar zijn
- de node na stop/start goed terugkomt
- geen walletgegevens worden gelogd
- je een back-up van configs hebt

## Aanbevolen werkwijze

```text
Mysterium Node = altijd zelfstandig stabiel
Dynathi Agent   = alleen monitoren
Task manager    = pas later gecontroleerd inschakelen
```

## Juridisch en netwerk

Controleer altijd:

- Mysterium Terms of Service
- voorwaarden van je internetprovider
- voorwaarden van je huurcontract
- lokale wetgeving
- netwerkisolatie van belangrijke bedrijfsdiensten
