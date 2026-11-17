import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLocation } from 'react-router-dom';
import { renderWithProviders } from '../test/testUtils';
import LoginView from '../views/Auth/LoginView';
import { resetStorage } from '../services/storage';

function LoginWithPath() {
  const { pathname } = useLocation();
  return (
    <>
      <LoginView />
      <span data-testid="current-path">{pathname}</span>
    </>
  );
}

function getSession() {
  return JSON.parse(localStorage.getItem('comuniapp_state_v1')).session;
}

describe('Auth flow', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStorage();
  });

  it('login exitoso muestra toast de bienvenida', async () => {
    renderWithProviders(<LoginView />);
    await userEvent.type(screen.getByRole('textbox', { name: /correo/i }), 'alicia@residente.com');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'demo1234');
    fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }).closest('form'));
    await waitFor(() => {
      expect(screen.getByText(/bienvenido/i)).toBeInTheDocument();
    });
  });

  it('acceso demo residente inicia sesión sin escribir credenciales', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginWithPath />);
    await user.click(screen.getByRole('button', { name: 'Entrar como residente' }));
    await waitFor(() => {
      expect(screen.getByTestId('current-path')).toHaveTextContent('/home');
    });
    expect(getSession()).toMatchObject({
      email: 'alicia@residente.com',
      role: 'residente',
    });
  });

  it('acceso demo emprendedor inicia sesión sin escribir credenciales', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginWithPath />);
    await user.click(screen.getByRole('button', { name: 'Entrar como emprendedor' }));
    await waitFor(() => {
      expect(screen.getByTestId('current-path')).toHaveTextContent('/home');
    });
    expect(getSession()).toMatchObject({
      email: 'martha@cafe.com',
      role: 'emprendedor',
    });
  });
});
