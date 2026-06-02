import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageGallery from './ImageGallery';

describe('ImageGallery', () => {
  it('muestra mensaje sin imágenes', () => {
    render(<ImageGallery images={[]} />);
    expect(screen.getByText(/sin imágenes/i)).toBeInTheDocument();
  });

  it('cambia imagen activa en miniaturas', () => {
    render(<ImageGallery images={['/a.jpg', '/b.jpg']} alt="Test" />);
    const thumbs = screen.getAllByRole('button');
    fireEvent.click(thumbs[1]);
    expect(screen.getByAltText('Test')).toHaveAttribute('src', '/b.jpg');
  });
});
