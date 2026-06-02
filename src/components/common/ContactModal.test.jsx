import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactModal from './ContactModal';

describe('ContactModal', () => {
  const entrepreneur = {
    name: 'Martha Cecilia Gutiérrez',
    phone: '3004567890',
    instagram: '@CafeDonaMartha',
    facebook: '@AromaDeMistrato',
    whatsapp: '3004567890',
  };

  const service = {
    title: 'Café Orgánico de Mistrató',
  };

  it('muestra datos de contacto formateados y cierra', () => {
    const onClose = vi.fn();
    render(<ContactModal entrepreneur={entrepreneur} service={service} onClose={onClose} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Información de Contacto')).toBeInTheDocument();
    expect(screen.getByText('+57 300 456 7890')).toBeInTheDocument();
    expect(screen.getByText('Martha Cecilia Gutiérrez')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Entendido' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('no renderiza sin emprendedor', () => {
    const { container } = render(<ContactModal entrepreneur={null} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('muestra enlaces de redes sociales', () => {
    render(<ContactModal entrepreneur={entrepreneur} service={service} onClose={() => {}} />);
    expect(screen.getByText('@CafeDonaMartha')).toBeInTheDocument();
    expect(screen.getByText('@AromaDeMistrato')).toBeInTheDocument();
    expect(screen.getByText(/Contactar por WhatsApp/i)).toBeInTheDocument();
  });
});
