import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test/testUtils';
import HomeView from '../views/Home/HomeView';
import { resetStorage, saveState, loadState } from '../services/storage';

describe('Home filtering', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStorage();
    const state = loadState();
    state.session = { id: 'user-alicia', name: 'Alicia', email: 'a@b.com', role: 'residente' };
    saveState(state);
  });

  it('filtra servicios por palabra clave', async () => {
    renderWithProviders(<HomeView />, { route: '/home' });
    const search = screen.getByPlaceholderText(/buscar productos/i);
    await userEvent.type(search, 'Café');
    expect(screen.getByText(/Café Orgánico/i)).toBeInTheDocument();
    await userEvent.clear(search);
    await userEvent.type(search, 'zzzzinexistente');
    expect(screen.queryByText(/Café Orgánico/i)).not.toBeInTheDocument();
  });

  it('filtra por categoría turismo', () => {
    renderWithProviders(<HomeView />, { route: '/home' });
    fireEvent.click(screen.getByRole('button', { name: 'Turismo' }));
    expect(screen.getByText(/Guía Turística/i)).toBeInTheDocument();
  });
});
