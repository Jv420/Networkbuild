require('dotenv').config();

const os = require('os');
const { exec } = require('child_process');

const agentName = process.env.AGENT_NAME || os.hostname();
const controlPanelUrl = process.env.CONTROL_PANEL_URL || 'http://localhost:3000';
const agentToken = process.env.AGENT_TOKEN || 'CHANGE_ME';
const intervalSeconds = Number(process.env.REPORT_INTERVAL_SECONDS || 30);
const cpuPausePercent = Number(process.env.CPU_PAUSE_PERCENT || 85);
const ramPausePercent = Number(process.env.RAM_PAUSE_PERCENT || 85);

let cpuTaskRunning = false;

function runCommand(command) {
  return new Promise((resolve) => {
    if (!command || command.includes('placeholder')) {
      return resolve({ ok: true, skipped: true, output: 'Placeholder command skipped.' });
    }

    exec(command, { windowsHide: true, timeout: 30000 }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        output: String(stdout || '').trim(),
        error: String(stderr || error?.message || '').trim()
      });
    });
  });
}

function getMemorySnapshot() {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;

  return {
    totalMb: Math.round(total / 1024 / 1024),
    freeMb: Math.round(free / 1024 / 1024),
    usedMb: Math.round(used / 1024 / 1024),
    usedPercent: Math.round((used / total) * 100)
  };
}

function getCpuSnapshot() {
  const load = os.loadavg();
  const cpuCount = os.cpus().length;
  const estimatedPercent = Math.min(100, Math.round((load[0] / Math.max(cpuCount, 1)) * 100));

  return {
    cpuCount,
    loadAverage: load,
    estimatedPercent
  };
}

async function manageLocalTasks(snapshot) {
  const tooBusy = snapshot.cpu.estimatedPercent >= cpuPausePercent || snapshot.memory.usedPercent >= ramPausePercent;

  if (tooBusy && cpuTaskRunning) {
    console.log('High load detected. Stopping optional CPU task.');
    await runCommand(process.env.CPU_TASK_STOP_COMMAND);
    cpuTaskRunning = false;
  }

  if (!tooBusy && !cpuTaskRunning) {
    console.log('Load is OK. Starting optional CPU task.');
    await runCommand(process.env.CPU_TASK_START_COMMAND);
    cpuTaskRunning = true;
  }
}

async function report(snapshot) {
  try {
    const response = await fetch(`${controlPanelUrl}/api/agents/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${agentToken}`
      },
      body: JSON.stringify(snapshot)
    });

    if (!response.ok) {
      console.log(`Report failed: HTTP ${response.status}`);
      return;
    }

    console.log(`Reported ${agentName} at ${snapshot.timestamp}`);
  } catch (error) {
    console.log(`Report error: ${error.message}`);
  }
}

async function tick() {
  const snapshot = {
    agentName,
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    uptimeSeconds: Math.round(os.uptime()),
    memory: getMemorySnapshot(),
    cpu: getCpuSnapshot(),
    tasks: {
      cpuTaskRunning
    },
    timestamp: new Date().toISOString()
  };

  await manageLocalTasks(snapshot);
  await report(snapshot);
}

console.log(`Dynathi Agent starting: ${agentName}`);
console.log(`Control panel: ${controlPanelUrl}`);

if (agentToken === 'CHANGE_ME') {
  console.log('WARNING: AGENT_TOKEN is still CHANGE_ME. Set a long random token in .env.');
}

setInterval(tick, intervalSeconds * 1000);
tick();
