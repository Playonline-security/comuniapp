import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../constants/categories';
import { getAverageRating, formatPrice } from '../../utils/serviceHelpers';
import { RatingDisplay } from './RatingStars';
import Button from './Button';

export default function ServiceCard({ service }) {
  const categoryLabel = CATEGORIES.find((c) => c.id === service.category)?.label || service.category;
  const avg = getAverageRating(service.reviews);
  const count = service.reviews?.length || 0;
  const image = service.images?.[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-brand-500/10 bg-white shadow-md transition hover:shadow-lg">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {image && (
          <img src={image} alt={service.title} className="h-full w-full object-cover" loading="lazy" />
        )}
        <span className="absolute right-4 top-4 rounded-xl border border-brand-200 bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-600">
          {categoryLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{service.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
        <p className="text-sm text-gray-500">
          Por <span className="font-medium text-gray-800">{service.entrepreneurName}</span>
        </p>
        <p className="text-lg font-bold text-brand-600">{formatPrice(service.price)}</p>
        <RatingDisplay average={avg} count={count} />
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-4 py-3">
        <RatingDisplay average={avg} count={count} size="sm" />
        <Link to={`/servicio/${service.id}`}>
          <Button size="sm">Detalles</Button>
        </Link>
      </div>
    </article>
  );
}
