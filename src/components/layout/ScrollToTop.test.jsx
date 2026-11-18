import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

const scrollToMock = vi.fn();

function HomeScreen() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/login')}>Ir al login</button>;
}

function LoginScreen() {
  const navigate = useNavigate();
  return (
    <>
      <p>Iniciar sesión</p>
      <button onClick={() => navigate(-1)}>Volver</button>
    </>
  );
}

function renderAt(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ScrollToTop', () => {
  beforeEach(() => {
    scrollToMock.mockClear();
    vi.stubGlobal('scrollTo', scrollToMock);
    Object.defineProperty(window.history, 'scrollRestoration', {
      configurable: true,
      writable: true,
      value: 'auto',
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('vuelve al inicio al montar y al navegar a otra pantalla', () => {
    renderAt('/');
    expect(scrollToMock).toHaveBeenCalledTimes(1);
    expect(scrollToMock).toHaveBeenLastCalledWith(0, 0);

    fireEvent.click(screen.getByRole('button', { name: 'Ir al login' }));

    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    expect(scrollToMock).toHaveBeenCalledTimes(2);
    expect(scrollToMock).toHaveBeenLastCalledWith(0, 0);
  });

  it('vuelve al inicio al regresar con atrás', () => {
    renderAt('/');

    fireEvent.click(screen.getByRole('button', { name: 'Ir al login' }));
    fireEvent.click(screen.getByRole('button', { name: 'Volver' }));

    expect(screen.getByRole('button', { name: 'Ir al login' })).toBeInTheDocument();
    expect(scrollToMock).toHaveBeenCalledTimes(3);
    expect(scrollToMock).toHaveBeenLastCalledWith(0, 0);
  });

  it('desactiva la restauración automática del navegador', () => {
    renderAt('/');

    expect(window.history.scrollRestoration).toBe('manual');
  });
});
