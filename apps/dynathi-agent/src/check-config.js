require('dotenv').config();

const required = ['AGENT_NAME', 'CONTROL_PANEL_URL', 'AGENT_TOKEN'];
let ok = true;

console.log('Dynathi Agent config check');
console.log('---------------------------');

for (const key of required) {
  if (!process.env[key] || process.env[key].includes('CHANGE_ME')) {
    console.log(`WARN: ${key} is missing or still placeholder.`);
    ok = false;
  } else {
    console.log(`OK: ${key} is set.`);
  }
}

console.log(ok ? 'Config looks ready.' : 'Config needs attention before production.');
