import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function readBackendPort() {
  const portFile = path.resolve(__dirname, '../.runtime-backend-port');

  try {
    const raw = fs.readFileSync(portFile, 'utf-8').trim();
    const port = Number(raw);
    if (Number.isInteger(port) && port > 0) return port;
    return 4001;
  } catch {
    return 4001;
  }
}

const backendPort = readBackendPort();
const backendProxyTarget =
  process.env.VITE_API_PROXY_TARGET ||
  process.env.API_PROXY_TARGET ||
  `http://localhost:${backendPort}`;

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: backendProxyTarget,
        changeOrigin: true,
      },
    },
  },
});
