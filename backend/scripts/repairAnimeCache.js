require('dotenv').config();

const prisma = require('../src/lib/prisma');
const { getAnimeById } = require('../src/services/jikan.service');
const { normalizeJikanAnime } = require('../src/services/anime-normalizer.service');
const { upsertAnimeCache } = require('../src/services/anime-cache.service');
const { isAdultAnime } = require('../src/utils/animeContentSafety');

function parseArgs(argv) {
  const args = argv.slice(2);
  const readValue = (key, fallback) => {
    const hit = args.find((item) => item.startsWith(`${key}=`));
    if (!hit) return fallback;
    return hit.split('=').slice(1).join('=');
  };

  const has = (key) => args.includes(key);
  const limit = Number(readValue('--limit', 100));

  const options = {
    apply: has('--apply'),
    all: has('--all'),
    refreshMissing: has('--refresh-missing'),
    dedupe: has('--dedupe'),
    cleanupGhosts: has('--cleanup-ghosts'),
    markAdult: has('--mark-adult'),
    hardDelete: has('--hard-delete'),
    limit: Number.isFinite(limit) && limit > 0 ? Math.min(limit, 1000) : 100,
  };

  if (options.all) {
    options.refreshMissing = true;
    options.dedupe = true;
    options.cleanupGhosts = true;
    options.markAdult = true;
  }

  return options;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidUrl(value) {
  return isText(value) && /^https?:\/\//i.test(value.trim());
}

function isPlaceholderImage(url) {
  const value = String(url || '').toLowerCase();
  if (!value) return false;
  return value.includes('placehold.co') || value.includes('placeholder') || value.includes('anipick');
}

function isPositive(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0;
}

function isLikelyJikanOrigin(row) {
  const siteUrl = String(row?.siteUrl || '').toLowerCase();
  if (siteUrl.includes('myanimelist.net')) return true;

  const payload = row?.sourcePayload;
  if (payload && typeof payload === 'object') {
    if (Number.isFinite(Number(payload.mal_id)) && Number(payload.mal_id) > 0) return true;
    const payloadUrl = String(payload.url || '').toLowerCase();
    if (payloadUrl.includes('myanimelist.net')) return true;
  }

  return false;
}

function normalizeTitle(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9가-힣ぁ-んァ-ン一-龥]/g, '')
    .trim();
}

async function getUserAnimeIdSet() {
  const [favorites, reviews, watchStatuses] = await Promise.all([
    prisma.favorite.findMany({ select: { animeId: true } }),
    prisma.review.findMany({ select: { animeId: true } }),
    prisma.watchStatus.findMany({ select: { animeId: true } }),
  ]);

  return new Set([
    ...favorites.map((row) => Number(row.animeId)),
    ...reviews.map((row) => Number(row.animeId)),
    ...watchStatuses.map((row) => Number(row.animeId)),
  ]);
}

async function printDiagnostics() {
  const [
    totalAnime,
    missingImage,
    placeholderImage,
    missingScore,
    missingTitle,
    duplicateProviderExternal,
    invalidJikanExternal,
    koTranslations,
  ] = await Promise.all([
    prisma.anime.count(),
    prisma.anime.count({
      where: {
        OR: [{ imageUrl: null }, { imageUrl: '' }],
      },
    }),
    prisma.anime.count({
      where: {
        OR: [
          { imageUrl: { contains: 'placehold.co', mode: 'insensitive' } },
          { imageUrl: { contains: 'placeholder', mode: 'insensitive' } },
          { imageUrl: { contains: 'AniPick', mode: 'insensitive' } },
        ],
      },
    }),
    prisma.anime.count({
      where: {
        OR: [{ averageScore: null }, { averageScore: 0 }],
      },
    }),
    prisma.anime.count({
      where: {
        AND: [
          { OR: [{ romajiTitle: null }, { romajiTitle: '' }] },
          { OR: [{ englishTitle: null }, { englishTitle: '' }] },
          { OR: [{ nativeTitle: null }, { nativeTitle: '' }] },
        ],
      },
    }),
    prisma.$queryRaw`
      SELECT provider, "externalId", COUNT(*)::int AS count
      FROM "Anime"
      GROUP BY provider, "externalId"
      HAVING COUNT(*) > 1
    `,
    prisma.anime.count({
      where: {
        provider: 'JIKAN',
        externalId: { lte: 0 },
      },
    }),
    prisma.animeTranslation.count({ where: { lang: 'ko' } }),
  ]);

  console.log('[REPAIR][DIAG] total anime:', totalAnime);
  console.log('[REPAIR][DIAG] image missing:', missingImage);
  console.log('[REPAIR][DIAG] placeholder image:', placeholderImage);
  console.log('[REPAIR][DIAG] averageScore missing/0:', missingScore);
  console.log('[REPAIR][DIAG] all title missing:', missingTitle);
  console.log('[REPAIR][DIAG] provider+external duplicates:', duplicateProviderExternal.length);
  console.log('[REPAIR][DIAG] invalid JIKAN externalId:', invalidJikanExternal);
  console.log('[REPAIR][DIAG] ko translations:', koTranslations);
}

async function refreshMissingMetadata({ apply, limit }) {
  const rows = await prisma.anime.findMany({
    where: {
      provider: 'JIKAN',
      dataStatus: 'ACTIVE',
      externalId: { gt: 0 },
      OR: [
        { imageUrl: null },
        { imageUrl: '' },
        { imageUrl: { contains: 'placehold.co', mode: 'insensitive' } },
        { averageScore: null },
        { averageScore: 0 },
        { popularity: null },
        { members: null },
        { favorites: null },
        { siteUrl: null },
        { siteUrl: '' },
      ],
    },
    orderBy: [{ updatedAt: 'asc' }],
    take: limit,
  });

  console.log(`[REPAIR][REFRESH] candidates: ${rows.length} (limit=${limit})`);
  if (!rows.length) return { touched: 0, failed: 0, skipped: 0 };

  let touched = 0;
  let failed = 0;
  let skipped = 0;

  for (const row of rows) {
    try {
      if (!isLikelyJikanOrigin(row)) {
        skipped += 1;
        continue;
      }

      // eslint-disable-next-line no-await-in-loop
      const detail = await getAnimeById(row.externalId);
      const normalized = normalizeJikanAnime(detail?.data);
      if (!normalized) {
        skipped += 1;
        continue;
      }

      if (!apply) {
        touched += 1;
      } else {
        // eslint-disable-next-line no-await-in-loop
        await upsertAnimeCache({ ...normalized, provider: 'JIKAN' });
        touched += 1;
      }
    } catch (error) {
      failed += 1;
      console.error(`[REPAIR][REFRESH] failed externalId=${row.externalId}:`, error.message);
    }

    // eslint-disable-next-line no-await-in-loop
    await sleep(950);
  }

  console.log(`[REPAIR][REFRESH] touched=${touched}, failed=${failed}, skipped=${skipped}, apply=${apply}`);
  return { touched, failed, skipped };
}

function buildMergeScore(row, userAnimeIdSet, translationCount) {
  let score = 0;
  if (userAnimeIdSet.has(Number(row.externalId))) score += 1000;
  if (isValidUrl(row.imageUrl) && !isPlaceholderImage(row.imageUrl)) score += 100;
  if (isPositive(row.averageScore)) score += 80;
  if (isText(row.description)) score += 50;
  score += translationCount * 10;
  score += new Date(row.updatedAt).getTime() / 1_000_000_000_000;
  return score;
}

function translationPriority(translation) {
  const sourceWeight = {
    MANUAL: 100,
    SEED: 80,
    API: 70,
    GPT: 60,
  };
  const statusWeight = {
    REVIEWED: 100,
    AUTO: 50,
    TITLE_ONLY: 40,
    FAILED: 10,
    PENDING: 0,
  };
  return (sourceWeight[translation.source] || 0) + (statusWeight[translation.status] || 0);
}

async function mergeDuplicateRows(rows, userAnimeIdSet, apply) {
  if (!rows.length) return { merged: 0, removed: 0, skipped: 0 };

  const scores = rows.map((row) => ({
    row,
    score: buildMergeScore(row, userAnimeIdSet, (row.translations || []).length),
  }));
  scores.sort((a, b) => b.score - a.score);

  const representative = scores[0].row;
  const duplicates = scores.slice(1).map((item) => item.row);

  if (!apply) {
    return { merged: duplicates.length, removed: duplicates.length, skipped: 0 };
  }

  const mergedData = {
    romajiTitle: representative.romajiTitle,
    englishTitle: representative.englishTitle,
    nativeTitle: representative.nativeTitle,
    description: representative.description,
    imageUrl: representative.imageUrl,
    bannerUrl: representative.bannerUrl,
    siteUrl: representative.siteUrl,
    averageScore: representative.averageScore,
    scoredBy: representative.scoredBy,
    rank: representative.rank,
    members: representative.members,
    favorites: representative.favorites,
    popularity: representative.popularity,
    episodes: representative.episodes,
    status: representative.status,
    season: representative.season,
    seasonYear: representative.seasonYear,
    format: representative.format,
    genres: representative.genres,
    sourcePayload: representative.sourcePayload,
    dataStatus: 'ACTIVE',
    lastSyncedAt: representative.lastSyncedAt || new Date(),
  };

  for (const row of duplicates) {
    mergedData.romajiTitle = mergedData.romajiTitle || row.romajiTitle;
    mergedData.englishTitle = mergedData.englishTitle || row.englishTitle;
    mergedData.nativeTitle = mergedData.nativeTitle || row.nativeTitle;
    mergedData.description = mergedData.description || row.description;
    if (!isValidUrl(mergedData.imageUrl) || isPlaceholderImage(mergedData.imageUrl)) {
      if (isValidUrl(row.imageUrl) && !isPlaceholderImage(row.imageUrl)) mergedData.imageUrl = row.imageUrl;
    }
    mergedData.bannerUrl = mergedData.bannerUrl || row.bannerUrl;
    mergedData.siteUrl = mergedData.siteUrl || row.siteUrl;
    mergedData.averageScore = mergedData.averageScore || row.averageScore;
    mergedData.scoredBy = mergedData.scoredBy || row.scoredBy;
    mergedData.rank = mergedData.rank || row.rank;
    mergedData.members = mergedData.members || row.members;
    mergedData.favorites = mergedData.favorites || row.favorites;
    mergedData.popularity = mergedData.popularity || row.popularity;
    mergedData.episodes = mergedData.episodes || row.episodes;
    mergedData.status = mergedData.status || row.status;
    mergedData.season = mergedData.season || row.season;
    mergedData.seasonYear = mergedData.seasonYear || row.seasonYear;
    mergedData.format = mergedData.format || row.format;
    mergedData.genres = mergedData.genres || row.genres;
    mergedData.sourcePayload = mergedData.sourcePayload || row.sourcePayload;
  }

  await prisma.anime.update({
    where: { id: representative.id },
    data: mergedData,
  });

  for (const row of duplicates) {
    for (const tr of row.translations || []) {
      // eslint-disable-next-line no-await-in-loop
      const existing = await prisma.animeTranslation.findUnique({
        where: {
          animeId_lang: { animeId: representative.id, lang: tr.lang },
        },
      });

      if (!existing) {
        // eslint-disable-next-line no-await-in-loop
        await prisma.animeTranslation.create({
          data: {
            animeId: representative.id,
            lang: tr.lang,
            title: tr.title,
            description: tr.description,
            source: tr.source,
            status: tr.status,
            failureReason: tr.failureReason,
            reviewedBy: tr.reviewedBy,
            reviewedAt: tr.reviewedAt,
          },
        });
      } else if (translationPriority(tr) > translationPriority(existing)) {
        // eslint-disable-next-line no-await-in-loop
        await prisma.animeTranslation.update({
          where: { id: existing.id },
          data: {
            title: tr.title || existing.title,
            description: tr.description || existing.description,
            source: tr.source,
            status: tr.status,
            failureReason: tr.failureReason,
            reviewedBy: tr.reviewedBy || existing.reviewedBy,
            reviewedAt: tr.reviewedAt || existing.reviewedAt,
          },
        });
      }
    }
  }

  const duplicateIds = duplicates.map((row) => row.id);
  if (duplicateIds.length) {
    await prisma.anime.deleteMany({
      where: { id: { in: duplicateIds } },
    });
  }

  return { merged: duplicates.length, removed: duplicateIds.length, skipped: 0 };
}

async function dedupeAnimeCache({ apply, limit }) {
  const userAnimeIdSet = await getUserAnimeIdSet();
  const exactDuplicates = await prisma.$queryRaw`
    SELECT provider, "externalId", COUNT(*)::int AS count
    FROM "Anime"
    GROUP BY provider, "externalId"
    HAVING COUNT(*) > 1
    LIMIT ${limit}
  `;

  console.log(`[REPAIR][DEDUPE] exact duplicate groups: ${exactDuplicates.length}`);

  let merged = 0;
  let removed = 0;
  for (const group of exactDuplicates) {
    // eslint-disable-next-line no-await-in-loop
    const rows = await prisma.anime.findMany({
      where: {
        provider: group.provider,
        externalId: Number(group.externalId),
      },
      include: {
        translations: true,
      },
      orderBy: [{ updatedAt: 'desc' }],
    });
    // eslint-disable-next-line no-await-in-loop
    const result = await mergeDuplicateRows(rows, userAnimeIdSet, apply);
    merged += result.merged;
    removed += result.removed;
  }

  const titleCandidates = await prisma.anime.findMany({
    where: { dataStatus: 'ACTIVE' },
    select: {
      id: true,
      provider: true,
      externalId: true,
      romajiTitle: true,
      englishTitle: true,
      nativeTitle: true,
      seasonYear: true,
      format: true,
    },
    take: Math.min(limit * 10, 5000),
  });

  const buckets = new Map();
  for (const row of titleCandidates) {
    const baseTitle =
      normalizeTitle(row.englishTitle) ||
      normalizeTitle(row.romajiTitle) ||
      normalizeTitle(row.nativeTitle);
    if (!baseTitle) continue;
    const key = `${row.provider}::${baseTitle}::${row.seasonYear || 0}::${row.format || ''}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(row);
  }
  const fuzzyCandidates = [...buckets.values()]
    .filter((rows) => rows.length > 1 && new Set(rows.map((r) => r.externalId)).size > 1)
    .slice(0, limit);

  console.log(`[REPAIR][DEDUPE] fuzzy duplicate candidates (report only): ${fuzzyCandidates.length}`);
  fuzzyCandidates.forEach((rows) => {
    const sample = rows.slice(0, 4).map((row) => `${row.provider}:${row.externalId}`).join(', ');
    console.log(`  - ${sample}`);
  });

  console.log(`[REPAIR][DEDUPE] merged=${merged}, removed=${removed}, apply=${apply}`);
  return { merged, removed, fuzzyCandidates: fuzzyCandidates.length };
}

async function cleanupGhostRows({ apply, limit, hardDelete }) {
  const userAnimeIdSet = await getUserAnimeIdSet();
  const rows = await prisma.anime.findMany({
    where: {
      dataStatus: 'ACTIVE',
    },
    include: {
      translations: {
        select: { title: true, description: true },
      },
    },
    take: Math.min(limit * 10, 5000),
    orderBy: [{ updatedAt: 'asc' }],
  });

  const candidates = rows.filter((row) => {
    const hasUserRef = userAnimeIdSet.has(Number(row.externalId));
    if (hasUserRef) return false;

    const invalidIdentity = !isText(row.provider) || !isPositive(row.externalId);
    const titlesMissing = !isText(row.romajiTitle) && !isText(row.englishTitle) && !isText(row.nativeTitle);
    const imageMissing = !isValidUrl(row.imageUrl) || isPlaceholderImage(row.imageUrl);
    const scoreMissing = !isPositive(row.averageScore);
    const episodesMissing = !isPositive(row.episodes);
    const siteMissing = !isValidUrl(row.siteUrl);
    const translationMissing = !(row.translations || []).some(
      (tr) => isText(tr.title) || isText(tr.description)
    );

    return invalidIdentity || (titlesMissing && imageMissing && scoreMissing && episodesMissing && siteMissing && translationMissing);
  });

  const selected = candidates.slice(0, limit);
  console.log(`[REPAIR][GHOST] candidates=${candidates.length}, selected=${selected.length}, apply=${apply}`);

  if (!apply || selected.length === 0) {
    return { archived: 0, deleted: 0, selected: selected.length };
  }

  const ids = selected.map((row) => row.id);
  if (hardDelete) {
    const result = await prisma.anime.deleteMany({ where: { id: { in: ids } } });
    console.log(`[REPAIR][GHOST] hard deleted rows: ${result.count}`);
    return { archived: 0, deleted: result.count, selected: selected.length };
  }

  const result = await prisma.anime.updateMany({
    where: { id: { in: ids } },
    data: { dataStatus: 'ARCHIVED' },
  });
  console.log(`[REPAIR][GHOST] archived rows: ${result.count}`);
  return { archived: result.count, deleted: 0, selected: selected.length };
}

async function markAdultRows({ apply, limit }) {
  const rows = await prisma.anime.findMany({
    where: {
      dataStatus: { not: 'ARCHIVED' },
    },
    take: Math.min(limit * 10, 8000),
    orderBy: [{ updatedAt: 'desc' }],
  });

  const candidates = rows.filter((row) => isAdultAnime(row)).slice(0, limit);
  console.log(`[REPAIR][ADULT] candidates=${candidates.length}, apply=${apply}`);

  if (!apply || candidates.length === 0) {
    return { marked: 0, selected: candidates.length };
  }

  const ids = candidates.map((row) => row.id);
  const result = await prisma.anime.updateMany({
    where: { id: { in: ids } },
    data: {
      isAdult: true,
      isHidden: true,
      hiddenReason: 'ADULT_CONTENT_AUTO_DETECTED',
      hiddenAt: new Date(),
      dataStatus: 'ARCHIVED',
    },
  });

  console.log(`[REPAIR][ADULT] marked rows: ${result.count}`);
  return { marked: result.count, selected: candidates.length };
}

async function main() {
  const options = parseArgs(process.argv);
  console.log('[REPAIR] options:', options);

  await printDiagnostics();

  const hasAction = options.refreshMissing || options.dedupe || options.cleanupGhosts || options.markAdult;
  if (!hasAction) {
    console.log('[REPAIR] dry-run diagnostics only. Add --refresh-missing / --dedupe / --cleanup-ghosts or --all.');
    return;
  }

  if (options.refreshMissing) {
    await refreshMissingMetadata({
      apply: options.apply,
      limit: options.limit,
    });
  }

  if (options.dedupe) {
    await dedupeAnimeCache({
      apply: options.apply,
      limit: options.limit,
    });
  }

  if (options.cleanupGhosts) {
    await cleanupGhostRows({
      apply: options.apply,
      hardDelete: options.hardDelete,
      limit: options.limit,
    });
  }

  if (options.markAdult) {
    await markAdultRows({
      apply: options.apply,
      limit: options.limit,
    });
  }

  await printDiagnostics();
  console.log('[REPAIR] done.');
}

main()
  .catch((error) => {
    console.error('[REPAIR] failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
