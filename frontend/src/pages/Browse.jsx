import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import AnimeCard from '../components/AnimeCard';
import { animeApi } from '../api/animeApi';
import { toUserErrorMessage } from '../utils/error';
import { useLanguage } from '../context/LanguageContext';
import { isBlockedAnimeClientSide } from '../utils/contentSafety';

const emptyFilters = {
  keyword: '',
  genre: '',
  year: '',
  season: '',
  format: '',
  status: '',
  sort: 'POPULARITY_DESC',
};

function normalizeBrowseAnimeItem(anime) {
  const rawExternalId =
    anime?.routeId ??
    anime?.externalId ??
    anime?.malId ??
    anime?.animeExternalId ??
    anime?.animeIdExternal ??
    anime?.sourcePayload?.mal_id ??
    null;

  if (rawExternalId == null && anime?.id != null) {
    console.warn('[AniPick] route id missing; refusing to use internal id fallback', anime);
  }

  const numericExternalId = Number(rawExternalId);
  const normalizedRouteId =
    Number.isInteger(numericExternalId) && numericExternalId > 0 ? numericExternalId : null;

  const numericMalId = Number(anime?.malId ?? normalizedRouteId);
  const normalizedMalId = Number.isInteger(numericMalId) && numericMalId > 0 ? numericMalId : null;

  const normalizedAnime = {
    ...anime,
    externalId: normalizedRouteId,
    malId: normalizedMalId,
    routeId: normalizedRouteId,
  };

  if (!normalizedAnime.routeId && !normalizedAnime.externalId && !normalizedAnime.malId) {
    console.warn('[AniPick] missing route id in browse item', anime);
  }

  return normalizedAnime;
}

function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, lang } = useLanguage();
  const queryString = searchParams.toString();

  const initialFilters = useMemo(
    () => ({
      keyword: searchParams.get('keyword') || '',
      genre: searchParams.get('genre') || '',
      year: searchParams.get('year') || '',
      season: searchParams.get('season') || '',
      format: searchParams.get('format') || '',
      status: searchParams.get('status') || '',
      sort: searchParams.get('sort') || 'POPULARITY_DESC',
    }),
    [queryString, searchParams]
  );
  const initialPage = useMemo(() => Number(searchParams.get('page')) || 1, [queryString, searchParams]);

  const [filters, setFilters] = useState(initialFilters);
  const [submittedFilters, setSubmittedFilters] = useState(initialFilters);
  const [page, setPage] = useState(initialPage);
  const [result, setResult] = useState({ pageInfo: null, items: [] });
  const [fallbackMessage, setFallbackMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFilters(initialFilters);
    setSubmittedFilters(initialFilters);
    setPage(initialPage);
  }, [initialFilters, initialPage]);

  useEffect(() => {
    async function runSearch() {
      setLoading(true);
      setError('');

      try {
        const data = await animeApi.searchAnime({
          ...submittedFilters,
          page,
          perPage: 18,
        });
        const safeItems = (data.items || [])
          .filter((anime) => !isBlockedAnimeClientSide(anime))
          .map(normalizeBrowseAnimeItem);
        setResult({
          ...data,
          items: safeItems,
          pageInfo: data.pageInfo
            ? {
                ...data.pageInfo,
                total: Math.max(safeItems.length, data.pageInfo.total || 0),
              }
            : data.pageInfo,
        });
        setFallbackMessage(data?.isFallback ? t('externalFallback') : '');
      } catch (err) {
        setError(toUserErrorMessage(err, `${t('externalFallback')} ${t('retryGuide')}`));
      } finally {
        setLoading(false);
      }
    }

    runSearch();
  }, [submittedFilters, page, lang, t]);

  const writeParams = (nextFilters, nextPage) => {
    const next = new URLSearchParams();
    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value) next.set(key, value);
    });
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  const submitSearch = () => {
    setSubmittedFilters(filters);
    setPage(1);
    writeParams(filters, 1);
  };

  const resetSearch = () => {
    setFilters(emptyFilters);
    setSubmittedFilters(emptyFilters);
    setPage(1);
    writeParams(emptyFilters, 1);
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1) return;
    if (result.pageInfo && nextPage > result.pageInfo.lastPage) return;

    setPage(nextPage);
    writeParams(submittedFilters, nextPage);
  };

  return (
    <div className="page-wrap">
      <div className="page-heading">
        <h1>{t('animeBrowseTitle')}</h1>
        <p>{t('animeBrowseHint')}</p>
      </div>

      <SearchFilters filters={filters} onChange={setFilters} onSubmit={submitSearch} onReset={resetSearch} />

      {loading && <p className="page-message">{t('loading')}</p>}
      {error && <p className="page-error">{error}</p>}
      {!loading && !error && fallbackMessage && <p className="page-message">{fallbackMessage}</p>}

      {!loading && !error && (
        <>
          {result.items.length === 0 ? (
            <div className="empty-state">
              <h2>{t('noResult')}</h2>
              <p>{t('retryGuide')}</p>
            </div>
          ) : (
            <div className="anime-grid">
              {result.items.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} hideIfNoImage={false} />
              ))}
            </div>
          )}

          <div className="pagination">
            <button type="button" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
              {t('prev')}
            </button>
            <span>
              {t('page')} {result.pageInfo?.currentPage || page} / {result.pageInfo?.lastPage || page}
            </span>
            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              disabled={Boolean(result.pageInfo && !result.pageInfo.hasNextPage)}
            >
              {t('next')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Browse;
