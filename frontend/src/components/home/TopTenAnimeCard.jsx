import { Link } from 'react-router-dom';

import { getAnimePoster, PLACEHOLDER_POSTER } from '../../utils/image';
import { getAnimeRouteId } from '../../utils/animeRoute';
import { formatAnimeScoreLabel } from '../../utils/score';
import { getSafeAnimeTitle } from '../../utils/title';

export default function TopTenAnimeCard({ anime, rank, lang = 'ko' }) {
  const routeId = getAnimeRouteId(anime);
  const fallbackTitle = lang === 'en' ? 'Untitled' : lang === 'ja' ? 'タイトルなし' : '제목 없음';
  const title = getSafeAnimeTitle(anime, lang, fallbackTitle);
  const poster = getAnimePoster(anime) || PLACEHOLDER_POSTER;

  const content = (
    <>
      <span className="top10-rank" aria-hidden="true">
        {rank}
      </span>

      <div className="top10-posterWrap">
        <img
          className="top10-poster"
          src={poster}
          alt={title}
          draggable={false}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = PLACEHOLDER_POSTER;
          }}
        />
      </div>

      <div className="top10-info">
        <h3 className="top10-title">{title}</h3>
        <p className="top10-score">{formatAnimeScoreLabel(anime, lang)}</p>
      </div>
    </>
  );

  if (!routeId) {
    return (
      <div
        className="top10-card is-disabled"
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
      className="top10-card"
      to={`/anime/${routeId}`}
      aria-label={`${rank}위 ${title} 상세 보기`}
      draggable={false}
    >
      {content}
    </Link>
  );
}
