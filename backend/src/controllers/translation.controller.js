const prisma = require('../lib/prisma');
const { getCachedAnime, upsertTranslation } = require('../services/anime-cache.service');
const {
  createMissingTranslationJobs,
  runTranslationJobs,
  getTranslationCoverage,
} = require('../services/translation-job.service');
const {
  getCandidateModels,
  getOpenAIClient,
  listAccessibleModels,
  selectTranslationModel,
  getUnavailableModels,
} = require('../services/openai-model.service');

function normalizeProvider(provider) {
  return String(provider || 'JIKAN').toUpperCase();
}

function parseExternalId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function adminTranslationEnabled() {
  return String(process.env.ENABLE_ADMIN_TRANSLATION || 'true').toLowerCase() !== 'false';
}

async function getTranslations(req, res) {
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  if (!externalId) return res.status(400).json({ message: 'Invalid externalId.' });

  const anime = await prisma.anime.findUnique({
    where: { provider_externalId: { provider, externalId } },
    include: { translations: true },
  });

  if (!anime) return res.status(404).json({ message: 'Anime cache not found.' });
  return res.json({ anime, translations: anime.translations || [] });
}

async function putTranslation(req, res) {
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  const { lang, title, description, source = 'MANUAL', status = 'REVIEWED' } = req.body || {};

  if (!externalId || !lang) {
    return res.status(400).json({ message: 'externalId and lang are required.' });
  }

  const saved = await upsertTranslation({
    provider,
    externalId,
    lang,
    title,
    description,
    source,
    status,
    failureReason: null,
  });
  return res.json(saved);
}

async function autoTranslate(req, res) {
  if (!adminTranslationEnabled()) return res.status(403).json({ message: 'Admin translation is disabled.' });
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  const { targetLangs = ['ko', 'ja'], overwrite = false } = req.body || {};

  if (!externalId) return res.status(400).json({ message: 'Invalid externalId.' });

  const anime = await getCachedAnime(provider, externalId);
  if (!anime) {
    return res.status(404).json({ message: 'Anime cache not found. Run prefetch first.' });
  }

  for (const rawLang of targetLangs) {
    const lang = String(rawLang || '').toLowerCase();
    if (!['ko', 'ja', 'en'].includes(lang)) continue;
    // eslint-disable-next-line no-await-in-loop
    await prisma.translationJob.upsert({
      where: { animeId_lang: { animeId: anime.id, lang } },
      create: {
        animeId: anime.id,
        lang,
        status: 'PENDING',
        requestedBy: `ADMIN:${req.user?.id || 'unknown'}`,
      },
      update: {
        status: 'PENDING',
        reason: null,
        finishedAt: null,
        requestedBy: `ADMIN:${req.user?.id || 'unknown'}`,
      },
    });
  }

  await runTranslationJobs({ langs: targetLangs, limit: targetLangs.length, overwrite: Boolean(overwrite) });
  const refreshed = await prisma.anime.findUnique({ where: { id: anime.id }, include: { translations: true } });
  return res.json({ ok: true, translations: refreshed?.translations || [] });
}

async function deleteTranslation(req, res) {
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  const lang = String(req.params.lang || '').toLowerCase();

  if (!externalId || !lang) {
    return res.status(400).json({ message: 'externalId and lang are required.' });
  }

  const anime = await getCachedAnime(provider, externalId);
  if (!anime) return res.status(404).json({ message: 'Anime cache not found.' });

  await prisma.animeTranslation.delete({
    where: { animeId_lang: { animeId: anime.id, lang } },
  }).catch(() => null);

  return res.json({ ok: true });
}

async function getOpenAIModelStatus(req, res) {
  const candidates = getCandidateModels();
  const client = getOpenAIClient();
  if (!client) {
    return res.json({
      ok: false,
      message: 'No accessible translation model.',
      selectedModel: null,
      candidates,
      accessibleCandidates: [],
      unavailableModels: getUnavailableModels(),
    });
  }

  const accessible = await listAccessibleModels(client);
  const selectedModel = await selectTranslationModel(client, { forceRefresh: true });
  const accessibleCandidates = Array.isArray(accessible)
    ? candidates.filter((model) => accessible.includes(model))
    : [];

  return res.json({
    ok: Boolean(selectedModel),
    message: selectedModel ? '' : 'No accessible translation model.',
    selectedModel: selectedModel || null,
    candidates,
    accessibleCandidates,
    unavailableModels: getUnavailableModels(),
  });
}

async function getAdminTranslationCoverage(req, res) {
  return res.json(await getTranslationCoverage());
}

async function getMissingTranslations(req, res) {
  const lang = String(req.query.lang || 'ko').toLowerCase();
  const limit = Math.max(1, Math.min(Number(req.query.limit) || 50, 200));
  const rows = await prisma.anime.findMany({
    where: {
      dataStatus: 'ACTIVE',
      translations: { none: { lang } },
    },
    orderBy: [{ popularity: 'desc' }, { averageScore: 'desc' }, { updatedAt: 'desc' }],
    take: limit,
  });
  return res.json(rows);
}

async function createAdminTranslationJobs(req, res) {
  if (!adminTranslationEnabled()) return res.status(403).json({ message: 'Admin translation is disabled.' });
  const { langs = ['ko', 'ja'], limit = 100 } = req.body || {};
  const jobs = await createMissingTranslationJobs({
    langs,
    limit,
    requestedBy: `ADMIN:${req.user?.id || 'unknown'}`,
  });
  return res.status(201).json({ created: jobs.length, jobs });
}

async function runAdminTranslationJobs(req, res) {
  if (!adminTranslationEnabled()) return res.status(403).json({ message: 'Admin translation is disabled.' });
  const { langs = ['ko', 'ja'], limit = 20, overwrite = false } = req.body || {};
  return res.json({ results: await runTranslationJobs({ langs, limit, overwrite }) });
}

async function reviewTranslation(req, res) {
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  const { lang } = req.body || {};
  if (!externalId || !lang) return res.status(400).json({ message: 'externalId and lang are required.' });

  const anime = await getCachedAnime(provider, externalId);
  if (!anime) return res.status(404).json({ message: 'Anime cache not found.' });

  const saved = await prisma.animeTranslation.update({
    where: { animeId_lang: { animeId: anime.id, lang } },
    data: {
      status: 'REVIEWED',
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
      failureReason: null,
    },
  });
  return res.json(saved);
}

async function retryTranslation(req, res) {
  if (!adminTranslationEnabled()) return res.status(403).json({ message: 'Admin translation is disabled.' });
  const provider = normalizeProvider(req.params.provider);
  const externalId = parseExternalId(req.params.externalId);
  const { lang = 'ko' } = req.body || {};
  if (!externalId || !lang) return res.status(400).json({ message: 'externalId and lang are required.' });

  const anime = await getCachedAnime(provider, externalId);
  if (!anime) return res.status(404).json({ message: 'Anime cache not found.' });

  const job = await prisma.translationJob.upsert({
    where: { animeId_lang: { animeId: anime.id, lang } },
    create: {
      animeId: anime.id,
      lang,
      status: 'PENDING',
      attempts: 0,
      requestedBy: `ADMIN:${req.user?.id || 'unknown'}`,
    },
    update: {
      status: 'PENDING',
      reason: null,
      attempts: 0,
      finishedAt: null,
      requestedBy: `ADMIN:${req.user?.id || 'unknown'}`,
    },
  });
  return res.status(201).json(job);
}

module.exports = {
  getTranslations,
  putTranslation,
  autoTranslate,
  deleteTranslation,
  getOpenAIModelStatus,
  getAdminTranslationCoverage,
  getMissingTranslations,
  createAdminTranslationJobs,
  runAdminTranslationJobs,
  reviewTranslation,
  retryTranslation,
};
