require('dotenv').config();

const path = require('path');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const os = require('os');
const crypto = require('crypto');

const app = express();
const port = Number(process.env.PORT || 3000);
const appName = process.env.APP_NAME || 'Dynathi Networkbuild';
const agentToken = process.env.AGENT_TOKEN || 'CHANGE_ME_LONG_RANDOM_TOKEN';
const liveMode = String(process.env.LIVE_MODE || 'false') === 'true';
const dataDir = path.join(__dirname, '..', 'data');
const agentsFile = path.join(dataDir, 'agents.json');
const agents = new Map();

function assertProductionConfig() {
  const problems = [];

  if (!agentToken || agentToken.includes('CHANGE_ME') || agentToken.length < 24) {
    problems.push('AGENT_TOKEN must be a long random token of at least 24 characters.');
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    problems.push('PORT must be a valid TCP port.');
  }

  if (liveMode && problems.length > 0) {
    console.error('Dynathi Control Panel refused to start in LIVE_MODE:');
    for (const problem of problems) console.error(`- ${problem}`);
    process.exit(1);
  }

  if (problems.length > 0) {
    console.log('Config warnings:');
    for (const problem of problems) console.log(`- ${problem}`);
  }
}

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

function loadAgents() {
  ensureDataDir();
  if (!fs.existsSync(agentsFile)) return;

  try {
    const parsed = JSON.parse(fs.readFileSync(agentsFile, 'utf8'));
    for (const agent of parsed.agents || []) {
      if (agent.agentName) agents.set(agent.agentName, agent);
    }
  } catch (error) {
    console.log(`Could not load agents file: ${error.message}`);
  }
}

function saveAgents() {
  ensureDataDir();
  const payload = {
    savedAt: new Date().toISOString(),
    agents: Array.from(agents.values())
  };
  fs.writeFileSync(agentsFile, JSON.stringify(payload, null, 2));
}

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
    liveMode,
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
    agentCount: agents.size,
    timestamp: new Date().toISOString()
  };
}

function safeCompare(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function requireAgentAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token || agentToken.includes('CHANGE_ME') || !safeCompare(token, agentToken)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized agent.' });
  }

  next();
}

function sanitizeReport(report) {
  return {
    agentName: String(report.agentName || '').slice(0, 80),
    hostname: String(report.hostname || '').slice(0, 120),
    platform: String(report.platform || '').slice(0, 40),
    arch: String(report.arch || '').slice(0, 40),
    uptimeSeconds: Number(report.uptimeSeconds || 0),
    memory: report.memory || {},
    cpu: report.cpu || {},
    tasks: report.tasks || {},
    timestamp: String(report.timestamp || new Date().toISOString()).slice(0, 80),
    lastSeen: new Date().toISOString()
  };
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: appName, timestamp: new Date().toISOString() });
});

app.get('/api/status', (req, res) => {
  res.json(getSystemSnapshot());
});

app.get('/api/agents', (req, res) => {
  const now = Date.now();
  const list = Array.from(agents.values()).map((agent) => {
    const lastSeenMs = Date.parse(agent.lastSeen || 0);
    const ageSeconds = Number.isFinite(lastSeenMs) ? Math.round((now - lastSeenMs) / 1000) : null;
    return {
      ...agent,
      ageSeconds,
      online: ageSeconds !== null && ageSeconds <= 120
    };
  });

  res.json({
    ok: true,
    agents: list.sort((a, b) => a.agentName.localeCompare(b.agentName)),
    timestamp: new Date().toISOString()
  });
});

app.post('/api/agents/report', requireAgentAuth, (req, res) => {
  const report = req.body || {};

  if (!report.agentName || typeof report.agentName !== 'string') {
    return res.status(400).json({ ok: false, error: 'Missing agentName.' });
  }

  const sanitized = sanitizeReport(report);
  agents.set(sanitized.agentName, sanitized);
  saveAgents();

  res.json({ ok: true });
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
    value = crypto.createHash('sha256').update(value + hashes).digest('hex');
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

assertProductionConfig();
loadAgents();

app.listen(port, () => {
  console.log(`${appName} running on http://localhost:${port}`);
  console.log(`Live mode: ${liveMode ? 'enabled' : 'disabled'}`);
  console.log(`Loaded agents: ${agents.size}`);
});
