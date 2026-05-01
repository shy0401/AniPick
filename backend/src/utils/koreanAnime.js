const genreKoMap = {
  Action: '액션',
  Adventure: '모험',
  Comedy: '코미디',
  Drama: '드라마',
  Fantasy: '판타지',
  Romance: '로맨스',
  'Sci-Fi': 'SF',
  'Slice of Life': '일상',
  Sports: '스포츠',
  Supernatural: '초자연',
  Thriller: '스릴러',
  Mystery: '미스터리',
  Horror: '공포',
  Music: '음악',
  Psychological: '심리',
  Mecha: '메카',
  School: '학원',
};

const seasonKoMap = {
  WINTER: '겨울',
  SPRING: '봄',
  SUMMER: '여름',
  FALL: '가을',
};

const statusKoMap = {
  FINISHED: '완결',
  RELEASING: '방영 중',
  NOT_YET_RELEASED: '방영 예정',
  CANCELLED: '취소됨',
  HIATUS: '중단',
  airing: '방영 중',
  complete: '완결',
  upcoming: '방영 예정',
};

const formatKoMap = {
  TV: 'TV 애니메이션',
  TV_SHORT: '단편 TV',
  MOVIE: '극장판',
  SPECIAL: '스페셜',
  OVA: 'OVA',
  ONA: 'ONA',
  MUSIC: '뮤직',
};

const titleKoMap = {
  1: '카우보이 비밥',
  5: '카우보이 비밥: 천국의 문',
  20: '나루토',
  21: '원피스',
  30: '신세기 에반게리온',
  1735: '나루토 질풍전',
  1535: '데스노트',
  1575: '코드 기아스: 반역의 를르슈',
  16498: '진격의 거인',
  18679: '킬라킬',
  19815: '노 게임 노 라이프',
  20507: '노라가미',
  20583: '하이큐',
  20605: '도쿄 구울 √A',
  21459: '나의 히어로 아카데미아 2기',
  21827: '바이올렛 에버가든',
  22319: '도쿄 구울',
  2251: '기생수',
  235: '명탐정 코난',
  269: '블리치',
  223: '드래곤볼',
  30276: '원펀맨',
  31964: '나의 히어로 아카데미아',
  33051: '쿠로코의 농구',
  33486: '나의 히어로 아카데미아',
  34240: '메이드 인 어비스',
  37991: '약속의 네버랜드 2기',
  40748: '주술회전 2기',
  5114: '강철의 연금술사 BROTHERHOOD',
  6547: 'Angel Beats!',
  9253: '슈타인즈 게이트',
  97938: '보루토',
  97940: '블랙 클로버',
  9919: '청의 엑소시스트',
  10087: '페이트/제로',
  101759: '약속의 네버랜드',
  101922: '귀멸의 칼날',
  10620: '미래일기',
  11061: '헌터×헌터',
  113415: '주술회전',
  116242: '체인소 맨',
  11757: '소드 아트 온라인',
  127230: '체인소 맨',
  129874: '스파이 패밀리',
  137822: '블루 록',
  140960: '최애의 아이',
  150672: '최애의 아이',
  154587: '장송의 프리렌',
  13601: '사이코패스',
  15125: '신세계에서',
  16417: '블리치',
  22370: '원펀맨 OVA',
  28223: '데스 퍼레이드',
  30015: '리제로',
};

function stripHtmlTags(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getBestOriginalTitle(anime) {
  return anime?.title?.english || anime?.title?.romaji || anime?.title?.native || '제목 없음';
}

function getKoreanTitle(anime) {
  if (!anime) return '제목 없음';
  if (titleKoMap[anime.id]) return titleKoMap[anime.id];
  if (anime?.title?.native) return anime.title.native;
  if (anime?.title?.english) return anime.title.english;
  if (anime?.title?.romaji) return anime.title.romaji;
  return '제목 없음';
}

function translateGenres(genres = []) {
  if (!Array.isArray(genres)) return [];
  return genres.map((genre) => genreKoMap[genre] || genre);
}

function localizeAnime(anime) {
  if (!anime) return anime;

  const koreanTitle = getKoreanTitle(anime);
  const originalTitle = getBestOriginalTitle(anime);
  const displayDescription = stripHtmlTags(anime.description || '');
  const koreanGenres = translateGenres(anime.genres || []);

  return {
    ...anime,
    koreanTitle,
    displayTitle: koreanTitle || originalTitle || '제목 없음',
    koreanDescription: '',
    displayDescription,
    koreanGenres,
    displayGenres: koreanGenres,
    koreanStatus: statusKoMap[anime.status] || anime.status || '',
    koreanSeason: seasonKoMap[anime.season] || anime.season || '',
    koreanFormat: formatKoMap[anime.format] || anime.format || '',
    isKoreanTranslated: false,
  };
}

module.exports = {
  genreKoMap,
  seasonKoMap,
  statusKoMap,
  formatKoMap,
  titleKoMap,
  stripHtmlTags,
  getBestOriginalTitle,
  getKoreanTitle,
  translateGenres,
  localizeAnime,
};
