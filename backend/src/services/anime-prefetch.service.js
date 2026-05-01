const { getTopAnime, getSeasonNow, searchAnime } = require('./jikan.service');
const { normalizeJikanList } = require('./anime-normalizer.service');
const { upsertAnimeCache } = require('./anime-cache.service');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(min = 800, max = 1200) {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return delay(ms);
}

async function saveAnimeList(items = []) {
  let saved = 0;
  for (const anime of items) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const cached = await upsertAnimeCache({ ...anime, provider: 'JIKAN' });
      if (cached) saved += 1;
    } catch (error) {
      console.error('[PREFETCH] cache upsert failed:', error.message);
    }
  }
  return saved;
}

async function prefetchTopAnime({ pages = 3, limit = 25 } = {}) {
  let count = 0;

  for (let page = 1; page <= pages; page += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await getTopAnime({ page, limit });
      const items = normalizeJikanList(response.data || []);
      // eslint-disable-next-line no-await-in-loop
      count += await saveAnimeList(items);
      console.log(`[PREFETCH] top anime page ${page} cached: ${items.length}`);
    } catch (error) {
      console.error(`[PREFETCH] top anime page ${page} failed:`, error.message);
    }

    // eslint-disable-next-line no-await-in-loop
    await randomDelay();
  }

  return count;
}

async function prefetchSeasonAnime({ pages = 2, limit = 25 } = {}) {
  let count = 0;

  for (let page = 1; page <= pages; page += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await getSeasonNow({ page, limit });
      const items = normalizeJikanList(response.data || []);
      // eslint-disable-next-line no-await-in-loop
      count += await saveAnimeList(items);
      console.log(`[PREFETCH] season anime page ${page} cached: ${items.length}`);
    } catch (error) {
      console.error(`[PREFETCH] season anime page ${page} failed:`, error.message);
    }

    // eslint-disable-next-line no-await-in-loop
    await randomDelay();
  }

  return count;
}

async function prefetchByKeywords({ keywords = [], limit = 20 } = {}) {
  let count = 0;

  for (const keyword of keywords) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await searchAnime({ keyword, page: 1, limit, sort: 'POPULARITY_DESC' });
      const items = normalizeJikanList(response.data || []);
      // eslint-disable-next-line no-await-in-loop
      count += await saveAnimeList(items);
      console.log(`[PREFETCH] keyword "${keyword}" cached: ${items.length}`);
    } catch (error) {
      console.error(`[PREFETCH] keyword "${keyword}" failed:`, error.message);
    }

    // eslint-disable-next-line no-await-in-loop
    await randomDelay();
  }

  return count;
}

async function prefetchBaseAnimeCatalog({ limit = 25 } = {}) {
  const keywords = [
    'death',
    'naruto',
    'one piece',
    'attack',
    'demon',
    'jujutsu',
    'frieren',
    'spy',
    'chainsaw',
    'haikyuu',
    'conan',
    'dragon ball',
    'romance',
    'fantasy',
    'sports',
  ];

  const [topCount, seasonCount] = await Promise.all([
    prefetchTopAnime({ pages: 3, limit }),
    prefetchSeasonAnime({ pages: 2, limit }),
  ]);

  const keywordCount = await prefetchByKeywords({ keywords, limit });

  return {
    topCount,
    seasonCount,
    keywordCount,
    total: topCount + seasonCount + keywordCount,
  };
}

async function prefetchAndCacheAnimeCatalog() {
  const summary = await prefetchBaseAnimeCatalog({ limit: 25 });
  console.log('[PREFETCH] completed:', summary);
  return summary;
}

module.exports = {
  prefetchBaseAnimeCatalog,
  prefetchTopAnime,
  prefetchSeasonAnime,
  prefetchByKeywords,
  prefetchAndCacheAnimeCatalog,
};
