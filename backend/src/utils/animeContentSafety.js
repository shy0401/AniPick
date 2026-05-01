const BLOCKED_GENRES = ['Hentai', 'Erotica', 'Ecchi'];
const BLOCKED_RATINGS = ['Rx - Hentai', 'R+ - Mild Nudity'];
const BLOCKED_KEYWORDS = [
  'hentai',
  'erotica',
  'ecchi',
  'sex friend',
  'sexfriend',
  'virgin',
  'doutei',
  'doujin',
  'oppai',
];

function normalizeText(value) {
  return String(value || '').toLowerCase().trim();
}

function parseGenres(genres) {
  if (!genres) return [];
  if (Array.isArray(genres)) return genres;

  if (typeof genres === 'string') {
    try {
      const parsed = JSON.parse(genres);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return genres
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function isAdultAnime(anime) {
  const normalizedBlockedGenres = BLOCKED_GENRES.map((item) => item.toLowerCase());
  const genres = parseGenres(anime?.genres).map((genre) => normalizeText(genre));
  const rating = normalizeText(anime?.rating || anime?.sourcePayload?.rating || anime?.sourcePayload?.rated);

  const titleText = [
    anime?.displayTitle,
    anime?.title,
    anime?.romajiTitle,
    anime?.englishTitle,
    anime?.nativeTitle,
    anime?.description,
    anime?.sourcePayload?.title,
    anime?.sourcePayload?.title_english,
    anime?.sourcePayload?.title_japanese,
    anime?.sourcePayload?.synopsis,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const hasBlockedGenre = genres.some((genre) => normalizedBlockedGenres.includes(genre));
  const hasBlockedRating = BLOCKED_RATINGS.some((blocked) => rating.includes(blocked.toLowerCase()));
  const hasBlockedKeyword = BLOCKED_KEYWORDS.some((keyword) => titleText.includes(keyword));

  return hasBlockedGenre || hasBlockedRating || hasBlockedKeyword;
}

module.exports = {
  isAdultAnime,
  BLOCKED_GENRES,
  BLOCKED_RATINGS,
  BLOCKED_KEYWORDS,
  parseGenres,
};
