require('dotenv').config();
const { createMissingTranslationJobs } = require('../src/services/translation-job.service');

function getArg(name, fallback = '') {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

(async () => {
  try {
    const limit = Number(getArg('limit', 100));
    const langs = getArg('langs', 'ko,ja').split(',').map((lang) => lang.trim());
    const jobs = await createMissingTranslationJobs({ langs, limit, requestedBy: 'CLI' });
    console.log(`[JOBS] created translation jobs: ${jobs.length}`);
    process.exit(0);
  } catch (error) {
    console.error('[JOBS] create failed:', error.message);
    process.exit(1);
  }
})();
