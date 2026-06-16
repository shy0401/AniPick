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

function getScorePendingLabel(lang = 'ko') {
  if (lang === 'en') return 'Not yet rated';
  if (lang === 'ja') return '評価集計前';
  return '평점 집계 전';
}

function getScoreUnit(lang = 'ko') {
  if (lang === 'en') return '';
  if (lang === 'ja') return '点';
  return '점';
}

function getScoreLabel(lang = 'ko') {
  if (lang === 'en') return 'Score';
  if (lang === 'ja') return '評価';
  return '평점';
}

export function formatAnimeScore(animeOrScore, lang = 'ko') {
  const value = getAnimeScoreValue(animeOrScore);

  if (value === null) {
    return getScorePendingLabel(lang);
  }

  return `${value.toFixed(1)}${getScoreUnit(lang)}`;
}

export function formatAnimeScoreLabel(animeOrScore, lang = 'ko') {
  const value = getAnimeScoreValue(animeOrScore);

  if (value === null) {
    return getScorePendingLabel(lang);
  }

  return `${getScoreLabel(lang)} ${value.toFixed(1)}${getScoreUnit(lang)}`;
}

