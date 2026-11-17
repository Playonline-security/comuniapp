import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../constants/categories';
import { getAverageRating, formatPrice } from '../../utils/serviceHelpers';
import { RatingDisplay } from './RatingStars';

export default function ServiceCard({ service }) {
  const categoryLabel = CATEGORIES.find((c) => c.id === service.category)?.label || service.category;
  const avg = getAverageRating(service.reviews);
  const count = service.reviews?.length || 0;
  const image = service.images?.[0];

  return (
    <Link
      to={`/servicio/${service.id}`}
      aria-label={`Ver detalles de ${service.title}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-500/10 bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2"
    >
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {image && (
          <img
            src={image}
            alt={service.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
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
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 bg-gray-50/50 px-4 py-3">
        <RatingDisplay average={avg} count={count} size="sm" />
        <span className="ml-auto inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 group-hover:bg-brand-800">
          Detalles
        </span>
      </div>
    </Link>
  );
}
