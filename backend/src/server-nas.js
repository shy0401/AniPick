require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { animeTranslations } = require('./data/animeTranslations');

const PORT = Number(process.env.PORT) || 4001;
const JWT_SECRET = process.env.JWT_SECRET || 'anipick_nas_fallback_secret';
const DATA_DIR = process.env.NAS_DATA_DIR || path.resolve(__dirname, '../../runtime');
const STORE_FILE = path.join(DATA_DIR, 'nas-store.json');
const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

const BLOCKED_TERMS = ['hentai', 'erotica', 'rx - hentai'];
const DEFAULT_TOP_IDS = [
  52991, 59845, 5114, 9253, 11061, 21, 1535, 38000, 40748, 16498,
  30276, 31964, 20, 1735, 41467, 44511, 38524, 1, 20583, 37510,
];

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

function normalizeJikanAnime(raw) {
  if (!raw) return null;

  const externalId = numberOrNull(raw.mal_id);
  if (!externalId) return null;

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
    romajiTitle: raw.title || raw.title_english || raw.title_japanese || null,
    englishTitle: raw.title_english || raw.title || null,
    nativeTitle: raw.title_japanese || raw.title || null,
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
    format: raw.type || null,
    genres: normalizeGenres(raw.genres),
    rating: raw.rating || null,
    sourcePayload: {
      mal_id: raw.mal_id,
      rating: raw.rating,
      title: raw.title,
      title_english: raw.title_english,
      title_japanese: raw.title_japanese,
      synopsis: raw.synopsis,
      genres: normalizeGenres(raw.genres),
    },
  };
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
  const displayTitle =
    translation.title ||
    (lang === 'ko'
      ? anime.englishTitle || anime.romajiTitle || anime.nativeTitle
      : lang === 'ja'
        ? anime.nativeTitle || anime.romajiTitle || anime.englishTitle
        : anime.englishTitle || anime.romajiTitle || anime.nativeTitle) ||
    '제목 없음';

  const displayDescription =
    translation.description ||
    anime.description ||
    (lang === 'ko' ? '한국어 번역이 준비 중입니다.' : '');

  return {
    ...anime,
    id: anime.externalId || anime.malId || anime.id,
    animeId: anime.externalId || anime.malId || anime.id,
    routeId: anime.externalId || anime.malId || anime.id,
    malId: anime.externalId || anime.malId || anime.id,
    koreanTitle: koTitle,
    displayTitle,
    displayDescription,
    displayGenres: anime.genres || [],
    displayStatus: anime.status || '-',
    displaySeason: anime.season || '-',
    displayFormat: anime.format || '-',
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

async function fetchSeedBackfill(limit = 20) {
  const items = DEFAULT_TOP_IDS.map(getSeedFallbackAnime).filter(Boolean);
  return items.slice(0, limit);
}

function filterSafeVisible(items, store) {
  const hiddenSet = new Set((store.hiddenAnime || []).map(String));
  return items.filter((anime) => {
    const id = anime.externalId || anime.malId || anime.id;
    return id && !hiddenSet.has(String(id)) && !isAdultAnime(anime);
  });
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
      const fallback = filterSafeVisible(await fetchSeedBackfill(perPage), store).map((item) =>
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
      const fallback = filterSafeVisible(await fetchSeedBackfill(perPage), store).map((item) =>
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
    const sort = String(req.query.sort || 'POPULARITY_DESC');
    const store = readStore();

    try {
      let items = [];
      let total = 0;

      if (keyword) {
        const data = await fetchJikan('/anime', {
          q: keyword,
          page,
          limit: Math.min(perPage, 25),
          order_by: sort === 'SCORE_DESC' ? 'score' : 'popularity',
          sort: 'desc',
        });
        items = (data.data || []).map(normalizeJikanAnime).filter(Boolean);
        total = data.pagination?.items?.total || items.length;
      } else {
        const result = await fetchTopAnime(page, perPage, {
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
        message: '',
      });
    } catch (error) {
      const fallback = filterSafeVisible(await fetchSeedBackfill(perPage), store).map((item) =>
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

  app.get('/api/anime/recommendations', async (req, res) => {
    const lang = getLang(req);
    const perPage = Math.min(20, Math.max(1, Number(req.query.perPage) || 12));
    const store = readStore();
    const fallback = filterSafeVisible(await fetchSeedBackfill(perPage), store).map((item) =>
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
      const anime = await fetchAnimeDetail(id);
      if (!anime || isAdultAnime(anime)) {
        return res.status(404).json({ message: '애니메이션 정보를 찾을 수 없습니다.' });
      }

      const similarItems = filterSafeVisible(await fetchSeedBackfill(8), store)
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
createApp().listen(PORT, '127.0.0.1', () => {
  console.log(`AniPick NAS backend listening on http://127.0.0.1:${PORT}`);
});
