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
const { getCurrentSeasonAndYear } = require('../utils/season');
const { isAdultAnime } = require('../utils/animeContentSafety');

const EXTERNAL_FALLBACK_MESSAGE = '외부 애니메이션 데이터 서버가 불안정하여 임시 데이터를 표시합니다.';

function filterSafeItems(items = []) {
  return (items || []).filter((item) => !isAdultAnime(item));
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
    const result = await searchAnime({
      keyword,
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
    const total = result.pagination?.items?.total || filtered.length;

    return {
      items: filtered,
      pageInfo: {
        currentPage: result.pagination?.current_page || page,
        perPage,
        total,
        lastPage: result.pagination?.last_visible_page || Math.max(1, Math.ceil(total / perPage)),
        hasNextPage: Boolean(result.pagination?.has_next_page),
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
