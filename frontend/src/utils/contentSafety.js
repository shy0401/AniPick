const BLOCKED_KEYWORDS = ['hentai', 'erotica', 'ecchi', 'rx - hentai', 'r+ - mild nudity'];

function normalizeText(value) {
  return String(value || '').toLowerCase();
}

export function isBlockedAnimeClientSide(anime) {
  if (anime?.isAdult || anime?.isHidden || anime?.dataStatus === 'ARCHIVED') return true;

  const genres = Array.isArray(anime?.genres) ? anime.genres : [];
  const text = [
    anime?.displayTitle,
    anime?.title?.romaji,
    anime?.title?.english,
    anime?.title?.native,
    anime?.romajiTitle,
    anime?.englishTitle,
    anime?.nativeTitle,
    anime?.description,
    anime?.rating,
    ...genres,
  ]
    .filter(Boolean)
    .join(' ');

  const normalized = normalizeText(text);
  return BLOCKED_KEYWORDS.some((keyword) => normalized.includes(keyword));
}
