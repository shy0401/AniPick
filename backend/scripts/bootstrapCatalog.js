require('dotenv').config();
const { prefetchAndCacheAnimeCatalog } = require('../src/services/anime-prefetch.service');
const { createMissingTranslationJobs } = require('../src/services/translation-job.service');

function getArg(name, fallback = '') {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

(async () => {
  try {
    const limit = Number(getArg('limit', process.env.PRETRANSLATE_LIMIT || 30));
    const langs = getArg('langs', 'ko,ja').split(',').map((lang) => lang.trim());

    console.log('[BOOTSTRAP] metadata prefetch started');
    const prefetchSummary = await prefetchAndCacheAnimeCatalog();
    console.log('[BOOTSTRAP] metadata prefetch completed:', prefetchSummary);

    console.log('[BOOTSTRAP] translation job creation started');
    const jobs = await createMissingTranslationJobs({ langs, limit, requestedBy: 'BOOTSTRAP' });
    console.log(`[BOOTSTRAP] translation jobs created: ${jobs.length}`);
    process.exit(0);
  } catch (error) {
    console.error('[BOOTSTRAP] failed:', error.message);
    process.exit(1);
  }
})();
