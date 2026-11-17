import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '../../context/ToastContext';
import { AuthProvider } from '../../context/AuthContext';
import { resetStorage } from '../../services/storage';
import LoginView from './LoginView';

function renderLogin() {
  return render(
    <MemoryRouter>
      <ToastProvider>
        <AuthProvider>
          <LoginView />
        </AuthProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe('LoginView', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStorage();
  });

  it('muestra campos y textos del diseño', () => {
    renderLogin();
    expect(screen.getByRole('heading', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('tu@ejemplo.com')).toBeInTheDocument();
    expect(screen.getByText(/¿Olvidaste tu contraseña/i)).toBeInTheDocument();
  });

  it('aclara el acceso demo y muestra las credenciales del prototipo', () => {
    renderLogin();
    const demo = screen.getByRole('region', { name: 'Acceso de demostración' });
    expect(within(demo).getByText(/solo un atajo para explorar el prototipo/i)).toBeInTheDocument();
    expect(within(demo).getByRole('button', { name: 'Entrar como residente' })).toBeInTheDocument();
    expect(within(demo).getByRole('button', { name: 'Entrar como emprendedor' })).toBeInTheDocument();
    expect(within(demo).getByText('alicia@residente.com')).toBeInTheDocument();
    expect(within(demo).getByText('martha@cafe.com')).toBeInTheDocument();
    expect(within(demo).getByText('demo1234')).toBeInTheDocument();
    expect(within(demo).getByText(/cuentas ficticias del prototipo/i)).toBeInTheDocument();
  });

  it('valida campos vacíos', () => {
    renderLogin();
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }).closest('form'));
    expect(screen.getByText(/Ingresa tu correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByText(/Ingresa tu contraseña/i)).toBeInTheDocument();
  });
});
