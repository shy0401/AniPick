import AnimeCard from './AnimeCard';
import { useLanguage } from '../context/LanguageContext';

function AnimeSection({
  title,
  items = [],
  loading = false,
  error = '',
  isFallback = false,
  fallbackMessage = '',
  hideIfNoImage = false,
}) {
  const { t } = useLanguage();

  return (
    <section className="anime-section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>

      {isFallback && (
        <p className="page-message">{fallbackMessage || t('externalFallback')}</p>
      )}

      {loading && <p className="page-message">{t('loading')}</p>}
      {error && <p className="page-error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">{t('noData')}</p>}

      {!loading && !error && items.length > 0 && (
        <div className="anime-grid">
          {items.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} hideIfNoImage={hideIfNoImage} />
          ))}
        </div>
      )}
    </section>
  );
}

export default AnimeSection;
