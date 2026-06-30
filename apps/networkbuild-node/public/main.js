async function loadStatus() {
  const statusEl = document.getElementById('status');
  statusEl.textContent = 'Status laden...';

  try {
    const response = await fetch('/api/status');
    const data = await response.json();
    statusEl.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    statusEl.textContent = `Fout bij status laden: ${error.message}`;
  }
}

function renderAgents(agents) {
  if (!agents.length) {
    return '<p>Nog geen agents gezien.</p>';
  }

  return agents.map((agent) => {
    const online = agent.online ? 'online' : 'offline';
    const cpu = agent.cpu?.usedPercent ?? '?';
    const ram = agent.memory?.usedPercent ?? '?';
    const age = agent.ageSeconds ?? '?';

    return `
      <div class="agent ${online}">
        <strong>${agent.agentName}</strong>
        <span>${online.toUpperCase()}</span>
        <small>CPU: ${cpu}% | RAM: ${ram}% | Laatst gezien: ${age}s geleden</small>
      </div>
    `;
  }).join('');
}

async function loadAgents() {
  const agentsEl = document.getElementById('agents');
  agentsEl.textContent = 'Agents laden...';

  try {
    const response = await fetch('/api/agents');
    const data = await response.json();
    agentsEl.innerHTML = renderAgents(data.agents || []);
  } catch (error) {
    agentsEl.textContent = `Fout bij agents laden: ${error.message}`;
  }
}

async function startComputeDemo() {
  const resultEl = document.getElementById('computeResult');
  const seconds = Number(document.getElementById('computeSeconds').value || 5);

  resultEl.textContent = 'Compute demo draait...';

  try {
    const response = await fetch('/api/compute/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seconds })
    });

    const data = await response.json();
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultEl.textContent = `Fout bij compute demo: ${error.message}`;
  }
}

document.getElementById('refreshStatus').addEventListener('click', loadStatus);
document.getElementById('refreshAgents').addEventListener('click', loadAgents);
document.getElementById('startCompute').addEventListener('click', startComputeDemo);

loadStatus();
loadAgents();
setInterval(loadStatus, 30000);
setInterval(loadAgents, 30000);
