import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function ReviewForm({ animeId, onSubmit }) {
  const { t } = useLanguage();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit({ animeId, rating: Number(rating), content: content.trim() });
      setContent('');
      setRating(5);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>{t('writeReview')}</h3>
      <label>
        {t('rating')}
        <select value={rating} onChange={(event) => setRating(event.target.value)}>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        {t('content')}
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={t('content')}
          rows={4}
        />
      </label>
      <button className="button-primary" type="submit" disabled={submitting}>
        {submitting ? t('loading') : t('submit')}
      </button>
    </form>
  );
}

export default ReviewForm;
