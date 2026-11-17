import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider, useToast } from '../../context/ToastContext';
import ToastContainer from './ToastContainer';

function ToastProbe() {
  const { showToast } = useToast();

  return (
    <>
      <button type="button" onClick={() => showToast('Mensaje de error', 'error')}>
        Lanzar error
      </button>
      <button type="button" onClick={() => showToast('Mensaje correcto')}>
        Lanzar éxito
      </button>
      <ToastContainer />
    </>
  );
}

function renderToasts() {
  return render(
    <ToastProvider>
      <ToastProbe />
    </ToastProvider>,
  );
}

describe('ToastContainer', () => {
  it('muestra y estiliza toasts de error y éxito', () => {
    renderToasts();

    fireEvent.click(screen.getByRole('button', { name: 'Lanzar error' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Mensaje de error');
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50', 'text-red-800');

    fireEvent.click(screen.getByRole('button', { name: 'Lanzar éxito' }));
    const alerts = screen.getAllByRole('alert');
    expect(alerts[1]).toHaveTextContent('Mensaje correcto');
    expect(alerts[1]).toHaveClass('bg-white', 'text-gray-900');
  });

  it('permite cerrar un toast', () => {
    renderToasts();

    fireEvent.click(screen.getByRole('button', { name: 'Lanzar éxito' }));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
