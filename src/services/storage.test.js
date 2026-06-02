import { describe, it, expect, beforeEach } from 'vitest';
import { loadState, saveState, resetStorage } from './storage';
import { getSeedState } from './seedData';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('inicializa con datos semilla si está vacío', () => {
    const state = loadState();
    expect(state.services.length).toBeGreaterThan(0);
    expect(state.users.length).toBeGreaterThan(0);
  });

  it('persiste cambios', () => {
    const state = loadState();
    state.session = { id: 'test', name: 'Test', role: 'residente' };
    saveState(state);
    expect(loadState().session.name).toBe('Test');
  });

  it('recupera semilla si JSON corrupto', () => {
    localStorage.setItem('comuniapp_state_v1', '{bad json');
    const state = loadState();
    expect(state.services.length).toBeGreaterThan(0);
  });

  it('resetStorage restaura semilla', () => {
    const state = loadState();
    state.services = [];
    saveState(state);
    const reset = resetStorage();
    expect(reset.services.length).toBeGreaterThan(0);
  });

  it('completa reseñas y emprendedores en datos guardados antiguos', () => {
    const seed = getSeedState();
    const stale = {
      users: seed.users.filter((u) => u.id === 'user-alicia' || u.id === 'user-martha'),
      services: seed.services.map((s) => ({
        ...s,
        reviews: s.id === 'svc-cafe' ? s.reviews : [],
      })),
      session: null,
    };
    localStorage.setItem('comuniapp_state_v1', JSON.stringify(stale));
    const loaded = loadState();
    const guia = loaded.services.find((s) => s.id === 'svc-guia');
    expect(guia.reviews.length).toBeGreaterThanOrEqual(2);
    expect(loaded.users.some((u) => u.id === 'user-jose')).toBe(true);
  });
});
