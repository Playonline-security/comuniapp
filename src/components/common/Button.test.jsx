import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renderiza hijos y responde al click', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Guardar</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('aplica variante danger', () => {
    render(<Button variant="danger">Eliminar</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-600');
  });

  it('usa color sólido en la variante primary', () => {
    render(<Button>Guardar</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-brand-600');
    expect(button).not.toHaveClass('bg-gradient-to-r');
  });

  it('aplica variante light', () => {
    render(<Button variant="light">Cuenta</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-white', 'text-brand-800');
  });
});
