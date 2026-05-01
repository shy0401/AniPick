const prisma = require('../lib/prisma');

function toPositiveInt(value, fallback) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function normalizeBoolean(value) {
  if (value === true || value === 'true' || value === '1') return true;
  if (value === false || value === 'false' || value === '0') return false;
  return null;
}

function buildWhere(query = {}) {
  const where = {};
  const keyword = String(query.keyword || '').trim();
  const status = String(query.status || '').trim().toUpperCase();
  const isAdult = normalizeBoolean(query.isAdult);
  const isHidden = normalizeBoolean(query.isHidden);

  if (keyword) {
    where.OR = [
      { romajiTitle: { contains: keyword, mode: 'insensitive' } },
      { englishTitle: { contains: keyword, mode: 'insensitive' } },
      { nativeTitle: { contains: keyword, mode: 'insensitive' } },
      { description: { contains: keyword, mode: 'insensitive' } },
    ];
  }

  if (status) {
    if (status === 'HIDDEN') where.isHidden = true;
    else if (status === 'ADULT') where.isAdult = true;
    else if (status === 'ARCHIVED') where.dataStatus = 'ARCHIVED';
    else if (status === 'ACTIVE') where.dataStatus = 'ACTIVE';
  }

  if (isAdult !== null) where.isAdult = isAdult;
  if (isHidden !== null) where.isHidden = isHidden;

  return where;
}

function sanitizeAnime(anime) {
  return {
    id: anime.id,
    provider: anime.provider,
    externalId: anime.externalId,
    malId: anime.externalId,
    romajiTitle: anime.romajiTitle,
    englishTitle: anime.englishTitle,
    nativeTitle: anime.nativeTitle,
    imageUrl: anime.imageUrl,
    bannerUrl: anime.bannerUrl,
    siteUrl: anime.siteUrl,
    averageScore: anime.averageScore,
    popularity: anime.popularity,
    episodes: anime.episodes,
    status: anime.status,
    season: anime.season,
    seasonYear: anime.seasonYear,
    format: anime.format,
    genres: anime.genres,
    isAdult: anime.isAdult,
    isHidden: anime.isHidden,
    hiddenReason: anime.hiddenReason,
    hiddenAt: anime.hiddenAt,
    dataStatus: anime.dataStatus,
    createdAt: anime.createdAt,
    updatedAt: anime.updatedAt,
  };
}

async function getAdminAnimeList(req, res) {
  try {
    const page = toPositiveInt(req.query.page, 1);
    const perPage = Math.min(100, toPositiveInt(req.query.perPage, 20));
    const skip = (page - 1) * perPage;
    const where = buildWhere(req.query);

    const [rows, total] = await Promise.all([
      prisma.anime.findMany({
        where,
        orderBy: [{ updatedAt: 'desc' }],
        skip,
        take: perPage,
      }),
      prisma.anime.count({ where }),
    ]);

    return res.json({
      pageInfo: {
        currentPage: page,
        perPage,
        total,
        lastPage: Math.max(1, Math.ceil(total / perPage)),
        hasNextPage: page * perPage < total,
      },
      items: rows.map(sanitizeAnime),
    });
  } catch (error) {
    console.error('[ADMIN_ANIME] list failed:', error);
    return res.status(500).json({ message: 'Failed to load anime list.' });
  }
}

async function getAdminAnimeById(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const anime = await prisma.anime.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });

    if (!anime) return res.status(404).json({ message: 'Anime not found.' });
    return res.json({
      ...sanitizeAnime(anime),
      translations: anime.translations || [],
    });
  } catch (error) {
    console.error('[ADMIN_ANIME] detail failed:', error);
    return res.status(500).json({ message: 'Failed to load anime detail.' });
  }
}

async function hideAdminAnime(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const reason = String(req.body?.reason || 'ADMIN_HIDDEN').trim();
    const anime = await prisma.anime.update({
      where: { id },
      data: {
        isHidden: true,
        hiddenReason: reason,
        hiddenAt: new Date(),
        dataStatus: 'ARCHIVED',
      },
    });

    return res.json({ message: 'Anime hidden by admin.', item: sanitizeAnime(anime) });
  } catch (error) {
    console.error('[ADMIN_ANIME] hide failed:', error);
    return res.status(500).json({ message: 'Failed to hide anime.' });
  }
}

async function unhideAdminAnime(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const existing = await prisma.anime.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Anime not found.' });
    if (existing.isAdult) {
      return res.status(409).json({
        message: 'Adult anime cannot be unhidden directly. Please clear adult flag first if needed.',
      });
    }

    const anime = await prisma.anime.update({
      where: { id },
      data: {
        isHidden: false,
        hiddenReason: null,
        hiddenAt: null,
        dataStatus: 'ACTIVE',
      },
    });

    return res.json({ message: 'Anime restored.', item: sanitizeAnime(anime) });
  } catch (error) {
    console.error('[ADMIN_ANIME] unhide failed:', error);
    return res.status(500).json({ message: 'Failed to restore anime.' });
  }
}

async function markAdminAnimeAdult(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const anime = await prisma.anime.update({
      where: { id },
      data: {
        isAdult: true,
        isHidden: true,
        hiddenReason: 'ADULT_CONTENT_MANUAL',
        hiddenAt: new Date(),
        dataStatus: 'ARCHIVED',
      },
    });

    return res.json({ message: 'Anime marked as adult and archived.', item: sanitizeAnime(anime) });
  } catch (error) {
    console.error('[ADMIN_ANIME] mark adult failed:', error);
    return res.status(500).json({ message: 'Failed to mark anime as adult.' });
  }
}

async function archiveAdminAnime(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const anime = await prisma.anime.update({
      where: { id },
      data: {
        isHidden: true,
        hiddenReason: 'ADMIN_ARCHIVED',
        hiddenAt: new Date(),
        dataStatus: 'ARCHIVED',
      },
    });

    return res.json({ message: 'Anime archived by admin.', item: sanitizeAnime(anime) });
  } catch (error) {
    console.error('[ADMIN_ANIME] archive failed:', error);
    return res.status(500).json({ message: 'Failed to archive anime.' });
  }
}

async function hardDeleteAdminAnime(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Valid anime id is required.' });

    const anime = await prisma.anime.findUnique({ where: { id } });
    if (!anime) return res.status(404).json({ message: 'Anime not found.' });

    const externalId = anime.externalId;
    const [favoriteCount, reviewCount, watchCount] = await Promise.all([
      prisma.favorite.count({ where: { animeId: externalId } }),
      prisma.review.count({ where: { animeId: externalId } }),
      prisma.watchStatus.count({ where: { animeId: externalId } }),
    ]);

    if (favoriteCount || reviewCount || watchCount) {
      return res.status(409).json({
        message: 'Cannot hard delete anime because user data references exist.',
        references: {
          favorites: favoriteCount,
          reviews: reviewCount,
          watchStatuses: watchCount,
        },
      });
    }

    await prisma.anime.delete({ where: { id } });
    return res.json({ message: 'Anime hard deleted.' });
  } catch (error) {
    console.error('[ADMIN_ANIME] hard delete failed:', error);
    return res.status(500).json({ message: 'Failed to hard delete anime.' });
  }
}

module.exports = {
  getAdminAnimeList,
  getAdminAnimeById,
  hideAdminAnime,
  unhideAdminAnime,
  markAdminAnimeAdult,
  archiveAdminAnime,
  hardDeleteAdminAnime,
};

