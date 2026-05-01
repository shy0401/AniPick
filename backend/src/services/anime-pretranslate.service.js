const prisma = require('../lib/prisma');
const {
  listCachedAnimeWithoutTranslation,
  getTranslationByAnimeId,
  upsertTranslation,
} = require('./anime-cache.service');
const { translateAnimeText } = require('./openai-translation.service');
const { getOpenAIClient, selectTranslationModel } = require('./openai-model.service');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(min = 500, max = 1000) {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return delay(ms);
}

function getSourceTitle(anime) {
  return anime.englishTitle || anime.romajiTitle || anime.nativeTitle || 'Untitled';
}

function getSourceDescription(anime, enTranslation) {
  const fromDb = enTranslation?.description || anime.description || '';
  return String(fromDb || '').slice(0, 3000).trim();
}

async function markFailedTranslation(anime, lang, reason, existingTitle = null) {
  await upsertTranslation({
    animeId: anime.id,
    lang,
    title: existingTitle || null,
    description: null,
    source: 'GPT',
    status: 'FAILED',
    failureReason: reason,
  });
}

async function translateOneAnime({ anime, lang, overwrite = false, mode = 'missing-all' }) {
  if (!anime?.id) return { skipped: true, reason: 'invalid_anime' };

  const existing = await getTranslationByAnimeId(anime.id, lang);

  if (existing && !overwrite) {
    const hasTitle = Boolean(String(existing.title || '').trim());
    const hasDescription = Boolean(String(existing.description || '').trim());
    if (
      (mode === 'missing-title' && hasTitle) ||
      (mode === 'missing-description' && hasDescription) ||
      (mode === 'missing-all' && hasTitle && hasDescription)
    ) {
      return { skipped: true, reason: 'existing_translation' };
    }
  }

  const enTranslation = await getTranslationByAnimeId(anime.id, 'en');
  const sourceTitle = getSourceTitle(anime);
  const sourceDescription = getSourceDescription(anime, enTranslation);

  const requiresDescription = mode !== 'missing-title';
  if (!sourceDescription && requiresDescription) {
    await markFailedTranslation(anime, lang, 'invalid_request', existing?.title || null);
    return { skipped: true, reason: 'invalid_request' };
  }

  const translated = await translateAnimeText({
    provider: anime.provider,
    externalId: anime.externalId,
    title: sourceTitle,
    description: sourceDescription,
    targetLang: lang,
    sourceLang: 'en',
  });

  if (!translated?.ok) {
    const reason = translated?.reason || 'unknown';
    await markFailedTranslation(anime, lang, reason, existing?.title || null);
    return { skipped: true, reason };
  }

  await upsertTranslation({
    animeId: anime.id,
    lang,
    title: translated.title,
    description: translated.description,
    source: 'GPT',
    status: 'AUTO',
    failureReason: null,
  });

  return { translated: true, model: translated.model || null };
}

async function getTargetAnimeList(lang, limit, overwrite, mode = 'missing-all') {
  if (!overwrite) {
    if (mode === 'missing-title') {
      return prisma.anime.findMany({
        where: {
          OR: [
            { translations: { none: { lang } } },
            {
              translations: {
                some: {
                  lang,
                  OR: [{ title: null }, { title: '' }],
                },
              },
            },
          ],
        },
        orderBy: [{ updatedAt: 'desc' }],
        take: limit,
      });
    }

    if (mode === 'missing-description') {
      return prisma.anime.findMany({
        where: {
          OR: [
            { translations: { none: { lang } } },
            {
              translations: {
                some: {
                  lang,
                  OR: [{ description: null }, { description: '' }],
                },
              },
            },
          ],
        },
        orderBy: [{ updatedAt: 'desc' }],
        take: limit,
      });
    }

    return listCachedAnimeWithoutTranslation(lang, limit);
  }

  return prisma.anime.findMany({
    orderBy: [{ updatedAt: 'desc' }],
    take: limit,
  });
}

async function pretranslateAnimeCatalog({ langs = ['ko', 'ja'], limit, overwrite = false, mode = 'missing-all' } = {}) {
  const normalizedMode = String(mode || 'missing-all');
  const safeLimit = Math.max(1, Number(limit || process.env.PRETRANSLATE_LIMIT || 30));
  const summary = [];

  const client = getOpenAIClient();
  if (!client) {
    console.log('[PRETRANSLATE] No accessible OpenAI translation model. Check your project model access.');
    return summary;
  }

  const selectedModel = await selectTranslationModel(client, { forceRefresh: true });
  if (!selectedModel) {
    console.log('[PRETRANSLATE] No accessible OpenAI translation model. Check your project model access.');
    return summary;
  }
  console.log(`[PRETRANSLATE] selected model: ${selectedModel}`);

  for (const lang of langs) {
    if (!['ko', 'ja'].includes(lang)) continue;

    // eslint-disable-next-line no-await-in-loop
    const targets = await getTargetAnimeList(lang, safeLimit, overwrite, normalizedMode);

    let translatedCount = 0;
    let skippedCount = 0;

    for (let index = 0; index < targets.length; index += 1) {
      const anime = targets[index];

      try {
        // eslint-disable-next-line no-await-in-loop
        const result = await translateOneAnime({ anime, lang, overwrite, mode: normalizedMode });

        if (result.translated) {
          translatedCount += 1;
          console.log(`[PRETRANSLATE] ${lang} ${index + 1}/${targets.length} translated.`);
        } else {
          skippedCount += 1;
          console.log(`[PRETRANSLATE] ${lang} ${index + 1}/${targets.length} failed: ${result.reason}`);

          if (result.reason === 'no_accessible_model') {
            summary.push({ lang, total: targets.length, translated: translatedCount, skipped: skippedCount });
            console.log('[PRETRANSLATE] stopped: no accessible model.');
            return summary;
          }
        }
      } catch (error) {
        skippedCount += 1;
        console.error(`[PRETRANSLATE] ${lang} ${index + 1}/${targets.length} failed:`, error.message);
      }

      // eslint-disable-next-line no-await-in-loop
      await randomDelay();
    }

    summary.push({ lang, total: targets.length, translated: translatedCount, skipped: skippedCount });
  }

  console.log('[PRETRANSLATE] completed:', summary);
  return summary;
}

module.exports = {
  pretranslateAnimeCatalog,
  translateOneAnime,
};
