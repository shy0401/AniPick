const crypto = require('crypto');
const prisma = require('../lib/prisma');
const { upsertTranslation } = require('./anime-cache.service');
const { translateAnimeText } = require('./openai-translation.service');

const FINAL_REVIEWED_STATUSES = ['REVIEWED'];
const FINAL_REVIEWED_SOURCES = ['MANUAL'];

function normalizeLangs(langs = ['ko', 'ja']) {
  const list = Array.isArray(langs) ? langs : String(langs || '').split(',');
  return [...new Set(list.map((lang) => String(lang).trim().toLowerCase()).filter((lang) => ['ko', 'ja', 'en'].includes(lang)))];
}

function buildPromptHash(anime, lang) {
  const source = [
    anime.provider,
    anime.externalId,
    lang,
    anime.englishTitle,
    anime.romajiTitle,
    anime.nativeTitle,
    anime.description,
  ].join('|');
  return crypto.createHash('sha256').update(source).digest('hex');
}

function getSourceTitle(anime) {
  return anime.englishTitle || anime.romajiTitle || anime.nativeTitle || `Anime ${anime.externalId}`;
}

function getSourceDescription(anime) {
  return String(anime.description || '').trim().slice(0, 3000);
}

function isProtectedTranslation(translation) {
  if (!translation) return false;
  return FINAL_REVIEWED_SOURCES.includes(translation.source) || FINAL_REVIEWED_STATUSES.includes(translation.status);
}

async function createMissingTranslationJobs({ langs = ['ko', 'ja'], limit = 100, requestedBy = 'SYSTEM' } = {}) {
  const safeLangs = normalizeLangs(langs);
  const safeLimit = Math.max(1, Math.min(Number(limit) || 100, 1000));
  const created = [];

  for (const lang of safeLangs) {
    // eslint-disable-next-line no-await-in-loop
    const rows = await prisma.anime.findMany({
      where: {
        dataStatus: 'ACTIVE',
        translations: {
          none: { lang },
        },
      },
      orderBy: [{ popularity: 'desc' }, { averageScore: 'desc' }, { updatedAt: 'desc' }],
      take: safeLimit,
    });

    for (const anime of rows) {
      // eslint-disable-next-line no-await-in-loop
      const job = await prisma.translationJob.upsert({
        where: {
          animeId_lang: {
            animeId: anime.id,
            lang,
          },
        },
        create: {
          animeId: anime.id,
          lang,
          status: 'PENDING',
          promptHash: buildPromptHash(anime, lang),
          requestedBy,
        },
        update: {
          status: 'PENDING',
          reason: null,
          promptHash: buildPromptHash(anime, lang),
          requestedBy,
          finishedAt: null,
        },
      });
      created.push(job);
    }
  }

  return created;
}

async function markJobRunning(jobId) {
  return prisma.translationJob.update({
    where: { id: Number(jobId) },
    data: {
      status: 'RUNNING',
      attempts: { increment: 1 },
      reason: null,
      finishedAt: null,
    },
  });
}

async function markJobDone(jobId, model = null) {
  return prisma.translationJob.update({
    where: { id: Number(jobId) },
    data: {
      status: 'DONE',
      model,
      reason: null,
      finishedAt: new Date(),
    },
  });
}

async function markJobFailed(jobId, reason) {
  const current = await prisma.translationJob.findUnique({ where: { id: Number(jobId) } });
  const nextStatus = current && current.attempts >= 3 ? 'SKIPPED' : 'FAILED';
  return prisma.translationJob.update({
    where: { id: Number(jobId) },
    data: {
      status: nextStatus,
      reason: reason || 'unknown',
      finishedAt: new Date(),
    },
  });
}

async function runOneTranslationJob(jobId, { overwrite = false } = {}) {
  const job = await prisma.translationJob.findUnique({
    where: { id: Number(jobId) },
    include: {
      anime: {
        include: {
          translations: true,
        },
      },
    },
  });

  if (!job || !job.anime) return { ok: false, reason: 'job_not_found' };
  if (job.attempts >= 3 && job.status !== 'PENDING') {
    await markJobFailed(job.id, 'max_attempts');
    return { ok: false, reason: 'max_attempts' };
  }

  const existing = (job.anime.translations || []).find((translation) => translation.lang === job.lang);
  if (existing && !overwrite && isProtectedTranslation(existing)) {
    await prisma.translationJob.update({
      where: { id: job.id },
      data: { status: 'SKIPPED', reason: 'protected_translation', finishedAt: new Date() },
    });
    return { ok: true, skipped: true, reason: 'protected_translation' };
  }

  await markJobRunning(job.id);

  const sourceTitle = getSourceTitle(job.anime);
  const sourceDescription = getSourceDescription(job.anime);
  if (!sourceDescription) {
    await upsertTranslation({
      animeId: job.anime.id,
      lang: job.lang,
      title: existing?.title || null,
      description: null,
      source: 'GPT',
      status: 'FAILED',
      failureReason: 'invalid_request',
    });
    await markJobFailed(job.id, 'invalid_request');
    return { ok: false, reason: 'invalid_request' };
  }

  const translated = await translateAnimeText({
    provider: job.anime.provider,
    externalId: job.anime.externalId,
    title: sourceTitle,
    description: sourceDescription,
    targetLang: job.lang,
  });

  if (!translated?.ok) {
    const reason = translated?.reason || 'translation_failed';
    await upsertTranslation({
      animeId: job.anime.id,
      lang: job.lang,
      title: existing?.title || null,
      description: null,
      source: 'GPT',
      status: 'FAILED',
      failureReason: reason,
    });
    await markJobFailed(job.id, reason);
    return { ok: false, reason };
  }

  await upsertTranslation({
    animeId: job.anime.id,
    lang: job.lang,
    title: translated.title,
    description: translated.description,
    source: 'GPT',
    status: 'AUTO',
    failureReason: null,
  });
  await markJobDone(job.id, translated.model || null);
  return { ok: true, model: translated.model || null };
}

async function runTranslationJobs({ limit = 20, langs = ['ko', 'ja'], overwrite = false } = {}) {
  const safeLangs = normalizeLangs(langs);
  const safeLimit = Math.max(1, Math.min(Number(limit) || 20, 200));
  const jobs = await prisma.translationJob.findMany({
    where: {
      status: { in: ['PENDING', 'FAILED'] },
      attempts: { lt: 3 },
      lang: { in: safeLangs },
    },
    orderBy: [{ createdAt: 'asc' }],
    take: safeLimit,
  });

  const results = [];
  for (const job of jobs) {
    // eslint-disable-next-line no-await-in-loop
    const result = await runOneTranslationJob(job.id, { overwrite });
    results.push({ jobId: job.id, lang: job.lang, ...result });
  }
  return results;
}

async function getTranslationCoverage() {
  const [totalAnime, translations, jobs] = await Promise.all([
    prisma.anime.count({ where: { dataStatus: 'ACTIVE' } }),
    prisma.animeTranslation.groupBy({
      by: ['lang', 'status', 'source'],
      _count: { _all: true },
    }),
    prisma.translationJob.groupBy({
      by: ['lang', 'status'],
      _count: { _all: true },
    }),
  ]);

  return {
    totalAnime,
    translations: translations.map((row) => ({
      lang: row.lang,
      status: row.status,
      source: row.source,
      count: row._count._all,
    })),
    jobs: jobs.map((row) => ({
      lang: row.lang,
      status: row.status,
      count: row._count._all,
    })),
  };
}

module.exports = {
  createMissingTranslationJobs,
  runTranslationJobs,
  runOneTranslationJob,
  markJobRunning,
  markJobDone,
  markJobFailed,
  getTranslationCoverage,
};
