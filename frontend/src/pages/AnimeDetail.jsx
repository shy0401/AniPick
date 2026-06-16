import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { animeApi } from '../api/animeApi';
import { favoriteApi } from '../api/favoriteApi';
import { reviewApi } from '../api/reviewApi';
import { watchStatusApi } from '../api/watchStatusApi';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import AnimeCard from '../components/AnimeCard';
import HeroMedia from '../components/HeroMedia';
import GlassBadge from '../components/GlassBadge';
import { useAuth } from '../context/AuthContext';
import { getAnimeBanner, getAnimePoster, PLACEHOLDER_BANNER, PLACEHOLDER_POSTER } from '../utils/image';
import { toUserErrorMessage } from '../utils/error';
import { useLanguage } from '../context/LanguageContext';
import { getSafeAnimeTitle } from '../utils/title';
import { formatAnimeScore } from '../utils/score';
import { getAnimeRouteId } from '../utils/animeRoute';

function getWatchStatusOptions(lang) {
  if (lang === 'en') {
    return [
      { value: 'PLAN_TO_WATCH', label: 'Plan to Watch' },
      { value: 'WATCHING', label: 'Watching' },
      { value: 'COMPLETED', label: 'Completed' },
      { value: 'DROPPED', label: 'Dropped' },
    ];
  }

  if (lang === 'ja') {
    return [
      { value: 'PLAN_TO_WATCH', label: '視聴予定' },
      { value: 'WATCHING', label: '視聴中' },
      { value: 'COMPLETED', label: '視聴完了' },
      { value: 'DROPPED', label: '中断' },
    ];
  }

  return [
    { value: 'PLAN_TO_WATCH', label: '볼 예정' },
    { value: 'WATCHING', label: '보는 중' },
    { value: 'COMPLETED', label: '시청 완료' },
    { value: 'DROPPED', label: '중단' },
  ];
}

function AnimeDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { t, lang } = useLanguage();

  const [anime, setAnime] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [watchStatus, setWatchStatus] = useState('PLAN_TO_WATCH');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const watchStatusOptions = useMemo(() => getWatchStatusOptions(lang), [lang]);

  const displayTitle = useMemo(() => getSafeAnimeTitle(anime, lang, t('noTitle')), [anime, lang, t]);
  const externalAnimeId = useMemo(() => getAnimeRouteId(anime) || Number(id), [anime, id]);

  const poster = getAnimePoster(anime) || PLACEHOLDER_POSTER;
  const banner = getAnimeBanner(anime) || PLACEHOLDER_BANNER;
  const displayGenres = anime?.displayGenres || anime?.genres || [];
  const displayStatus = anime?.displayStatus || anime?.status || '-';
  const displaySeason = anime?.displaySeason || anime?.season || '-';
  const displayFormat = anime?.displayFormat || anime?.format || '-';
  const displayDescription = anime?.displayDescription || t('descriptionNotReady');
  const translationStatus = anime?.translationStatus || '';
  const scoreLabel = formatAnimeScore(anime, lang);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError('');
      setActionMessage('');

      try {
        const [animeData, reviewData] = await Promise.all([
          animeApi.getAnimeDetail(id),
          reviewApi.getReviewsByAnime(id),
        ]);

        setAnime(animeData);
        setReviews(reviewData);

        if (isAuthenticated) {
          const [favoriteState, watchList] = await Promise.all([
            favoriteApi.checkFavorite(id),
            watchStatusApi.getMyWatchStatus(),
          ]);
          setIsFavorite(Boolean(favoriteState.isFavorite));
          const matched = watchList.find((item) => item.animeId === externalAnimeId);
          setWatchStatus(matched?.status || 'PLAN_TO_WATCH');
        }
      } catch (err) {
        setError(toUserErrorMessage(err, `${t('externalFallback')} ${t('retryGuide')}`));
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [id, isAuthenticated, lang, t, externalAnimeId]);

  const refreshReviews = async () => {
    const reviewData = await reviewApi.getReviewsByAnime(id);
    setReviews(reviewData);
  };

  const handleToggleFavorite = async () => {
    try {
      if (!anime) return;
      const safeTitle = getSafeAnimeTitle(anime, lang, `애니메이션 #${anime.id}`);
      if (safeTitle === '한국어 제목 준비 중' || safeTitle === '제목 준비 중') {
        throw new Error('Invalid anime title');
      }

      if (isFavorite) {
        await favoriteApi.removeFavorite(externalAnimeId);
        setIsFavorite(false);
        setActionMessage(t('removeFavoriteSuccess'));
      } else {
        await favoriteApi.addFavorite({
          animeId: externalAnimeId,
          animeTitle: safeTitle,
          animeImage: poster === PLACEHOLDER_POSTER ? null : poster,
        });
        setIsFavorite(true);
        setActionMessage(t('addFavoriteSuccess'));
      }
    } catch (err) {
      setActionMessage(toUserErrorMessage(err));
    }
  };

  const handleSaveWatchStatus = async () => {
    try {
      const safeTitle = getSafeAnimeTitle(anime, lang, `애니메이션 #${anime.id}`);
      if (safeTitle === '한국어 제목 준비 중' || safeTitle === '제목 준비 중') {
        throw new Error('Invalid anime title');
      }

      await watchStatusApi.upsertWatchStatus({
        animeId: externalAnimeId,
        animeTitle: safeTitle,
        animeImage: poster === PLACEHOLDER_POSTER ? null : poster,
        status: watchStatus,
      });
      setActionMessage(t('saveStatusSuccess'));
    } catch (err) {
      setActionMessage(toUserErrorMessage(err));
    }
  };

  const handleCreateReview = async (payload) => {
    await reviewApi.createReview(payload);
    await refreshReviews();
    setActionMessage(t('submit'));
  };

  const handleEditReview = async (review) => {
    const nextRating = window.prompt(`${t('rating')} (1-5)`, String(review.rating));
    if (!nextRating) return;
    const nextContent = window.prompt(t('content'), review.content);
    if (!nextContent) return;

    await reviewApi.updateReview(review.id, {
      rating: Number(nextRating),
      content: nextContent,
    });
    await refreshReviews();
    setActionMessage(t('edit'));
  };

  const handleDeleteReview = async (reviewId) => {
    await reviewApi.deleteReview(reviewId);
    await refreshReviews();
    setActionMessage(t('delete'));
  };

  const handlePosterError = (event) => {
    if (event.currentTarget.src !== PLACEHOLDER_POSTER) {
      event.currentTarget.src = PLACEHOLDER_POSTER;
    }
  };

  if (loading) return <p className="page-message">{t('loadingDetail')}</p>;
  if (error) return <p className="page-error">{error}</p>;
  if (!anime) return <p className="page-message">{t('notFoundAnime')}</p>;

  return (
    <div className="page-wrap">
      {anime?.isFallback && <p className="page-message">{t('externalFallback')}</p>}

      <HeroMedia imageUrl={banner} fallbackImageUrl={poster} alt={`${displayTitle} banner`} variant="detail" />

      <section className="detail-hero">
        <div className="detail-main">
          <div className="detail-poster-shell">
            <img className="detail-cover" src={poster} alt={displayTitle} onError={handlePosterError} />
          </div>

          <div className="detail-info">
            <h1>{displayTitle}</h1>
            <div className="detail-badge-row">
              <GlassBadge tone="accent">{displayFormat}</GlassBadge>
              <GlassBadge>{displayStatus}</GlassBadge>
              {translationStatus && <GlassBadge tone={translationStatus === 'FAILED' ? 'danger' : 'muted'}>{translationStatus}</GlassBadge>}
            </div>

            {lang === 'en' && (
              <>
                <p><strong>{t('romajiTitle')}:</strong> {anime.title?.romaji || '-'}</p>
                <p><strong>{t('nativeTitle')}:</strong> {anime.title?.native || '-'}</p>
              </>
            )}

            <p className="description">{displayDescription || t('descriptionNotReady')}</p>
            {anime?.translationStatus === 'AUTO' && (
              <p className="muted">{t('aiAutoTranslated')}</p>
            )}
            {translationStatus === 'FAILED' && lang === 'ko' && (
              <p className="muted">한국어 번역 생성에 실패했습니다. 관리자 페이지에서 모델 권한을 확인해 주세요.</p>
            )}
            {translationStatus === 'FAILED' && lang === 'ja' && (
              <p className="muted">日本語訳の生成に失敗しました。管理画面でモデル権限を確認してください。</p>
            )}
            {translationStatus !== 'FAILED' && !anime?.isTranslated && (lang === 'ko' || lang === 'ja') && (
              <p className="muted">{t('translationPending')}</p>
            )}

            <div className="detail-meta-grid">
              <p><strong>{t('genre')}:</strong> {displayGenres.join(', ') || '-'}</p>
              <p><strong>{t('score')}:</strong> {scoreLabel}</p>
              <p><strong>{t('popularity')}:</strong> {anime.popularity || '-'}</p>
              <p><strong>{t('episodes')}:</strong> {anime.episodes || '-'}</p>
              <p><strong>{t('status')}:</strong> {displayStatus}</p>
              <p><strong>{t('season')}:</strong> {displaySeason} {anime.seasonYear || ''}</p>
              <p><strong>{t('format')}:</strong> {displayFormat}</p>
              <p><strong>Studio:</strong> {(anime.studios?.nodes || []).map((node) => node.name).join(', ') || '-'}</p>
            </div>

            <div className="detail-actions">
              <a href={anime.siteUrl} target="_blank" rel="noreferrer" className="button-primary">
                {t('officialInfo')}
              </a>
              {isAuthenticated && (
                <button type="button" className="button-secondary" onClick={handleToggleFavorite}>
                  {isFavorite ? t('unfavorite') : t('favorite')}
                </button>
              )}
            </div>

            {isAuthenticated ? (
              <div className="watch-status-box">
                <label>
                  {t('watchStatus')}
                  <select value={watchStatus} onChange={(event) => setWatchStatus(event.target.value)}>
                    {watchStatusOptions.map((status) => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </label>
                <button type="button" className="button-primary" onClick={handleSaveWatchStatus}>
                  {t('saveStatus')}
                </button>
              </div>
            ) : (
              <p className="muted auth-hint">
                {t('loginRequired')} <Link to="/login">{t('login')}</Link>
              </p>
            )}

            {actionMessage && <p className="page-message">{actionMessage}</p>}
          </div>
        </div>
      </section>

      {anime?.similarItems?.length > 0 && (
        <section className="anime-section">
          <h2>{t('similarAnime')}</h2>
          <div className="anime-grid">
            {anime.similarItems.map((item) => (
              <AnimeCard
                key={`${item.externalId || item.malId || item.id}-${item.provider || 'JIKAN'}`}
                anime={item}
                hideIfNoImage={false}
              />
            ))}
          </div>
        </section>
      )}

      <section className="anime-section">
        <h2>{t('reviews')}</h2>
        {isAuthenticated ? (
          <ReviewForm animeId={externalAnimeId} onSubmit={handleCreateReview} />
        ) : (
          <p className="muted">{t('loginRequired')}</p>
        )}
        <ReviewList reviews={reviews} currentUser={user} onEdit={handleEditReview} onDelete={handleDeleteReview} />
      </section>
    </div>
  );
}

export default AnimeDetail;
