import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import { favoriteApi } from '../api/favoriteApi';
import { watchStatusApi } from '../api/watchStatusApi';
import { animeApi } from '../api/animeApi';
import { reviewApi } from '../api/reviewApi';
import { getAnimePoster, PLACEHOLDER_POSTER } from '../utils/image';
import { toUserErrorMessage } from '../utils/error';
import { useLanguage } from '../context/LanguageContext';
import { getSafeAnimeTitle } from '../utils/title';

function getWatchStatusLabelMap(lang) {
  if (lang === 'en') {
    return {
      PLAN_TO_WATCH: 'Plan to Watch',
      WATCHING: 'Watching',
      COMPLETED: 'Completed',
      DROPPED: 'Dropped',
    };
  }

  if (lang === 'ja') {
    return {
      PLAN_TO_WATCH: '視聴予定',
      WATCHING: '視聴中',
      COMPLETED: '視聴完了',
      DROPPED: '中断',
    };
  }

  return {
    PLAN_TO_WATCH: '볼 예정',
    WATCHING: '보는 중',
    COMPLETED: '시청 완료',
    DROPPED: '중단',
  };
}

function StoredAnimeCard({ item, onDelete, deleteLabel, noTitleText, lang }) {
  const title = getSafeAnimeTitle(
    {
      displayTitle: item.animeTitleDisplay,
      animeTitle: item.animeTitle,
      animeId: item.animeId,
    },
    lang,
    `애니메이션 #${item.animeId || ''}`.trim() || noTitleText
  );
  const sourcePoster = getAnimePoster({ ...item, animeImage: item.animeImageDisplay || item.animeImage });
  if (!sourcePoster) return null;
  const poster = sourcePoster || PLACEHOLDER_POSTER;

  const handleImageError = (event) => {
    if (event.currentTarget.src !== PLACEHOLDER_POSTER) {
      event.currentTarget.src = PLACEHOLDER_POSTER;
    }
  };

  return (
    <article className="anime-card compact">
      <Link to={`/anime/${item.animeId}`}>
        <div className="anime-card-image-wrap">
          <img
            className="anime-card-image"
            src={poster}
            alt={title}
            loading="lazy"
            onError={handleImageError}
          />
        </div>
      </Link>
      <div className="anime-card-body">
        <h3 className="anime-card-title">{title}</h3>
        {item.status && <p className="anime-meta">{item.statusLabel || item.status}</p>}
        {onDelete && (
          <button type="button" className="button-small" onClick={() => onDelete(item.animeId)}>
            {deleteLabel}
          </button>
        )}
      </div>
    </article>
  );
}

function MyPage() {
  const { t, lang } = useLanguage();
  const watchStatusLabel = useMemo(() => getWatchStatusLabelMap(lang), [lang]);

  const [favorites, setFavorites] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [recommendation, setRecommendation] = useState({ type: '', genre: '', reason: '', items: [] });
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchMyData = async () => {
    setLoading(true);
    setError('');

    try {
      const [favData, watchData, recData, reviewData] = await Promise.all([
        favoriteApi.getFavorites(),
        watchStatusApi.getMyWatchStatus(),
        animeApi.getRecommendations({ perPage: 12 }),
        reviewApi.getMyReviews(),
      ]);

      setFavorites(favData.map((item) => ({ ...item, statusLabel: '' })));
      setWatchList(watchData.map((item) => ({ ...item, statusLabel: watchStatusLabel[item.status] || item.status })));
      setRecommendation(recData);
      setMyReviews(reviewData);
    } catch (err) {
      setError(toUserErrorMessage(err, `${t('externalFallback')} ${t('retryGuide')}`));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, [lang]);

  const groupedWatchStatus = useMemo(() => {
    const groups = {
      PLAN_TO_WATCH: [],
      WATCHING: [],
      COMPLETED: [],
      DROPPED: [],
    };

    watchList.forEach((item) => {
      groups[item.status]?.push(item);
    });
    return groups;
  }, [watchList]);

  const handleRemoveFavorite = async (animeId) => {
    await favoriteApi.removeFavorite(animeId);
    setFavorites((prev) => prev.filter((item) => item.animeId !== animeId));
    setMessage(t('removeFavoriteSuccess'));
  };

  const handleRemoveWatchStatus = async (animeId) => {
    await watchStatusApi.removeWatchStatus(animeId);
    setWatchList((prev) => prev.filter((item) => item.animeId !== animeId));
    setMessage(t('delete'));
  };

  if (loading) return <p className="page-message">{t('loading')}</p>;
  if (error) return <p className="page-error">{error}</p>;

  return (
    <div className="page-wrap">
      <div className="page-heading">
        <h1>{t('myPage')}</h1>
        <p>{t('profileHint')}</p>
      </div>

      {message && <p className="page-message">{message}</p>}

      <section className="anime-section">
        <h2>{t('favorites')}</h2>
        {!favorites.length && <p className="muted">{t('noData')}</p>}
        <div className="anime-grid">
          {favorites.map((fav) => (
            <StoredAnimeCard
              key={fav.id}
              item={fav}
              onDelete={handleRemoveFavorite}
              deleteLabel={t('delete')}
              noTitleText={t('noTitle')}
              lang={lang}
            />
          ))}
        </div>
      </section>

      <section className="anime-section">
        <h2>{t('watchGroups')}</h2>
        {Object.entries(groupedWatchStatus).map(([status, items]) => (
          <div key={status} className="watch-group">
            <h3>{watchStatusLabel[status] || status}</h3>
            {!items.length ? (
              <p className="muted">{t('noData')}</p>
            ) : (
              <div className="anime-grid">
                {items.map((item) => (
                  <StoredAnimeCard
                    key={item.id}
                    item={item}
                    onDelete={handleRemoveWatchStatus}
                    deleteLabel={t('delete')}
                    noTitleText={t('noTitle')}
                    lang={lang}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="anime-section">
        <h2>{t('recommendation')}</h2>
        {recommendation?.isFallback && <p className="page-message">{t('externalFallback')}</p>}
        {recommendation.reason ? (
          <p className="muted">{recommendation.reason}</p>
        ) : (
          <p className="muted">{t('noData')}</p>
        )}
        <div className="anime-grid">
          {(recommendation.items || []).map((anime) => (
            <AnimeCard key={anime.id} anime={anime} hideIfNoImage={false} />
          ))}
        </div>
      </section>

      <section className="anime-section">
        <h2>{t('myReviews')}</h2>
        {!myReviews.length && <p className="muted">{t('noReviews')}</p>}
        <div className="review-list">
          {myReviews.map((review) => (
            <article key={review.id} className="review-item">
              <div className="review-head">
                <Link to={`/anime/${review.animeId}`}>{t('title')} ID: {review.animeId}</Link>
                <span>{t('rating')} {review.rating}/5</span>
              </div>
              <p>{review.content}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyPage;
