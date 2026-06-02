import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test/testUtils';
import LoginView from '../views/Auth/LoginView';
import { resetStorage } from '../services/storage';

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
});
