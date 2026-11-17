import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, within } from '@testing-library/react';
import { renderWithProviders } from '../test/testUtils';
import EntrepreneurDashboardView from '../views/DashboardEntrepreneur/EntrepreneurDashboardView';
import { resetStorage, saveState, loadState } from '../services/storage';

describe('Entrepreneur dashboard', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStorage();
    const state = loadState();
    state.session = { id: 'user-martha', name: 'Martha', email: 'martha@cafe.com', role: 'emprendedor' };
    saveState(state);
  });

  it('cancela la eliminación sin borrar la publicación', () => {
    renderWithProviders(<EntrepreneurDashboardView />, { route: '/emprendedor' });

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText(/Café Orgánico de Mistrató/)).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole('button', { name: 'Cancelar' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Café Orgánico de Mistrató')).toBeInTheDocument();
  });

  it('elimina la publicación al confirmar', () => {
    renderWithProviders(<EntrepreneurDashboardView />, { route: '/emprendedor' });

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    const dialog = screen.getByRole('dialog');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Eliminar' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Café Orgánico de Mistrató')).not.toBeInTheDocument();
    expect(screen.getByText(/Aún no tienes publicaciones/i)).toBeInTheDocument();
  });
});
