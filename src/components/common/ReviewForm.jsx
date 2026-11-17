import { useState } from 'react';
import RatingStars from './RatingStars';
import Button from './Button';
import { useToast } from '../../context/ToastContext';
import { isValidReviewComment, isValidRating } from '../../utils/validators';

export default function ReviewForm({ onSubmit }) {
  const { showToast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidRating(rating)) {
      const msg = 'Selecciona una calificación de 1 a 5 estrellas.';
      setError(msg);
      showToast(msg, 'error');
      return;
    }
    if (!isValidReviewComment(comment)) {
      const msg = 'El comentario debe tener entre 10 y 500 caracteres.';
      setError(msg);
      showToast(msg, 'error');
      return;
    }
    setError('');
    const ok = onSubmit({ rating, comment });
    if (ok !== false) {
      setRating(0);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-brand-200/50 bg-white p-6 shadow-md">
      <h3 className="text-lg font-bold text-gray-900">Deja tu reseña</h3>
      <RatingStars value={rating} onChange={setRating} size="lg" label="Tu calificación *" />
      <div>
        <label htmlFor="review-comment" className="mb-2 block text-sm font-medium text-gray-700">
          Comentario *
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          rows={4}
          placeholder="Comparte tu experiencia (mínimo 10 caracteres)..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
        <p className="mt-1 text-xs text-gray-500">{comment.length}/500 caracteres</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit">Publicar reseña</Button>
    </form>
  );
}
