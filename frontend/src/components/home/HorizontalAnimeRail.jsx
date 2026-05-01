import { useRailScroll } from '../../hooks/useRailScroll';
import AnimePosterCard from './AnimePosterCard';

export default function HorizontalAnimeRail({
  title,
  items = [],
  className = '',
  renderItem,
}) {
  const safeItems = Array.isArray(items) ? items : [];

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
    <section className={`anime-rail-section ${className}`.trim()}>
      <div className="anime-rail-header">
        <h2>{title}</h2>
      </div>

      <div className="anime-rail-shell">
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
          className="anime-rail-viewport"
          ref={scrollRef}
          onClickCapture={onClickCapture}
          {...dragHandlers}
        >
          <div className="anime-rail-track">
            {safeItems.map((anime, index) =>
              renderItem ? (
                renderItem(anime, index)
              ) : (
                <AnimePosterCard
                  key={anime.routeId || anime.externalId || anime.malId || anime.id || index}
                  anime={anime}
                />
              )
            )}
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
