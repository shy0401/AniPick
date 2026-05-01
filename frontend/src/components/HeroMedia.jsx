import { useEffect, useMemo, useState } from 'react';
import { PLACEHOLDER_BANNER } from '../utils/image';

function HeroMedia({
  imageUrl,
  fallbackImageUrl,
  foregroundImageUrl,
  alt,
  variant = 'detail',
  children,
}) {
  const initialSource = useMemo(
    () => imageUrl || fallbackImageUrl || PLACEHOLDER_BANNER,
    [imageUrl, fallbackImageUrl]
  );
  const [source, setSource] = useState(initialSource);
  const foregroundSource = useMemo(
    () => foregroundImageUrl || fallbackImageUrl || source,
    [foregroundImageUrl, fallbackImageUrl, source]
  );

  useEffect(() => {
    setSource(initialSource);
  }, [initialSource]);

  const handleError = () => {
    if (source !== fallbackImageUrl && fallbackImageUrl) {
      setSource(fallbackImageUrl);
      return;
    }

    if (source !== PLACEHOLDER_BANNER) {
      setSource(PLACEHOLDER_BANNER);
    }
  };

  const isHome = variant === 'home';

  return (
    <section className={`hero-media hero-media-${variant}`}>
      <div
        className="hero-media-bg"
        style={{ backgroundImage: `url("${source}")` }}
        aria-hidden="true"
      />
      <div className="hero-media-overlay" aria-hidden="true" />

      {isHome ? (
        <div className="hero-media-layout">
          {children && (
            <div className="hero-media-content">
              <div className="hero-media-copy-panel">{children}</div>
            </div>
          )}
          <div className="hero-media-frame">
            <div className="hero-media-poster-wrap">
              <img
                className="hero-media-image"
                src={foregroundSource}
                alt={alt}
                loading="eager"
                onError={handleError}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="hero-media-frame">
            <img
              className="hero-media-image"
              src={source}
              alt={alt}
              loading="lazy"
              onError={handleError}
            />
          </div>
          {children && <div className="hero-media-content">{children}</div>}
        </>
      )}
    </section>
  );
}

export default HeroMedia;
