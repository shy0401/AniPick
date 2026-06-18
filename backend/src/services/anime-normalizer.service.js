function normalizeStatus(status) {
  const map = {
    'Currently Airing': 'RELEASING',
    'Finished Airing': 'FINISHED',
    'Not yet aired': 'NOT_YET_RELEASED',
  };
  return map[status] || status || '';
}

function normalizeFormat(type) {
  const map = {
    TV: 'TV',
    Movie: 'MOVIE',
    OVA: 'OVA',
    ONA: 'ONA',
    Special: 'SPECIAL',
    Music: 'MUSIC',
  };
  return map[type] || String(type || '').toUpperCase() || 'TV';
}

function normalizeScore(value) {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  // Jikan score is 0~10, cache uses 0~100 scale.
  return Math.round(numeric * 10);
}

function pickJikanTitle(item, type, fallbackTypes = []) {
  const direct = type === 'default' ? item?.title : item?.[`title_${type}`];
  if (direct) return direct;

  const titles = Array.isArray(item?.titles) ? item.titles : [];
  const byType = titles.find((title) => String(title?.type || '').toLowerCase() === String(type).toLowerCase())?.title;
  if (byType) return byType;

  for (const fallbackType of fallbackTypes) {
    const fallback = pickJikanTitle(item, fallbackType, []);
    if (fallback) return fallback;
  }

  return '';
}

function normalizeJikanAnime(item) {
  if (!item) return null;

  const coverExtra = item.images?.jpg?.large_image_url || item.images?.webp?.large_image_url || null;
  const coverLarge = item.images?.jpg?.image_url || item.images?.webp?.image_url || coverExtra;
  const coverMedium = item.images?.jpg?.small_image_url || item.images?.webp?.small_image_url || coverLarge;

  const score = normalizeScore(item.score);
  const genres = Array.isArray(item.genres) ? item.genres.map((g) => g.name).filter(Boolean) : [];
  const studios = Array.isArray(item.studios) ? item.studios.map((s) => ({ name: s.name })) : [];

  return {
    id: item.mal_id,
    malId: item.mal_id,
    provider: 'JIKAN',
    title: {
      romaji: pickJikanTitle(item, 'default', ['English', 'Japanese']) || `Anime ${item.mal_id}`,
      english: pickJikanTitle(item, 'english', ['default', 'Japanese']) || `Anime ${item.mal_id}`,
      native: pickJikanTitle(item, 'japanese', ['default', 'English']) || `Anime ${item.mal_id}`,
    },
    coverImage: {
      extraLarge: coverExtra,
      large: coverLarge,
      medium: coverMedium,
    },
    bannerImage: coverExtra || coverLarge || null,
    description: item.synopsis || item.background || '',
    genres,
    averageScore: score,
    meanScore: score,
    scoredBy: Number.isFinite(Number(item.scored_by)) ? Number(item.scored_by) : null,
    rank: Number.isFinite(Number(item.rank)) ? Number(item.rank) : null,
    members: Number.isFinite(Number(item.members)) ? Number(item.members) : null,
    favorites: Number.isFinite(Number(item.favorites)) ? Number(item.favorites) : null,
    popularity: item.members || item.popularity || 0,
    trending: item.favorites || 0,
    episodes: item.episodes || null,
    status: normalizeStatus(item.status),
    season: item.season ? String(item.season).toUpperCase() : '',
    seasonYear: item.year || null,
    format: normalizeFormat(item.type),
    siteUrl: item.url || '',
    studios: { nodes: studios },
    sourcePayload: item,
  };
}

function normalizeJikanList(data = []) {
  return (data || []).map(normalizeJikanAnime).filter(Boolean);
}

function normalizeKitsuAnime(item) {
  if (!item) return null;
  const attrs = item.attributes || {};
  const names = attrs.titles || {};
  const score = normalizeScore(attrs.averageRating);
  const poster = attrs.posterImage || {};
  const cover = attrs.coverImage || {};

  return {
    id: Number(item.id),
    malId: null,
    provider: 'KITSU',
    title: {
      romaji: names.en_jp || names.en || names.ja_jp || 'Untitled',
      english: names.en || names.en_jp || names.ja_jp || 'Untitled',
      native: names.ja_jp || names.en_jp || names.en || 'Untitled',
    },
    coverImage: {
      extraLarge: poster.original || poster.large || poster.medium || null,
      large: poster.large || poster.medium || poster.original || null,
      medium: poster.medium || poster.small || poster.large || null,
    },
    bannerImage: cover.original || cover.large || null,
    description: attrs.synopsis || '',
    genres: [],
    averageScore: score,
    meanScore: score,
    scoredBy: Number.isFinite(Number(attrs.ratingFrequenciesCount)) ? Number(attrs.ratingFrequenciesCount) : null,
    rank: Number.isFinite(Number(attrs.ratingRank)) ? Number(attrs.ratingRank) : null,
    members: Number.isFinite(Number(attrs.userCount)) ? Number(attrs.userCount) : null,
    favorites: Number.isFinite(Number(attrs.favoritesCount)) ? Number(attrs.favoritesCount) : null,
    popularity: attrs.userCount || attrs.popularityRank || 0,
    trending: attrs.favoritesCount || 0,
    episodes: attrs.episodeCount || null,
    status: attrs.status || '',
    season: '',
    seasonYear: attrs.startDate ? Number(String(attrs.startDate).slice(0, 4)) : null,
    format: normalizeFormat(attrs.subtype || attrs.showType || 'TV'),
    siteUrl: attrs.canonicalUrl ? `https://kitsu.io${attrs.canonicalUrl}` : '',
    studios: { nodes: [] },
    sourcePayload: item,
  };
}

module.exports = {
  normalizeJikanAnime,
  normalizeJikanList,
  normalizeKitsuAnime,
};
