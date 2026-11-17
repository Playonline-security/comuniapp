import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ServiceProvider, useServices } from './ServiceContext';
import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';
import { resetStorage, saveState, loadState } from '../services/storage';
import { IMAGES } from '../constants/images';

function wrapper({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <ServiceProvider>{children}</ServiceProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

describe('useServices', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStorage();
  });

  it('emprendedor crea servicio', () => {
    const state = loadState();
    state.session = { id: 'user-martha', name: 'Martha', email: 'm@c.com', role: 'emprendedor' };
    saveState(state);

    const { result } = renderHook(() => useServices(), { wrapper });
    let ok;
    act(() => {
      ok = result.current.addService({
        title: 'Servicio Test',
        description: 'Descripción válida de prueba',
        category: 'otros',
        price: 20000,
        images: [IMAGES.cafeOrganico],
        deliveryOptions: ['local'],
      });
    });
    expect(ok).toBe(true);
    expect(result.current.services.some((s) => s.title === 'Servicio Test')).toBe(true);
  });

  it('residente no puede crear servicio', () => {
    const state = loadState();
    state.session = { id: 'user-alicia', name: 'Alicia', email: 'a@b.com', role: 'residente' };
    saveState(state);

    const { result } = renderHook(() => useServices(), { wrapper });
    let ok;
    act(() => {
      ok = result.current.addService({
        title: 'X',
        description: 'Descripción válida de prueba',
        category: 'otros',
        price: 100,
        images: [IMAGES.cafeOrganico],
      });
    });
    expect(ok).toBe(false);
  });

  it('no permite editar servicio ajeno', () => {
    const state = loadState();
    state.session = { id: 'user-alicia', name: 'Alicia', email: 'a@b.com', role: 'emprendedor' };
    saveState(state);

    const { result } = renderHook(() => useServices(), { wrapper });
    let ok;
    act(() => {
      ok = result.current.updateService('svc-cafe', {
        title: 'Hack',
        description: 'Descripción válida de prueba',
        price: 1,
      });
    });
    expect(ok).toBe(false);
  });

  it('elimina solo servicios propios', () => {
    const state = loadState();
    state.session = { id: 'user-martha', name: 'Martha', email: 'm@c.com', role: 'emprendedor' };
    saveState(state);

    const { result } = renderHook(() => useServices(), { wrapper });
    let ok;
    act(() => {
      ok = result.current.deleteService('svc-cafe');
    });
    expect(ok).toBe(true);
    expect(result.current.getServiceById('svc-cafe')).toBeUndefined();
  });

  it('rechaza reseña en servicio inexistente', () => {
    const state = loadState();
    state.session = { id: 'user-alicia', name: 'Alicia', email: 'a@b.com', role: 'residente' };
    saveState(state);

    const { result } = renderHook(() => useServices(), { wrapper });
    let ok;
    act(() => {
      ok = result.current.addReview('svc-inexistente', {
        rating: 4,
        comment: 'Comentario válido para prueba de servicio inexistente.',
      });
    });
    expect(ok).toBe(false);
  });

  it('emprendedor puede reseñar publicación ajena', () => {
    const state = loadState();
    state.session = { id: 'user-carlos', name: 'Carlos', email: 'c@t.com', role: 'emprendedor' };
    saveState(state);

    const { result } = renderHook(() => useServices(), { wrapper });
    let ok;
    act(() => {
      ok = result.current.addReview('svc-cafe', {
        rating: 5,
        comment: 'Excelente café, lo recomiendo desde mi negocio de turismo.',
      });
    });
    expect(ok).toBe(true);
    expect(result.current.getServiceById('svc-cafe').reviews[0].userId).toBe('user-carlos');
  });

  it('emprendedor no puede reseñar su propia publicación', () => {
    const state = loadState();
    state.session = { id: 'user-martha', name: 'Martha', email: 'm@c.com', role: 'emprendedor' };
    saveState(state);

    const { result } = renderHook(() => useServices(), { wrapper });
    let ok;
    act(() => {
      ok = result.current.addReview('svc-cafe', {
        rating: 5,
        comment: 'Intento de auto-reseña que no debería guardarse.',
      });
    });
    expect(ok).toBe(false);
  });
});
