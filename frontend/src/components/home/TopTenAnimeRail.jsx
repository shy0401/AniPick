import { useRailScroll } from '../../hooks/useRailScroll';
import TopTenAnimeCard from './TopTenAnimeCard';

export default function TopTenAnimeRail({ title = '지금 뜨는 애니 TOP 10', items = [] }) {
  const safeItems = Array.isArray(items) ? items.slice(0, 10) : [];

  const {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollPrev,
    scrollNext,
    dragHandlers,
    onClickCapture,
  } = useRailScroll(safeItems.length);

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <section className="anime-rail-section top10-rail-section">
      <div className="anime-rail-header">
        <h2>{title}</h2>
      </div>

      <div className="anime-rail-shell top10-rail-shell">
        {canScrollLeft ? (
          <button
            type="button"
            className="rail-nav rail-nav-left"
            aria-label="이전"
            onClick={scrollPrev}
          >
            &lt;
          </button>
        ) : null}

        <div
          className="anime-rail-viewport top10-rail-viewport"
          ref={scrollRef}
          onClickCapture={onClickCapture}
          {...dragHandlers}
        >
          <div className="anime-rail-track top10-rail-track">
            {safeItems.map((anime, index) => (
              <TopTenAnimeCard
                key={anime.routeId || anime.externalId || anime.malId || anime.id || index}
                anime={anime}
                rank={index + 1}
              />
            ))}
          </div>
        </div>

        {canScrollRight ? (
          <button
            type="button"
            className="rail-nav rail-nav-right"
            aria-label="다음"
            onClick={scrollNext}
          >
            &gt;
          </button>
        ) : null}
      </div>
    </section>
  );
}
