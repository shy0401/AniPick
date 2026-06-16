const axios = require('axios');
const {
  getTopAnime,
  getSeasonNow,
  searchAnime,
  getAnimeById,
  getRecommendationsFromGenre,
} = require('./jikan.service');
const {
  normalizeJikanAnime,
  normalizeJikanList,
  normalizeKitsuAnime,
} = require('./anime-normalizer.service');
const { FALLBACK_ANIME } = require('../data/fallbackAnime');
const { animeTranslations } = require('../data/animeTranslations');
const { getCurrentSeasonAndYear } = require('../utils/season');
const { isAdultAnime } = require('../utils/animeContentSafety');

const EXTERNAL_FALLBACK_MESSAGE = '외부 애니메이션 데이터 서버가 불안정하여 임시 데이터를 표시합니다.';

function filterSafeItems(items = []) {
  return (items || []).filter((item) => !isAdultAnime(item));
}

function normalizeSearchText(value) {
  return String(value || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[^\p{L}\p{N}\s:-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findSeedMatches(keyword) {
  const normalizedKeyword = normalizeSearchText(keyword);
  if (!normalizedKeyword) return [];

  return Object.entries(animeTranslations || [])
    .filter(([, seed]) =>
      [seed.koTitle, seed.enTitle, seed.jaTitle, seed.koDescription, seed.enDescription, seed.jaDescription]
        .filter(Boolean)
        .some((value) => normalizeSearchText(value).includes(normalizedKeyword))
    )
    .map(([externalId, seed]) => ({ externalId: Number(externalId), seed }));
}

function buildSearchQueryVariants(keyword, seedMatches = []) {
  const variants = [];
  const hasLatinText = (value) => /[a-z0-9]/i.test(String(value || ''));
  const add = (value) => {
    const normalized = normalizeSearchText(value);
    if (!normalized) return;
    if (variants.some((item) => normalizeSearchText(item) === normalized)) return;
    variants.push(String(value).trim());
  };

  if (hasLatinText(keyword) || seedMatches.length === 0) {
    add(keyword);
  }

  for (const { seed } of seedMatches.slice(0, 8)) {
    add(seed.enTitle);
    if (variants.length === 0) add(seed.jaTitle);
  }

  return variants.slice(0, 4);
}

function getProviderItemId(item) {
  return Number(item?.malId || item?.id || item?.externalId || item?.sourcePayload?.mal_id || 0);
}

function seedToProviderItem({ externalId, seed }) {
  return {
    id: externalId,
    malId: externalId,
    provider: 'JIKAN',
    title: {
      romaji: seed.enTitle || seed.koTitle || seed.jaTitle || `Anime ${externalId}`,
      english: seed.enTitle || seed.koTitle || seed.jaTitle || `Anime ${externalId}`,
      native: seed.jaTitle || seed.koTitle || seed.enTitle || `Anime ${externalId}`,
    },
    coverImage: {
      extraLarge: null,
      large: null,
      medium: null,
    },
    bannerImage: null,
    description: seed.enDescription || seed.koDescription || seed.jaDescription || '',
    genres: [],
    averageScore: null,
    meanScore: null,
    popularity: 0,
    episodes: null,
    status: '',
    season: '',
    seasonYear: null,
    format: 'TV',
    siteUrl: `https://myanimelist.net/anime/${externalId}`,
    sourcePayload: {
      mal_id: externalId,
      title: seed.enTitle || seed.koTitle || seed.jaTitle || `Anime ${externalId}`,
      title_english: seed.enTitle || null,
      title_japanese: seed.jaTitle || null,
      synopsis: seed.enDescription || seed.koDescription || seed.jaDescription || '',
    },
  };
}

function getSearchFields(item, seed = null) {
  return [
    seed?.koTitle,
    seed?.enTitle,
    seed?.jaTitle,
    seed?.koDescription,
    seed?.enDescription,
    seed?.jaDescription,
    item?.title?.romaji,
    item?.title?.english,
    item?.title?.native,
    item?.romajiTitle,
    item?.englishTitle,
    item?.nativeTitle,
    item?.description,
    item?.sourcePayload?.title,
    item?.sourcePayload?.title_english,
    item?.sourcePayload?.title_japanese,
  ].filter(Boolean);
}

function scoreSearchRelevance(item, keyword) {
  const normalizedKeyword = normalizeSearchText(keyword);
  if (!normalizedKeyword) return 0;

  const id = getProviderItemId(item);
  const seed = animeTranslations[id] || null;
  let score = 0;

  for (const field of getSearchFields(item, seed)) {
    const normalizedField = normalizeSearchText(field);
    if (!normalizedField) continue;
    if (normalizedField === normalizedKeyword) score = Math.max(score, 10000);
    else if (normalizedField.startsWith(normalizedKeyword)) score = Math.max(score, 8000);
    else if (normalizedField.includes(normalizedKeyword)) score = Math.max(score, 6500);
    else if (normalizedKeyword.includes(normalizedField) && normalizedField.length >= 4) score = Math.max(score, 5000);
  }

  if (score === 0) return 0;
  if (item?.coverImage?.extraLarge || item?.coverImage?.large || item?.imageUrl) score += 80;
  if (item?.averageScore) score += Math.min(100, Number(item.averageScore || 0));
  if (item?.members) score += Math.min(80, Math.log10(Number(item.members || 1)) * 12);
  if (item?.popularity) score += Math.max(0, 80 - Math.min(80, Number(item.popularity || 0) / 300));

  return score;
}

function sortProviderSearchItems(items, keyword, sort) {
  const withIndex = items.map((item, index) => ({ item, index }));
  return withIndex
    .sort((a, b) => {
      const relevanceDiff = scoreSearchRelevance(b.item, keyword) - scoreSearchRelevance(a.item, keyword);
      if (relevanceDiff) return relevanceDiff;

      if (String(sort || '').toUpperCase() === 'SCORE_DESC') {
        const scoreDiff = Number(b.item.averageScore || 0) - Number(a.item.averageScore || 0);
        if (scoreDiff) return scoreDiff;
      }

      const aPopularity = Number(a.item.popularity || a.item.members || 999999);
      const bPopularity = Number(b.item.popularity || b.item.members || 999999);
      if (aPopularity !== bPopularity) return bPopularity - aPopularity;
      return a.index - b.index;
    })
    .map(({ item }) => item);
}

function hasSearchRelevance(item, queryVariants = []) {
  if (queryVariants.length === 0) return false;
  return queryVariants.some((query) => scoreSearchRelevance(item, query) > 0);
}

function fallbackList({ page = 1, perPage = 20, genre = '' } = {}) {
  const sourceRaw = genre
    ? FALLBACK_ANIME.filter((item) => (item.genres || []).includes(genre))
    : FALLBACK_ANIME;
  const source = filterSafeItems(sourceRaw);

  const start = (page - 1) * perPage;
  const items = filterSafeItems(source.slice(start, start + perPage).map((item) => ({
    ...item,
    provider: 'FALLBACK',
    isFallback: true,
  })));

  return {
    items,
    pageInfo: {
      currentPage: page,
      perPage,
      total: source.length,
      lastPage: Math.max(1, Math.ceil(source.length / perPage)),
      hasNextPage: start + perPage < source.length,
    },
    provider: 'FALLBACK',
    isFallback: true,
    message: EXTERNAL_FALLBACK_MESSAGE,
  };
}

function applySearchFilters(items, { season, format, status, year }) {
  return (items || []).filter((item) => {
    if (season && String(item.season || '').toUpperCase() !== String(season).toUpperCase()) return false;
    if (format && String(item.format || '').toUpperCase() !== String(format).toUpperCase()) return false;
    if (status && String(item.status || '').toUpperCase() !== String(status).toUpperCase()) return false;
    if (year && Number(item.seasonYear) !== Number(year)) return false;
    return true;
  });
}

async function tryKitsuList({ page = 1, perPage = 20, keyword = '', sort = '-userCount' }) {
  const params = new URLSearchParams();
  params.set('page[limit]', String(perPage));
  params.set('page[offset]', String((page - 1) * perPage));
  params.set('sort', sort);
  if (keyword) params.set('filter[text]', keyword);

  const response = await axios.get(`https://kitsu.io/api/edge/anime?${params.toString()}`, {
    timeout: 15000,
    headers: { Accept: 'application/vnd.api+json', 'User-Agent': 'AniPick/1.0' },
  });

  const normalized = filterSafeItems((response.data?.data || []).map(normalizeKitsuAnime).filter(Boolean));
  const total = Number(response.data?.meta?.count || normalized.length);

  return {
    items: normalized,
    pageInfo: {
      currentPage: page,
      perPage,
      total,
      lastPage: Math.max(1, Math.ceil(total / perPage)),
      hasNextPage: page * perPage < total,
    },
    provider: 'KITSU',
    isFallback: false,
    message: '',
  };
}

async function fetchTrendingAnime({ page = 1, perPage = 12 } = {}) {
  try {
    const result = await getTopAnime({ page, limit: perPage });
    return {
      items: filterSafeItems(normalizeJikanList(result.data || [])),
      pageInfo: {
        currentPage: result.pagination?.current_page || page,
        perPage,
        total: result.pagination?.items?.total || (result.data || []).length,
        lastPage: result.pagination?.last_visible_page || page,
        hasNextPage: Boolean(result.pagination?.has_next_page),
      },
      provider: 'JIKAN',
      isFallback: false,
      message: '',
    };
  } catch (error) {
    try {
      return await tryKitsuList({ page, perPage, sort: '-userCount' });
    } catch {
      return fallbackList({ page, perPage });
    }
  }
}

async function fetchPopularThisSeason({ page = 1, perPage = 12 } = {}) {
  const { season, year } = getCurrentSeasonAndYear();

  try {
    const result = await getSeasonNow({ page, limit: perPage });
    return {
      season,
      year,
      items: filterSafeItems(normalizeJikanList(result.data || [])),
      provider: 'JIKAN',
      isFallback: false,
      message: '',
    };
  } catch {
    try {
      const kitsu = await tryKitsuList({ page, perPage, sort: '-averageRating' });
      return {
        season,
        year,
        items: kitsu.items,
        provider: kitsu.provider,
        isFallback: kitsu.isFallback,
        message: kitsu.message,
      };
    } catch {
      const fallback = fallbackList({ page, perPage });
      return {
        season,
        year,
        items: fallback.items,
        provider: fallback.provider,
        isFallback: true,
        message: fallback.message,
      };
    }
  }
}

async function fetchSearchAnime({
  keyword = '',
  genre = '',
  year = '',
  season = '',
  format = '',
  status = '',
  sort = 'POPULARITY_DESC',
  page = 1,
  perPage = 20,
} = {}) {
  try {
    const seedMatches = findSeedMatches(keyword);
    const queryVariants = buildSearchQueryVariants(keyword, seedMatches);
    const byId = new Map();
    let total = 0;
    let firstPagination = null;

    for (const match of seedMatches) {
      const item = seedToProviderItem(match);
      byId.set(String(match.externalId), item);
    }

    for (const query of queryVariants.length > 0 ? queryVariants : ['']) {
      // eslint-disable-next-line no-await-in-loop
      const result = await searchAnime({
        keyword: query,
        page,
        limit: perPage,
        genre,
        year,
        season,
        format,
        status,
        sort,
      });

      const normalized = filterSafeItems(normalizeJikanList(result.data || []));
      const filtered = applySearchFilters(normalized, { season, format, status, year });
      total = Math.max(total, result.pagination?.items?.total || filtered.length);
      firstPagination ||= result.pagination || null;

      for (const item of filtered) {
        const id = getProviderItemId(item);
        if (!id || byId.has(String(id))) continue;
        byId.set(String(id), item);
      }
    }

    const seedIds = new Set(seedMatches.map((item) => String(item.externalId)));
    const normalized = sortProviderSearchItems(Array.from(byId.values()), keyword, sort);
    const filtered = normalized.filter((item) => {
      if (seedIds.has(String(getProviderItemId(item)))) return true;
      if (!keyword) return true;
      return hasSearchRelevance(item, queryVariants);
    });
    const safeTotal = Math.max(total, filtered.length);

    return {
      items: filtered,
      pageInfo: {
        currentPage: firstPagination?.current_page || page,
        perPage,
        total: safeTotal,
        lastPage: firstPagination?.last_visible_page || Math.max(1, Math.ceil(safeTotal / perPage)),
        hasNextPage: Boolean(firstPagination?.has_next_page),
      },
      provider: 'JIKAN',
      isFallback: false,
      message: '',
    };
  } catch {
    try {
      const kitsu = await tryKitsuList({ page, perPage, keyword, sort: '-userCount' });
      const filtered = applySearchFilters(filterSafeItems(kitsu.items), { season, format, status, year });
      return {
        items: filtered,
        pageInfo: {
          ...kitsu.pageInfo,
          total: filtered.length,
          lastPage: Math.max(1, Math.ceil(filtered.length / perPage)),
          hasNextPage: page * perPage < filtered.length,
        },
        provider: 'KITSU',
        isFallback: false,
        message: '',
      };
    } catch {
      return fallbackList({ page, perPage, genre });
    }
  }
}

async function fetchAnimeDetail(id) {
  try {
    const result = await getAnimeById(id);
    const item = normalizeJikanAnime(result.data);
    return {
      item: isAdultAnime(item) ? null : item,
      provider: 'JIKAN',
      isFallback: false,
      message: '',
    };
  } catch {
    try {
      const kitsu = await axios.get(`https://kitsu.io/api/edge/anime/${id}`, {
        timeout: 15000,
        headers: { Accept: 'application/vnd.api+json', 'User-Agent': 'AniPick/1.0' },
      });
      const item = normalizeKitsuAnime(kitsu.data?.data);
      return {
        item: isAdultAnime(item) ? null : item,
        provider: 'KITSU',
        isFallback: false,
        message: '',
      };
    } catch {
      const fallbackItem = FALLBACK_ANIME.find((item) => Number(item.id) === Number(id)) || FALLBACK_ANIME[0];
      return {
        item: isAdultAnime(fallbackItem) ? null : { ...fallbackItem, provider: 'FALLBACK', isFallback: true },
        provider: 'FALLBACK',
        isFallback: true,
        message: EXTERNAL_FALLBACK_MESSAGE,
      };
    }
  }
}

async function fetchGenreRecommendations({ genre = '', page = 1, perPage = 12 } = {}) {
  if (!genre) return fetchTrendingAnime({ page, perPage });

  try {
    const result = await getRecommendationsFromGenre({ genre, page, limit: perPage });
    return {
      items: filterSafeItems(normalizeJikanList(result.data || [])),
      provider: 'JIKAN',
      isFallback: false,
      message: '',
    };
  } catch {
    return fallbackList({ page, perPage, genre });
  }
}

async function fetchSimilarAnime({ animeId, genres = [], page = 1, perPage = 12 } = {}) {
  if (!animeId && genres.length === 0) return fetchTrendingAnime({ page, perPage });
  if (genres.length > 0) return fetchGenreRecommendations({ genre: genres[0], page, perPage });
  return fetchTrendingAnime({ page, perPage });
}

async function fetchRecommendations({ favoriteGenres = [], perPage = 12 } = {}) {
  const genre = favoriteGenres[0] || '';
  const base = await fetchGenreRecommendations({ genre, page: 1, perPage });

  return {
    type: genre ? 'GENRE_BASED' : 'TRENDING_DESC',
    genre: genre || null,
    reason: genre
      ? `${genre} 장르를 자주 선호해서 추천합니다.`
      : '선호 데이터가 부족해 인기 작품을 추천합니다.',
    items: base.items || [],
    provider: base.provider,
    isFallback: base.isFallback,
    message: base.message || '',
  };
}

async function testProviderConnection() {
  const trending = await fetchTrendingAnime({ page: 1, perPage: 1 });
  return {
    ok: true,
    provider: trending.provider,
    isFallback: Boolean(trending.isFallback),
    message: trending.isFallback ? EXTERNAL_FALLBACK_MESSAGE : '',
    sample: trending.items || [],
  };
}

module.exports = {
  EXTERNAL_FALLBACK_MESSAGE,
  fetchTrendingAnime,
  fetchPopularThisSeason,
  fetchSearchAnime,
  fetchAnimeDetail,
  fetchGenreRecommendations,
  fetchSimilarAnime,
  fetchRecommendations,
  testProviderConnection,
};
