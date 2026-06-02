export function getAverageRating(reviews = []) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(price);
}

export function filterAndSortServices(services, { search, category, sort }) {
  let result = [...services];
  const q = search.trim().toLowerCase();

  if (q) {
    result = result.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.entrepreneurName.toLowerCase().includes(q),
    );
  }

  if (category && category !== 'todos') {
    result = result.filter((s) => s.category === category);
  }

  switch (sort) {
    case 'name-desc':
      result.sort((a, b) => b.title.localeCompare(a.title, 'es'));
      break;
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      result.sort((a, b) => getAverageRating(b.reviews) - getAverageRating(a.reviews));
      break;
    default:
      result.sort((a, b) => a.title.localeCompare(b.title, 'es'));
  }

  return result;
}
