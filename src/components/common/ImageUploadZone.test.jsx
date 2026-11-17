import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageUploadZone from './ImageUploadZone';

describe('ImageUploadZone', () => {
  it('abre el selector con Enter y Espacio', () => {
    const { container } = render(<ImageUploadZone value={null} onChange={() => {}} />);
    const zone = screen.getByRole('button');
    const input = container.querySelector('input[type="file"]');
    const click = vi.spyOn(input, 'click').mockImplementation(() => {});

    fireEvent.keyDown(zone, { key: ' ' });
    expect(click).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(zone, { key: 'Enter' });
    expect(click).toHaveBeenCalledTimes(2);
  });

  it('muestra el error asociado a la zona', () => {
    render(<ImageUploadZone value={null} onChange={() => {}} error="Imagen no válida" />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Imagen no válida');
  });

  it('permite quitar la imagen seleccionada', () => {
    const onChange = vi.fn();
    render(<ImageUploadZone value="/imagen.jpg" onChange={onChange} />);

    expect(screen.getByAltText('Vista previa')).toHaveAttribute('src', '/imagen.jpg');
    fireEvent.click(screen.getByRole('button', { name: 'Quitar imagen' }));
    expect(onChange).toHaveBeenCalledWith(null);
  });
});
