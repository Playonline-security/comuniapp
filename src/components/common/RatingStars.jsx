import { useState } from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({
  value = 0,
  onChange,
  readonly = false,
  size = 'md',
  label,
}) {
  const [hoverValue, setHoverValue] = useState(0);
  const iconClass = size === 'lg' ? 'h-8 w-8' : size === 'sm' ? 'h-4 w-4' : 'h-6 w-6';
  const displayValue = readonly ? value : hoverValue || value;

  return (
    <div className="flex flex-col gap-1" role={readonly ? 'img' : 'group'} aria-label={label || 'Calificación'}>
      {label && !readonly && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <div
        className="flex gap-1"
        onMouseLeave={readonly ? undefined : () => setHoverValue(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= displayValue;
          if (readonly) {
            return (
              <span key={star} className="text-amber-400" aria-hidden>
                <Star
                  className={iconClass}
                  fill={filled ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={1.5}
                />
              </span>
            );
          }
          return (
            <button
              key={star}
              type="button"
              className="cursor-pointer text-amber-400 transition-transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded"
              onMouseEnter={() => setHoverValue(star)}
              onClick={() => onChange?.(star)}
              aria-label={`${star} estrellas`}
            >
              <Star
                className={iconClass}
                fill={filled ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={1.5}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function RatingDisplay({ average, count, size = 'sm' }) {
  if (!count) {
    return <span className="text-xs font-medium text-gray-500">Sin reseñas aún</span>;
  }
  return (
    <div className="flex items-center gap-2">
      <RatingStars value={Math.round(average)} readonly size={size} />
      <span className="text-sm font-semibold text-brand-600">{average.toFixed(1)} / 5</span>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}
