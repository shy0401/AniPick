require('dotenv').config();
const { getTranslationCoverage } = require('../src/services/translation-job.service');
const prisma = require('../src/lib/prisma');

(async () => {
  try {
    const coverage = await getTranslationCoverage();
    console.log(JSON.stringify(coverage, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('[COVERAGE] failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
