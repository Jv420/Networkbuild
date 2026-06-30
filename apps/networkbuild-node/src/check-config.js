require('dotenv').config();

const required = ['PORT'];
const warnings = [];

for (const key of required) {
  if (!process.env[key]) warnings.push(`Missing optional config: ${key}`);
}

if ((process.env.DISCORD_WEBHOOK_URL || '').includes('CHANGE_ME')) {
  warnings.push('DISCORD_WEBHOOK_URL is still a placeholder. That is fine for local testing.');
}

console.log('Dynathi Networkbuild config check');
console.log('-----------------------------------');

if (warnings.length === 0) {
  console.log('OK: no warnings.');
} else {
  for (const warning of warnings) console.log(`WARN: ${warning}`);
}
