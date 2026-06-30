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
document.getElementById('startCompute').addEventListener('click', startComputeDemo);

loadStatus();
