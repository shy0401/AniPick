const prisma = require('../lib/prisma');
const {
  getExternalId,
  normalizeProvider,
  upsertAnimeCache,
  getTranslationByAnimeId,
  upsertTranslation,
  getAnimeByProviderId,
} = require('./anime-cache.service');
const { getLocalizedAnime, normalizeLang, stripHtmlTags } = require('../utils/animeI18n');

function getEnglishSource(anime) {
  return stripHtmlTags(anime?.description || anime?.background || '');
}

function getFallbackDescription(lang) {
  if (lang === 'ja') return '日本語訳は準備中です。';
  if (lang === 'en') return 'No description available.';
  return '한국어 번역이 준비 중입니다.';
}

async function ensureEnglishTranslation(anime, animeRow) {
  if (!animeRow?.id) return null;
  const existing = await getTranslationByAnimeId(animeRow.id, 'en');
  if (existing) return existing;

  return upsertTranslation({
    animeId: animeRow.id,
    lang: 'en',
    title: anime?.title?.english || anime?.title?.romaji || anime?.title?.native || animeRow.englishTitle || 'Untitled',
    description: getEnglishSource(anime) || animeRow.description || 'No description available.',
    source: 'API',
    status: 'REVIEWED',
    failureReason: null,
  });
}

async function ensureAnimeTranslations(anime, targetLangs = ['ko', 'ja'], options = {}) {
  const provider = normalizeProvider(anime?.provider);
  const externalId = getExternalId(anime);
  if (!externalId) return { updated: [] };

  const animeRow = await upsertAnimeCache({ ...anime, provider, externalId });
  if (!animeRow) return { updated: [] };
  await ensureEnglishTranslation(anime, animeRow);

  const updated = [];
  for (const rawLang of targetLangs) {
    const lang = normalizeLang(rawLang);
    if (!['ko', 'ja'].includes(lang)) continue;

    // eslint-disable-next-line no-await-in-loop
    const existing = await getTranslationByAnimeId(animeRow.id, lang);
    if (existing && !options.overwrite) {
      updated.push({ lang, skipped: true, reason: 'exists' });
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    await prisma.translationJob.upsert({
      where: { animeId_lang: { animeId: animeRow.id, lang } },
      create: {
        animeId: animeRow.id,
        lang,
        status: 'PENDING',
        requestedBy: options.requestedBy || 'SYSTEM',
      },
      update: {
        status: 'PENDING',
        reason: null,
        finishedAt: null,
        requestedBy: options.requestedBy || 'SYSTEM',
      },
    });
    updated.push({ lang, queued: true });
  }

  return { updated, animeId: animeRow.id, provider, externalId };
}

async function getLocalizedAnimeFromDbOnly(anime, lang, options = {}) {
  const selectedLang = normalizeLang(lang);
  const provider = normalizeProvider(anime?.provider);
  const externalId = getExternalId(anime);

  let translation = null;
  let animeRow = null;

  if (externalId) {
    animeRow = options.skipCacheWrite
      ? await getAnimeByProviderId(provider, externalId)
      : await upsertAnimeCache({ ...anime, provider, externalId });
    if (animeRow) translation = await getTranslationByAnimeId(animeRow.id, selectedLang);
  }

  const localized = getLocalizedAnime(anime, selectedLang, translation);
  const displayDescription =
    !translation && selectedLang !== 'en'
      ? getFallbackDescription(selectedLang)
      : localized.displayDescription;

  return {
    ...localized,
    displayDescription,
    isTranslated: Boolean(translation?.description),
    translationSource: translation?.source || null,
    translationStatus: translation?.status || (selectedLang === 'en' ? 'REVIEWED' : 'PENDING'),
    translationFailureReason: translation?.failureReason || null,
  };
}

async function getLocalizedAnimeListWithTranslations(items, lang) {
  const selectedLang = normalizeLang(lang);
  const safeItems = Array.isArray(items) ? items : [];

  return Promise.all(
    safeItems.map(async (item) => {
      const provider = normalizeProvider(item?.provider);
      const externalId = getExternalId(item);
      let translation = null;
      if (externalId) {
        const cached = await getAnimeByProviderId(provider, externalId);
        if (cached) translation = await getTranslationByAnimeId(cached.id, selectedLang);
      }

      const localized = getLocalizedAnime(item, selectedLang, translation);
      return {
        ...localized,
        displayDescription:
          !translation && selectedLang !== 'en'
            ? getFallbackDescription(selectedLang)
            : localized.displayDescription,
        isTranslated: Boolean(translation?.description),
        translationSource: translation?.source || null,
        translationStatus: translation?.status || (selectedLang === 'en' ? 'REVIEWED' : 'PENDING'),
        translationFailureReason: translation?.failureReason || null,
      };
    })
  );
}

async function getStoredTranslations(provider, externalId) {
  const anime = await getAnimeByProviderId(provider, externalId);
  if (!anime) return [];

  const rows = await Promise.all([
    getTranslationByAnimeId(anime.id, 'ko'),
    getTranslationByAnimeId(anime.id, 'en'),
    getTranslationByAnimeId(anime.id, 'ja'),
  ]);

  return rows.filter(Boolean);
}

module.exports = {
  ensureAnimeTranslations,
  ensureEnglishTranslation,
  getLocalizedAnimeFromDbOnly,
  getLocalizedAnimeListWithTranslations,
  getStoredTranslations,
};
