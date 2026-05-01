require('dotenv').config();
const { prefetchAndCacheAnimeCatalog } = require('../src/services/anime-prefetch.service');

(async () => {
  try {
    console.log('[BOOT] Prefetch anime catalog started');
    const summary = await prefetchAndCacheAnimeCatalog();
    console.log('[BOOT] Prefetch anime catalog completed:', summary);
    process.exit(0);
  } catch (error) {
    console.error('[BOOT] Prefetch anime catalog failed:', error.message);
    process.exit(1);
  }
})();
