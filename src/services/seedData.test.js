import { describe, it, expect } from 'vitest';
import { getSeedState, SEED_SERVICES, SEED_USERS } from './seedData';

describe('seedData', () => {
  it('incluye café con reseñas e imágenes locales', () => {
    const cafe = SEED_SERVICES.find((s) => s.id === 'svc-cafe');
    expect(cafe.reviews.length).toBeGreaterThanOrEqual(3);
    expect(cafe.images[0]).toContain('cafe-organico');
    expect(cafe.images[0]).not.toMatch(/^https?:\/\//);
  });

  it('cada servicio tiene reseñas y emprendedor con teléfono', () => {
    SEED_SERVICES.forEach((svc) => {
      expect(svc.reviews.length).toBeGreaterThanOrEqual(3);
      const owner = SEED_USERS.find((u) => u.id === svc.entrepreneurId);
      expect(owner?.phone).toMatch(/^\d{10}$/);
    });
  });

  it('getSeedState retorna estructura completa', () => {
    const state = getSeedState();
    expect(state.users).toHaveLength(7);
    expect(state.services).toHaveLength(6);
    expect(state.session).toBeNull();
  });
});
