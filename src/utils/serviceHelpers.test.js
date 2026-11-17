import { describe, it, expect } from 'vitest';
import { getAverageRating, filterAndSortServices, formatPrice } from './serviceHelpers';

const services = [
  { id: '1', title: 'Zebra', description: 'z', entrepreneurName: 'A', category: 'turismo', price: 100, reviews: [{ rating: 5 }] },
  { id: '2', title: 'Apple', description: 'a', entrepreneurName: 'B', category: 'agricultura', price: 50, reviews: [] },
];

describe('serviceHelpers', () => {
  it('calcula promedio de reseñas', () => {
    expect(getAverageRating([{ rating: 4 }, { rating: 5 }])).toBe(4.5);
    expect(getAverageRating([])).toBe(0);
  });

  it('filtra por búsqueda y categoría', () => {
    const result = filterAndSortServices(services, { search: 'apple', category: 'agricultura', sort: 'name-asc' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Apple');
  });

  it('ordena por precio', () => {
    const asc = filterAndSortServices(services, { search: '', category: 'todos', sort: 'price-asc' });
    expect(asc[0].price).toBe(50);
    const desc = filterAndSortServices(services, { search: '', category: 'todos', sort: 'price-desc' });
    expect(desc[0].price).toBe(100);
    const byRating = filterAndSortServices(services, { search: '', category: 'todos', sort: 'rating-desc' });
    expect(byRating[0].title).toBe('Zebra');
    const byNameDesc = filterAndSortServices(services, { search: '', category: 'todos', sort: 'name-desc' });
    expect(byNameDesc[0].title).toBe('Zebra');
  });

  it('formatea precio COP', () => {
    expect(formatPrice(15000)).toMatch(/15/);
  });
});
