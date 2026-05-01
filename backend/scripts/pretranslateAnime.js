require('dotenv').config();
const { runTranslationJobs } = require('../src/services/translation-job.service');

function getArg(name, fallback = '') {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

(async () => {
  try {
    const limit = Number(getArg('limit', process.env.PRETRANSLATE_LIMIT || 30));
    const langs = getArg('langs', 'ko,ja').split(',').map((lang) => lang.trim());
    const overwrite = getArg('overwrite', 'false') === 'true';

    console.log('[JOBS] translation job runner started');
    const summary = await runTranslationJobs({ langs, limit, overwrite });
    console.log('[JOBS] translation job runner completed:', summary);
    process.exit(0);
  } catch (error) {
    console.error('[JOBS] translation job runner failed:', error.message);
    process.exit(1);
  }
})();
