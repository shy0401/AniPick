import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAnimePoster, PLACEHOLDER_POSTER } from '../utils/image';
import { getSafeAnimeTitle } from '../utils/title';
import { formatAnimeScoreLabel } from '../utils/score';
import { getAnimeRouteId } from '../utils/animeRoute';
import GlassBadge from './GlassBadge';

function AnimeCard({ anime, hideIfNoImage = false }) {
  const { t, lang } = useLanguage();

  const title = getSafeAnimeTitle(anime, lang, t('noTitle'));
  const genres = anime?.displayGenres || anime?.genres || [];
  const season = anime?.displaySeason || anime?.season || '-';
  const format = anime?.displayFormat || anime?.format || '-';
  const status = anime?.displayStatus || anime?.status || '-';
  const scoreLabel = formatAnimeScoreLabel(anime);
  const translationStatus = anime?.translationStatus || anime?.translation?.status || '';

  const sourcePoster = getAnimePoster(anime);
  if (hideIfNoImage && !sourcePoster) return null;
  const poster = sourcePoster || PLACEHOLDER_POSTER;
  const routeId = getAnimeRouteId(anime);

  const handleImageError = (event) => {
    if (event.currentTarget.src !== PLACEHOLDER_POSTER) {
      event.currentTarget.src = PLACEHOLDER_POSTER;
    }
  };

  const content = (
    <article className="anime-card">
      <div className="anime-card-image-wrap">
        <img
          className="anime-card-image"
          src={poster}
          alt={title}
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      <div className="anime-card-body">
        <h3 className="anime-card-title">{title}</h3>
        {translationStatus && !['REVIEWED', 'AUTO'].includes(translationStatus) && (
          <GlassBadge tone={translationStatus === 'FAILED' ? 'danger' : 'muted'}>{translationStatus}</GlassBadge>
        )}
        {anime?.displayDescription && <p className="anime-card-description">{anime.displayDescription}</p>}
        <div className="anime-card-badges">
          {genres.slice(0, 2).map((genre) => (
            <GlassBadge key={genre}>{genre}</GlassBadge>
          ))}
          <GlassBadge tone="accent">{scoreLabel}</GlassBadge>
          {!sourcePoster && <GlassBadge tone="muted">이미지 준비 중</GlassBadge>}
        </div>
        <p className="anime-meta">
          {anime?.seasonYear || '-'} / {season}
        </p>
        <p className="anime-meta">
          {format} / {status}
        </p>
      </div>
    </article>
  );

  if (!routeId) {
    return (
      <div
        className="anime-card-link is-disabled"
        aria-disabled="true"
        title="상세 정보를 열 수 없습니다."
        onClick={() => console.warn('[AniPick] missing routeId', anime)}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      to={`/anime/${routeId}`}
      className="anime-card-link"
      aria-label={`${title} ${t('detail')}`}
      draggable={false}
    >
      {content}
    </Link>
  );
}

export default AnimeCard;
