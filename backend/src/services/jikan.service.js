const axios = require('axios');

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';
const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map();
let lastRequestAt = 0;

const genreIdMap = {
  Action: 1,
  Adventure: 2,
  Comedy: 4,
  Drama: 8,
  Fantasy: 10,
  Horror: 14,
  Mystery: 7,
  Romance: 22,
  'Sci-Fi': 24,
  Sports: 30,
  Supernatural: 37,
  'Slice of Life': 36,
  Thriller: 41,
};

function buildCacheKey(path, params) {
  return `${path}::${JSON.stringify(params || {})}`;
}

function getCached(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expiresAt) {
    cache.delete(key);
    return null;
  }
  return hit.data;
}

function setCached(key, data) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForRateLimit() {
  const perSecond = Math.max(1, Number(process.env.JIKAN_RATE_LIMIT_PER_SECOND || 2));
  const minInterval = Math.ceil(1000 / perSecond);
  const elapsed = Date.now() - lastRequestAt;
  if (elapsed < minInterval) {
    await delay(minInterval - elapsed);
  }
  lastRequestAt = Date.now();
}

async function requestJikan(path, params = {}, useCache = true) {
  const key = buildCacheKey(path, params);
  if (useCache) {
    const cached = getCached(key);
    if (cached) return cached;
  }

  try {
    await waitForRateLimit();
    const response = await axios.get(`${JIKAN_BASE_URL}${path}`, {
      params,
      timeout: 15000,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'AniPick/1.0',
      },
    });

    if (useCache) {
      setCached(key, response.data);
    }

    return response.data;
  } catch (error) {
    if (Number(error.response?.status) === 429) {
      const retryAfter = Number(error.response?.headers?.['retry-after'] || 2);
      await delay(Math.max(1, retryAfter) * 1000);
      await waitForRateLimit();
      const retry = await axios.get(`${JIKAN_BASE_URL}${path}`, {
        params,
        timeout: 15000,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'AniPick/1.0',
        },
      });
      if (useCache) setCached(key, retry.data);
      return retry.data;
    }

    console.error('[Jikan] request failed');
    console.error('error.code:', error.code);
    console.error('error.message:', error.message);
    console.error('error.response?.status:', error.response?.status || null);
    console.error('error.response?.data:', error.response?.data || null);
    throw error;
  }
}

function mapFormatToJikanType(format) {
  const map = {
    TV: 'tv',
    TV_SHORT: 'tv',
    MOVIE: 'movie',
    SPECIAL: 'special',
    OVA: 'ova',
    ONA: 'ona',
    MUSIC: 'music',
  };
  return map[format] || null;
}

function mapStatusToJikanStatus(status) {
  const map = {
    RELEASING: 'airing',
    FINISHED: 'complete',
    NOT_YET_RELEASED: 'upcoming',
  };
  return map[status] || null;
}

function mapSortToJikan(sort) {
  const normalized = normalizeSort(sort);
  const map = {
    POPULARITY_DESC: { order_by: 'popularity', sort: 'asc' },
    SCORE_DESC: { order_by: 'score', sort: 'desc' },
    LATEST: { order_by: 'start_date', sort: 'desc' },
    TITLE_ASC: { order_by: 'title', sort: 'asc' },
  };
  return map[normalized] || map.POPULARITY_DESC;
}

function normalizeSort(sort) {
  const value = String(sort || '').toUpperCase();
  if (value === 'TOP_RATED' || value === 'SCORE_DESC') return 'SCORE_DESC';
  if (value === 'MOST_VIEWED' || value === 'POPULARITY_DESC') return 'POPULARITY_DESC';
  if (value === 'LATEST' || value === 'START_DATE_DESC') return 'LATEST';
  if (value === 'TITLE' || value === 'TITLE_ASC') return 'TITLE_ASC';
  return 'POPULARITY_DESC';
}

function normalizePeriod(period) {
  const value = String(period || '').toLowerCase();
  if (['day', 'week', 'month', 'year'].includes(value)) return value;
  return 'all';
}

function supportsPeriodSort(sort) {
  return ['SCORE_DESC', 'POPULARITY_DESC'].includes(normalizeSort(sort));
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function getPeriodDateRange(period) {
  const normalized = normalizePeriod(period);
  if (normalized === 'all') return null;

  const end = new Date();
  const start = new Date(end);
  if (normalized === 'day') start.setDate(end.getDate() - 1);
  if (normalized === 'week') start.setDate(end.getDate() - 7);
  if (normalized === 'month') start.setMonth(end.getMonth() - 1);
  if (normalized === 'year') start.setFullYear(end.getFullYear() - 1);

  return {
    start_date: formatDate(start),
    end_date: formatDate(end),
  };
}

async function getTopAnime({ page = 1, limit = 20 } = {}) {
  return requestJikan('/top/anime', { page, limit, sfw: true });
}

async function getSeasonNow({ page = 1, limit = 20 } = {}) {
  return requestJikan('/seasons/now', { page, limit, sfw: true });
}

async function searchAnime({
  keyword = '',
  page = 1,
  limit = 20,
  genre = '',
  year = '',
  season = '',
  format = '',
  status = '',
  sort = 'POPULARITY_DESC',
  period = 'all',
} = {}) {
  const sortParams = mapSortToJikan(sort);
  const params = {
    q: keyword || undefined,
    page,
    limit,
    sfw: true,
    order_by: sortParams.order_by,
    sort: sortParams.sort,
  };

  const genreId = genreIdMap[genre];
  if (genreId) params.genres = genreId;

  const jikanType = mapFormatToJikanType(format);
  if (jikanType) params.type = jikanType;

  const jikanStatus = mapStatusToJikanStatus(status);
  if (jikanStatus) params.status = jikanStatus;

  if (year) {
    params.start_date = `${year}-01-01`;
    params.end_date = `${year}-12-31`;
  } else if (supportsPeriodSort(sort)) {
    const periodRange = getPeriodDateRange(period);
    if (periodRange) {
      params.start_date = periodRange.start_date;
      params.end_date = periodRange.end_date;
    }
  }

  let result = await requestJikan('/anime', params);
  if (
    (!result.data || result.data.length === 0) &&
    !year &&
    supportsPeriodSort(sort) &&
    normalizePeriod(period) !== 'all'
  ) {
    delete params.start_date;
    delete params.end_date;
    result = await requestJikan('/anime', params);
  }

  if (!season) return result;

  const filtered = (result.data || []).filter(
    (item) => String(item.season || '').toUpperCase() === String(season).toUpperCase()
  );

  return {
    ...result,
    data: filtered,
    pagination: {
      ...(result.pagination || {}),
      items: {
        ...(result.pagination?.items || {}),
        count: filtered.length,
      },
    },
  };
}

async function getAnimeById(id) {
  return requestJikan(`/anime/${id}`, { sfw: true });
}

async function getRecommendationsFromGenre({ genre = '', page = 1, limit = 12 } = {}) {
  return searchAnime({
    keyword: '',
    genre,
    page,
    limit,
    sort: 'SCORE_DESC',
  });
}

module.exports = {
  genreIdMap,
  getTopAnime,
  getSeasonNow,
  searchAnime,
  getAnimeById,
  getRecommendationsFromGenre,
};
