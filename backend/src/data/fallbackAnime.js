function poster(text, size = '300x420') {
  return `https://placehold.co/${size}/d9d9d9/333333?text=${text}`;
}

function makeAnime({
  id,
  romaji,
  english,
  native,
  genres,
  score,
  episodes,
  status,
  season,
  seasonYear,
  format,
}) {
  const text = encodeURIComponent(english || romaji || native || 'AniPick');
  return {
    id,
    title: {
      romaji: romaji || english || native,
      english: english || romaji || native,
      native: native || english || romaji,
    },
    coverImage: {
      extraLarge: poster(text, '300x420'),
      large: poster(text, '300x420'),
      medium: poster(text, '160x220'),
    },
    bannerImage: poster(text, '1200x360'),
    description: `${native || english || romaji} 작품의 기본 안내 정보입니다.`,
    genres,
    averageScore: score,
    meanScore: score,
    popularity: score ? score * 5000 : 100000,
    trending: score ? score * 80 : 2000,
    episodes,
    status,
    season,
    seasonYear,
    format,
    siteUrl: `https://anilist.co/anime/${id}`,
    studios: { nodes: [{ name: 'AniPick Studio' }] },
    isFallback: true,
  };
}

const FALLBACK_ANIME = [
  makeAnime({ id: 21, romaji: 'ONE PIECE', english: 'ONE PIECE', native: '원피스', genres: ['Action', 'Adventure', 'Comedy'], score: 89, episodes: 1100, status: 'RELEASING', season: 'FALL', seasonYear: 1999, format: 'TV' }),
  makeAnime({ id: 20, romaji: 'NARUTO', english: 'NARUTO', native: '나루토', genres: ['Action', 'Adventure'], score: 79, episodes: 220, status: 'FINISHED', season: 'FALL', seasonYear: 2002, format: 'TV' }),
  makeAnime({ id: 1735, romaji: 'Naruto: Shippuuden', english: 'Naruto Shippuden', native: '나루토 질풍전', genres: ['Action', 'Adventure'], score: 83, episodes: 500, status: 'FINISHED', season: 'WINTER', seasonYear: 2007, format: 'TV' }),
  makeAnime({ id: 269, romaji: 'BLEACH', english: 'BLEACH', native: '블리치', genres: ['Action', 'Supernatural'], score: 78, episodes: 366, status: 'FINISHED', season: 'FALL', seasonYear: 2004, format: 'TV' }),
  makeAnime({ id: 16498, romaji: 'Shingeki no Kyojin', english: 'Attack on Titan', native: '진격의 거인', genres: ['Action', 'Drama', 'Fantasy'], score: 86, episodes: 25, status: 'FINISHED', season: 'SPRING', seasonYear: 2013, format: 'TV' }),
  makeAnime({ id: 101922, romaji: 'Kimetsu no Yaiba', english: 'Demon Slayer', native: '귀멸의 칼날', genres: ['Action', 'Supernatural'], score: 84, episodes: 26, status: 'FINISHED', season: 'SPRING', seasonYear: 2019, format: 'TV' }),
  makeAnime({ id: 113415, romaji: 'Jujutsu Kaisen', english: 'Jujutsu Kaisen', native: '주술회전', genres: ['Action', 'Supernatural'], score: 85, episodes: 24, status: 'FINISHED', season: 'FALL', seasonYear: 2020, format: 'TV' }),
  makeAnime({ id: 1535, romaji: 'Death Note', english: 'Death Note', native: '데스노트', genres: ['Mystery', 'Psychological', 'Supernatural'], score: 84, episodes: 37, status: 'FINISHED', season: 'FALL', seasonYear: 2006, format: 'TV' }),
  makeAnime({ id: 5114, romaji: 'Fullmetal Alchemist: Brotherhood', english: 'Fullmetal Alchemist: Brotherhood', native: '강철의 연금술사 BROTHERHOOD', genres: ['Action', 'Adventure', 'Drama'], score: 90, episodes: 64, status: 'FINISHED', season: 'SPRING', seasonYear: 2009, format: 'TV' }),
  makeAnime({ id: 11061, romaji: 'Hunter x Hunter (2011)', english: 'Hunter x Hunter', native: '헌터×헌터', genres: ['Action', 'Adventure', 'Fantasy'], score: 89, episodes: 148, status: 'FINISHED', season: 'FALL', seasonYear: 2011, format: 'TV' }),
  makeAnime({ id: 30276, romaji: 'One Punch Man', english: 'One Punch Man', native: '원펀맨', genres: ['Action', 'Comedy', 'Sci-Fi'], score: 85, episodes: 12, status: 'FINISHED', season: 'FALL', seasonYear: 2015, format: 'TV' }),
  makeAnime({ id: 22319, romaji: 'Tokyo Ghoul', english: 'Tokyo Ghoul', native: '도쿄 구울', genres: ['Action', 'Horror', 'Mystery'], score: 77, episodes: 12, status: 'FINISHED', season: 'SUMMER', seasonYear: 2014, format: 'TV' }),
  makeAnime({ id: 20583, romaji: 'Haikyuu!!', english: 'Haikyu!!', native: '하이큐', genres: ['Sports', 'Comedy', 'Drama'], score: 87, episodes: 25, status: 'FINISHED', season: 'SPRING', seasonYear: 2014, format: 'TV' }),
  makeAnime({ id: 129874, romaji: 'SPY x FAMILY', english: 'SPY x FAMILY', native: '스파이 패밀리', genres: ['Action', 'Comedy', 'Slice of Life'], score: 82, episodes: 12, status: 'FINISHED', season: 'SPRING', seasonYear: 2022, format: 'TV' }),
  makeAnime({ id: 127230, romaji: 'Chainsaw Man', english: 'Chainsaw Man', native: '체인소 맨', genres: ['Action', 'Horror', 'Supernatural'], score: 84, episodes: 12, status: 'FINISHED', season: 'FALL', seasonYear: 2022, format: 'TV' }),
  makeAnime({ id: 150672, romaji: 'Oshi no Ko', english: 'Oshi no Ko', native: '최애의 아이', genres: ['Drama', 'Mystery'], score: 84, episodes: 11, status: 'FINISHED', season: 'SPRING', seasonYear: 2023, format: 'TV' }),
  makeAnime({ id: 21827, romaji: 'Violet Evergarden', english: 'Violet Evergarden', native: '바이올렛 에버가든', genres: ['Drama', 'Fantasy', 'Slice of Life'], score: 86, episodes: 13, status: 'FINISHED', season: 'WINTER', seasonYear: 2018, format: 'TV' }),
  makeAnime({ id: 11757, romaji: 'Sword Art Online', english: 'Sword Art Online', native: '소드 아트 온라인', genres: ['Action', 'Adventure', 'Fantasy'], score: 75, episodes: 25, status: 'FINISHED', season: 'SUMMER', seasonYear: 2012, format: 'TV' }),
  makeAnime({ id: 1575, romaji: 'Code Geass', english: 'Code Geass', native: '코드 기아스', genres: ['Action', 'Drama', 'Mecha'], score: 87, episodes: 25, status: 'FINISHED', season: 'FALL', seasonYear: 2006, format: 'TV' }),
  makeAnime({ id: 9253, romaji: 'Steins;Gate', english: 'Steins;Gate', native: '슈타인즈 게이트', genres: ['Drama', 'Sci-Fi', 'Thriller'], score: 89, episodes: 24, status: 'FINISHED', season: 'SPRING', seasonYear: 2011, format: 'TV' }),
  makeAnime({ id: 97940, romaji: 'Black Clover', english: 'Black Clover', native: '블랙 클로버', genres: ['Action', 'Comedy', 'Fantasy'], score: 77, episodes: 170, status: 'FINISHED', season: 'FALL', seasonYear: 2017, format: 'TV' }),
  makeAnime({ id: 10087, romaji: 'Fate/Zero', english: 'Fate/Zero', native: '페이트/제로', genres: ['Action', 'Fantasy', 'Supernatural'], score: 84, episodes: 13, status: 'FINISHED', season: 'FALL', seasonYear: 2011, format: 'TV' }),
  makeAnime({ id: 30, romaji: 'Shinseiki Evangelion', english: 'Neon Genesis Evangelion', native: '신세기 에반게리온', genres: ['Action', 'Drama', 'Mecha'], score: 83, episodes: 26, status: 'FINISHED', season: 'FALL', seasonYear: 1995, format: 'TV' }),
  makeAnime({ id: 2251, romaji: 'Kiseijuu: Sei no Kakuritsu', english: 'Parasyte', native: '기생수', genres: ['Action', 'Drama', 'Horror'], score: 83, episodes: 24, status: 'FINISHED', season: 'FALL', seasonYear: 2014, format: 'TV' }),
  makeAnime({ id: 101759, romaji: 'Yakusoku no Neverland', english: 'The Promised Neverland', native: '약속의 네버랜드', genres: ['Drama', 'Fantasy', 'Mystery'], score: 82, episodes: 12, status: 'FINISHED', season: 'WINTER', seasonYear: 2019, format: 'TV' }),
  makeAnime({ id: 154587, romaji: 'Sousou no Frieren', english: 'Frieren: Beyond Journey`s End', native: '장송의 프리렌', genres: ['Adventure', 'Drama', 'Fantasy'], score: 90, episodes: 28, status: 'FINISHED', season: 'FALL', seasonYear: 2023, format: 'TV' }),
  makeAnime({ id: 137822, romaji: 'Blue Lock', english: 'Blue Lock', native: '블루 록', genres: ['Sports', 'Drama'], score: 82, episodes: 24, status: 'FINISHED', season: 'FALL', seasonYear: 2022, format: 'TV' }),
  makeAnime({ id: 97938, romaji: 'Boruto', english: 'Boruto: Naruto Next Generations', native: '보루토', genres: ['Action', 'Adventure'], score: 68, episodes: 293, status: 'FINISHED', season: 'SPRING', seasonYear: 2017, format: 'TV' }),
  makeAnime({ id: 223, romaji: 'Dragon Ball', english: 'Dragon Ball', native: '드래곤볼', genres: ['Action', 'Adventure', 'Comedy'], score: 79, episodes: 153, status: 'FINISHED', season: 'WINTER', seasonYear: 1986, format: 'TV' }),
  makeAnime({ id: 235, romaji: 'Detective Conan', english: 'Case Closed', native: '명탐정 코난', genres: ['Mystery', 'Comedy'], score: 82, episodes: 1100, status: 'RELEASING', season: 'WINTER', seasonYear: 1996, format: 'TV' }),
  makeAnime({ id: 1, romaji: 'Cowboy Bebop', english: 'Cowboy Bebop', native: '카우보이 비밥', genres: ['Action', 'Drama', 'Sci-Fi'], score: 86, episodes: 26, status: 'FINISHED', season: 'SPRING', seasonYear: 1998, format: 'TV' }),
  makeAnime({ id: 6547, romaji: 'Angel Beats!', english: 'Angel Beats!', native: 'Angel Beats!', genres: ['Action', 'Drama', 'Supernatural'], score: 78, episodes: 13, status: 'FINISHED', season: 'SPRING', seasonYear: 2010, format: 'TV' }),
];

module.exports = { FALLBACK_ANIME };
