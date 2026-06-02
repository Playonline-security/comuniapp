import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider } from '../../context/ToastContext';
import ReviewForm from './ReviewForm';

describe('ReviewForm', () => {
  it('valida comentario corto', () => {
    const onSubmit = vi.fn();
    render(
      <ToastProvider>
        <ReviewForm onSubmit={onSubmit} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getAllByRole('button', { name: /estrellas/i })[4]);
    fireEvent.change(screen.getByPlaceholderText(/comparte/i), { target: { value: 'corto' } });
    fireEvent.submit(screen.getByRole('button', { name: /publicar reseña/i }).closest('form'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/entre 10 y 500 caracteres/i)).toBeInTheDocument();
  });

  it('exige seleccionar estrellas', () => {
    const onSubmit = vi.fn();
    render(
      <ToastProvider>
        <ReviewForm onSubmit={onSubmit} />
      </ToastProvider>,
    );
    fireEvent.change(screen.getByPlaceholderText(/comparte/i), {
      target: { value: 'Comentario válido con más de diez caracteres.' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /publicar reseña/i }).closest('form'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/1 a 5 estrellas/i)).toBeInTheDocument();
  });
});
