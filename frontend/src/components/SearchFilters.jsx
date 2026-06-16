import { useLanguage } from '../context/LanguageContext';

const emptyFilters = {
  keyword: '',
  genre: '',
  year: '',
  season: '',
  format: '',
  status: '',
  sort: 'MOST_VIEWED',
  period: 'all',
};

const labelMap = {
  ko: {
    all: '전체',
    genre: {
      Action: '액션', Adventure: '모험', Comedy: '코미디', Drama: '드라마', Fantasy: '판타지', Romance: '로맨스',
      'Sci-Fi': 'SF', 'Slice of Life': '일상', Sports: '스포츠', Supernatural: '초자연',
    },
    season: { WINTER: '겨울', SPRING: '봄', SUMMER: '여름', FALL: '가을' },
    format: { TV: 'TV 애니메이션', TV_SHORT: '단편 TV', MOVIE: '극장판', SPECIAL: '스페셜', OVA: 'OVA', ONA: 'ONA', MUSIC: '뮤직' },
    status: { RELEASING: '방영 중', FINISHED: '완결', NOT_YET_RELEASED: '방영 예정' },
    periodLabel: '기간',
    period: {
      day: '오늘',
      week: '1주',
      month: '1달',
      year: '1년',
      all: '전체',
    },
    sort: {
      TOP_RATED: '높은 평점',
      MOST_VIEWED: '많이 본 작품',
      LATEST: '최신 작품',
      TITLE_ASC: '제목순',
    },
  },
  en: {
    all: 'All',
    genre: {
      Action: 'Action', Adventure: 'Adventure', Comedy: 'Comedy', Drama: 'Drama', Fantasy: 'Fantasy', Romance: 'Romance',
      'Sci-Fi': 'Sci-Fi', 'Slice of Life': 'Slice of Life', Sports: 'Sports', Supernatural: 'Supernatural',
    },
    season: { WINTER: 'Winter', SPRING: 'Spring', SUMMER: 'Summer', FALL: 'Fall' },
    format: { TV: 'TV', TV_SHORT: 'TV Short', MOVIE: 'Movie', SPECIAL: 'Special', OVA: 'OVA', ONA: 'ONA', MUSIC: 'Music' },
    status: { RELEASING: 'Airing', FINISHED: 'Finished', NOT_YET_RELEASED: 'Not yet released' },
    periodLabel: 'Period',
    period: {
      day: 'Today',
      week: '1 week',
      month: '1 month',
      year: '1 year',
      all: 'All time',
    },
    sort: {
      TOP_RATED: 'Top rated',
      MOST_VIEWED: 'Most viewed',
      LATEST: 'Latest',
      TITLE_ASC: 'Title',
    },
  },
  ja: {
    all: 'すべて',
    genre: {
      Action: 'アクション', Adventure: '冒険', Comedy: 'コメディ', Drama: 'ドラマ', Fantasy: 'ファンタジー', Romance: '恋愛',
      'Sci-Fi': 'SF', 'Slice of Life': '日常', Sports: 'スポーツ', Supernatural: '超自然',
    },
    season: { WINTER: '冬', SPRING: '春', SUMMER: '夏', FALL: '秋' },
    format: { TV: 'テレビアニメ', TV_SHORT: '短編テレビ', MOVIE: '劇場版', SPECIAL: 'スペシャル', OVA: 'OVA', ONA: 'ONA', MUSIC: '音楽' },
    status: { RELEASING: '放送中', FINISHED: '完結', NOT_YET_RELEASED: '放送予定' },
    periodLabel: '期間',
    period: {
      day: '今日',
      week: '1週間',
      month: '1か月',
      year: '1年',
      all: 'すべて',
    },
    sort: {
      TOP_RATED: '高評価',
      MOST_VIEWED: 'よく見られている作品',
      LATEST: '最新作品',
      TITLE_ASC: 'タイトル順',
    },
  },
};

const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural'];
const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
const formats = ['TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA', 'MUSIC'];
const statuses = ['RELEASING', 'FINISHED', 'NOT_YET_RELEASED'];
const sorts = ['TOP_RATED', 'MOST_VIEWED', 'LATEST', 'TITLE_ASC'];
const periods = ['day', 'week', 'month', 'year', 'all'];
const periodSorts = new Set(['TOP_RATED', 'SCORE_DESC', 'MOST_VIEWED', 'POPULARITY_DESC']);

function supportsPeriod(sort) {
  return periodSorts.has(String(sort || '').toUpperCase());
}

function SearchFilters({ filters, onChange, onSubmit, onReset }) {
  const { lang, t } = useLanguage();
  const dict = labelMap[lang] || labelMap.ko;
  const periodEnabled = supportsPeriod(filters.sort || 'MOST_VIEWED');

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange((prev) => {
      if (name === 'sort' && !supportsPeriod(value)) {
        return { ...prev, sort: value, period: 'all' };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleReset = () => {
    onChange(emptyFilters);
    onReset?.(emptyFilters);
  };

  return (
    <form
      className="search-filters"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label>
        {t('search')}
        <input
          name="keyword"
          value={filters.keyword || ''}
          onChange={handleChange}
          placeholder={t('searchPlaceholder')}
        />
      </label>

      <label>
        {t('genre')}
        <select name="genre" value={filters.genre || ''} onChange={handleChange}>
          <option value="">{dict.all}</option>
          {genres.map((value) => (
            <option key={value} value={value}>{dict.genre[value] || value}</option>
          ))}
        </select>
      </label>

      <label>
        {t('year')}
        <input
          name="year"
          type="number"
          min="1900"
          max="2100"
          value={filters.year || ''}
          onChange={handleChange}
          placeholder="YYYY"
        />
      </label>

      <label>
        {t('season')}
        <select name="season" value={filters.season || ''} onChange={handleChange}>
          <option value="">{dict.all}</option>
          {seasons.map((value) => (
            <option key={value} value={value}>{dict.season[value] || value}</option>
          ))}
        </select>
      </label>

      <label>
        {t('format')}
        <select name="format" value={filters.format || ''} onChange={handleChange}>
          <option value="">{dict.all}</option>
          {formats.map((value) => (
            <option key={value} value={value}>{dict.format[value] || value}</option>
          ))}
        </select>
      </label>

      <label>
        {t('status')}
        <select name="status" value={filters.status || ''} onChange={handleChange}>
          <option value="">{dict.all}</option>
          {statuses.map((value) => (
            <option key={value} value={value}>{dict.status[value] || value}</option>
          ))}
        </select>
      </label>

      <label>
        {t('sort')}
        <select name="sort" value={filters.sort || 'MOST_VIEWED'} onChange={handleChange}>
          {sorts.map((value) => (
            <option key={value} value={value}>{dict.sort[value] || value}</option>
          ))}
        </select>
      </label>

      <label className={periodEnabled ? '' : 'is-muted'}>
        {dict.periodLabel}
        <select
          name="period"
          value={periodEnabled ? filters.period || 'all' : 'all'}
          onChange={handleChange}
          disabled={!periodEnabled}
        >
          {periods.map((value) => (
            <option key={value} value={value}>{dict.period[value] || value}</option>
          ))}
        </select>
      </label>

      <div className="filter-actions">
        <button type="submit" className="button-primary">{t('search')}</button>
        <button type="button" className="button-secondary" onClick={handleReset}>{t('reset')}</button>
      </div>
    </form>
  );
}

export default SearchFilters;
