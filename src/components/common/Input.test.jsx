import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('asocia el error con aria-invalid y aria-describedby', () => {
    render(<Input label="Correo" name="email" error="Correo no válido" />);

    const input = screen.getByLabelText('Correo');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
    expect(screen.getByRole('alert')).toHaveTextContent('Correo no válido');
  });

  it('asocia la ayuda cuando no hay error', () => {
    render(<Input label="Correo" name="email" hint="Usa tu correo personal" />);

    const input = screen.getByLabelText('Correo');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).toHaveAttribute('aria-describedby', 'email-hint');
    expect(screen.getByText('Usa tu correo personal')).toHaveAttribute('id', 'email-hint');
  });

  it('prioriza el error sobre la ayuda', () => {
    render(<Input label="Correo" id="correo" hint="Ayuda" error="Error" />);

    const input = screen.getByLabelText('Correo');
    expect(input).toHaveAttribute('aria-describedby', 'correo-error');
    expect(screen.queryByText('Ayuda')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Error');
  });

  it('funciona sin etiqueta usando el nombre como id', () => {
    render(<Input name="telefono" placeholder="Teléfono" />);

    const input = screen.getByPlaceholderText('Teléfono');
    expect(input).toHaveAttribute('id', 'telefono');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('renderiza sin ayuda ni error', () => {
    render(<Input label="Nombre" />);

    const input = screen.getByLabelText('Nombre');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).not.toHaveAttribute('aria-describedby');
  });
});
