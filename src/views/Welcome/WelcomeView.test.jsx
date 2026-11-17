import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import WelcomeView from './WelcomeView';
import { renderWithProviders } from '../../test/testUtils';

describe('WelcomeView', () => {
  it('muestra Ya tengo cuenta y enlaza al login', () => {
    renderWithProviders(<WelcomeView />, { route: '/' });

    const accountLinks = screen.getAllByRole('link', { name: 'Ya tengo cuenta' });
    expect(accountLinks).toHaveLength(2);
    for (const link of accountLinks) {
      expect(link).toHaveAttribute('href', '/login');
    }
    expect(screen.queryByText('Explorar Servicios')).not.toBeInTheDocument();
  });
});
