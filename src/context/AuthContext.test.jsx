import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { ToastProvider } from './ToastContext';
import { resetStorage } from '../services/storage';

function wrapper({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
}

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStorage();
  });

  it('login fallido retorna false', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let ok;
    act(() => {
      ok = result.current.login('bad@mail.com', 'wrong');
    });
    expect(ok).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('login y logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login('martha@cafe.com', 'demo1234');
    });
    expect(result.current.isEntrepreneur).toBe(true);
    act(() => result.current.logout());
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('registra nuevo usuario', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let ok;
    act(() => {
      ok = result.current.register({
        name: 'Nuevo User',
        email: 'nuevo@test.com',
        password: 'secret1',
        role: 'residente',
      });
    });
    expect(ok).toBe(true);
    expect(result.current.user.email).toBe('nuevo@test.com');
  });

  it('rechaza registro con email inválido o duplicado', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let badEmail;
    act(() => {
      badEmail = result.current.register({
        name: 'X',
        email: 'no-email',
        password: 'secret1',
        role: 'residente',
      });
    });
    expect(badEmail).toBe(false);

    let dup;
    act(() => {
      dup = result.current.register({
        name: 'Dup',
        email: 'alicia@residente.com',
        password: 'secret1',
        role: 'residente',
      });
    });
    expect(dup).toBe(false);
  });

  it('actualiza perfil del usuario en sesión', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login('alicia@residente.com', 'demo1234');
    });
    act(() => {
      result.current.updateProfile({ name: 'Alicia Actualizada', phone: '3001112233', bio: 'Vecina activa' });
    });
    expect(result.current.user.name).toBe('Alicia Actualizada');
    expect(result.current.getCurrentUser()?.phone).toBe('3001112233');
  });

  it('rechaza actualizar perfil sin nombre', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login('alicia@residente.com', 'demo1234');
    });
    let ok;
    act(() => {
      ok = result.current.updateProfile({ name: '   ' });
    });
    expect(ok).toBe(false);
  });
});
