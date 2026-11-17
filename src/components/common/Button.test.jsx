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
});
