import { MessageSquare } from 'lucide-react';
import RatingStars from './RatingStars';

export default function ReviewList({ reviews = [] }) {
  if (!reviews.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/60 px-6 py-8 text-center">
        <MessageSquare className="mx-auto h-6 w-6 text-gray-400" aria-hidden />
        <p className="mt-2 text-gray-500">Aún no hay reseñas. ¡Sé el primero en opinar!</p>
      </div>
    );
  }

  const sorted = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <ul className="space-y-4">
      {sorted.map((review) => (
        <li key={review.id} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700"
            >
              {review.userName?.charAt(0).toUpperCase() || '?'}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-gray-900">{review.userName}</span>
                <time dateTime={review.createdAt} className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <RatingStars value={review.rating} readonly size="sm" />
              <p className="mt-2 break-words text-sm text-gray-700">{review.comment}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
