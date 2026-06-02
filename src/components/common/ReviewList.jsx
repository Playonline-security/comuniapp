import RatingStars from './RatingStars';

export default function ReviewList({ reviews = [] }) {
  if (!reviews.length) {
    return <p className="text-gray-500">Aún no hay reseñas. ¡Sé el primero en opinar!</p>;
  }

  const sorted = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <ul className="space-y-4">
      {sorted.map((review) => (
        <li key={review.id} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-gray-900">{review.userName}</span>
            <time className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <RatingStars value={review.rating} readonly size="sm" />
          <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
