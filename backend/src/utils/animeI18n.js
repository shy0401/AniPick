const { animeTranslations } = require('../data/animeTranslations');

const SUPPORTED_LANGS = ['ko', 'en', 'ja'];

const genreMap = {
  ko: {
    Action: '액션', Adventure: '모험', Comedy: '코미디', Drama: '드라마', Fantasy: '판타지', Romance: '로맨스',
    'Sci-Fi': 'SF', 'Slice of Life': '일상', Sports: '스포츠', Supernatural: '초자연', Suspense: '서스펜스',
    Mystery: '미스터리', Horror: '공포', Music: '음악', Psychological: '심리', Mecha: '메카', School: '학원',
    'Award Winning': '\uC218\uC0C1\uC791', Gourmet: '\uC694\uB9AC', 'Avant Garde': '\uC544\uBC29\uAC00\uB974\uB4DC', AvantGarde: '\uC544\uBC29\uAC00\uB974\uB4DC',
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
    'Award Winning': '\u53D7\u8CDE\u4F5C', Gourmet: '\u30B0\u30EB\u30E1', 'Avant Garde': '\u524D\u885B', AvantGarde: '\u524D\u885B',
  },
};

const statusMap = {
  ko: {
    FINISHED: '완결', RELEASING: '방영 중', NOT_YET_RELEASED: '방영 예정', CANCELLED: '취소됨', HIATUS: '중단',
    airing: '방영 중', complete: '완결', upcoming: '방영 예정',
    'Finished Airing': '\uBC29\uC601 \uC644\uB8CC', 'Currently Airing': '\uBC29\uC601 \uC911', 'Not yet aired': '\uBC29\uC601 \uC608\uC815',
  },
  en: {
    FINISHED: 'Finished', RELEASING: 'Airing', NOT_YET_RELEASED: 'Not yet released', CANCELLED: 'Cancelled', HIATUS: 'Hiatus',
    airing: 'Airing', complete: 'Finished', upcoming: 'Not yet released',
    'Finished Airing': 'Finished Airing', 'Currently Airing': 'Currently Airing', 'Not yet aired': 'Not yet aired',
  },
  ja: {
    FINISHED: '完結', RELEASING: '放送中', NOT_YET_RELEASED: '放送予定', CANCELLED: 'キャンセル', HIATUS: '休止',
    airing: '放送中', complete: '完結', upcoming: '放送予定',
    'Finished Airing': '\u653E\u9001\u7D42\u4E86', 'Currently Airing': '\u653E\u9001\u4E2D', 'Not yet aired': '\u653E\u9001\u4E88\u5B9A',
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
      '\uC81C\uBAA9 \uBC88\uC5ED \uC900\uBE44 \uC911'
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
    '\u30BF\u30A4\u30C8\u30EB\u306A\u3057'
  );
}

function normalizeDescriptionText(text) {
  return stripHtmlTags(text).replace(/\s+/g, ' ').trim();
}

function getAnimeScoreValue(anime) {
  const raw = anime?.averageScore ?? anime?.meanScore ?? anime?.score;
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value > 10 ? value / 10 : value;
}

function getSafeDescriptionTitle(anime, lang, translation = null) {
  const title = getDisplayTitle(anime, lang, translation);
  const blocked = [
    '제목 번역 준비 중',
    '한국어 제목 준비 중',
    'タイトルなし',
    'Untitled',
  ];

  if (!isMeaningfulTitle(title) || blocked.includes(String(title || '').trim())) {
    return lang === 'ja' ? 'この作品' : '이 작품';
  }

  return title;
}

function buildExpandedKoDescription(anime, baseDescription = '', translation = null) {
  const cleanedBase = normalizeDescriptionText(baseDescription);
  const hasUsefulBase =
    cleanedBase &&
    cleanedBase !== '한국어 번역이 준비 중입니다.' &&
    cleanedBase !== '한국어 줄거리가 준비 중입니다.';

  if (hasUsefulBase && cleanedBase.length >= 180) {
    return cleanedBase;
  }

  const title = getSafeDescriptionTitle(anime, 'ko', translation);
  const genres = translateGenres(anime?.genres || [], 'ko').filter(Boolean).slice(0, 4);
  const status = translateStatus(anime?.status, 'ko');
  const season = translateSeason(anime?.season, 'ko');
  const format = translateFormat(anime?.format, 'ko');
  const score = getAnimeScoreValue(anime);
  const metaParts = [];

  if (anime?.seasonYear && season) metaParts.push(`${anime.seasonYear}년 ${season}`);
  if (format) metaParts.push(format);
  if (status) metaParts.push(status);
  if (anime?.episodes) metaParts.push(`${anime.episodes}화 구성`);

  const sentences = [];

  if (hasUsefulBase) {
    sentences.push(cleanedBase);
  } else {
    sentences.push(
      `${title}의 한국어 줄거리는 아직 보강 중이지만, 현재 저장된 작품 정보를 바탕으로 감상 포인트를 정리했습니다.`
    );
  }

  if (genres.length > 0) {
    sentences.push(
      `장르는 ${genres.join(', ')} 중심이며, 이야기의 분위기와 인물 관계를 함께 살펴볼 수 있는 작품입니다.`
    );
  }

  if (metaParts.length > 0) {
    sentences.push(
      `등록된 정보 기준으로 ${metaParts.join(', ')}으로 안내되며, 공개 시기, 형식, 방영 상태를 한눈에 확인할 수 있습니다.`
    );
  }

  if (score !== null) {
    sentences.push(
      `평점은 ${score.toFixed(1)}점 수준으로 집계되어 있어 작품을 고를 때 평가와 취향을 함께 참고하기 좋습니다.`
    );
  } else if (anime?.popularity || anime?.members) {
    sentences.push(
      '아직 평점 정보가 충분하지 않은 경우에도 인기 지표와 장르 정보를 함께 보면 작품의 성격을 파악하는 데 도움이 됩니다.'
    );
  } else {
    sentences.push(
      '상세 평점과 줄거리 데이터는 계속 보강될 수 있으며, 현재는 제목, 장르, 형식 정보를 중심으로 작품을 안내합니다.'
    );
  }

  return sentences.join(' ');
}

function buildExpandedJaDescription(anime, baseDescription = '', translation = null) {
  const cleanedBase = normalizeDescriptionText(baseDescription);
  const hasUsefulBase =
    cleanedBase &&
    cleanedBase !== '日本語訳は準備中です。' &&
    cleanedBase !== '日本語のあらすじは準備中です。';

  if (hasUsefulBase && cleanedBase.length >= 120) {
    return cleanedBase;
  }

  const title = getSafeDescriptionTitle(anime, 'ja', translation);
  const genres = translateGenres(anime?.genres || [], 'ja').filter(Boolean).slice(0, 4);
  const status = translateStatus(anime?.status, 'ja');
  const season = translateSeason(anime?.season, 'ja');
  const format = translateFormat(anime?.format, 'ja');
  const score = getAnimeScoreValue(anime);
  const metaParts = [];

  if (anime?.seasonYear && season) metaParts.push(`${anime.seasonYear}年${season}`);
  if (format) metaParts.push(format);
  if (status) metaParts.push(status);
  if (anime?.episodes) metaParts.push(`${anime.episodes}話構成`);

  const sentences = [];

  if (hasUsefulBase) {
    sentences.push(cleanedBase);
  } else {
    sentences.push(
      `${title}の日本語あらすじは現在補強中ですが、保存済みの作品情報をもとに見どころを整理しています。`
    );
  }

  if (genres.length > 0) {
    sentences.push(
      `ジャンルは${genres.join('、')}が中心で、作品の雰囲気や登場人物の関係性を確認しながら選べます。`
    );
  }

  if (metaParts.length > 0) {
    sentences.push(
      `登録情報では${metaParts.join('、')}の作品として扱われており、公開時期や形式もあわせて確認できます。`
    );
  }

  if (score !== null) {
    sentences.push(
      `評価は${score.toFixed(1)}点前後で、視聴前に評判と好みを比較するときの参考になります。`
    );
  } else {
    sentences.push(
      '詳細な評価や長文あらすじは今後更新される場合があり、現在はタイトル、ジャンル、形式を中心に案内しています。'
    );
  }

  return sentences.join(' ');
}

function getDisplayDescription(anime, lang, translation = null) {
  const normalizedLang = normalizeLang(lang);
  const row = getTranslationByLang(translation, normalizedLang);
  const seed = getTranslationSeedByAnime(anime)?.row;

  if (normalizedLang === 'ko') {
    const description = row?.description || seed?.koDescription || '';
    return buildExpandedKoDescription(anime, description, row);
  }

  if (normalizedLang === 'en') {
    if (row?.description) return stripHtmlTags(row.description);
    const seedDescription = stripHtmlTags(seed?.enDescription || '');
    if (seedDescription) return seedDescription;
    const raw = stripHtmlTags(anime?.description || anime?.background || '');
    return raw || 'No description available.';
  }

  const description = row?.description || seed?.jaDescription || '';
  return buildExpandedJaDescription(anime, description, row);
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
  const normalized = String(season || '').toUpperCase();
  return map[season] || map[normalized] || season || '';
}

function translateFormat(format, lang = 'ko') {
  const map = formatMap[normalizeLang(lang)] || formatMap.ko;
  const normalized = String(format || '').replace(/\s+/g, '_').toUpperCase();
  return map[format] || map[normalized] || format || '';
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
  buildExpandedKoDescription,
  buildExpandedJaDescription,
  translateGenres,
  translateStatus,
  translateSeason,
  translateFormat,
};
