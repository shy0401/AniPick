const prisma = require('../lib/prisma');
const { getCurrentSeasonAndYear } = require('../utils/season');
const {
  normalizeLang,
  getLocalizedAnime,
  getBestOriginalTitle,
  getTranslationSeedByAnime,
  getDisplayTitle,
} = require('../utils/animeI18n');
const {
  listCachedAnime,
  upsertAnimeCache,
  toAnimeLike,
  getAnimeByProviderId,
  isRenderableAnimeRow,
} = require('../services/anime-cache.service');
const { isAdultAnime } = require('../utils/animeContentSafety');
const {
  getLocalizedAnimeFromDbOnly,
  getLocalizedAnimeListWithTranslations,
} = require('../services/anime-translation-orchestrator.service');
const {
  EXTERNAL_FALLBACK_MESSAGE,
  fetchTrendingAnime,
  fetchPopularThisSeason,
  fetchSearchAnime,
  fetchAnimeDetail,
  fetchRecommendations,
  testProviderConnection,
  fetchSimilarAnime,
} = require('../services/anime-provider.service');
const { requestAniList } = require('../services/anilist.service');

function toPositiveInt(value, fallback) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function getRequestLang(req) {
  return normalizeLang(req.query.lang || req.headers['x-anipick-lang'] || 'ko');
}

function mapSort(sort) {
  const value = String(sort || '').toUpperCase();
  if (value === 'TOP_RATED' || value === 'SCORE_DESC') return 'SCORE_DESC';
  if (value === 'MOST_VIEWED' || value === 'POPULARITY_DESC') return 'POPULARITY_DESC';
  if (value === 'START_DATE_DESC') return 'LATEST';
  if (value === 'LATEST') return 'LATEST';
  if (value === 'TITLE' || value === 'TITLE_ASC') return 'TITLE';
  return 'POPULARITY_DESC';
}

function mapPeriod(period) {
  const value = String(period || '').toLowerCase();
  if (['day', 'week', 'month', 'year'].includes(value)) return value;
  return 'all';
}

function sanitizeFilterValue(value) {
  if (value === null || value === undefined) return '';
  const normalized = String(value).trim();
  if (!normalized) return '';
  if (['all', '전체'].includes(normalized.toLowerCase())) return '';
  return normalized;
}

function parseGenres(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function filterSafeItems(items = []) {
  return (items || []).filter((item) => !isAdultAnime(item));
}

async function hydrateCacheFromProviderItems(items = [], provider = 'JIKAN') {
  for (const item of items) {
    try {
      if (isAdultAnime(item)) continue;
      // eslint-disable-next-line no-await-in-loop
      await upsertAnimeCache({ ...item, provider: item?.provider || provider });
    } catch (error) {
      console.error('[CACHE] upsert failed:', error.message);
    }
  }
}

function localizeRows(rows, lang) {
  return (rows || [])
    .filter((row) => !row?.isAdult && !row?.isHidden && row?.dataStatus === 'ACTIVE')
    .map((row) => {
    const anime = toAnimeLike(row);
    if (isAdultAnime(anime)) return null;
    const translation = (row.translations || []).find((item) => item.lang === lang) || null;
    const localized = getLocalizedAnime(anime, lang, translation);
    return {
      ...localized,
      isTranslated: Boolean(translation?.description),
      translationSource: translation?.source || null,
      translationStatus: translation?.status || (lang === 'en' ? 'REVIEWED' : 'PENDING'),
    };
  })
    .filter(Boolean);
}

function hasMeaningfulScore(item) {
  const value = Number(item?.averageScore ?? item?.meanScore);
  return Number.isFinite(value) && value > 0;
}

function shouldRefreshForScoreCoverage(rows = [], minScoredCount = 4) {
  if (!Array.isArray(rows) || rows.length === 0) return true;
  const scoredCount = rows.reduce((acc, row) => {
    const anime = toAnimeLike(row);
    return acc + (hasMeaningfulScore(anime) ? 1 : 0);
  }, 0);
  return scoredCount < Math.min(minScoredCount, rows.length);
}

async function getTrendingAnime(req, res) {
  const lang = getRequestLang(req);
  const perPage = toPositiveInt(req.query.perPage, 12);

  try {
    let cached = await listCachedAnime({
      page: 1,
      perPage,
      sort: 'POPULARITY_DESC',
      lang,
      qualityFirst: true,
    });

    if (cached.pageInfo.total < perPage || shouldRefreshForScoreCoverage(cached.rows, 6)) {
      const providerResult = await fetchTrendingAnime({ page: 1, perPage });
      await hydrateCacheFromProviderItems(filterSafeItems(providerResult.items), providerResult.provider);
      cached = await listCachedAnime({
        page: 1,
        perPage,
        sort: 'POPULARITY_DESC',
        lang,
        qualityFirst: true,
      });
    }

    const items = localizeRows(cached.rows || [], lang);
    return res.json(items);
  } catch (error) {
    console.error('[ANIME_TRENDING] failed:', error);
    try {
      const fallbackResult = await fetchTrendingAnime({ page: 1, perPage });
      const localized = await getLocalizedAnimeListWithTranslations(filterSafeItems(fallbackResult.items || []), lang);
      return res.status(200).json(localized);
    } catch (fallbackError) {
      console.error('[ANIME_TRENDING] fallback failed:', fallbackError);
      return res.status(200).json([]);
    }
  }
}

async function getPopularThisSeason(req, res) {
  const lang = getRequestLang(req);
  const perPage = toPositiveInt(req.query.perPage, 12);
  const { season, year } = getCurrentSeasonAndYear();

  try {
    let cached = await listCachedAnime({
      page: 1,
      perPage,
      season,
      year,
      sort: 'POPULARITY_DESC',
      lang,
      qualityFirst: true,
    });

    let provider = 'CACHE';
    let isFallback = false;
    let message = '';

    if (
      cached.pageInfo.total < Math.min(6, perPage) ||
      shouldRefreshForScoreCoverage(cached.rows, 5)
    ) {
      const providerResult = await fetchPopularThisSeason({ page: 1, perPage });
      provider = providerResult.provider;
      isFallback = Boolean(providerResult.isFallback);
      message = providerResult.message || '';
      await hydrateCacheFromProviderItems(filterSafeItems(providerResult.items), providerResult.provider);

      cached = await listCachedAnime({
        page: 1,
        perPage,
        season,
        year,
        sort: 'POPULARITY_DESC',
        lang,
        qualityFirst: true,
      });
    }

    const items = localizeRows(cached.rows || [], lang);
    return res.json({
      season,
      year,
      items,
      provider,
      isFallback,
      message,
    });
  } catch (error) {
    console.error('[ANIME_POPULAR_SEASON] failed:', error);
    try {
      const fallbackResult = await fetchPopularThisSeason({ page: 1, perPage });
      const localized = await getLocalizedAnimeListWithTranslations(filterSafeItems(fallbackResult.items || []), lang);
      return res.status(200).json({
        season,
        year,
        items: localized,
        provider: fallbackResult.provider || 'FALLBACK',
        isFallback: true,
        message: fallbackResult.message || EXTERNAL_FALLBACK_MESSAGE,
        debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
      });
    } catch (fallbackError) {
      console.error('[ANIME_POPULAR_SEASON] fallback failed:', fallbackError);
    }
    return res.status(200).json({
      season,
      year,
      items: [],
      provider: 'FALLBACK',
      isFallback: true,
      message: EXTERNAL_FALLBACK_MESSAGE,
      debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
    });
  }
}

async function searchAnime(req, res) {
  const lang = getRequestLang(req);
  const page = toPositiveInt(req.query.page, 1);
  const perPage = toPositiveInt(req.query.perPage, 20);
  const sort = mapSort(req.query.sort || 'POPULARITY_DESC');

  const filters = {
    keyword: sanitizeFilterValue(req.query.keyword),
    genre: sanitizeFilterValue(req.query.genre),
    year: sanitizeFilterValue(req.query.year),
    season: sanitizeFilterValue(req.query.season),
    format: sanitizeFilterValue(req.query.format),
    status: sanitizeFilterValue(req.query.status),
    sort,
    period: mapPeriod(req.query.period),
    page,
    perPage,
  };

  try {
    let provider = 'CACHE';
    let isFallback = false;
    let message = '';
    const hasKeyword = Boolean(String(filters.keyword || '').trim());

    if (hasKeyword) {
      const providerResult = await fetchSearchAnime(filters);
      provider = providerResult.provider;
      isFallback = Boolean(providerResult.isFallback);
      message = providerResult.message || '';
      await hydrateCacheFromProviderItems(filterSafeItems(providerResult.items), providerResult.provider);

      const cachedAfterProvider = await listCachedAnime({ ...filters, lang });
      const localizedAfterProvider = localizeRows(cachedAfterProvider.rows || [], lang);
      if (localizedAfterProvider.length > 0) {
        return res.json({
          pageInfo: cachedAfterProvider.pageInfo,
          items: localizedAfterProvider,
          provider,
          isFallback,
          message,
        });
      }

      if (providerResult.items?.length) {
        const renderableProviderItems = filterSafeItems(providerResult.items).filter((item) =>
          isRenderableAnimeRow({
            externalId: item.externalId || item.malId || item.id,
            provider: item.provider || providerResult.provider || 'JIKAN',
            romajiTitle: item.title?.romaji || null,
            englishTitle: item.title?.english || null,
            nativeTitle: item.title?.native || null,
            imageUrl: item.coverImage?.extraLarge || item.coverImage?.large || item.coverImage?.medium || null,
            averageScore: item.averageScore ?? item.meanScore ?? null,
            episodes: item.episodes ?? null,
          })
        );
        const localizedFallback = await getLocalizedAnimeListWithTranslations(renderableProviderItems, lang);
        return res.json({
          pageInfo: providerResult.pageInfo,
          items: localizedFallback,
          provider,
          isFallback,
          message,
        });
      }
    }

    let cached = await listCachedAnime({ ...filters, lang });
    if ((cached.items || []).length === 0 || shouldRefreshForScoreCoverage(cached.rows, 5)) {
      const providerResult = await fetchSearchAnime(filters);
      provider = providerResult.provider;
      isFallback = Boolean(providerResult.isFallback);
      message = providerResult.message || '';
      await hydrateCacheFromProviderItems(filterSafeItems(providerResult.items), providerResult.provider);
      cached = await listCachedAnime({ ...filters, lang });
    }

    const items = localizeRows(cached.rows || [], lang);
    return res.json({
      pageInfo: cached.pageInfo,
      items,
      provider,
      isFallback,
      message,
    });
  } catch (error) {
    console.error('[ANIME_SEARCH] failed:', error);
    try {
      const fallbackResult = await fetchSearchAnime(filters);
      const localized = await getLocalizedAnimeListWithTranslations(filterSafeItems(fallbackResult.items || []), lang);
      return res.status(200).json({
        pageInfo:
          fallbackResult.pageInfo || {
            currentPage: page,
            perPage,
            total: localized.length,
            lastPage: 1,
            hasNextPage: false,
          },
        items: localized,
        provider: fallbackResult.provider || 'FALLBACK',
        isFallback: true,
        message: fallbackResult.message || EXTERNAL_FALLBACK_MESSAGE,
        debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
      });
    } catch (fallbackError) {
      console.error('[ANIME_SEARCH] fallback failed:', fallbackError);
    }
    return res.status(200).json({
      pageInfo: {
        currentPage: page,
        perPage,
        total: 0,
        lastPage: 1,
        hasNextPage: false,
      },
      items: [],
      provider: 'FALLBACK',
      isFallback: true,
      message: EXTERNAL_FALLBACK_MESSAGE,
      debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
    });
  }
}

async function getAnimeDetail(req, res) {
  const id = Number(req.params.id);
  const lang = getRequestLang(req);

  if (!id) {
    return res.status(400).json({ message: '유효한 애니메이션 ID가 필요합니다.' });
  }

  try {
    let row = await getAnimeByProviderId('JIKAN', id);
    if (row && (row.isAdult || row.isHidden || row.dataStatus !== 'ACTIVE')) {
      return res.status(404).json({ message: '애니메이션 정보를 찾을 수 없습니다.' });
    }

    if (!row) {
      const providerResult = await fetchAnimeDetail(id);
      if (providerResult?.item && !isAdultAnime(providerResult.item)) {
        row = await upsertAnimeCache({ ...providerResult.item, provider: providerResult.provider });
      } else if (providerResult?.item) {
        await upsertAnimeCache({ ...providerResult.item, provider: providerResult.provider });
      }
    } else {
      const animeFromCache = toAnimeLike(row);
      const needsDetailRefresh =
        !hasMeaningfulScore(animeFromCache) ||
        !animeFromCache.coverImage?.large ||
        !animeFromCache.description;

      if (needsDetailRefresh) {
        const providerResult = await fetchAnimeDetail(id);
        if (providerResult?.item && !isAdultAnime(providerResult.item)) {
          row = await upsertAnimeCache({ ...providerResult.item, provider: providerResult.provider });
        } else if (providerResult?.item) {
          await upsertAnimeCache({ ...providerResult.item, provider: providerResult.provider });
        }
      }
    }

    if (!row || row.isAdult || row.isHidden || row.dataStatus !== 'ACTIVE') {
      return res.status(404).json({ message: '애니메이션 정보를 찾을 수 없습니다.' });
    }

    const anime = toAnimeLike(row);
    const localized = await getLocalizedAnimeFromDbOnly(anime, lang, { skipCacheWrite: true });

    const genres = parseGenres(row.genres);
    if (genres.length > 0) {
      const similarCached = await listCachedAnime({
        page: 1,
        perPage: 8,
        genre: genres[0],
        sort: 'SCORE_DESC',
        lang,
      });

      let similarItems = similarCached.items
        .filter((item) => Number(item.externalId || item.malId || item.id) !== id)
        .slice(0, 8);

      if (similarItems.length < 4) {
        const similarProvider = await fetchSimilarAnime({ animeId: id, genres, page: 1, perPage: 8 });
        await hydrateCacheFromProviderItems(similarProvider.items, similarProvider.provider);
        const refresh = await listCachedAnime({
          page: 1,
          perPage: 8,
          genre: genres[0],
          sort: 'SCORE_DESC',
          lang,
        });
        similarItems = refresh.items
          .filter((item) => Number(item.externalId || item.malId || item.id) !== id)
          .slice(0, 8);
      }

      localized.similarItems = await getLocalizedAnimeListWithTranslations(similarItems, lang);
    } else {
      localized.similarItems = [];
    }

    return res.json(localized);
  } catch (error) {
    console.error('[ANIME_DETAIL] failed:', error);
    return res.status(404).json({ message: '애니메이션 정보를 찾을 수 없습니다.' });
  }
}

async function getRecommendations(req, res) {
  const lang = getRequestLang(req);
  const perPage = toPositiveInt(req.query.perPage, 12);

  try {
    const [favorites, watchStatuses, reviews] = await Promise.all([
      prisma.favorite.findMany({ where: { userId: req.user.id }, select: { animeId: true } }),
      prisma.watchStatus.findMany({ where: { userId: req.user.id }, select: { animeId: true, status: true } }),
      prisma.review.findMany({ where: { userId: req.user.id, rating: { gte: 4 } }, select: { animeId: true } }),
    ]);

    const ids = [
      ...new Set([
        ...favorites.map((item) => item.animeId),
        ...watchStatuses.map((item) => item.animeId),
        ...reviews.map((item) => item.animeId),
      ]),
    ];

    const cachedRows = ids.length
      ? await prisma.anime.findMany({
          where: {
            externalId: { in: ids },
            provider: 'JIKAN',
            isAdult: false,
            isHidden: false,
            dataStatus: 'ACTIVE',
          },
        })
      : [];

    const genreCount = {};
    cachedRows.forEach((row) => {
      parseGenres(row.genres).forEach((genre) => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });

    const sortedGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);
    const topGenre = sortedGenres[0] || '';

    let cachedRecommendation = await listCachedAnime({
      page: 1,
      perPage,
      genre: topGenre,
      sort: 'SCORE_DESC',
      lang,
    });

    let provider = 'CACHE';
    let isFallback = false;
    let reason = topGenre
      ? `${topGenre} 장르를 자주 찜해서 추천합니다.`
      : '선호 장르 데이터가 부족하여 인기 작품을 추천합니다.';

    if ((cachedRecommendation.items || []).length < Math.min(6, perPage)) {
      const external = await fetchRecommendations({ favoriteGenres: sortedGenres, perPage });
      await hydrateCacheFromProviderItems(filterSafeItems(external.items), external.provider);

      provider = external.provider;
      isFallback = Boolean(external.isFallback);
      reason = external.reason || reason;

      cachedRecommendation = await listCachedAnime({
        page: 1,
        perPage,
        genre: external.genre || topGenre,
        sort: 'SCORE_DESC',
        lang,
      });

      if ((cachedRecommendation.items || []).length === 0) {
        cachedRecommendation = await listCachedAnime({ page: 1, perPage, sort: 'POPULARITY_DESC', lang });
      }
    }

    const localizedItems = localizeRows(cachedRecommendation.rows || [], lang);

    return res.json({
      type: topGenre ? 'GENRE_BASED' : 'TRENDING_DESC',
      genre: topGenre || null,
      reason,
      items: localizedItems,
      provider,
      isFallback,
      message: isFallback ? EXTERNAL_FALLBACK_MESSAGE : '',
    });
  } catch (error) {
    const fallback = await listCachedAnime({ page: 1, perPage, sort: 'POPULARITY_DESC', lang });
    return res.json({
      type: 'TRENDING_DESC',
      genre: null,
      reason: '선호 장르 데이터가 부족하여 인기 작품을 추천합니다.',
      items: localizeRows(fallback.rows || [], lang),
      provider: 'CACHE',
      isFallback: false,
      message: '',
    });
  }
}

async function testProvider(req, res) {
  const lang = getRequestLang(req);

  try {
    const test = await testProviderConnection();
    return res.json({
      ...test,
      sample: await getLocalizedAnimeListWithTranslations(filterSafeItems(test.sample || []), lang),
    });
  } catch (error) {
    return res.json({
      ok: true,
      provider: 'FALLBACK',
      isFallback: true,
      message: EXTERNAL_FALLBACK_MESSAGE,
      sample: [],
    });
  }
}

async function testAniListConnection(req, res) {
  const query = `
    query {
      Page(page: 1, perPage: 1) {
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
          }
        }
      }
    }
  `;

  try {
    const data = await requestAniList(query, {}, false);
    return res.json({ ok: true, sample: data.Page?.media || [] });
  } catch (error) {
    return res.status(error.statusCode || 502).json({
      ok: false,
      message: error.message,
    });
  }
}

async function debugAnimeTitle(req, res) {
  const id = Number(req.params.id);
  const lang = getRequestLang(req);
  if (!id) {
    return res.status(400).json({ message: 'Valid anime id is required.' });
  }

  const row = await prisma.anime.findUnique({
    where: {
      provider_externalId: {
        provider: 'JIKAN',
        externalId: id,
      },
    },
    include: {
      translations: true,
    },
  });

  const anime = row
    ? toAnimeLike(row)
    : { id, externalId: id, malId: id, provider: 'JIKAN', title: {}, description: '' };

  const translation = row?.translations?.find((item) => item.lang === lang) || null;
  const seed = getTranslationSeedByAnime(anime);
  const computedDisplayTitle = getDisplayTitle(anime, lang, translation);

  return res.json({
    id,
    lang,
    provider: 'JIKAN',
    externalId: id,
    cachedAnimeExists: Boolean(row),
    rawTitles: {
      romaji: row?.romajiTitle || null,
      english: row?.englishTitle || null,
      native: row?.nativeTitle || null,
    },
    translations: row?.translations || [],
    seedTranslation: seed?.row || null,
    titleMapValue: seed?.row?.koTitle || null,
    computedDisplayTitle,
    fallbackTitle: getBestOriginalTitle(anime),
    imageUrl: row?.imageUrl || null,
    isRenderable: isRenderableAnimeRow(row || {}),
  });
}

module.exports = {
  getTrendingAnime,
  getPopularThisSeason,
  searchAnime,
  getAnimeDetail,
  getRecommendations,
  testProvider,
  testAniListConnection,
  debugAnimeTitle,
};
