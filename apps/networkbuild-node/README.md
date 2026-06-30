# Dynathi Networkbuild Node.js Starter

Node.js starter platform voor Dynathi Infrastructure.

## Wat zit erin?

- Web dashboard
- `/api/health`
- `/api/status`
- veilige opt-in compute demo
- `.env.example`
- public-safe projectstructuur

## Belangrijk over website compute

Deze app bevat **geen verborgen cryptominer**. De compute demo start alleen nadat een gebruiker bewust op de knop klikt. Gebruik nooit bezoekers-CPU zonder duidelijke toestemming.

## Installeren

```bash
cd apps/networkbuild-node
npm install
cp .env.example .env
npm start
```

Open daarna:

```text
http://localhost:3000
```

## Development mode

```bash
npm run dev
```

## Config check

```bash
npm run check
```

## API endpoints

```text
GET  /api/health
GET  /api/status
POST /api/compute/demo
```

Voorbeeld compute demo:

```bash
curl -X POST http://localhost:3000/api/compute/demo \
  -H "Content-Type: application/json" \
  -d '{"seconds":5}'
```

## Productieadvies

- Draai achter een reverse proxy.
- Gebruik HTTPS.
- Gebruik echte secrets alleen lokaal of via deployment secrets.
- Zet compute taken nooit aan zonder opt-in en duidelijke uitleg.
