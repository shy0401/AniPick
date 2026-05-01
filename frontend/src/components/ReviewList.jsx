import { useLanguage } from '../context/LanguageContext';

function ReviewList({ reviews, currentUser, onEdit, onDelete }) {
  const { t } = useLanguage();

  if (!reviews.length) {
    return <p className="muted">{t('noReviews')}</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review) => {
        const canManage = currentUser && (currentUser.id === review.userId || currentUser.role === 'ADMIN');
        const createdAt = review.createdAt ? new Date(review.createdAt).toLocaleDateString() : '-';

        return (
          <article key={review.id} className="review-item">
            <div className="review-head">
              <strong>{review.user?.nickname || '-'}</strong>
              <span>{t('rating')} {review.rating}/5 / {createdAt}</span>
            </div>
            <p>{review.content}</p>
            {canManage && (
              <div className="review-actions">
                <button type="button" onClick={() => onEdit(review)}>{t('edit')}</button>
                <button type="button" onClick={() => onDelete(review.id)}>{t('delete')}</button>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

export default ReviewList;
