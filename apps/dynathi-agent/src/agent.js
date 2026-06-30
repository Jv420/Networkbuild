require('dotenv').config();

const os = require('os');
const { exec } = require('child_process');

const agentName = process.env.AGENT_NAME || os.hostname();
const controlPanelUrl = process.env.CONTROL_PANEL_URL || 'http://localhost:3000';
const agentToken = process.env.AGENT_TOKEN || 'CHANGE_ME';
const intervalSeconds = clampNumber(process.env.REPORT_INTERVAL_SECONDS, 10, 3600, 30);
const cpuPausePercent = clampNumber(process.env.CPU_PAUSE_PERCENT, 50, 100, 85);
const ramPausePercent = clampNumber(process.env.RAM_PAUSE_PERCENT, 50, 100, 85);
const manageCpuTask = String(process.env.MANAGE_CPU_TASK || 'false') === 'true';
const liveMode = String(process.env.LIVE_MODE || 'false') === 'true';

let cpuTaskRunning = false;
let previousCpuTimes = readCpuTimes();
let lastCpuPercent = 0;

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, number));
}

function assertProductionConfig() {
  const problems = [];

  if (!agentName || agentName.includes('CHANGE_ME')) problems.push('AGENT_NAME is missing or still placeholder.');
  if (!controlPanelUrl || controlPanelUrl.includes('CHANGE_ME')) problems.push('CONTROL_PANEL_URL is missing or still placeholder.');
  if (!agentToken || agentToken.includes('CHANGE_ME') || agentToken.length < 24) problems.push('AGENT_TOKEN must be a long random token of at least 24 characters.');

  try {
    new URL(controlPanelUrl);
  } catch {
    problems.push('CONTROL_PANEL_URL is not a valid URL.');
  }

  if (liveMode && problems.length > 0) {
    console.error('Dynathi Agent refused to start in LIVE_MODE:');
    for (const problem of problems) console.error(`- ${problem}`);
    process.exit(1);
  }

  if (problems.length > 0) {
    console.log('Config warnings:');
    for (const problem of problems) console.log(`- ${problem}`);
  }
}

function runCommand(command) {
  return new Promise((resolve) => {
    if (!command || command.includes('placeholder')) {
      return resolve({ ok: true, skipped: true, output: 'Placeholder command skipped.' });
    }

    exec(command, { windowsHide: true, timeout: 30000 }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        output: String(stdout || '').trim().slice(0, 2000),
        error: String(stderr || error?.message || '').trim().slice(0, 2000)
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

function readCpuTimes() {
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;

  for (const cpu of cpus) {
    idle += cpu.times.idle;
    total += cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq;
  }

  return { idle, total };
}

function getCpuSnapshot() {
  const current = readCpuTimes();
  const idleDelta = current.idle - previousCpuTimes.idle;
  const totalDelta = current.total - previousCpuTimes.total;
  previousCpuTimes = current;

  if (totalDelta > 0) {
    lastCpuPercent = Math.max(0, Math.min(100, Math.round(100 - (idleDelta / totalDelta) * 100)));
  }

  return {
    cpuCount: os.cpus().length,
    usedPercent: lastCpuPercent,
    loadAverage: os.loadavg()
  };
}

async function manageLocalTasks(snapshot) {
  if (!manageCpuTask) return;

  const tooBusy = snapshot.cpu.usedPercent >= cpuPausePercent || snapshot.memory.usedPercent >= ramPausePercent;

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
    const response = await fetch(`${controlPanelUrl.replace(/\/$/, '')}/api/agents/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${agentToken}`
      },
      body: JSON.stringify(snapshot)
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.log(`Report failed: HTTP ${response.status} ${body.slice(0, 200)}`);
      return;
    }

    console.log(`Reported ${agentName} | CPU ${snapshot.cpu.usedPercent}% | RAM ${snapshot.memory.usedPercent}%`);
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
      cpuTaskRunning,
      manageCpuTask
    },
    timestamp: new Date().toISOString()
  };

  await manageLocalTasks(snapshot);
  await report(snapshot);
}

assertProductionConfig();

console.log(`Dynathi Agent starting: ${agentName}`);
console.log(`Control panel: ${controlPanelUrl}`);
console.log(`Live mode: ${liveMode ? 'enabled' : 'disabled'}`);
console.log(`CPU task manager: ${manageCpuTask ? 'enabled' : 'disabled'}`);

setInterval(tick, intervalSeconds * 1000);
tick();
