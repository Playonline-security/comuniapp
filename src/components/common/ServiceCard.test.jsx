import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import { IMAGES } from '../../constants/images';

const service = {
  id: 'svc-1',
  title: 'Café Orgánico',
  description: 'Café de calidad',
  entrepreneurName: 'Martha',
  category: 'agricultura',
  price: 15000,
  images: [IMAGES.cafeOrganico],
  reviews: [{ rating: 5 }, { rating: 4 }],
};

describe('ServiceCard', () => {
  it('muestra título, precio e imagen local', () => {
    render(
      <MemoryRouter>
        <ServiceCard service={service} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Café Orgánico')).toBeInTheDocument();
    const imgs = screen.getAllByRole('img');
    const cardImg = imgs.find((el) => el.getAttribute('alt') === 'Café Orgánico');
    expect(cardImg).toHaveAttribute('src', IMAGES.cafeOrganico);
    expect(screen.getByText('Detalles')).toBeInTheDocument();
  });
});
