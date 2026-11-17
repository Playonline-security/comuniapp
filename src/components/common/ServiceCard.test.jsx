import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
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

function renderCard() {
  return render(
    <MemoryRouter initialEntries={['/home']}>
      <Routes>
        <Route path="/home" element={<ServiceCard service={service} />} />
        <Route path="/servicio/:id" element={<p>Detalle del servicio</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ServiceCard', () => {
  it('muestra título, precio e imagen local', () => {
    renderCard();
    expect(screen.getByText('Café Orgánico')).toBeInTheDocument();
    const imgs = screen.getAllByRole('img');
    const cardImg = imgs.find((el) => el.getAttribute('alt') === 'Café Orgánico');
    expect(cardImg).toHaveAttribute('src', IMAGES.cafeOrganico);
    expect(screen.getByText('Detalles')).toBeInTheDocument();
  });

  it('enlaza la tarjeta completa con el detalle del servicio', () => {
    renderCard();
    const link = screen.getByRole('link', { name: 'Ver detalles de Café Orgánico' });
    expect(link).toHaveAttribute('href', '/servicio/svc-1');
  });

  it('navega al detalle al hacer clic sobre la tarjeta', async () => {
    const user = userEvent.setup();
    renderCard();
    await user.click(screen.getByText('Café Orgánico'));
    expect(screen.getByText('Detalle del servicio')).toBeInTheDocument();
  });
});
