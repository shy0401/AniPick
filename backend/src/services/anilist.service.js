const axios = require('axios');

const ANILIST_URL = 'https://graphql.anilist.co';
const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map();
let lastRequestAt = 0;

function createAniListError(message, statusCode = 502, details = null) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
}

function buildCacheKey(query, variables) {
  return `${query}::${JSON.stringify(variables || {})}`;
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

function setCache(key, data) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

function mapNetworkError(error) {
  const code = error.code;
  if (['ENOTFOUND', 'ECONNRESET', 'ETIMEDOUT', 'ECONNABORTED'].includes(code)) {
    return createAniListError('AniList API connection failed.', 502, { code });
  }
  return createAniListError('AniList API is temporarily unavailable.', 502, { code });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForRateLimit() {
  const perMinute = Math.max(1, Number(process.env.ANILIST_RATE_LIMIT_PER_MINUTE || 60));
  const minInterval = Math.ceil(60000 / perMinute);
  const elapsed = Date.now() - lastRequestAt;
  if (elapsed < minInterval) {
    await delay(minInterval - elapsed);
  }
  lastRequestAt = Date.now();
}

async function requestAniList(query, variables = {}, useCache = true) {
  const key = buildCacheKey(query, variables);

  if (useCache) {
    const cached = getCached(key);
    if (cached) return cached;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('[AniList] Request start');
  }

  try {
    await waitForRateLimit();
    const response = await axios.post(
      ANILIST_URL,
      { query, variables },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': 'AniPick/1.0',
        },
        timeout: 15000,
        validateStatus: () => true,
      }
    );

    if (response.status === 429) {
      throw createAniListError('AniList rate limit exceeded.', 429, response.data || null);
    }

    if (response.data?.errors?.length) {
      console.error('[AniList] GraphQL errors:', response.data.errors);
      throw createAniListError('AniList GraphQL request failed.', 502, {
        status: response.status,
        graphqlErrors: response.data.errors,
      });
    }

    if (response.status >= 400) {
      throw createAniListError('AniList API is temporarily unavailable.', 502, {
        status: response.status,
        statusText: response.statusText,
        responseData: response.data || null,
      });
    }

    const data = response.data?.data;

    if (useCache) {
      setCache(key, data);
    }

    return data;
  } catch (error) {
    const status = error.response?.status;
    const statusText = error.response?.statusText;

    console.error('[AniList] request failed');
    console.error('error.code:', error.code);
    console.error('error.message:', error.message);
    console.error('error.response?.status:', status);
    console.error('error.response?.statusText:', statusText);
    console.error('error.response?.data:', error.response?.data || error.details || null);
    if (error.response?.data?.errors) {
      console.error('[AniList] GraphQL errors:', error.response.data.errors);
    }

    if (error.statusCode) {
      throw error;
    }

    if (status === 429) {
      throw createAniListError('AniList rate limit exceeded.', 429, error.response?.data || null);
    }

    if (['ENOTFOUND', 'ECONNRESET', 'ETIMEDOUT', 'ECONNABORTED'].includes(error.code)) {
      throw createAniListError('AniList API connection failed.', 502, { code: error.code });
    }

    if (status && status >= 400 && error.response?.data?.errors?.length) {
      throw createAniListError('AniList GraphQL request failed.', 502, {
        status,
        statusText,
        graphqlErrors: error.response.data.errors,
      });
    }

    if (status && status >= 400) {
      throw createAniListError('AniList API is temporarily unavailable.', 502, {
        status,
        statusText,
      });
    }

    throw mapNetworkError(error);
  }
}

module.exports = { requestAniList, createAniListError };
