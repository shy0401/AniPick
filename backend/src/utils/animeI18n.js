const { animeTranslations } = require('../data/animeTranslations');

const SUPPORTED_LANGS = ['ko', 'en', 'ja'];

const genreMap = {
  ko: {
    Action: '액션', Adventure: '모험', Comedy: '코미디', Drama: '드라마', Fantasy: '판타지', Romance: '로맨스',
    'Sci-Fi': 'SF', 'Slice of Life': '일상', Sports: '스포츠', Supernatural: '초자연', Suspense: '서스펜스',
    Mystery: '미스터리', Horror: '공포', Music: '음악', Psychological: '심리', Mecha: '메카', School: '학원',
  },
  en: {
    Action: 'Action', Adventure: 'Adventure', Comedy: 'Comedy', Drama: 'Drama', Fantasy: 'Fantasy', Romance: 'Romance',
    'Sci-Fi': 'Sci-Fi', 'Slice of Life': 'Slice of Life', Sports: 'Sports', Supernatural: 'Supernatural', Suspense: 'Suspense',
    Mystery: 'Mystery', Horror: 'Horror', Music: 'Music', Psychological: 'Psychological', Mecha: 'Mecha', School: 'School',
  },
  ja: {
    Action: 'アクション', Adventure: '冒険', Comedy: 'コメディ', Drama: 'ドラマ', Fantasy: 'ファンタジー', Romance: '恋愛',
    'Sci-Fi': 'SF', 'Slice of Life': '日常', Sports: 'スポーツ', Supernatural: '超自然', Suspense: 'サスペンス',
    Mystery: 'ミステリー', Horror: 'ホラー', Music: '音楽', Psychological: '心理', Mecha: 'メカ', School: '学園',
  },
};

const statusMap = {
  ko: {
    FINISHED: '완결', RELEASING: '방영 중', NOT_YET_RELEASED: '방영 예정', CANCELLED: '취소됨', HIATUS: '중단',
    airing: '방영 중', complete: '완결', upcoming: '방영 예정',
  },
  en: {
    FINISHED: 'Finished', RELEASING: 'Airing', NOT_YET_RELEASED: 'Not yet released', CANCELLED: 'Cancelled', HIATUS: 'Hiatus',
    airing: 'Airing', complete: 'Finished', upcoming: 'Not yet released',
  },
  ja: {
    FINISHED: '完結', RELEASING: '放送中', NOT_YET_RELEASED: '放送予定', CANCELLED: 'キャンセル', HIATUS: '休止',
    airing: '放送中', complete: '完結', upcoming: '放送予定',
  },
};

const seasonMap = {
  ko: { WINTER: '겨울', SPRING: '봄', SUMMER: '여름', FALL: '가을' },
  en: { WINTER: 'Winter', SPRING: 'Spring', SUMMER: 'Summer', FALL: 'Fall' },
  ja: { WINTER: '冬', SPRING: '春', SUMMER: '夏', FALL: '秋' },
};

const formatMap = {
  ko: { TV: 'TV 애니메이션', TV_SHORT: '단편 TV', MOVIE: '극장판', SPECIAL: '스페셜', OVA: 'OVA', ONA: 'ONA', MUSIC: '뮤직' },
  en: { TV: 'TV', TV_SHORT: 'TV Short', MOVIE: 'Movie', SPECIAL: 'Special', OVA: 'OVA', ONA: 'ONA', MUSIC: 'Music' },
  ja: { TV: 'テレビアニメ', TV_SHORT: '短編テレビ', MOVIE: '劇場版', SPECIAL: 'スペシャル', OVA: 'OVA', ONA: 'ONA', MUSIC: '音楽' },
};

function stripHtmlTags(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\[Written by MAL Rewrite\]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeLang(lang) {
  const value = String(lang || 'ko').toLowerCase();
  return SUPPORTED_LANGS.includes(value) ? value : 'ko';
}

function hasHangul(text) {
  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(String(text || ''));
}

function isMeaningfulTitle(text) {
  const value = String(text || '').trim();
  if (!value) return false;
  const blocked = ['한국어 제목 준비 중', '제목 준비 중', 'Untitled', 'タイトルなし', '-'];
  return !blocked.includes(value);
}

function getIdCandidates(anime) {
  return [anime?.externalId, anime?.malId, anime?.id, anime?.providerId]
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value > 0);
}

function getTranslationSeedByAnime(anime) {
  const ids = getIdCandidates(anime);
  for (const id of ids) {
    const row = animeTranslations[id];
    if (row) return { id, row };
  }
  return null;
}

function getBestOriginalTitle(anime) {
  return (
    anime?.title?.native ||
    anime?.title?.english ||
    anime?.title?.romaji ||
    anime?.nativeTitle ||
    anime?.englishTitle ||
    anime?.romajiTitle ||
    '제목 없음'
  );
}

function getTranslationByLang(translation, lang) {
  if (!translation) return null;
  if (translation.lang && translation.lang === lang) return translation;
  return null;
}

function getDisplayTitle(anime, lang, translation = null) {
  const normalizedLang = normalizeLang(lang);
  const row = getTranslationByLang(translation, normalizedLang);
  const seed = getTranslationSeedByAnime(anime)?.row;
  const ids = getIdCandidates(anime);

  if (normalizedLang === 'ko') {
    const translatedTitle = row?.title && String(row.title).trim();
    const seedKoTitle = seed?.koTitle || ids.map((id) => animeTranslations[id]?.koTitle).find(Boolean) || null;

    return (
      (isMeaningfulTitle(translatedTitle) ? translatedTitle : null) ||
      (isMeaningfulTitle(seedKoTitle) ? seedKoTitle : null) ||
      (hasHangul(anime?.title?.native) ? anime.title.native : null) ||
      (hasHangul(anime?.nativeTitle) ? anime.nativeTitle : null) ||
      anime?.title?.english ||
      anime?.title?.romaji ||
      anime?.englishTitle ||
      anime?.romajiTitle ||
      '제목 없음'
    );
  }

  if (normalizedLang === 'en') {
    return (
      (row?.title && String(row.title).trim()) ||
      anime?.title?.english ||
      anime?.title?.romaji ||
      anime?.title?.native ||
      anime?.englishTitle ||
      anime?.romajiTitle ||
      anime?.nativeTitle ||
      'Untitled'
    );
  }

  return (
    (row?.title && String(row.title).trim()) ||
    seed?.jaTitle ||
    anime?.title?.native ||
    anime?.nativeTitle ||
    anime?.title?.romaji ||
    anime?.title?.english ||
    anime?.romajiTitle ||
    anime?.englishTitle ||
    'タイトルなし'
  );
}

function getDisplayDescription(anime, lang, translation = null) {
  const normalizedLang = normalizeLang(lang);
  const row = getTranslationByLang(translation, normalizedLang);
  const seed = getTranslationSeedByAnime(anime)?.row;

  if (normalizedLang === 'ko') {
    if (row?.description) return stripHtmlTags(row.description);
    if (seed?.koDescription) return stripHtmlTags(seed.koDescription);
    return '한국어 번역이 준비 중입니다.';
  }

  if (normalizedLang === 'en') {
    if (row?.description) return stripHtmlTags(row.description);
    const seedDescription = stripHtmlTags(seed?.enDescription || '');
    if (seedDescription) return seedDescription;
    const raw = stripHtmlTags(anime?.description || anime?.background || '');
    return raw || 'No description available.';
  }

  if (row?.description) return stripHtmlTags(row.description);
  if (seed?.jaDescription) return stripHtmlTags(seed.jaDescription);
  return '日本語訳は準備中です。';
}

function translateGenres(genres = [], lang = 'ko') {
  const map = genreMap[normalizeLang(lang)] || genreMap.ko;
  return Array.isArray(genres) ? genres.map((genre) => map[genre] || genre) : [];
}

function translateStatus(status, lang = 'ko') {
  const map = statusMap[normalizeLang(lang)] || statusMap.ko;
  return map[status] || status || '';
}

function translateSeason(season, lang = 'ko') {
  const map = seasonMap[normalizeLang(lang)] || seasonMap.ko;
  return map[season] || season || '';
}

function translateFormat(format, lang = 'ko') {
  const map = formatMap[normalizeLang(lang)] || formatMap.ko;
  return map[format] || format || '';
}

function getLocalizedAnime(anime, lang = 'ko', translation = null) {
  if (!anime) return anime;

  const selected = normalizeLang(lang);

  const i18n = {
    ko: {
      title: getDisplayTitle(anime, 'ko', translation),
      description: getDisplayDescription(anime, 'ko', translation),
      genres: translateGenres(anime.genres || [], 'ko'),
      status: translateStatus(anime.status, 'ko'),
      season: translateSeason(anime.season, 'ko'),
      format: translateFormat(anime.format, 'ko'),
    },
    en: {
      title: getDisplayTitle(anime, 'en', translation),
      description: getDisplayDescription(anime, 'en', translation),
      genres: translateGenres(anime.genres || [], 'en'),
      status: translateStatus(anime.status, 'en'),
      season: translateSeason(anime.season, 'en'),
      format: translateFormat(anime.format, 'en'),
    },
    ja: {
      title: getDisplayTitle(anime, 'ja', translation),
      description: getDisplayDescription(anime, 'ja', translation),
      genres: translateGenres(anime.genres || [], 'ja'),
      status: translateStatus(anime.status, 'ja'),
      season: translateSeason(anime.season, 'ja'),
      format: translateFormat(anime.format, 'ja'),
    },
  };

  const view = i18n[selected];

  return {
    ...anime,
    lang: selected,
    displayTitle: view.title,
    displayDescription: view.description,
    displayGenres: view.genres,
    displayStatus: view.status,
    displaySeason: view.season,
    displayFormat: view.format,
    i18n,
    isTranslated: Boolean(translation?.description),
  };
}

module.exports = {
  normalizeLang,
  stripHtmlTags,
  hasHangul,
  isMeaningfulTitle,
  getIdCandidates,
  getBestOriginalTitle,
  getTranslationSeedByAnime,
  getLocalizedAnime,
  getDisplayTitle,
  getDisplayDescription,
  translateGenres,
  translateStatus,
  translateSeason,
  translateFormat,
};
