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

  it('cierra con Escape, bloquea el scroll y enfoca el botón de cierre', () => {
    const onClose = vi.fn();
    render(<ContactModal entrepreneur={entrepreneur} service={service} onClose={onClose} />);

    expect(document.body.style.overflow).toBe('hidden');
    expect(screen.getByRole('button', { name: 'Cerrar modal' })).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('mantiene el foco dentro del diálogo al tabular', () => {
    render(<ContactModal entrepreneur={entrepreneur} service={service} onClose={() => {}} />);

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(screen.getByRole('button', { name: 'Entendido' })).toHaveFocus();

    screen.getByRole('button', { name: 'Entendido' }).focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Cerrar modal' })).toHaveFocus();
  });

  it('recupera el foco si queda fuera del diálogo', () => {
    render(<ContactModal entrepreneur={entrepreneur} service={service} onClose={() => {}} />);

    const closeButton = screen.getByRole('button', { name: 'Cerrar modal' });
    closeButton.blur();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(closeButton).toHaveFocus();
  });

  it('evita la navegación de los enlaces sociales', () => {
    render(<ContactModal entrepreneur={entrepreneur} service={service} onClose={() => {}} />);

    const facebook = screen.getByText('@AromaDeMistrato');
    const instagram = screen.getByText('@CafeDonaMartha');
    fireEvent.click(facebook);
    fireEvent.click(instagram);

    expect(facebook).toHaveAttribute('href', '#');
    expect(instagram).toHaveAttribute('href', '#');
  });

  it('muestra solo las redes sociales disponibles', () => {
    render(
      <ContactModal
        entrepreneur={{ ...entrepreneur, facebook: '', instagram: '@SoloInstagram' }}
        service={service}
        onClose={() => {}}
      />,
    );

    expect(screen.getByText('@SoloInstagram')).toBeInTheDocument();
    expect(screen.queryByText('@AromaDeMistrato')).not.toBeInTheDocument();
  });

  it('oculta la sección social y WhatsApp sin datos de contacto', () => {
    render(
      <ContactModal
        entrepreneur={{ name: 'Sin redes', phone: '', whatsapp: '', facebook: '', instagram: '' }}
        service={service}
        onClose={() => {}}
      />,
    );

    expect(screen.queryByText('@SoloInstagram')).not.toBeInTheDocument();
    expect(screen.queryByText(/Contactar por WhatsApp/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entendido' })).toBeInTheDocument();
  });
});
