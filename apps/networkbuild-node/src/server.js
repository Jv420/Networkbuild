require('dotenv').config();

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const os = require('os');

const app = express();
const port = Number(process.env.PORT || 3000);
const appName = process.env.APP_NAME || 'Dynathi Networkbuild';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"]
    }
  }
}));
app.use(express.json({ limit: '100kb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

function getSystemSnapshot() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  return {
    app: appName,
    status: 'online',
    uptimeSeconds: Math.round(process.uptime()),
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    cpuCount: os.cpus().length,
    loadAverage: os.loadavg(),
    memory: {
      totalMb: Math.round(totalMem / 1024 / 1024),
      usedMb: Math.round(usedMem / 1024 / 1024),
      freeMb: Math.round(freeMem / 1024 / 1024),
      usedPercent: Math.round((usedMem / totalMem) * 100)
    },
    timestamp: new Date().toISOString()
  };
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: appName, timestamp: new Date().toISOString() });
});

app.get('/api/status', (req, res) => {
  res.json(getSystemSnapshot());
});

app.post('/api/compute/demo', (req, res) => {
  const enabled = String(process.env.COMPUTE_DEMO_ENABLED || 'true') === 'true';
  if (!enabled) {
    return res.status(403).json({ ok: false, error: 'Compute demo is disabled.' });
  }

  const secondsRaw = Number(req.body?.seconds || process.env.COMPUTE_DEFAULT_SECONDS || 15);
  const seconds = Math.max(1, Math.min(secondsRaw, 30));

  const startedAt = Date.now();
  let hashes = 0;
  let value = 'dynathi-networkbuild-demo';

  // Safe opt-in demo workload. This is not real mining and does not run secretly.
  while (Date.now() - startedAt < seconds * 1000) {
    value = require('crypto').createHash('sha256').update(value + hashes).digest('hex');
    hashes++;
  }

  res.json({
    ok: true,
    message: 'Opt-in compute demo completed. This is not hidden browser mining.',
    seconds,
    hashes,
    lastHashPreview: value.slice(0, 16),
    timestamp: new Date().toISOString()
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`${appName} running on http://localhost:${port}`);
});
