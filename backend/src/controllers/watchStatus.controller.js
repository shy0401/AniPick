const prisma = require('../lib/prisma');
const { normalizeLang, getLocalizedAnime } = require('../utils/animeI18n');
const { toAnimeLike } = require('../services/anime-cache.service');

const ALLOWED_STATUS = ['PLAN_TO_WATCH', 'WATCHING', 'COMPLETED', 'DROPPED'];

function getRequestLang(req) {
  return normalizeLang(req.query.lang || req.headers['x-anipick-lang'] || 'ko');
}

function sanitizeAnimeTitle(title, animeId) {
  const text = String(title || '').trim();
  if (!text || text === '한국어 제목 준비 중') {
    return `애니메이션 #${animeId}`;
  }
  return text;
}

async function buildDisplayMap(animeIds, lang) {
  const uniqueIds = [...new Set((animeIds || []).map(Number).filter(Boolean))];
  if (!uniqueIds.length) return new Map();

  const rows = await prisma.anime.findMany({
    where: {
      provider: 'JIKAN',
      externalId: { in: uniqueIds },
    },
    include: {
      translations: true,
    },
  });

  const map = new Map();
  rows.forEach((row) => {
    const anime = toAnimeLike(row);
    const translation = (row.translations || []).find((item) => item.lang === lang) || null;
    const localized = getLocalizedAnime(anime, lang, translation);
    map.set(row.externalId, {
      title: localized.displayTitle,
      image: anime.coverImage?.large || null,
    });
  });

  return map;
}

async function getMyWatchStatus(req, res) {
  try {
    const lang = getRequestLang(req);

    const list = await prisma.watchStatus.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: 'desc' },
    });

    const displayMap = await buildDisplayMap(list.map((item) => item.animeId), lang);

    const enriched = list.map((item) => {
      const display = displayMap.get(item.animeId);
      return {
        ...item,
        animeTitle: sanitizeAnimeTitle(item.animeTitle, item.animeId),
        animeTitleDisplay: display?.title || sanitizeAnimeTitle(item.animeTitle, item.animeId),
        animeImageDisplay: display?.image || item.animeImage || null,
      };
    });

    return res.json(enriched);
  } catch (error) {
    console.error('Get watch status error:', error);
    return res.status(500).json({ message: 'Failed to fetch watch status.' });
  }
}

async function upsertWatchStatus(req, res) {
  try {
    const { animeId, animeTitle, animeImage, status } = req.body;

    if (!animeId || !animeTitle || !status) {
      return res.status(400).json({ message: 'animeId, animeTitle, and status are required.' });
    }

    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const safeTitle = sanitizeAnimeTitle(animeTitle, animeId);

    const saved = await prisma.watchStatus.upsert({
      where: {
        userId_animeId: {
          userId: req.user.id,
          animeId: Number(animeId),
        },
      },
      update: {
        animeTitle: safeTitle,
        animeImage: animeImage || null,
        status,
      },
      create: {
        userId: req.user.id,
        animeId: Number(animeId),
        animeTitle: safeTitle,
        animeImage: animeImage || null,
        status,
      },
    });

    return res.json(saved);
  } catch (error) {
    console.error('Upsert watch status error:', error);
    return res.status(500).json({ message: 'Failed to save watch status.' });
  }
}

async function removeWatchStatus(req, res) {
  try {
    const animeId = Number(req.params.animeId);

    if (!animeId) {
      return res.status(400).json({ message: 'Valid animeId is required.' });
    }

    const deleted = await prisma.watchStatus.deleteMany({
      where: {
        userId: req.user.id,
        animeId,
      },
    });

    if (!deleted.count) {
      return res.status(404).json({ message: 'Watch status not found.' });
    }

    return res.json({ message: 'Watch status removed.' });
  } catch (error) {
    console.error('Remove watch status error:', error);
    return res.status(500).json({ message: 'Failed to remove watch status.' });
  }
}

module.exports = {
  getMyWatchStatus,
  upsertWatchStatus,
  removeWatchStatus,
};
