require('dotenv').config();
const fs = require('fs');
const net = require('net');
const path = require('path');

const app = require('./app');

const DEFAULT_START_PORT = 4001;
const MAX_PORT = 4010;

if (!process.env.JWT_SECRET) {
  console.warn('[WARN] JWT_SECRET is not set. Please configure it in your .env file.');
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const tester = net.createServer();

    tester.once('error', () => resolve(false));
    tester.once('listening', () => {
      tester.close(() => resolve(true));
    });

    tester.listen({ port, host: '::', exclusive: true });
  });
}

function writeRuntimePort(port) {
  const backendPortFile = path.resolve(__dirname, '../.runtime-port');
  const rootPortFile = path.resolve(__dirname, '../../.runtime-backend-port');
  const value = String(port);

  fs.writeFileSync(backendPortFile, value, 'utf-8');
  fs.writeFileSync(rootPortFile, value, 'utf-8');

  console.log('Runtime backend port saved to backend/.runtime-port');
  console.log('Runtime backend port saved to .runtime-backend-port');
}

function listenOnPort(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => resolve(server));
    server.once('error', (error) => reject(error));
  });
}

async function start() {
  const startPort = Number(process.env.PORT) || DEFAULT_START_PORT;

  if (startPort > MAX_PORT) {
    console.error(
      `Start port ${startPort} is greater than max port ${MAX_PORT}. Set PORT between ${DEFAULT_START_PORT}-${MAX_PORT}.`
    );
    process.exit(1);
  }

  for (let port = startPort; port <= MAX_PORT; port += 1) {
    // eslint-disable-next-line no-await-in-loop
    const prechecked = await isPortAvailable(port);
    if (!prechecked) continue;

    try {
      // eslint-disable-next-line no-await-in-loop
      await listenOnPort(port);
      writeRuntimePort(port);
      console.log(`AniPick backend server listening on port ${port}`);
      console.log(`Health check: http://localhost:${port}/health`);
      return;
    } catch (error) {
      if (error.code === 'EADDRINUSE') continue;
      console.error('Failed to start server:', error.message);
      process.exit(1);
    }
  }

  console.error(`No available port found between ${startPort} and ${MAX_PORT}.`);
  process.exit(1);
}

start().catch((error) => {
  console.error('Failed to bootstrap server:', error.message);
  process.exit(1);
});
