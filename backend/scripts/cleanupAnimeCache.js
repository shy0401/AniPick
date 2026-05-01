const { spawnSync } = require('node:child_process');
const path = require('node:path');

const scriptPath = path.resolve(__dirname, 'repairAnimeCache.js');
const forwardedArgs = process.argv.slice(2);
const args = [scriptPath, '--cleanup-ghosts', ...forwardedArgs];

const result = spawnSync(process.execPath, args, {
  stdio: 'inherit',
  env: process.env,
});

if (typeof result.status === 'number') {
  process.exit(result.status);
}

process.exit(1);

