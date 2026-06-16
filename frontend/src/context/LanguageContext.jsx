import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANG_KEY = 'anipick_lang';
const supported = ['ko', 'en', 'ja'];

const messages = {
  ko: {
    home: '홈',
    browse: '탐색',
    myPage: '마이페이지',
    admin: '관리자',
    login: '로그인',
    logout: '로그아웃',
    register: '회원가입',
    search: '검색',
    reset: '초기화',
    title: '제목',
    genre: '장르',
    year: '연도',
    season: '시즌',
    format: '형식',
    status: '상태',
    sort: '정렬',
    period: '기간',
    topRatedMenu: '높은 평점',
    mostViewedMenu: '많이 본 작품',
    latestMenu: '최신 작품',
    periodDay: '오늘',
    periodWeek: '1주',
    periodMonth: '1달',
    periodYear: '1년',
    periodAll: '전체',
    score: '평점',
    scorePending: '평점 집계 전',
    popularity: '인기도',
    episodes: '에피소드 수',
    officialInfo: '공식 정보 보기',
    favorite: '찜하기',
    unfavorite: '찜 취소',
    watchStatus: '시청 상태',
    saveStatus: '상태 저장',
    descriptionNotReady: '한국어 줄거리가 준비 중입니다.',
    externalFallback: '외부 애니메이션 데이터 서버가 불안정하여 임시 데이터를 표시합니다.',
    retryGuide: '잠시 후 다시 시도하거나 검색 조건을 변경해 주세요.',
    trendingNow: '지금 인기 있는 애니',
    top10Now: '지금 뜨는 애니 TOP 10',
    popularSeason: '이번 시즌 인기작',
    topRated: '고평점 추천',
    quickSearch: '빠른 탐색',
    loading: '불러오는 중입니다...',
    noData: '표시할 데이터가 없습니다.',
    noResult: '검색 결과가 없습니다.',
    prev: '이전',
    next: '다음',
    page: '페이지',
    detail: '상세 보기',
    reviews: '리뷰',
    writeReview: '리뷰 작성',
    rating: '별점',
    content: '내용',
    submit: '등록',
    save: '저장',
    edit: '수정',
    delete: '삭제',
    noReviews: '리뷰가 없습니다.',
    recommendation: '맞춤 추천 애니메이션',
    favorites: '내 찜 목록',
    myReviews: '내 리뷰',
    watchGroups: '시청 상태',
    loginRequired: '로그인 후 찜/리뷰/시청상태 기능을 사용할 수 있습니다.',
    fallbackKoDescription: '한국어 줄거리가 준비 중입니다.',
    fallbackJaDescription: '日本語のあらすじは準備中です。',
    fallbackEnDescription: 'No description available.',
    romajiTitle: '로마자 제목',
    englishTitle: '영문 제목',
    nativeTitle: '원어 제목',
    similarAnime: '유사 작품 추천',
    noTitle: '제목 없음',
    profileHint: '찜 목록, 시청 상태, 리뷰와 맞춤 추천을 확인해 보세요.',
    animeBrowseTitle: '애니메이션 탐색',
    animeBrowseHint: '제목, 장르, 연도, 시즌, 형식, 상태로 원하는 작품을 찾아보세요.',
    searchPlaceholder: '애니메이션 제목 검색',
    loadingDetail: '상세 정보를 불러오는 중입니다...',
    notFoundAnime: '애니메이션 정보를 찾을 수 없습니다.',
    saveStatusSuccess: '시청 상태를 저장했습니다.',
    addFavoriteSuccess: '찜 목록에 추가했습니다.',
    removeFavoriteSuccess: '찜 목록에서 삭제했습니다.',
    aiAutoTranslated: 'AI 자동 번역이 적용된 설명입니다.',
    translationPending: '한국어 번역이 아직 준비되지 않았습니다.',
  },
  en: {
    home: 'Home', browse: 'Browse', myPage: 'My Page', admin: 'Admin', login: 'Login', logout: 'Logout', register: 'Register',
    search: 'Search', reset: 'Reset', title: 'Title', genre: 'Genre', year: 'Year', season: 'Season', format: 'Format', status: 'Status', sort: 'Sort',
    period: 'Period', topRatedMenu: 'Top rated', mostViewedMenu: 'Most viewed', latestMenu: 'Latest',
    periodDay: 'Today', periodWeek: '1 week', periodMonth: '1 month', periodYear: '1 year', periodAll: 'All time',
    score: 'Score', popularity: 'Popularity', episodes: 'Episodes', officialInfo: 'Official Info', favorite: 'Favorite', unfavorite: 'Unfavorite',
    scorePending: 'Not yet rated',
    watchStatus: 'Watch Status', saveStatus: 'Save Status', descriptionNotReady: 'No description available.',
    externalFallback: 'External anime data server is unstable. Showing temporary data.', retryGuide: 'Please try again later or change search filters.',
    trendingNow: 'Trending Now', top10Now: 'Top 10 Now', popularSeason: 'Popular This Season', topRated: 'Top Rated Picks', quickSearch: 'Quick Search',
    loading: 'Loading...', noData: 'No data available.', noResult: 'No results found.', prev: 'Prev', next: 'Next', page: 'Page', detail: 'View Detail',
    reviews: 'Reviews', writeReview: 'Write a Review', rating: 'Rating', content: 'Content', submit: 'Submit', save: 'Save', edit: 'Edit', delete: 'Delete',
    noReviews: 'No reviews yet.', recommendation: 'Personalized Recommendations', favorites: 'My Favorites', myReviews: 'My Reviews', watchGroups: 'Watch Status',
    loginRequired: 'Login required to use favorite/review/watch-status features.', fallbackKoDescription: 'No description available.',
    fallbackJaDescription: 'No description available.', fallbackEnDescription: 'No description available.', romajiTitle: 'Romaji Title', englishTitle: 'English Title',
    nativeTitle: 'Native Title', similarAnime: 'Similar Anime', noTitle: 'Untitled', profileHint: 'Check favorites, watch status, reviews, and recommendations.',
    animeBrowseTitle: 'Browse Anime', animeBrowseHint: 'Search by title, genre, year, season, format, and status.', searchPlaceholder: 'Search anime title',
    loadingDetail: 'Loading anime details...', notFoundAnime: 'Anime not found.', saveStatusSuccess: 'Watch status saved.',
    addFavoriteSuccess: 'Added to favorites.', removeFavoriteSuccess: 'Removed from favorites.',
    aiAutoTranslated: 'This description is AI auto-translated.',
    translationPending: 'No description available.',
  },
  ja: {
    home: 'ホーム', browse: '検索', myPage: 'マイページ', admin: '管理者', login: 'ログイン', logout: 'ログアウト', register: '新規登録',
    search: '検索', reset: 'リセット', title: 'タイトル', genre: 'ジャンル', year: '年', season: 'シーズン', format: '形式', status: '状態', sort: '並び替え',
    period: '期間', topRatedMenu: '高評価', mostViewedMenu: 'よく見られている作品', latestMenu: '最新作品',
    periodDay: '今日', periodWeek: '1週間', periodMonth: '1か月', periodYear: '1年', periodAll: 'すべて',
    score: '評価', popularity: '人気度', episodes: '話数', officialInfo: '公式情報を見る', favorite: 'お気に入り', unfavorite: 'お気に入り解除',
    scorePending: '評価集計前',
    watchStatus: '視聴状態', saveStatus: '状態を保存', descriptionNotReady: '日本語のあらすじは準備中です。',
    externalFallback: '外部アニメデータサーバーが不安定なため、一時データを表示しています。', retryGuide: 'しばらくしてから再試行するか、検索条件を変更してください。',
    trendingNow: '人気アニメ', top10Now: '今話題のアニメ TOP 10', popularSeason: '今シーズンの人気作', topRated: '高評価おすすめ', quickSearch: 'クイック検索', loading: '読み込み中です...',
    noData: '表示できるデータがありません。', noResult: '検索結果がありません。', prev: '前へ', next: '次へ', page: 'ページ', detail: '詳細を見る',
    reviews: 'レビュー', writeReview: 'レビュー作成', rating: '評価', content: '内容', submit: '投稿', save: '保存', edit: '編集', delete: '削除',
    noReviews: 'レビューがありません。', recommendation: 'おすすめアニメ', favorites: 'お気に入り一覧', myReviews: '自分のレビュー', watchGroups: '視聴状態',
    loginRequired: 'お気に入り・レビュー・視聴状態機能はログイン後に利用できます。', fallbackKoDescription: '日本語のあらすじは準備中です。',
    fallbackJaDescription: '日本語のあらすじは準備中です。', fallbackEnDescription: 'No description available.', romajiTitle: 'ローマ字タイトル',
    englishTitle: '英語タイトル', nativeTitle: '原題', similarAnime: '類似作品', noTitle: 'タイトルなし',
    profileHint: 'お気に入り、視聴状態、レビュー、おすすめを確認できます。', animeBrowseTitle: 'アニメ検索',
    animeBrowseHint: 'タイトル、ジャンル、年、シーズン、形式、状態で検索できます。', searchPlaceholder: 'アニメタイトルを検索',
    loadingDetail: '詳細情報を読み込み中です...', notFoundAnime: 'アニメ情報が見つかりません。',
    saveStatusSuccess: '視聴状態を保存しました。', addFavoriteSuccess: 'お気に入りに追加しました。', removeFavoriteSuccess: 'お気に入りから削除しました。',
    aiAutoTranslated: 'この説明はAI自動翻訳です。',
    translationPending: '日本語訳はまだ準備されていません。',
  },
};

const LanguageContext = createContext(null);

function normalizeLang(lang) {
  const value = String(lang || '').toLowerCase();
  if (!supported.includes(value)) return 'ko';
  return value;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => normalizeLang(localStorage.getItem(LANG_KEY) || 'ko'));

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const setLang = (nextLang) => {
    setLangState(normalizeLang(nextLang));
  };

  const t = (key) => messages[lang]?.[key] || messages.ko?.[key] || key;

  const value = useMemo(() => ({ lang, setLang, t, messages, supported }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}

export { LANG_KEY, normalizeLang };
