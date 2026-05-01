const prisma = require('../lib/prisma');
const { animeTranslations } = require('../data/animeTranslations');
const { isAdultAnime } = require('../utils/animeContentSafety');

const VISIBLE_ANIME_WHERE = {
  dataStatus: 'ACTIVE',
  isHidden: false,
  isAdult: false,
};

function normalizeProvider(provider) {
  return String(provider || 'JIKAN').toUpperCase();
}

function getExternalId(anime) {
  return Number(anime?.malId || anime?.externalId || anime?.id || 0);
}

function safeJsonStringify(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
}

function safeJsonValue(value) {
  if (!value || typeof value !== 'object') return null;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return null;
  }
}

function safeJsonParse(value, fallback = []) {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function toNullableInt(value) {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  return Math.round(numeric);
}

function isMeaningfulText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isMeaningfulUrl(value) {
  return isMeaningfulText(value) && /^https?:\/\//i.test(value.trim());
}

function isPositiveNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0;
}

function pickPreferredValue(nextValue, currentValue, validator = isMeaningfulText) {
  if (validator(nextValue)) return nextValue;
  return currentValue ?? null;
}

function normalizeAverageScore(anime) {
  const candidates = [anime?.averageScore, anime?.meanScore, anime?.score];
  for (const candidate of candidates) {
    if (candidate === null || candidate === undefined || candidate === '') continue;
    const numeric = Number(candidate);
    if (!Number.isFinite(numeric) || numeric <= 0) continue;
    if (numeric <= 10) return Math.round(numeric * 10);
    return Math.round(numeric);
  }
  return null;
}

function normalizeAnimeInput(anime) {
  const externalId = getExternalId(anime);
  const genres = Array.isArray(anime?.genres) ? anime.genres.filter(Boolean) : [];

  const adultDetected = isAdultAnime({
    ...anime,
    genres,
    romajiTitle: anime?.title?.romaji || anime?.romajiTitle || null,
    englishTitle: anime?.title?.english || anime?.englishTitle || null,
    nativeTitle: anime?.title?.native || anime?.nativeTitle || null,
  });

  return {
    provider: normalizeProvider(anime?.provider),
    externalId,
    romajiTitle: anime?.title?.romaji || anime?.romajiTitle || null,
    englishTitle: anime?.title?.english || anime?.englishTitle || null,
    nativeTitle: anime?.title?.native || anime?.nativeTitle || null,
    imageUrl:
      anime?.coverImage?.extraLarge ||
      anime?.coverImage?.large ||
      anime?.coverImage?.medium ||
      anime?.animeImage ||
      anime?.imageUrl ||
      null,
    bannerUrl: anime?.bannerImage || anime?.bannerUrl || null,
    genres: genres.length ? safeJsonStringify(genres) : null,
    averageScore: normalizeAverageScore(anime),
    scoredBy: toNullableInt(anime?.scoredBy),
    rank: toNullableInt(anime?.rank),
    members: toNullableInt(anime?.members),
    favorites: toNullableInt(anime?.favorites),
    popularity: toNullableInt(anime?.popularity) || toNullableInt(anime?.members) || toNullableInt(anime?.trending),
    episodes: toNullableInt(anime?.episodes),
    status: anime?.status || null,
    season: anime?.season || null,
    seasonYear: anime?.seasonYear || null,
    format: anime?.format || null,
    siteUrl: anime?.siteUrl || null,
    description: anime?.description || null,
    sourcePayload: safeJsonValue(anime?.sourcePayload || anime?.raw || null),
    isAdult: adultDetected,
    isHidden: adultDetected,
    hiddenReason: adultDetected ? 'ADULT_CONTENT_AUTO_DETECTED' : null,
    hiddenAt: adultDetected ? new Date() : null,
    dataStatus: adultDetected ? 'ARCHIVED' : 'ACTIVE',
    lastSyncedAt: new Date(),
  };
}

function toAnimeLike(row) {
  const image = row?.imageUrl || null;
  const genres = safeJsonParse(row?.genres, []);

  return {
    id: row.id,
    animeId: row.id,
    routeId: row.externalId,
    externalId: row.externalId,
    malId: row.externalId,
    provider: row.provider,
    title: {
      romaji: row.romajiTitle || null,
      english: row.englishTitle || null,
      native: row.nativeTitle || null,
    },
    coverImage: {
      extraLarge: image,
      large: image,
      medium: image,
    },
    bannerImage: row.bannerUrl || image,
    description: row.description || '',
    genres,
    averageScore: row.averageScore,
    meanScore: row.averageScore,
    scoredBy: row.scoredBy ?? null,
    rank: row.rank ?? null,
    members: row.members ?? null,
    favorites: row.favorites ?? null,
    popularity: row.popularity ?? row.members ?? 0,
    trending: row.favorites ?? 0,
    episodes: row.episodes,
    status: row.status,
    season: row.season,
    seasonYear: row.seasonYear,
    format: row.format,
    siteUrl: row.siteUrl,
    isAdult: Boolean(row.isAdult),
    isHidden: Boolean(row.isHidden),
    hiddenReason: row.hiddenReason || null,
    hiddenAt: row.hiddenAt || null,
    dataStatus: row.dataStatus,
    studios: { nodes: [] },
  };
}

function toAnimeDto(row) {
  if (!row) return null;
  const anime = toAnimeLike(row);
  const translation = Array.isArray(row.translations) ? row.translations[0] || null : row.translation || null;

  return {
    id: row.id,
    animeId: row.id,
    routeId: row.externalId,
    provider: anime.provider,
    externalId: anime.externalId,
    malId: anime.externalId,
    romajiTitle: row.romajiTitle || null,
    englishTitle: row.englishTitle || null,
    nativeTitle: row.nativeTitle || null,
    description: row.description || null,
    imageUrl: row.imageUrl || null,
    bannerUrl: row.bannerUrl || null,
    siteUrl: row.siteUrl || null,
    averageScore: row.averageScore,
    scoredBy: row.scoredBy,
    rank: row.rank,
    members: row.members,
    favorites: row.favorites,
    popularity: row.popularity,
    episodes: row.episodes,
    status: row.status,
    season: row.season,
    seasonYear: row.seasonYear,
    format: row.format,
    genres: anime.genres,
    isAdult: Boolean(row.isAdult),
    isHidden: Boolean(row.isHidden),
    hiddenReason: row.hiddenReason || null,
    hiddenAt: row.hiddenAt || null,
    dataStatus: row.dataStatus,
    translation: translation
      ? {
          lang: translation.lang,
          title: translation.title,
          description: translation.description,
          source: translation.source,
          status: translation.status,
          failureReason: translation.failureReason,
        }
      : null,
  };
}

async function applySeedTranslationsForAnime(animeRow, externalId) {
  const seed = animeTranslations[Number(externalId)];
  if (!seed || !animeRow?.id) return;

  const payloads = [
    {
      lang: 'ko',
      title: seed.koTitle || null,
      description: seed.koDescription || null,
      status: seed.koDescription ? 'REVIEWED' : 'TITLE_ONLY',
    },
    {
      lang: 'en',
      title: seed.enTitle || null,
      description: seed.enDescription || null,
      status: seed.enDescription ? 'REVIEWED' : 'TITLE_ONLY',
    },
    {
      lang: 'ja',
      title: seed.jaTitle || null,
      description: seed.jaDescription || null,
      status: seed.jaDescription ? 'REVIEWED' : 'TITLE_ONLY',
    },
  ];

  for (const item of payloads) {
    if (!item.title && !item.description) continue;

    // eslint-disable-next-line no-await-in-loop
    const existing = await prisma.animeTranslation.findUnique({
      where: {
        animeId_lang: {
          animeId: animeRow.id,
          lang: item.lang,
        },
      },
    });

    if (existing?.source === 'MANUAL') continue;

    // eslint-disable-next-line no-await-in-loop
    await prisma.animeTranslation.upsert({
      where: {
        animeId_lang: {
          animeId: animeRow.id,
          lang: item.lang,
        },
      },
      create: {
        animeId: animeRow.id,
        lang: item.lang,
        title: item.title,
        description: item.description,
        source: 'SEED',
        status: item.status,
        failureReason: null,
      },
      update: {
        title: item.title,
        description: item.description,
        source: 'SEED',
        status: item.status,
        failureReason: null,
      },
    });
  }
}

async function upsertAnimeCache(anime) {
  const normalized = normalizeAnimeInput(anime);
  if (!normalized.externalId) return null;

  const key = {
    provider_externalId: {
      provider: normalized.provider,
      externalId: normalized.externalId,
    },
  };

  const existing = await prisma.anime.findUnique({ where: key });

  let saved;
  if (!existing) {
    saved = await prisma.anime.create({ data: normalized });
  } else {
    const adultLocked = Boolean(
      existing.isAdult ||
      existing.isHidden ||
      existing.dataStatus === 'ARCHIVED' ||
      normalized.isAdult
    );

    const updateData = {
      romajiTitle: pickPreferredValue(normalized.romajiTitle, existing.romajiTitle),
      englishTitle: pickPreferredValue(normalized.englishTitle, existing.englishTitle),
      nativeTitle: pickPreferredValue(normalized.nativeTitle, existing.nativeTitle),
      description: pickPreferredValue(normalized.description, existing.description),
      imageUrl: pickPreferredValue(normalized.imageUrl, existing.imageUrl, isMeaningfulUrl),
      bannerUrl: pickPreferredValue(normalized.bannerUrl, existing.bannerUrl, isMeaningfulUrl),
      siteUrl: pickPreferredValue(normalized.siteUrl, existing.siteUrl, isMeaningfulUrl),
      genres: pickPreferredValue(normalized.genres, existing.genres, isMeaningfulText),
      averageScore: pickPreferredValue(normalized.averageScore, existing.averageScore, isPositiveNumber),
      scoredBy: pickPreferredValue(normalized.scoredBy, existing.scoredBy, isPositiveNumber),
      rank: pickPreferredValue(normalized.rank, existing.rank, isPositiveNumber),
      members: pickPreferredValue(normalized.members, existing.members, isPositiveNumber),
      favorites: pickPreferredValue(normalized.favorites, existing.favorites, isPositiveNumber),
      popularity: pickPreferredValue(normalized.popularity, existing.popularity, isPositiveNumber),
      episodes: pickPreferredValue(normalized.episodes, existing.episodes, isPositiveNumber),
      status: pickPreferredValue(normalized.status, existing.status),
      season: pickPreferredValue(normalized.season, existing.season),
      seasonYear: pickPreferredValue(normalized.seasonYear, existing.seasonYear, isPositiveNumber),
      format: pickPreferredValue(normalized.format, existing.format),
      sourcePayload: normalized.sourcePayload || existing.sourcePayload || null,
      isAdult: adultLocked,
      isHidden: adultLocked ? true : Boolean(existing.isHidden),
      hiddenReason: adultLocked
        ? normalized.hiddenReason || existing.hiddenReason || 'ADULT_CONTENT_AUTO_DETECTED'
        : existing.hiddenReason || null,
      hiddenAt: adultLocked ? normalized.hiddenAt || existing.hiddenAt || new Date() : existing.hiddenAt,
      dataStatus: adultLocked ? 'ARCHIVED' : existing.dataStatus || 'ACTIVE',
      lastSyncedAt: new Date(),
    };

    saved = await prisma.anime.update({
      where: { id: existing.id },
      data: updateData,
    });
  }

  await applySeedTranslationsForAnime(saved, normalized.externalId);
  return saved;
}

async function getAnimeByProviderId(provider, externalId) {
  const p = normalizeProvider(provider);
  const id = Number(externalId);
  if (!id) return null;

  return prisma.anime.findUnique({
    where: {
      provider_externalId: {
        provider: p,
        externalId: id,
      },
    },
  });
}

async function getCachedAnime(provider, externalId) {
  return getAnimeByProviderId(provider, externalId);
}

async function getTranslationByAnimeId(animeId, lang) {
  const id = Number(animeId);
  if (!id || !lang) return null;

  return prisma.animeTranslation.findUnique({
    where: {
      animeId_lang: {
        animeId: id,
        lang,
      },
    },
  });
}

async function getTranslationByProviderId(provider, externalId, lang) {
  const anime = await getAnimeByProviderId(provider, externalId);
  if (!anime) return null;
  return getTranslationByAnimeId(anime.id, lang);
}

async function getTranslation({ provider, externalId, lang }) {
  return getTranslationByProviderId(provider, externalId, lang);
}

async function upsertTranslation({
  animeId,
  provider,
  externalId,
  lang,
  title,
  description,
  source = 'GPT',
  status = 'AUTO',
  failureReason = null,
}) {
  if (!lang) return null;

  let targetAnimeId = Number(animeId);

  if (!targetAnimeId) {
    const normalizedProvider = normalizeProvider(provider);
    const normalizedExternalId = Number(externalId);
    if (!normalizedExternalId) return null;

    let anime = await getAnimeByProviderId(normalizedProvider, normalizedExternalId);
    if (!anime) {
      anime = await prisma.anime.create({
        data: {
          provider: normalizedProvider,
          externalId: normalizedExternalId,
        },
      });
    }
    targetAnimeId = anime.id;
  }

  const existing = await prisma.animeTranslation.findUnique({
    where: {
      animeId_lang: {
        animeId: targetAnimeId,
        lang,
      },
    },
  });

  const isAutomaticWrite = !['MANUAL'].includes(source);
  if (existing && isAutomaticWrite && (existing.source === 'MANUAL' || existing.status === 'REVIEWED')) {
    return existing;
  }

  return prisma.animeTranslation.upsert({
    where: {
      animeId_lang: {
        animeId: targetAnimeId,
        lang,
      },
    },
    create: {
      animeId: targetAnimeId,
      lang,
      title: title || null,
      description: description || null,
      source,
      status,
      failureReason: failureReason || null,
      reviewedAt: status === 'REVIEWED' ? new Date() : null,
    },
    update: {
      title: title || null,
      description: description || null,
      source,
      status,
      failureReason: failureReason || null,
      reviewedAt: status === 'REVIEWED' ? new Date() : undefined,
    },
  });
}

async function getOrCreateAnimeWithTranslation(anime) {
  const cached = await upsertAnimeCache(anime);
  if (!cached) return null;

  return prisma.anime.findUnique({
    where: { id: cached.id },
    include: { translations: true },
  });
}

async function listCachedAnimeWithoutTranslation(lang, limit = 30) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 30, 300));

  return prisma.anime.findMany({
    where: {
      ...VISIBLE_ANIME_WHERE,
      translations: {
        none: {
          lang,
        },
      },
    },
    orderBy: [{ updatedAt: 'desc' }],
    take: safeLimit,
  });
}

function buildOrderBy(sort) {
  switch (String(sort || '').toUpperCase()) {
    case 'SCORE_DESC':
      return [{ averageScore: 'desc' }, { updatedAt: 'desc' }];
    case 'POPULARITY_DESC':
      return [{ popularity: 'desc' }, { averageScore: 'desc' }, { updatedAt: 'desc' }];
    case 'LATEST':
      return [{ seasonYear: 'desc' }, { updatedAt: 'desc' }];
    case 'TITLE':
      return [{ englishTitle: 'asc' }, { romajiTitle: 'asc' }];
    default:
      return [{ popularity: 'desc' }, { averageScore: 'desc' }, { seasonYear: 'desc' }, { updatedAt: 'desc' }];
  }
}

function buildWhere({ keyword, genre, year, season, format, status, lang = 'ko' }) {
  const where = {};
  const andConditions = [{ ...VISIBLE_ANIME_WHERE }];

  if (keyword) {
    where.OR = [
      { romajiTitle: { contains: keyword, mode: 'insensitive' } },
      { englishTitle: { contains: keyword, mode: 'insensitive' } },
      { nativeTitle: { contains: keyword, mode: 'insensitive' } },
      {
        translations: {
          some: {
            lang,
            title: { contains: keyword, mode: 'insensitive' },
          },
        },
      },
    ];
  }

  if (genre) {
    where.genres = { contains: genre, mode: 'insensitive' };
  }

  if (year && Number(year)) {
    where.seasonYear = Number(year);
  }

  if (season) {
    where.season = String(season).toUpperCase();
  }

  if (format) {
    where.format = String(format).toUpperCase();
  }

  if (status) {
    where.status = String(status).toUpperCase();
  }

  andConditions.push({
    OR: [
      { romajiTitle: { not: null } },
      { englishTitle: { not: null } },
      { nativeTitle: { not: null } },
      {
        translations: {
          some: {
            lang,
            title: { not: null },
          },
        },
      },
    ],
  });

  where.AND = andConditions;
  return where;
}

function isRenderableAnimeRow(row) {
  if (!row) return false;
  const hasId = Boolean(row.externalId || row.id || row.malId);
  const hasTitle = Boolean(
    row.romajiTitle ||
      row.englishTitle ||
      row.nativeTitle ||
      row.title?.romaji ||
      row.title?.english ||
      row.title?.native
  );
  return Boolean(hasId && hasTitle);
}

async function listCachedAnime({
  page = 1,
  perPage = 20,
  keyword = '',
  genre = '',
  year = '',
  season = '',
  format = '',
  status = '',
  sort = 'POPULARITY_DESC',
  lang = 'ko',
  qualityFirst = false,
  includeHidden = false,
  includeAdult = false,
  includeArchived = false,
} = {}) {
  const currentPage = Math.max(1, Number(page) || 1);
  const size = Math.max(1, Math.min(Number(perPage) || 20, 50));
  const skip = (currentPage - 1) * size;

  const where = buildWhere({ keyword, genre, year, season, format, status, lang });
  if (includeHidden || includeAdult || includeArchived) {
    where.AND = where.AND.filter((condition) => !('isHidden' in condition) && !('isAdult' in condition) && !('dataStatus' in condition));
    if (!includeHidden) where.AND.push({ isHidden: false });
    if (!includeAdult) where.AND.push({ isAdult: false });
    if (!includeArchived) where.AND.push({ dataStatus: 'ACTIVE' });
  }

  const orderBy = buildOrderBy(sort);
  const normalizedSort = String(sort || '').toUpperCase();
  const requiresNullSafeSort = ['POPULARITY_DESC', 'SCORE_DESC', 'LATEST', 'TITLE'].includes(normalizedSort);

  const queryTake = qualityFirst
    ? Math.min(220, Math.max(size * 4, size))
    : requiresNullSafeSort
      ? Math.min(520, skip + Math.max(size * 5, 100))
      : size;
  const querySkip = qualityFirst || requiresNullSafeSort ? 0 : skip;

  const [rawRows, total] = await Promise.all([
    prisma.anime.findMany({
      where,
      orderBy,
      skip: querySkip,
      take: qualityFirst ? skip + queryTake : queryTake,
      include: {
        translations: {
          where: { lang },
          take: 1,
        },
      },
    }),
    prisma.anime.count({ where }),
  ]);

  let rows = rawRows;

  if (requiresNullSafeSort) {
    rows = [...rawRows].sort((a, b) => {
      const aScore = Number(a.averageScore || 0);
      const bScore = Number(b.averageScore || 0);
      const aPopularity = Number(a.popularity || a.members || 0);
      const bPopularity = Number(b.popularity || b.members || 0);
      const aYear = Number(a.seasonYear || 0);
      const bYear = Number(b.seasonYear || 0);
      const aTitle = String(a.englishTitle || a.romajiTitle || a.nativeTitle || '').toLowerCase();
      const bTitle = String(b.englishTitle || b.romajiTitle || b.nativeTitle || '').toLowerCase();

      if (normalizedSort === 'SCORE_DESC') {
        const aHasScore = isPositiveNumber(a.averageScore);
        const bHasScore = isPositiveNumber(b.averageScore);
        if (aHasScore !== bHasScore) return aHasScore ? -1 : 1;
        if (aScore !== bScore) return bScore - aScore;
        if (aPopularity !== bPopularity) return bPopularity - aPopularity;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }

      if (normalizedSort === 'LATEST') {
        const aHasYear = isPositiveNumber(a.seasonYear);
        const bHasYear = isPositiveNumber(b.seasonYear);
        if (aHasYear !== bHasYear) return aHasYear ? -1 : 1;
        if (aYear !== bYear) return bYear - aYear;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }

      if (normalizedSort === 'TITLE') {
        if (aTitle && bTitle && aTitle !== bTitle) return aTitle.localeCompare(bTitle);
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }

      const aHasPopularity = isPositiveNumber(aPopularity);
      const bHasPopularity = isPositiveNumber(bPopularity);
      if (aHasPopularity !== bHasPopularity) return aHasPopularity ? -1 : 1;
      if (aPopularity !== bPopularity) return bPopularity - aPopularity;
      const aHasScore = isPositiveNumber(a.averageScore);
      const bHasScore = isPositiveNumber(b.averageScore);
      if (aHasScore !== bHasScore) return aHasScore ? -1 : 1;
      if (aScore !== bScore) return bScore - aScore;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    rows = rows.slice(skip, skip + size);
  }

  if (qualityFirst) {
    rows = [...rawRows].sort((a, b) => {
      const aHasRealImage = isMeaningfulUrl(a.imageUrl) && !String(a.imageUrl || '').toLowerCase().includes('placehold.co');
      const bHasRealImage = isMeaningfulUrl(b.imageUrl) && !String(b.imageUrl || '').toLowerCase().includes('placehold.co');
      if (aHasRealImage !== bHasRealImage) return aHasRealImage ? -1 : 1;

      const aHasScore = isPositiveNumber(a.averageScore);
      const bHasScore = isPositiveNumber(b.averageScore);
      if (aHasScore !== bHasScore) return aHasScore ? -1 : 1;

      const aPopularity = Number(a.popularity || a.members || 0);
      const bPopularity = Number(b.popularity || b.members || 0);
      if (aPopularity !== bPopularity) return bPopularity - aPopularity;

      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }).slice(skip, skip + size);
  }

  return {
    rows,
    items: rows.map(toAnimeLike),
    dtos: rows.map(toAnimeDto).filter(Boolean),
    pageInfo: {
      currentPage,
      perPage: size,
      total,
      lastPage: Math.max(1, Math.ceil(total / size)),
      hasNextPage: currentPage * size < total,
    },
  };
}

module.exports = {
  normalizeProvider,
  getExternalId,
  safeJsonParse,
  toAnimeLike,
  toAnimeDto,
  isRenderableAnimeRow,
  applySeedTranslationsForAnime,
  upsertAnimeCache,
  getCachedAnime,
  getAnimeByProviderId,
  getTranslation,
  getTranslationByAnimeId,
  getTranslationByProviderId,
  upsertTranslation,
  getOrCreateAnimeWithTranslation,
  listCachedAnimeWithoutTranslation,
  listCachedAnime,
  VISIBLE_ANIME_WHERE,
};
