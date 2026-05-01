const prisma = require('../lib/prisma');
const { normalizeLang, getLocalizedAnime } = require('../utils/animeI18n');
const { toAnimeLike } = require('../services/anime-cache.service');

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

async function getMyFavorites(req, res) {
  try {
    const lang = getRequestLang(req);
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    const displayMap = await buildDisplayMap(favorites.map((item) => item.animeId), lang);

    const enriched = favorites.map((item) => {
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
    console.error('Get favorites error:', error);
    return res.status(500).json({ message: 'Failed to fetch favorites.' });
  }
}

async function addFavorite(req, res) {
  try {
    const { animeId, animeTitle, animeImage } = req.body;

    if (!animeId || !animeTitle) {
      return res.status(400).json({ message: 'animeId and animeTitle are required.' });
    }

    const safeTitle = sanitizeAnimeTitle(animeTitle, animeId);

    const favorite = await prisma.favorite.create({
      data: {
        userId: req.user.id,
        animeId: Number(animeId),
        animeTitle: safeTitle,
        animeImage: animeImage || null,
      },
    });

    return res.status(201).json(favorite);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'This anime is already in favorites.' });
    }

    console.error('Add favorite error:', error);
    return res.status(500).json({ message: 'Failed to add favorite.' });
  }
}

async function removeFavorite(req, res) {
  try {
    const animeId = Number(req.params.animeId);

    if (!animeId) {
      return res.status(400).json({ message: 'Valid animeId is required.' });
    }

    const result = await prisma.favorite.deleteMany({
      where: {
        userId: req.user.id,
        animeId,
      },
    });

    if (result.count === 0) {
      return res.status(404).json({ message: 'Favorite not found.' });
    }

    return res.json({ message: 'Favorite removed.' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    return res.status(500).json({ message: 'Failed to remove favorite.' });
  }
}

async function checkFavorite(req, res) {
  try {
    const animeId = Number(req.params.animeId);

    if (!animeId) {
      return res.status(400).json({ message: 'Valid animeId is required.' });
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_animeId: {
          userId: req.user.id,
          animeId,
        },
      },
    });

    return res.json({ isFavorite: Boolean(favorite) });
  } catch (error) {
    console.error('Check favorite error:', error);
    return res.status(500).json({ message: 'Failed to check favorite status.' });
  }
}

module.exports = {
  getMyFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
};
