export function getAnimeScoreValue(animeOrScore) {
  const raw =
    typeof animeOrScore === 'object' && animeOrScore !== null
      ? animeOrScore.averageScore ?? animeOrScore.meanScore ?? animeOrScore.score
      : animeOrScore;

  if (raw === null || raw === undefined || raw === '') {
    return null;
  }

  const value = Number(raw);

  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }

  return value > 10 ? value / 10 : value;
}

export function hasAnimeScore(animeOrScore) {
  return getAnimeScoreValue(animeOrScore) !== null;
}

export function formatAnimeScore(animeOrScore) {
  const value = getAnimeScoreValue(animeOrScore);

  if (value === null) {
    return '평점 집계 전';
  }

  return `${value.toFixed(1)}점`;
}

export function formatAnimeScoreLabel(animeOrScore) {
  const value = getAnimeScoreValue(animeOrScore);

  if (value === null) {
    return '평점 집계 전';
  }

  return `평점 ${value.toFixed(1)}점`;
}

