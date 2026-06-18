require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { animeTranslations } = require('./data/animeTranslations');
const {
  hasHangul,
  isMeaningfulTitle,
  getDisplayDescription,
  translateGenres,
  translateStatus,
  translateSeason,
  translateFormat,
} = require('./utils/animeI18n');

const PORT = Number(process.env.PORT) || 4001;
const JWT_SECRET = process.env.JWT_SECRET || 'anipick_nas_fallback_secret';
const DATA_DIR = process.env.NAS_DATA_DIR || path.resolve(__dirname, '../../runtime');
const STORE_FILE = path.join(DATA_DIR, 'nas-store.json');
const CSV_ITEM_DIR = path.resolve(__dirname, '../data/anime_csv/items');
const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

const BLOCKED_TERMS = ['hentai', 'erotica', 'rx - hentai'];
const DEFAULT_TOP_IDS = [
  52991, 59845, 5114, 9253, 11061, 21, 1535, 38000, 40748, 16498,
  30276, 31964, 20, 1735, 41467, 44511, 38524, 1, 20583, 37510,
];

let csvCatalogCache = null;

function ensureDataStore() {
  fs.mkdirSync(DATA_DIR, { recursive: true });

  if (!fs.existsSync(STORE_FILE)) {
    const adminPassword = bcrypt.hashSync('admin1234', 10);
    const initial = {
      users: [
        {
          id: 1,
          email: 'admin@anipick.com',
          password: adminPassword,
          nickname: 'admin',
          role: 'ADMIN',
          createdAt: new Date().toISOString(),
        },
      ],
      favorites: [],
      watchStatuses: [],
      reviews: [],
      notices: [],
      hiddenAnime: [],
      manualTranslations: [],
      animeCache: [],
      nextIds: {
        user: 2,
        favorite: 1,
        watchStatus: 1,
        review: 1,
        notice: 1,
        manualTranslation: 1,
      },
    };

    fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  }
}

function readStore() {
  ensureDataStore();
  const store = JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8'));
  store.users ||= [];
  store.favorites ||= [];
  store.watchStatuses ||= [];
  store.reviews ||= [];
  store.notices ||= [];
  store.hiddenAnime ||= [];
  store.manualTranslations ||= [];
  store.animeCache ||= [];
  store.nextIds ||= {};
  store.nextIds.user ||= Math.max(0, ...store.users.map((item) => item.id || 0)) + 1;
  store.nextIds.favorite ||= Math.max(0, ...store.favorites.map((item) => item.id || 0)) + 1;
  store.nextIds.watchStatus ||= Math.max(0, ...store.watchStatuses.map((item) => item.id || 0)) + 1;
  store.nextIds.review ||= Math.max(0, ...store.reviews.map((item) => item.id || 0)) + 1;
  store.nextIds.notice ||= Math.max(0, ...store.notices.map((item) => item.id || 0)) + 1;
  store.nextIds.manualTranslation ||=
    Math.max(0, ...store.manualTranslations.map((item) => item.id || 0)) + 1;
  return store;
}

function writeStore(store) {
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

function getLang(req) {
  const value = String(req.query.lang || req.get('X-AniPick-Lang') || 'ko').toLowerCase();
  return ['ko', 'en', 'ja'].includes(value) ? value : 'ko';
}

function numberOrNull(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

function integerOrNull(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? Math.round(numeric) : null;
}

function parseCsvRecords(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') index += 1;
      row.push(cell);
      cell = '';

      if (row.some((value) => String(value || '').trim() !== '')) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    cell += char;
  }

  if (cell || row.length > 0) {
    row.push(cell);
    if (row.some((value) => String(value || '').trim() !== '')) {
      rows.push(row);
    }
  }

  if (rows.length < 2) return [];

  const headers = rows[0].map((header) => String(header || '').replace(/^\uFEFF/, '').trim());
  return rows.slice(1).map((values) =>
    headers.reduce((record, header, index) => {
      record[header] = values[index] ?? '';
      return record;
    }, {})
  );
}

function parseCsvGenres(value) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter(Boolean).map(String);
  } catch {
    // Fall through to comma-separated parsing.
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeCsvScore(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  if (numeric <= 10) return Math.round(numeric * 10);
  if (numeric > 1000) return Math.round(numeric / 10);
  return Math.round(numeric);
}

function normalizeGenres(genres) {
  if (!Array.isArray(genres)) return [];
  return genres
    .map((item) => (typeof item === 'string' ? item : item?.name))
    .filter(Boolean);
}

function isAdultAnime(anime) {
  const genres = normalizeGenres(anime?.genres || anime?.sourcePayload?.genres);
  const text = [
    anime?.displayTitle,
    anime?.romajiTitle,
    anime?.englishTitle,
    anime?.nativeTitle,
    anime?.description,
    anime?.rating,
    anime?.sourcePayload?.rating,
    ...genres,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return BLOCKED_TERMS.some((term) => text.includes(term));
}

function repairKnownMojibake(value) {
  return String(value || '')
    .replace(/\u904a\ub257\ud282/g, '\uBD07\uCE58')
    .replace(/\uFFFD\ub711/g, '\uB354')
    .replace(/\u6FE1\uFFFD/g, '\uB85D')
    .replace(/\u746A\u7E82/g, '\uBD07\uCE58')
    .replace(/\u6E26/g, '\uB354')
    .replace(/\u7159/g, '\uB85D');
}

function normalizeSearchText(value) {
  return repairKnownMojibake(value)
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[^\p{L}\p{N}\s:-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getSearchFieldsForAnime(anime, seed = null) {
  return [
    anime?.displayTitle,
    anime?.romajiTitle,
    anime?.englishTitle,
    anime?.nativeTitle,
    anime?.description,
    anime?.sourcePayload?.title,
    anime?.sourcePayload?.title_english,
    anime?.sourcePayload?.title_japanese,
    anime?.sourcePayload?.ko_title,
    anime?.sourcePayload?.ko_description,
    seed?.koTitle,
    seed?.enTitle,
    seed?.jaTitle,
    seed?.koDescription,
    seed?.enDescription,
    seed?.jaDescription,
  ].filter(Boolean);
}

function animeMatchesKeyword(anime, keyword, seed = null) {
  const normalizedKeyword = normalizeSearchText(keyword);
  if (!normalizedKeyword) return false;
  return getSearchFieldsForAnime(anime, seed).some((field) =>
    normalizeSearchText(field).includes(normalizedKeyword)
  );
}

function getSeedSearchMatches(keyword) {
  const normalizedKeyword = normalizeSearchText(keyword);
  if (!normalizedKeyword) return [];

  return Object.entries(animeTranslations || {})
    .filter(([, seed]) =>
      [seed.koTitle, seed.enTitle, seed.jaTitle, seed.koDescription, seed.enDescription, seed.jaDescription]
        .filter(Boolean)
        .some((field) => normalizeSearchText(field).includes(normalizedKeyword))
    )
    .map(([externalId]) => getSeedFallbackAnime(Number(externalId)))
    .filter(Boolean);
}

function getCachedSearchMatches(store, keyword) {
  const normalizedKeyword = normalizeSearchText(keyword);
  if (!normalizedKeyword) return [];

  return (store.animeCache || []).filter((anime) => {
    const externalId = anime.externalId || anime.malId || anime.id;
    return animeMatchesKeyword(anime, normalizedKeyword, getSeedTranslation(externalId));
  });
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

  for (const item of seedMatches.slice(0, 8)) {
    const seed = getSeedTranslation(item.externalId || item.malId || item.id);
    add(seed?.enTitle);
    if (variants.length === 0) add(seed?.jaTitle);
  }

  return variants.slice(0, 4);
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

function getJikanSortParams(sort) {
  const normalized = normalizeSort(sort);
  if (normalized === 'SCORE_DESC') return { order_by: 'score', sort: 'desc' };
  if (normalized === 'TITLE_ASC') return { order_by: 'title', sort: 'asc' };
  if (normalized === 'LATEST') return { order_by: 'start_date', sort: 'desc' };
  return { order_by: 'popularity', sort: 'asc' };
}

function getSearchRelevanceScore(anime, keyword) {
  const normalizedKeyword = normalizeSearchText(keyword);
  if (!normalizedKeyword) return 0;

  const seed = getSeedTranslation(anime.externalId || anime.malId || anime.id);
  const titleFields = [
    seed?.koTitle,
    seed?.enTitle,
    seed?.jaTitle,
    anime?.romajiTitle,
    anime?.englishTitle,
    anime?.nativeTitle,
    anime?.sourcePayload?.title,
    anime?.sourcePayload?.title_english,
    anime?.sourcePayload?.title_japanese,
    anime?.sourcePayload?.ko_title,
  ].filter(Boolean);

  let score = 0;
  for (const title of titleFields) {
    const normalizedTitle = normalizeSearchText(title);
    if (!normalizedTitle) continue;
    if (normalizedTitle === normalizedKeyword) score = Math.max(score, 10000);
    else if (normalizedTitle.startsWith(normalizedKeyword)) score = Math.max(score, 8000);
    else if (normalizedTitle.includes(normalizedKeyword)) score = Math.max(score, 6500);
    else if (normalizedKeyword.includes(normalizedTitle) && normalizedTitle.length >= 4) score = Math.max(score, 5000);
  }

  const descriptionFields = [
    seed?.koDescription,
    seed?.enDescription,
    seed?.jaDescription,
    anime?.description,
    anime?.sourcePayload?.ko_description,
  ].filter(Boolean);
  if (descriptionFields.some((field) => normalizeSearchText(field).includes(normalizedKeyword))) {
    score = Math.max(score, 1200);
  }

  if (score === 0) return 0;

  if (anime.imageUrl) score += 80;
  if (anime.averageScore) score += Math.min(100, Number(anime.averageScore || 0));
  if (anime.members) score += Math.min(80, Math.log10(Number(anime.members || 1)) * 12);
  if (anime.popularity) score += Math.max(0, 80 - Math.min(80, Number(anime.popularity || 0) / 300));

  return score;
}

function sortSearchResults(items, keyword, sort) {
  const withIndex = items.map((item, index) => ({ item, index }));
  return withIndex
    .sort((a, b) => {
      const relevanceDiff = getSearchRelevanceScore(b.item, keyword) - getSearchRelevanceScore(a.item, keyword);
      if (relevanceDiff) return relevanceDiff;

      if (normalizeSort(sort) === 'SCORE_DESC') {
        const scoreDiff = Number(b.item.averageScore || 0) - Number(a.item.averageScore || 0);
        if (scoreDiff) return scoreDiff;
      }

      const aPopularity = Number(a.item.popularity || 999999);
      const bPopularity = Number(b.item.popularity || 999999);
      if (aPopularity !== bPopularity) return aPopularity - bPopularity;

      return a.index - b.index;
    })
    .map(({ item }) => item);
}

function hasSearchRelevance(anime, queryVariants = []) {
  if (queryVariants.length === 0) return false;
  return queryVariants.some((query) => getSearchRelevanceScore(anime, query) > 0);
}

function paginateItems(items, page, perPage) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

function getSeedTranslation(externalId) {
  return animeTranslations?.[String(externalId)] || null;
}

function getManualTranslation(store, externalId, lang) {
  if (!store) return null;
  return (store.manualTranslations || []).find(
    (item) => Number(item.externalId) === Number(externalId) && item.lang === lang
  );
}

function buildTranslationRows(externalId, store = null) {
  const seed = getSeedTranslation(externalId);
  const langs = ['ko', 'en', 'ja'];
  return langs.map((lang) => {
    const manual = getManualTranslation(store, externalId, lang);
    if (manual) return manual;

    const title =
      lang === 'ko' ? seed?.koTitle : lang === 'ja' ? seed?.jaTitle : seed?.enTitle;
    const description =
      lang === 'ko' ? seed?.koDescription : lang === 'ja' ? seed?.jaDescription : seed?.enDescription;

    return {
      id: `${externalId}-${lang}`,
      provider: 'JIKAN',
      externalId: Number(externalId),
      lang,
      title: title || null,
      description: description || null,
      source: seed ? 'SEED' : null,
      status: description ? 'REVIEWED' : title ? 'TITLE_ONLY' : 'PENDING',
      failureReason: null,
      createdAt: null,
      updatedAt: null,
    };
  });
}

function getSeedFallbackAnime(externalId) {
  const seed = getSeedTranslation(externalId);
  if (!seed) return null;

  return {
    id: externalId,
    animeId: externalId,
    externalId,
    malId: externalId,
    provider: 'JIKAN',
    romajiTitle: seed.enTitle || seed.koTitle || seed.jaTitle || `Anime ${externalId}`,
    englishTitle: seed.enTitle || seed.koTitle || seed.jaTitle || `Anime ${externalId}`,
    nativeTitle: seed.jaTitle || seed.koTitle || seed.enTitle || null,
    description: seed.enDescription || seed.koDescription || '',
    imageUrl: null,
    bannerUrl: null,
    siteUrl: `https://myanimelist.net/anime/${externalId}`,
    averageScore: null,
    popularity: null,
    episodes: null,
    status: null,
    season: null,
    seasonYear: null,
    format: null,
    genres: [],
    sourcePayload: {},
  };
}


function isFilled(value) {
  return value !== null && value !== undefined && String(value).trim() !== '';
}

function pickFilledValue(nextValue, currentValue) {
  return isFilled(nextValue) ? nextValue : currentValue;
}

function mergeAnimeData(current, next) {
  if (!current) return next;
  if (!next) return current;

  return {
    ...current,
    ...next,
    romajiTitle: pickFilledValue(next.romajiTitle, current.romajiTitle),
    englishTitle: pickFilledValue(next.englishTitle, current.englishTitle),
    nativeTitle: pickFilledValue(next.nativeTitle, current.nativeTitle),
    description: pickFilledValue(next.description, current.description),
    imageUrl: pickFilledValue(next.imageUrl, current.imageUrl),
    bannerUrl: pickFilledValue(next.bannerUrl, current.bannerUrl),
    siteUrl: pickFilledValue(next.siteUrl, current.siteUrl),
    averageScore: next.averageScore ?? current.averageScore ?? null,
    popularity: next.popularity ?? current.popularity ?? null,
    scoredBy: next.scoredBy ?? current.scoredBy ?? null,
    rank: next.rank ?? current.rank ?? null,
    members: next.members ?? current.members ?? null,
    favorites: next.favorites ?? current.favorites ?? null,
    episodes: next.episodes ?? current.episodes ?? null,
    status: pickFilledValue(next.status, current.status),
    season: pickFilledValue(next.season, current.season),
    seasonYear: next.seasonYear ?? current.seasonYear ?? null,
    startDate: next.startDate ?? current.startDate ?? null,
    format: pickFilledValue(next.format, current.format),
    genres: Array.isArray(next.genres) && next.genres.length > 0 ? next.genres : current.genres || [],
    rating: pickFilledValue(next.rating, current.rating),
    sourcePayload: {
      ...(current.sourcePayload || {}),
      ...(next.sourcePayload || {}),
    },
  };
}

function getCachedAnime(store, externalId) {
  return (store.animeCache || []).find((item) => Number(item.externalId) === Number(externalId)) || null;
}

function upsertCachedAnime(store, anime) {
  if (!anime?.externalId) return anime;

  const currentIndex = (store.animeCache || []).findIndex(
    (item) => Number(item.externalId) === Number(anime.externalId)
  );
  const current = currentIndex >= 0 ? store.animeCache[currentIndex] : getSeedFallbackAnime(anime.externalId);
  const merged = {
    ...mergeAnimeData(current, anime),
    cachedAt: new Date().toISOString(),
  };

  if (currentIndex >= 0) {
    store.animeCache[currentIndex] = merged;
  } else {
    store.animeCache.push(merged);
  }

  return merged;
}

function applyCsvOverrides(row) {
  const externalId = Number(row?.external_id || 0);

  if (externalId === 47917) {
    const description = String(row.ko_description || '')
      .replace(/보코치/g, '봇치')
      .replace(/호리토/g, '히토리');

    return {
      ...row,
      ko_title: '봇치 더 록!',
      ko_description: description || row.ko_description,
    };
  }

  return row;
}

function csvRowToAnime(row) {
  const normalizedRow = applyCsvOverrides(row);
  const provider = String(normalizedRow.provider || '').toUpperCase();
  if (provider !== 'JIKAN') return null;

  const externalId = numberOrNull(normalizedRow.external_id);
  if (!externalId) return null;

  const sourceTitle =
    normalizedRow.source_title ||
    normalizedRow.romaji_title ||
    normalizedRow.english_title ||
    normalizedRow.native_title ||
    `Anime ${externalId}`;
  const genres = parseCsvGenres(normalizedRow.genres);

  return {
    id: externalId,
    animeId: externalId,
    externalId,
    malId: externalId,
    provider: 'JIKAN',
    romajiTitle: normalizedRow.romaji_title || sourceTitle,
    englishTitle: normalizedRow.english_title || normalizedRow.romaji_title || sourceTitle,
    nativeTitle: normalizedRow.native_title || sourceTitle,
    description: normalizedRow.source_description || '',
    imageUrl: normalizedRow.image_url || null,
    bannerUrl: normalizedRow.banner_url || normalizedRow.image_url || null,
    siteUrl: normalizedRow.site_url || `https://myanimelist.net/anime/${externalId}`,
    averageScore: normalizeCsvScore(normalizedRow.average_score),
    popularity: integerOrNull(normalizedRow.popularity),
    scoredBy: integerOrNull(normalizedRow.scored_by),
    rank: integerOrNull(normalizedRow.rank),
    members: integerOrNull(normalizedRow.members),
    favorites: integerOrNull(normalizedRow.favorites),
    episodes: integerOrNull(normalizedRow.episodes),
    status: normalizedRow.anime_status || null,
    season: normalizedRow.season || null,
    seasonYear: integerOrNull(normalizedRow.season_year),
    format: normalizedRow.format || null,
    genres,
    sourcePayload: {
      mal_id: externalId,
      title: sourceTitle,
      title_english: normalizedRow.english_title || null,
      title_japanese: normalizedRow.native_title || null,
      titles: [
        { type: 'Default', title: sourceTitle },
        normalizedRow.english_title ? { type: 'English', title: normalizedRow.english_title } : null,
        normalizedRow.native_title ? { type: 'Japanese', title: normalizedRow.native_title } : null,
      ].filter(Boolean),
      synopsis: normalizedRow.source_description || null,
      genres,
      ko_title: normalizedRow.ko_title || null,
      ko_description: normalizedRow.ko_description || null,
      csv_status: normalizedRow.csv_status || null,
      updated_at: normalizedRow.updated_at || null,
    },
  };
}

function csvRowToKoTranslation(row) {
  const normalizedRow = applyCsvOverrides(row);
  const externalId = numberOrNull(normalizedRow.external_id);
  if (!externalId) return null;

  const title = String(normalizedRow.ko_title || '').trim();
  const description = String(normalizedRow.ko_description || '').trim();
  if (!title && !description) return null;

  return {
    provider: 'JIKAN',
    externalId,
    lang: 'ko',
    title: title || null,
    description: description || null,
    source: normalizedRow.ko_source || 'CSV',
    status: normalizedRow.ko_status || (description ? 'REVIEWED' : 'TITLE_ONLY'),
    failureReason: normalizedRow.ko_failure_reason || null,
  };
}

function readCsvCatalogRows() {
  if (csvCatalogCache) return csvCatalogCache;
  if (!fs.existsSync(CSV_ITEM_DIR)) {
    csvCatalogCache = [];
    return csvCatalogCache;
  }

  csvCatalogCache = fs
    .readdirSync(CSV_ITEM_DIR)
    .filter((fileName) => /^JIKAN_\d+\.csv$/i.test(fileName))
    .flatMap((fileName) => {
      try {
        const content = fs.readFileSync(path.join(CSV_ITEM_DIR, fileName), 'utf-8');
        return parseCsvRecords(content);
      } catch (error) {
        console.error('[NAS_CSV] failed to read:', fileName, error.message);
        return [];
      }
    })
    .filter((row) => numberOrNull(row.external_id));

  return csvCatalogCache;
}

function getCsvAnimeCatalog() {
  return readCsvCatalogRows().map(csvRowToAnime).filter(Boolean);
}

function getCsvAnimeById(externalId) {
  const id = Number(externalId);
  return getCsvAnimeCatalog().find((anime) => Number(anime.externalId) === id) || null;
}

function getCsvSearchMatches(keyword) {
  const normalizedKeyword = normalizeSearchText(keyword);
  if (!normalizedKeyword) return [];

  return getCsvAnimeCatalog().filter((anime) =>
    animeMatchesKeyword(anime, normalizedKeyword, getSeedTranslation(anime.externalId))
  );
}

function shouldPreserveManualTranslation(row) {
  return row?.source === 'MANUAL' && row?.status === 'REVIEWED';
}

function upsertCsvKoTranslation(store, row) {
  const translation = csvRowToKoTranslation(row);
  if (!translation) return false;

  const index = (store.manualTranslations || []).findIndex(
    (item) => Number(item.externalId) === Number(translation.externalId) && item.lang === 'ko'
  );
  const now = new Date().toISOString();

  if (index >= 0) {
    const current = store.manualTranslations[index];
    if (shouldPreserveManualTranslation(current)) return false;

    store.manualTranslations[index] = {
      ...current,
      ...translation,
      title: translation.title || current.title || null,
      description: translation.description || current.description || null,
      updatedAt: now,
    };
    return true;
  }

  store.manualTranslations.push({
    id: store.nextIds.manualTranslation++,
    ...translation,
    createdAt: now,
    updatedAt: now,
  });
  return true;
}

function syncCsvCatalogToStore(store) {
  const rows = readCsvCatalogRows();
  let animeSynced = 0;
  let translationsSynced = 0;

  for (const row of rows) {
    const anime = csvRowToAnime(row);
    if (!anime) continue;

    upsertCachedAnime(store, anime);
    animeSynced += 1;

    if (upsertCsvKoTranslation(store, row)) {
      translationsSynced += 1;
    }
  }

  return {
    totalCsv: rows.length,
    animeSynced,
    translationsSynced,
  };
}

function normalizeJikanAnime(raw) {
  if (!raw) return null;

  const externalId = numberOrNull(raw.mal_id);
  if (!externalId) return null;
  const titleRows = Array.isArray(raw.titles) ? raw.titles : [];
  const titleByType = (type) =>
    titleRows.find((item) => String(item?.type || '').toLowerCase() === String(type).toLowerCase())?.title || null;
  const defaultTitle = raw.title || titleByType('Default') || raw.title_english || raw.title_japanese || `Anime ${externalId}`;
  const englishTitle = raw.title_english || titleByType('English') || defaultTitle;
  const nativeTitle = raw.title_japanese || titleByType('Japanese') || defaultTitle;

  const imageUrl =
    raw.images?.jpg?.large_image_url ||
    raw.images?.webp?.large_image_url ||
    raw.images?.jpg?.image_url ||
    raw.images?.webp?.image_url ||
    null;

  return {
    id: externalId,
    animeId: externalId,
    externalId,
    malId: externalId,
    provider: 'JIKAN',
    romajiTitle: defaultTitle,
    englishTitle,
    nativeTitle,
    description: raw.synopsis || raw.background || '',
    imageUrl,
    bannerUrl: raw.trailer?.images?.maximum_image_url || imageUrl,
    siteUrl: raw.url || `https://myanimelist.net/anime/${externalId}`,
    averageScore: raw.score ? Math.round(Number(raw.score) * 10) : null,
    popularity: raw.popularity || null,
    scoredBy: raw.scored_by || null,
    rank: raw.rank || null,
    members: raw.members || null,
    favorites: raw.favorites || null,
    episodes: raw.episodes || null,
    status: raw.status || null,
    season: raw.season || null,
    seasonYear: raw.year || null,
    startDate: raw.aired?.from || null,
    format: raw.type || null,
    genres: normalizeGenres(raw.genres),
    rating: raw.rating || null,
    sourcePayload: {
      mal_id: raw.mal_id,
      rating: raw.rating,
      title: raw.title,
      title_english: raw.title_english,
      title_japanese: raw.title_japanese,
      titles: raw.titles || [],
      synopsis: raw.synopsis,
      aired: raw.aired || null,
      genres: normalizeGenres(raw.genres),
    },
  };
}

function getLocalizedDisplayTitle(anime, lang, translation, seed) {
  const translatedTitle = translation?.title && String(translation.title).trim();
  const sourceTitles = Array.isArray(anime?.sourcePayload?.titles)
    ? anime.sourcePayload.titles.map((item) => item?.title || item?.name || item).filter(Boolean)
    : [];
  const idFallback = `Anime ${anime?.externalId || anime?.malId || anime?.id || ''}`.trim();

  if (lang === 'ko') {
    return (
      (isMeaningfulTitle(translatedTitle) ? translatedTitle : null) ||
      (isMeaningfulTitle(seed?.koTitle) ? seed.koTitle : null) ||
      (hasHangul(anime?.nativeTitle) ? anime.nativeTitle : null) ||
      anime?.englishTitle ||
      anime?.romajiTitle ||
      anime?.sourcePayload?.title_english ||
      anime?.sourcePayload?.title ||
      sourceTitles.find(Boolean) ||
      idFallback
    );
  }

  if (lang === 'ja') {
    return (
      (isMeaningfulTitle(translatedTitle) ? translatedTitle : null) ||
      (isMeaningfulTitle(seed?.jaTitle) ? seed.jaTitle : null) ||
      anime?.nativeTitle ||
      anime?.sourcePayload?.title_japanese ||
      anime?.romajiTitle ||
      anime?.englishTitle ||
      anime?.sourcePayload?.title ||
      sourceTitles.find(Boolean) ||
      idFallback
    );
  }

  return (
    (isMeaningfulTitle(translatedTitle) ? translatedTitle : null) ||
    seed?.enTitle ||
    anime?.englishTitle ||
    anime?.romajiTitle ||
    anime?.nativeTitle ||
    anime?.sourcePayload?.title_english ||
    anime?.sourcePayload?.title ||
    sourceTitles.find(Boolean) ||
    idFallback
  );
}

function getLocalizedDisplayDescription(anime, lang, translation, seed) {
  return getDisplayDescription(anime, lang, translation || null);
}

function localizeAnime(anime, lang, store = null) {
  if (!anime) return null;

  const externalId = anime.externalId || anime.malId || anime.id;
  const seed = getSeedTranslation(externalId);
  const manual = getManualTranslation(store, externalId, lang);
  const seedTranslation =
    lang === 'ko'
      ? {
          lang,
          title: seed?.koTitle || null,
          description: seed?.koDescription || null,
          source: seed ? 'SEED' : null,
          status: seed?.koDescription ? 'REVIEWED' : seed?.koTitle ? 'TITLE_ONLY' : null,
          failureReason: null,
        }
      : lang === 'ja'
        ? {
            lang,
            title: seed?.jaTitle || null,
            description: seed?.jaDescription || null,
            source: seed ? 'SEED' : null,
            status: seed?.jaDescription ? 'REVIEWED' : seed?.jaTitle ? 'TITLE_ONLY' : null,
            failureReason: null,
          }
        : {
            lang,
            title: seed?.enTitle || null,
            description: seed?.enDescription || null,
            source: seed ? 'SEED' : null,
            status: seed?.enDescription ? 'REVIEWED' : seed?.enTitle ? 'TITLE_ONLY' : null,
            failureReason: null,
          };
  const translation = manual || seedTranslation;

  const koTitle = seed?.koTitle || null;
  const displayTitle = getLocalizedDisplayTitle(anime, lang, translation, seed);
  const displayDescription = getLocalizedDisplayDescription(anime, lang, translation, seed);

  return {
    ...anime,
    id: anime.externalId || anime.malId || anime.id,
    animeId: anime.externalId || anime.malId || anime.id,
    routeId: anime.externalId || anime.malId || anime.id,
    malId: anime.externalId || anime.malId || anime.id,
    koreanTitle: koTitle,
    displayTitle,
    displayDescription,
    displayGenres: translateGenres(anime.genres || [], lang),
    displayStatus: translateStatus(anime.status, lang) || '-',
    displaySeason: translateSeason(anime.season, lang) || '-',
    displayFormat: translateFormat(anime.format, lang) || '-',
    translation,
    translationStatus: translation.status || 'FALLBACK',
    isTranslated: Boolean(translation.title || translation.description),
    title: {
      romaji: anime.romajiTitle,
      english: anime.englishTitle,
      native: anime.nativeTitle,
    },
    coverImage: {
      extraLarge: anime.imageUrl,
      large: anime.imageUrl,
      medium: anime.imageUrl,
    },
  };
}

function pageInfo(page, perPage, total) {
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  return {
    currentPage: page,
    perPage,
    total,
    lastPage,
    hasNextPage: page < lastPage,
  };
}

async function fetchJikan(pathname, params = {}) {
  const { data } = await axios.get(`${JIKAN_BASE_URL}${pathname}`, {
    params,
    timeout: 12000,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'AniPick NAS deployment',
    },
  });

  return data;
}

async function fetchTopAnime(page = 1, perPage = 20, extra = {}) {
  const data = await fetchJikan('/top/anime', {
    page,
    limit: Math.min(perPage, 25),
    filter: 'bypopularity',
    ...extra,
  });

  return {
    items: (data.data || []).map(normalizeJikanAnime).filter(Boolean),
    total: data.pagination?.items?.total || (data.data || []).length,
  };
}

async function fetchAnimeDetail(id) {
  const data = await fetchJikan(`/anime/${id}/full`);
  return normalizeJikanAnime(data.data);
}

async function fetchJikanSearchVariant(keyword, page, perPage, sort, period = 'all') {
  const sortParams = getJikanSortParams(sort);
  const params = {
    q: keyword,
    page,
    limit: Math.min(perPage, 25),
    sfw: true,
    order_by: sortParams.order_by,
    sort: sortParams.sort,
  };

  if (supportsPeriodSort(sort)) {
    const periodRange = getPeriodDateRange(period);
    if (periodRange) {
      params.start_date = periodRange.start_date;
      params.end_date = periodRange.end_date;
    }
  }

  let data = await fetchJikan('/anime', params);
  if (
    (!data.data || data.data.length === 0) &&
    supportsPeriodSort(sort) &&
    normalizePeriod(period) !== 'all'
  ) {
    delete params.start_date;
    delete params.end_date;
    data = await fetchJikan('/anime', params);
  }

  return {
    items: (data.data || []).map(normalizeJikanAnime).filter(Boolean),
    total: data.pagination?.items?.total || (data.data || []).length,
    pageInfo: data.pagination || null,
  };
}

async function fetchAnimeDirectory(page = 1, perPage = 20, sort = 'POPULARITY_DESC', period = 'all') {
  const sortParams = getJikanSortParams(sort);
  const params = {
    page,
    limit: Math.min(perPage, 25),
    sfw: true,
    order_by: sortParams.order_by,
    sort: sortParams.sort,
  };

  if (supportsPeriodSort(sort)) {
    const periodRange = getPeriodDateRange(period);
    if (periodRange) {
      params.start_date = periodRange.start_date;
      params.end_date = periodRange.end_date;
    }
  }

  let data = await fetchJikan('/anime', params);
  if (
    (!data.data || data.data.length === 0) &&
    supportsPeriodSort(sort) &&
    normalizePeriod(period) !== 'all'
  ) {
    delete params.start_date;
    delete params.end_date;
    data = await fetchJikan('/anime', params);
  }

  return {
    items: (data.data || []).map(normalizeJikanAnime).filter(Boolean),
    total: data.pagination?.items?.total || (data.data || []).length,
  };
}

async function searchAnimeCatalog({ keyword, page = 1, perPage = 20, sort = 'POPULARITY_DESC', period = 'all', store }) {
  const byId = new Map();
  const seedMatches = getSeedSearchMatches(keyword);
  const cachedMatches = getCachedSearchMatches(store, keyword);
  const csvMatches = getCsvSearchMatches(keyword);

  for (const item of [...seedMatches, ...cachedMatches, ...csvMatches]) {
    if (!item?.externalId) continue;
    const current = byId.get(String(item.externalId));
    const merged = mergeAnimeData(mergeAnimeData(getSeedFallbackAnime(item.externalId), current), item);
    byId.set(String(item.externalId), merged);
  }

  const variants = buildSearchQueryVariants(keyword, seedMatches);
  let providerTotal = 0;
  let providerFailed = false;

  for (const variant of variants) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const result = await fetchJikanSearchVariant(variant, page, perPage, sort, period);
      providerTotal = Math.max(providerTotal, result.total || 0);

      for (const item of result.items || []) {
        if (!item?.externalId) continue;
        const current = byId.get(String(item.externalId));
        const merged = mergeAnimeData(getSeedFallbackAnime(item.externalId), mergeAnimeData(current, item));
        byId.set(String(item.externalId), merged);
      }
    } catch (error) {
      providerFailed = true;
      console.error('[NAS_SEARCH] Jikan variant failed:', variant, error.message);
    }
  }

  let allItems = Array.from(byId.values());
  allItems = filterSafeVisible(allItems, store);
  allItems = allItems.filter(hasReliableJikanIdentity);
  allItems = allItems.filter((item) => {
    const seed = getSeedTranslation(item.externalId || item.malId || item.id);
    if (seed && animeMatchesKeyword(item, keyword, seed)) return true;
    return hasSearchRelevance(item, variants);
  });
  allItems = sortSearchResults(allItems, keyword, sort);

  for (const item of allItems) {
    upsertCachedAnime(store, item);
  }
  writeStore(store);

  return {
    items: paginateItems(allItems, page, perPage),
    total: Math.max(allItems.length, providerTotal),
    provider: providerFailed && allItems.length > 0 ? 'JIKAN_CACHE' : 'JIKAN',
    isFallback: providerFailed && allItems.length === 0,
  };
}


async function getAnimeWithAssets(externalId, store) {
  const seed = getSeedFallbackAnime(externalId);
  const cached = getCachedAnime(store, externalId);
  const csvAnime = getCsvAnimeById(externalId);
  const localAnime = mergeAnimeData(seed, mergeAnimeData(csvAnime, cached));

  if (localAnime?.imageUrl && localAnime?.description) {
    const merged = upsertCachedAnime(store, localAnime);
    writeStore(store);
    return merged;
  }

  try {
    const fresh = await fetchAnimeDetail(externalId);
    const merged = upsertCachedAnime(store, mergeAnimeData(localAnime, fresh));
    writeStore(store);
    return merged;
  } catch {
    return localAnime;
  }
}

async function fetchSeedBackfill(limit = 20) {
  const items = DEFAULT_TOP_IDS.map(getSeedFallbackAnime).filter(Boolean);
  return items.slice(0, limit);
}


async function hydrateSeedBackfill(limit, store) {
  const seeds = await fetchSeedBackfill(limit);
  const hydrated = [];

  for (const seed of seeds) {
    const id = seed.externalId || seed.malId || seed.id;
    const anime = await getAnimeWithAssets(id, store);
    if (anime) hydrated.push(anime);
  }

  return hydrated;
}

async function fetchSimilarItemsForDetail(currentId, store, limit = 8) {
  const byId = new Map();

  try {
    const result = await fetchTopAnime(1, Math.min(25, limit + 12));
    for (const item of result.items || []) {
      if (!item?.externalId || Number(item.externalId) === Number(currentId)) continue;
      byId.set(String(item.externalId), upsertCachedAnime(store, item));
    }
    writeStore(store);
  } catch {
    // Seed hydration below keeps the detail page useful when the top endpoint is unavailable.
  }

  const seedItems = await hydrateSeedBackfill(Math.max(limit + 8, 16), store);
  for (const item of seedItems) {
    if (!item?.externalId || Number(item.externalId) === Number(currentId)) continue;
    byId.set(String(item.externalId), item);
  }

  return Array.from(byId.values())
    .filter((item) => item.imageUrl)
    .slice(0, limit);
}

function filterSafeVisible(items, store) {
  const hiddenSet = new Set((store.hiddenAnime || []).map(String));
  return items.filter((anime) => {
    const id = anime.externalId || anime.malId || anime.id;
    return id && !hiddenSet.has(String(id)) && !isAdultAnime(anime);
  });
}

function hasReliableJikanIdentity(anime) {
  const id = Number(anime?.externalId || anime?.malId || anime?.id || 0);
  if (!Number.isInteger(id) || id <= 0) return false;
  if (getSeedTranslation(id)) return true;

  const payloadMalId = Number(anime?.sourcePayload?.mal_id || 0);
  if (payloadMalId === id) return true;

  const siteUrl = String(anime?.siteUrl || '');
  if (/myanimelist\.net\/anime\/\d+\//i.test(siteUrl)) return true;

  // Old fallback/Kitsu rows can have very large non-MAL ids and a synthetic MAL URL.
  // Keep conservative cache matches only when they look like real Jikan anime rows.
  return id < 100000 && Boolean(anime?.imageUrl || anime?.description);
}

function sortQualityFirst(items) {
  return [...items].sort((a, b) => {
    const aImage = a.imageUrl ? 1 : 0;
    const bImage = b.imageUrl ? 1 : 0;
    if (aImage !== bImage) return bImage - aImage;
    return Number(b.averageScore || 0) - Number(a.averageScore || 0);
  });
}

function getBearerToken(req) {
  const header = req.get('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

function authRequired(req, res, next) {
  const token = getBearerToken(req);
  if (!token) return res.status(401).json({ message: 'Authentication required.' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const store = readStore();
    const user = store.users.find((item) => item.id === payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token.' });
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

function adminRequired(req, res, next) {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin permission required.' });
  }

  return next();
}

function buildAuthResponse(user) {
  const token = jwt.sign(
    { id: user.id, email: user.email, nickname: user.nickname, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
    },
  };
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    role: user.role,
    createdAt: user.createdAt,
  };
}

function createApp() {
  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (req, res) => {
    res.json({ message: 'AniPick NAS backend is running.' });
  });

  app.get('/api/anime/trending', async (req, res) => {
    const lang = getLang(req);
    const page = Math.max(1, Number(req.query.page) || 1);
    const perPage = Math.min(30, Math.max(1, Number(req.query.perPage) || 20));
    const store = readStore();

    try {
      const result = await fetchTopAnime(page, perPage);
    const items = sortQualityFirst(filterSafeVisible(result.items, store)).map((item) =>
        localizeAnime(item, lang, store)
      );
      return res.json({
        items,
        pageInfo: pageInfo(page, perPage, result.total),
        provider: 'JIKAN',
        isFallback: false,
        message: '',
      });
    } catch (error) {
      const fallback = filterSafeVisible(await hydrateSeedBackfill(perPage, store), store).map((item) =>
        localizeAnime(item, lang, store)
      );
      return res.json({
        items: fallback,
        pageInfo: pageInfo(1, perPage, fallback.length),
        provider: 'FALLBACK',
        isFallback: true,
        message: '외부 애니메이션 데이터 서버가 불안정하여 임시 데이터를 표시합니다.',
        debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
      });
    }
  });

  app.get('/api/anime/popular-season', async (req, res) => {
    const lang = getLang(req);
    const page = Math.max(1, Number(req.query.page) || 1);
    const perPage = Math.min(30, Math.max(1, Number(req.query.perPage) || 20));
    const store = readStore();

    try {
      const data = await fetchJikan('/seasons/now', { page, limit: Math.min(perPage, 25) });
      const items = sortQualityFirst(
        filterSafeVisible((data.data || []).map(normalizeJikanAnime).filter(Boolean), store)
      ).map((item) => localizeAnime(item, lang, store));
      return res.json({
        items,
        pageInfo: pageInfo(page, perPage, data.pagination?.items?.total || items.length),
        provider: 'JIKAN',
        isFallback: false,
        message: '',
      });
    } catch (error) {
      const fallback = filterSafeVisible(await hydrateSeedBackfill(perPage, store), store).map((item) =>
        localizeAnime(item, lang, store)
      );
      return res.json({
        items: fallback,
        pageInfo: pageInfo(1, perPage, fallback.length),
        provider: 'FALLBACK',
        isFallback: true,
        message: '외부 애니메이션 데이터 서버가 불안정하여 임시 데이터를 표시합니다.',
        debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
      });
    }
  });

  app.get('/api/anime/search', async (req, res) => {
    const lang = getLang(req);
    const page = Math.max(1, Number(req.query.page) || 1);
    const perPage = Math.min(30, Math.max(1, Number(req.query.perPage) || 20));
    const keyword = String(req.query.keyword || '').trim();
    const sort = normalizeSort(req.query.sort || 'MOST_VIEWED');
    const period = normalizePeriod(req.query.period || 'all');
    const store = readStore();

    try {
      let items = [];
      let total = 0;

      if (keyword) {
        const result = await searchAnimeCatalog({ keyword, page, perPage, sort, period, store });
        items = result.items;
        total = result.total;

        return res.json({
          items: items.map((item) => localizeAnime(item, lang, store)),
          pageInfo: pageInfo(page, perPage, total),
          provider: result.provider,
          isFallback: result.isFallback,
          sort,
          period,
          message: '',
        });
      } else {
        const result =
          period !== 'all' || sort === 'LATEST' || sort === 'TITLE_ASC'
            ? await fetchAnimeDirectory(page, perPage, sort, period)
            : await fetchTopAnime(page, perPage, {
                filter: sort === 'SCORE_DESC' ? 'favorite' : 'bypopularity',
              });
        items = result.items;
        total = result.total;
      }

      items = filterSafeVisible(items, store);
      if (sort === 'SCORE_DESC') {
        items = [...items].sort((a, b) => Number(b.averageScore || 0) - Number(a.averageScore || 0));
      }

      return res.json({
        items: items.map((item) => localizeAnime(item, lang, store)),
        pageInfo: pageInfo(page, perPage, total),
        provider: 'JIKAN',
        isFallback: false,
        sort,
        period,
        message: '',
      });
    } catch (error) {
      const fallback = filterSafeVisible(await hydrateSeedBackfill(perPage, store), store).map((item) =>
        localizeAnime(item, lang, store)
      );
      return res.json({
        items: fallback,
        pageInfo: pageInfo(1, perPage, fallback.length),
        provider: 'FALLBACK',
        isFallback: true,
        sort,
        period,
        message: '외부 애니메이션 데이터 서버가 불안정하여 임시 데이터를 표시합니다.',
        debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
      });
    }
  });

  app.get('/api/anime/recommendations', async (req, res) => {
    const lang = getLang(req);
    const perPage = Math.min(20, Math.max(1, Number(req.query.perPage) || 12));
    const store = readStore();
    const fallback = filterSafeVisible(await hydrateSeedBackfill(perPage, store), store).map((item) =>
      localizeAnime(item, lang, store)
    );
    res.json({
      type: 'popular',
      genre: '',
      reason: '인기 작품과 번역 준비가 완료된 작품을 중심으로 추천합니다.',
      items: fallback,
      isFallback: true,
    });
  });

  app.get('/api/anime/:id', async (req, res) => {
    const lang = getLang(req);
    const id = numberOrNull(req.params.id);
    if (!id) return res.status(404).json({ message: '애니메이션 정보를 찾을 수 없습니다.' });

    const store = readStore();
    if ((store.hiddenAnime || []).map(String).includes(String(id))) {
      return res.status(404).json({ message: '애니메이션 정보를 찾을 수 없습니다.' });
    }

    try {
      const anime = await getAnimeWithAssets(id, store);
      if (!anime || isAdultAnime(anime)) {
        return res.status(404).json({ message: '애니메이션 정보를 찾을 수 없습니다.' });
      }

      const similarItems = filterSafeVisible(await fetchSimilarItemsForDetail(id, store, 8), store)
        .filter((item) => item.externalId !== id)
        .map((item) => localizeAnime(item, lang, store));

      return res.json({
        ...localizeAnime(anime, lang, store),
        similarItems,
        isFallback: false,
      });
    } catch (error) {
      const fallback = getSeedFallbackAnime(id);
      if (!fallback) return res.status(404).json({ message: '애니메이션 정보를 찾을 수 없습니다.' });
      return res.json({
        ...localizeAnime(fallback, lang, store),
        similarItems: [],
        isFallback: true,
        message: '외부 애니메이션 데이터 서버가 불안정하여 캐시 정보를 표시합니다.',
        debug: process.env.NODE_ENV !== 'production' ? error.message : undefined,
      });
    }
  });

  app.post('/api/auth/register', async (req, res) => {
    const store = readStore();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const nickname = String(req.body.nickname || '').trim();

    if (!email || !password || !nickname) {
      return res.status(400).json({ message: 'email, password, nickname are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }
    if (store.users.some((user) => user.email === email)) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }

    const user = {
      id: store.nextIds.user++,
      email,
      password: await bcrypt.hash(password, 10),
      nickname,
      role: 'USER',
      createdAt: new Date().toISOString(),
    };
    store.users.push(user);
    writeStore(store);
    return res.status(201).json(buildAuthResponse(user));
  });

  app.post('/api/auth/login', async (req, res) => {
    const store = readStore();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const user = store.users.find((item) => item.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    return res.json(buildAuthResponse(user));
  });

  app.get('/api/auth/me', authRequired, (req, res) => {
    res.json(publicUser(req.user));
  });

  app.get('/api/favorites', authRequired, (req, res) => {
    const store = readStore();
    const rows = store.favorites.filter((item) => item.userId === req.user.id);
    res.json(rows);
  });

  app.post('/api/favorites', authRequired, (req, res) => {
    const store = readStore();
    const animeId = numberOrNull(req.body.animeId);
    if (!animeId) return res.status(400).json({ message: 'animeId is required.' });
    const existing = store.favorites.find((item) => item.userId === req.user.id && item.animeId === animeId);
    if (existing) return res.status(200).json(existing);
    const row = {
      id: store.nextIds.favorite++,
      userId: req.user.id,
      animeId,
      animeTitle: req.body.animeTitle || `Anime ${animeId}`,
      animeTitleDisplay: req.body.animeTitle || `Anime ${animeId}`,
      animeImage: req.body.animeImage || null,
      animeImageDisplay: req.body.animeImage || null,
      createdAt: new Date().toISOString(),
    };
    store.favorites.push(row);
    writeStore(store);
    res.status(201).json(row);
  });

  app.delete('/api/favorites/:animeId', authRequired, (req, res) => {
    const store = readStore();
    const animeId = numberOrNull(req.params.animeId);
    store.favorites = store.favorites.filter((item) => !(item.userId === req.user.id && item.animeId === animeId));
    writeStore(store);
    res.json({ message: 'Favorite removed.' });
  });

  app.get('/api/favorites/:animeId/status', authRequired, (req, res) => {
    const store = readStore();
    const animeId = numberOrNull(req.params.animeId);
    const isFavorite = store.favorites.some((item) => item.userId === req.user.id && item.animeId === animeId);
    res.json({ isFavorite });
  });

  app.get('/api/watch-status', authRequired, (req, res) => {
    const store = readStore();
    res.json(store.watchStatuses.filter((item) => item.userId === req.user.id));
  });

  app.put('/api/watch-status', authRequired, (req, res) => {
    const store = readStore();
    const animeId = numberOrNull(req.body.animeId);
    if (!animeId) return res.status(400).json({ message: 'animeId is required.' });
    let row = store.watchStatuses.find((item) => item.userId === req.user.id && item.animeId === animeId);
    if (!row) {
      row = {
        id: store.nextIds.watchStatus++,
        userId: req.user.id,
        animeId,
        createdAt: new Date().toISOString(),
      };
      store.watchStatuses.push(row);
    }
    row.status = req.body.status || 'PLAN_TO_WATCH';
    row.animeTitle = req.body.animeTitle || row.animeTitle || `Anime ${animeId}`;
    row.animeTitleDisplay = row.animeTitle;
    row.animeImage = req.body.animeImage || row.animeImage || null;
    row.animeImageDisplay = row.animeImage;
    row.updatedAt = new Date().toISOString();
    writeStore(store);
    res.json(row);
  });

  app.delete('/api/watch-status/:animeId', authRequired, (req, res) => {
    const store = readStore();
    const animeId = numberOrNull(req.params.animeId);
    store.watchStatuses = store.watchStatuses.filter(
      (item) => !(item.userId === req.user.id && item.animeId === animeId)
    );
    writeStore(store);
    res.json({ message: 'Watch status removed.' });
  });

  app.get('/api/reviews/anime/:animeId', (req, res) => {
    const store = readStore();
    const animeId = numberOrNull(req.params.animeId);
    const rows = store.reviews
      .filter((item) => item.animeId === animeId)
      .map((review) => ({
        ...review,
        user: publicUser(store.users.find((user) => user.id === review.userId) || { nickname: '-' }),
      }));
    res.json(rows);
  });

  app.get('/api/reviews/me', authRequired, (req, res) => {
    const store = readStore();
    res.json(store.reviews.filter((item) => item.userId === req.user.id));
  });

  app.post('/api/reviews', authRequired, (req, res) => {
    const store = readStore();
    const animeId = numberOrNull(req.body.animeId);
    const content = String(req.body.content || '').trim();
    const rating = Math.max(1, Math.min(5, Number(req.body.rating) || 5));
    if (!animeId || !content) return res.status(400).json({ message: 'animeId and content are required.' });
    const row = {
      id: store.nextIds.review++,
      userId: req.user.id,
      animeId,
      rating,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.reviews.push(row);
    writeStore(store);
    res.status(201).json(row);
  });

  app.put('/api/reviews/:id', authRequired, (req, res) => {
    const store = readStore();
    const review = store.reviews.find((item) => item.id === Number(req.params.id));
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    if (review.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Permission denied.' });
    }
    review.rating = Math.max(1, Math.min(5, Number(req.body.rating) || review.rating));
    review.content = String(req.body.content || review.content).trim();
    review.updatedAt = new Date().toISOString();
    writeStore(store);
    res.json(review);
  });

  app.delete('/api/reviews/:id', authRequired, (req, res) => {
    const store = readStore();
    const review = store.reviews.find((item) => item.id === Number(req.params.id));
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    if (review.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Permission denied.' });
    }
    store.reviews = store.reviews.filter((item) => item.id !== review.id);
    writeStore(store);
    res.json({ message: 'Review deleted.' });
  });

  app.get('/api/notices', (req, res) => {
    res.json(readStore().notices);
  });

  app.post('/api/notices', authRequired, adminRequired, (req, res) => {
    const store = readStore();
    const row = {
      id: store.nextIds.notice++,
      title: String(req.body.title || '').trim(),
      content: String(req.body.content || '').trim(),
      createdAt: new Date().toISOString(),
    };
    store.notices.push(row);
    writeStore(store);
    res.status(201).json(row);
  });

  app.delete('/api/notices/:id', authRequired, adminRequired, (req, res) => {
    const store = readStore();
    store.notices = store.notices.filter((item) => item.id !== Number(req.params.id));
    writeStore(store);
    res.json({ message: 'Notice deleted.' });
  });

  app.get('/api/admin/users', authRequired, adminRequired, (req, res) => {
    res.json(readStore().users.map(publicUser));
  });

  app.get('/api/admin/reviews', authRequired, adminRequired, (req, res) => {
    res.json(readStore().reviews);
  });

  app.delete('/api/admin/reviews/:id', authRequired, adminRequired, (req, res) => {
    const store = readStore();
    store.reviews = store.reviews.filter((item) => item.id !== Number(req.params.id));
    writeStore(store);
    res.json({ message: 'Review deleted.' });
  });

  app.get('/api/admin/anime', authRequired, adminRequired, async (req, res) => {
    const lang = getLang(req);
    const store = readStore();
    const items = (await fetchSeedBackfill(50)).map((item) => ({
      ...localizeAnime(item, lang, store),
      isHidden: (store.hiddenAnime || []).map(String).includes(String(item.externalId)),
      isAdult: false,
      dataStatus: (store.hiddenAnime || []).map(String).includes(String(item.externalId)) ? 'ARCHIVED' : 'ACTIVE',
    }));
    res.json({ items, pageInfo: pageInfo(1, 50, items.length) });
  });

  app.get('/api/admin/anime/:id', authRequired, adminRequired, async (req, res) => {
    const lang = getLang(req);
    const id = numberOrNull(req.params.id);
    const store = readStore();
    if (!id) return res.status(404).json({ message: 'Anime not found.' });

    const fallback = getSeedFallbackAnime(id);
    if (!fallback) return res.status(404).json({ message: 'Anime not found.' });

    return res.json({
      ...localizeAnime(fallback, lang, store),
      isHidden: (store.hiddenAnime || []).map(String).includes(String(id)),
      isAdult: false,
      dataStatus: (store.hiddenAnime || []).map(String).includes(String(id)) ? 'ARCHIVED' : 'ACTIVE',
    });
  });

  app.patch('/api/admin/anime/:id/hide', authRequired, adminRequired, (req, res) => {
    const store = readStore();
    const id = String(req.params.id);
    if (!store.hiddenAnime.includes(id)) store.hiddenAnime.push(id);
    writeStore(store);
    res.json({ message: 'Anime hidden.' });
  });

  app.patch('/api/admin/anime/:id/unhide', authRequired, adminRequired, (req, res) => {
    const store = readStore();
    const id = String(req.params.id);
    store.hiddenAnime = store.hiddenAnime.filter((item) => item !== id);
    writeStore(store);
    res.json({ message: 'Anime restored.' });
  });

  app.patch('/api/admin/anime/:id/mark-adult', authRequired, adminRequired, (req, res) => {
    const store = readStore();
    const id = String(req.params.id);
    if (!store.hiddenAnime.includes(id)) store.hiddenAnime.push(id);
    writeStore(store);
    res.json({ message: 'Anime marked as adult and hidden.' });
  });

  app.delete('/api/admin/anime/:id', authRequired, adminRequired, (req, res) => {
    const store = readStore();
    const id = String(req.params.id);
    if (!store.hiddenAnime.includes(id)) store.hiddenAnime.push(id);
    writeStore(store);
    res.json({ message: 'Anime archived by admin.' });
  });

  app.get('/api/admin/translations/coverage', authRequired, adminRequired, (req, res) => {
    const total = Object.keys(animeTranslations || {}).length;
    res.json({
      totalAnime: total,
      translations: [
        { lang: 'ko', source: 'SEED', status: 'REVIEWED', count: total },
        { lang: 'en', source: 'SEED', status: 'REVIEWED', count: total },
        { lang: 'ja', source: 'SEED', status: 'TITLE_ONLY', count: total },
      ],
    });
  });

  app.get('/api/admin/translations/missing', authRequired, adminRequired, (req, res) => {
    res.json({ items: [] });
  });

  app.get('/api/admin/translations/openai/models', authRequired, adminRequired, (req, res) => {
    res.json({ models: [], message: 'NAS 배포 서버에서는 실시간 OpenAI 번역을 실행하지 않습니다.' });
  });

  app.post('/api/admin/translations/jobs', authRequired, adminRequired, (req, res) => {
    res.json({ created: 0, message: 'NAS 배포 서버에서는 번역 작업을 생성하지 않습니다.' });
  });

  app.post('/api/admin/translations/jobs/run', authRequired, adminRequired, (req, res) => {
    res.json({ processed: 0, message: 'NAS 배포 서버에서는 번역 작업을 실행하지 않습니다.' });
  });

  app.get('/api/translations/:provider/:externalId', authRequired, adminRequired, (req, res) => {
    const externalId = numberOrNull(req.params.externalId);
    if (!externalId) return res.status(400).json({ message: 'externalId is required.' });
    const store = readStore();
    res.json({ translations: buildTranslationRows(externalId, store) });
  });

  app.put('/api/admin/translations/:provider/:externalId', authRequired, adminRequired, (req, res) => {
    const externalId = numberOrNull(req.params.externalId);
    const lang = String(req.body.lang || '').toLowerCase();
    if (!externalId || !['ko', 'en', 'ja'].includes(lang)) {
      return res.status(400).json({ message: 'externalId and valid lang are required.' });
    }

    const store = readStore();
    let row = getManualTranslation(store, externalId, lang);
    if (!row) {
      row = {
        id: store.nextIds.manualTranslation++,
        provider: String(req.params.provider || 'JIKAN').toUpperCase(),
        externalId,
        lang,
        createdAt: new Date().toISOString(),
      };
      store.manualTranslations.push(row);
    }

    row.title = req.body.title || null;
    row.description = req.body.description || null;
    row.source = req.body.source || 'MANUAL';
    row.status = req.body.status || 'REVIEWED';
    row.failureReason = null;
    row.updatedAt = new Date().toISOString();
    writeStore(store);
    return res.json(row);
  });

  app.post('/api/translations/:provider/:externalId/auto', authRequired, adminRequired, (req, res) => {
    res.json({
      message: 'NAS 배포 서버에서는 실시간 자동 번역을 실행하지 않습니다. Docker/CLI 환경에서 번역 후 seed를 배포하세요.',
      skipped: true,
    });
  });

  app.post('/api/admin/translations/:provider/:externalId/review', authRequired, adminRequired, (req, res) => {
    res.json({ message: 'Translation review acknowledged in NAS deployment.', reviewed: true });
  });

  app.post('/api/admin/translations/:provider/:externalId/retry', authRequired, adminRequired, (req, res) => {
    res.json({ message: 'NAS 배포 서버에서는 번역 재시도 작업을 실행하지 않습니다.', created: 0 });
  });

  app.delete('/api/translations/:provider/:externalId/:lang', authRequired, adminRequired, (req, res) => {
    const externalId = numberOrNull(req.params.externalId);
    const lang = String(req.params.lang || '').toLowerCase();
    const store = readStore();
    store.manualTranslations = (store.manualTranslations || []).filter(
      (item) => !(Number(item.externalId) === Number(externalId) && item.lang === lang)
    );
    writeStore(store);
    res.json({ message: 'Manual translation deleted.' });
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found.' });
  });

  return app;
}

ensureDataStore();
try {
  const store = readStore();
  const result = syncCsvCatalogToStore(store);
  writeStore(store);
  console.log(
    `[NAS_CSV] synced anime cache from CSV: anime=${result.animeSynced}, koTranslations=${result.translationsSynced}, totalCsv=${result.totalCsv}`
  );
} catch (error) {
  console.error('[NAS_CSV] startup sync failed:', error.message);
}
createApp().listen(PORT, '127.0.0.1', () => {
  console.log(`AniPick NAS backend listening on http://127.0.0.1:${PORT}`);
});
