import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastProvider } from '../../context/ToastContext';
import { AuthProvider } from '../../context/AuthContext';
import { ServiceProvider } from '../../context/ServiceContext';
import { resetStorage, saveState, loadState } from '../../services/storage';

function renderNavbar() {
  return render(
    <MemoryRouter>
      <ToastProvider>
        <AuthProvider>
          <ServiceProvider>
            <Navbar />
          </ServiceProvider>
        </AuthProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStorage();
  });

  it('muestra enlaces públicos sin sesión', () => {
    renderNavbar();
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
    expect(screen.getByText('Únete Ahora')).toBeInTheDocument();
  });

  it('abre menú de usuario autenticado', () => {
    const state = loadState();
    state.session = { id: 'user-alicia', name: 'Alicia', email: 'a@b.com', role: 'residente' };
    saveState(state);
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { expanded: false }));
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
    expect(screen.getByText('Editar perfil')).toBeInTheDocument();
  });

  it('muestra mis publicaciones para emprendedor', () => {
    const state = loadState();
    state.session = { id: 'user-martha', name: 'Martha', email: 'martha@cafe.com', role: 'emprendedor' };
    saveState(state);
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { expanded: false }));
    expect(screen.getByText('Mis publicaciones')).toBeInTheDocument();
  });

  it('cierra sesión desde el menú', () => {
    const state = loadState();
    state.session = { id: 'user-alicia', name: 'Alicia', email: 'alicia@residente.com', role: 'residente' };
    saveState(state);
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { expanded: false }));
    fireEvent.click(screen.getByText('Cerrar sesión'));
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
  });
});
