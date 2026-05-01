import { Link } from 'react-router-dom';

import { getAnimePoster, PLACEHOLDER_POSTER } from '../../utils/image';
import { getAnimeRouteId } from '../../utils/animeRoute';
import { formatAnimeScoreLabel } from '../../utils/score';
import { getSafeAnimeTitle } from '../../utils/title';

function formatGenres(genres) {
  if (!Array.isArray(genres) || genres.length === 0) {
    return '장르 정보 없음';
  }

  return genres.filter(Boolean).slice(0, 2).join(', ');
}

function formatMeta(anime) {
  return [anime?.seasonYear, anime?.season, anime?.format]
    .filter((item) => item !== null && item !== undefined && String(item).trim() !== '')
    .join(' / ');
}

export default function AnimePosterCard({ anime }) {
  const routeId = getAnimeRouteId(anime);
  const title = getSafeAnimeTitle(anime, 'ko', '제목 없음');
  const poster = getAnimePoster(anime) || PLACEHOLDER_POSTER;
  const genres = formatGenres(anime?.genres);
  const meta = formatMeta(anime);

  const content = (
    <>
      <div className="anime-poster-card-imageWrap">
        <img
          className="anime-poster-card-image"
          src={poster}
          alt={title}
          draggable={false}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = PLACEHOLDER_POSTER;
          }}
        />
      </div>

      <div className="anime-poster-card-info">
        <h3 className="anime-poster-card-title">{title}</h3>
        <p className="anime-poster-card-score">{formatAnimeScoreLabel(anime)}</p>
        <p className="anime-poster-card-genres">{genres}</p>
        {meta ? <p className="anime-poster-card-meta">{meta}</p> : null}
      </div>
    </>
  );

  if (!routeId) {
    return (
      <div
        className="anime-poster-card is-disabled"
        aria-disabled="true"
        title="상세 정보를 열 수 없습니다."
        onClick={() => {
          console.warn('[AniPick] routeId missing', anime);
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      className="anime-poster-card"
      to={`/anime/${routeId}`}
      aria-label={`${title} 상세 보기`}
      draggable={false}
    >
      {content}
    </Link>
  );
}
