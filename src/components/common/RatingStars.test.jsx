import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RatingStars, { RatingDisplay } from './RatingStars';

describe('RatingStars', () => {
  it('permite seleccionar estrellas', () => {
    const onChange = vi.fn();
    render(<RatingStars value={0} onChange={onChange} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[4]);
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('mantiene estrellas doradas al seleccionar', () => {
    const { rerender } = render(<RatingStars value={0} onChange={() => {}} />);
    fireEvent.click(screen.getAllByRole('button')[2]);
    rerender(<RatingStars value={3} onChange={() => {}} />);
    const stars = screen.getAllByRole('button');
    expect(stars[0].querySelector('svg')).toHaveAttribute('fill', 'currentColor');
    expect(stars[4].querySelector('svg')).toHaveAttribute('fill', 'none');
  });

  it('muestra promedio en RatingDisplay', () => {
    render(<RatingDisplay average={4.8} count={12} />);
    expect(screen.getByText('4.8 / 5')).toBeInTheDocument();
    expect(screen.getByText('(12)')).toBeInTheDocument();
  });
});
