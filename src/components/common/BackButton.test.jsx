import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BackButton from './BackButton';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('BackButton', () => {
  it('navega a la ruta indicada al hacer clic', () => {
    navigateMock.mockClear();
    render(
      <MemoryRouter>
        <BackButton to="/home" label="Volver al Dashboard" />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Volver al Dashboard/i }));
    expect(navigateMock).toHaveBeenCalledWith('/home');
  });

  it('navega hacia atrás cuando no hay ruta', () => {
    navigateMock.mockClear();
    render(
      <MemoryRouter>
        <BackButton label="Volver" />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Volver/i }));
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
