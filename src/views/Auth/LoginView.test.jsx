import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('valida campos vacíos', () => {
    renderLogin();
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }).closest('form'));
    expect(screen.getByText(/Ingresa tu correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByText(/Ingresa tu contraseña/i)).toBeInTheDocument();
  });
});
