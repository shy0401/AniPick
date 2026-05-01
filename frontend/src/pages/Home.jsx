import { useEffect, useMemo, useState } from 'react';

import { animeApi } from '../api/animeApi';
import { normalizeAnimeRouteFields } from '../utils/animeRoute';
import TopTenAnimeRail from '../components/home/TopTenAnimeRail';
import HorizontalAnimeRail from '../components/home/HorizontalAnimeRail';
import AnimePosterCard from '../components/home/AnimePosterCard';
import '../styles/homeRails.css';

function isBlockedAnimeClientSide(anime) {
  const genres = Array.isArray(anime?.genres) ? anime.genres : [];
  const text = [
    anime?.displayTitle,
    anime?.title,
    anime?.romajiTitle,
    anime?.englishTitle,
    anime?.nativeTitle,
    anime?.description,
    anime?.format,
    anime?.status,
    ...genres,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return (
    text.includes('hentai') ||
    text.includes('erotica') ||
    text.includes('rx - hentai')
  );
}

function getItemsFromResponse(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

function hasImage(anime) {
  return Boolean(
    anime?.imageUrl ||
      anime?.animeImage ||
      anime?.coverImage?.extraLarge ||
      anime?.coverImage?.large ||
      anime?.coverImage?.medium
  );
}

function getScore(anime) {
  const value = Number(anime?.averageScore ?? anime?.meanScore ?? anime?.score ?? 0);
  return Number.isFinite(value) ? value : 0;
}

function normalizeHomeAnimeItem(anime) {
  return normalizeAnimeRouteFields(anime);
}

function dedupeByRouteId(items) {
  const seen = new Set();
  const result = [];

  for (const item of items) {
    const key = item?.routeId || item?.externalId || item?.malId || item?.id;
    if (!key) {
      result.push(item);
      continue;
    }

    if (seen.has(String(key))) continue;
    seen.add(String(key));
    result.push(item);
  }

  return result;
}

function sortQualityFirst(items) {
  return [...items].sort((a, b) => {
    const aImage = hasImage(a) ? 1 : 0;
    const bImage = hasImage(b) ? 1 : 0;

    if (aImage !== bImage) return bImage - aImage;

    return getScore(b) - getScore(a);
  });
}

function prepareItems(items, limit = 20) {
  return dedupeByRouteId(
    sortQualityFirst(
      getItemsFromResponse(items)
        .map(normalizeHomeAnimeItem)
        .filter((anime) => !isBlockedAnimeClientSide(anime))
    )
  ).slice(0, limit);
}

async function loadHomeData() {
  const calls = [];

  if (typeof animeApi.getTrending === 'function') {
    calls.push(['trending', animeApi.getTrending({ page: 1, perPage: 30 })]);
  }

  if (typeof animeApi.getPopularSeason === 'function') {
    calls.push(['season', animeApi.getPopularSeason({ page: 1, perPage: 30 })]);
  } else if (typeof animeApi.getPopularThisSeason === 'function') {
    calls.push(['season', animeApi.getPopularThisSeason({ page: 1, perPage: 30 })]);
  }

  if (typeof animeApi.searchAnime === 'function') {
    calls.push(['topRated', animeApi.searchAnime({ page: 1, perPage: 30, sort: 'SCORE_DESC' })]);
  }

  const settled = await Promise.allSettled(calls.map(([, promise]) => promise));
  const result = {
    trending: [],
    season: [],
    topRated: [],
    failedCount: 0,
  };

  settled.forEach((item, index) => {
    const key = calls[index][0];

    if (item.status === 'fulfilled') {
      result[key] = getItemsFromResponse(item.value);
    } else {
      result.failedCount += 1;
      console.warn(`[AniPick] home ${key} load failed`, item.reason);
    }
  });

  return result;
}

export default function Home() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [seasonItems, setSeasonItems] = useState([]);
  const [topRatedItems, setTopRatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let ignore = false;

    async function run() {
      setLoading(true);
      setMessage('');

      const data = await loadHomeData();

      if (ignore) return;

      setTrendingItems(prepareItems(data.trending, 30));
      setSeasonItems(prepareItems(data.season, 30));
      setTopRatedItems(prepareItems(data.topRated, 30));

      if (data.failedCount > 0) {
        setMessage('일부 애니메이션 정보를 불러오지 못했습니다.');
      }

      setLoading(false);
    }

    run();

    return () => {
      ignore = true;
    };
  }, []);

  const topTen = useMemo(() => trendingItems.slice(0, 10), [trendingItems]);
  const popular = useMemo(() => trendingItems.slice(0, 24), [trendingItems]);
  const season = useMemo(() => seasonItems.slice(0, 24), [seasonItems]);
  const topRated = useMemo(() => topRatedItems.slice(0, 24), [topRatedItems]);

  if (loading) {
    return (
      <main className="home-page">
        <section className="anime-rail-section">
          <div className="anime-rail-header">
            <h2>불러오는 중...</h2>
          </div>
          <div className="anime-rail-shell">
            <div className="anime-rail-viewport">
              <div className="anime-rail-track">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="anime-poster-card skeleton-card" />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="home-page">
      {message ? <p className="home-message">{message}</p> : null}

      <TopTenAnimeRail title="지금 뜨는 애니 TOP 10" items={topTen} />

      <HorizontalAnimeRail title="지금 인기 있는 애니" items={popular} />

      <HorizontalAnimeRail title="이번 시즌 인기작" items={season} />

      <HorizontalAnimeRail
        title="고평점 추천"
        items={topRated}
        renderItem={(anime, index) => (
          <AnimePosterCard
            key={anime.routeId || anime.externalId || anime.malId || anime.id || index}
            anime={anime}
          />
        )}
      />
    </main>
  );
}
