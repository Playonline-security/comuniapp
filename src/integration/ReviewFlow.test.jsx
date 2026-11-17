import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider } from '../context/ToastContext';
import { AuthProvider } from '../context/AuthContext';
import { ServiceProvider } from '../context/ServiceContext';
import ServiceDetailView from '../views/ServiceDetail/ServiceDetailView';
import { resetStorage, saveState, loadState } from '../services/storage';

function renderDetail(serviceId = 'svc-cafe') {
  return render(
    <MemoryRouter initialEntries={[`/servicio/${serviceId}`]}>
      <ToastProvider>
        <AuthProvider>
          <ServiceProvider>
            <Routes>
              <Route path="/servicio/:id" element={<ServiceDetailView />} />
            </Routes>
          </ServiceProvider>
        </AuthProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe('Review flow', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStorage();
    const state = loadState();
    state.session = { id: 'user-alicia', name: 'Alicia', email: 'alicia@residente.com', role: 'residente' };
    saveState(state);
  });

  it('envía reseña y la muestra en la lista', async () => {
    renderDetail();
    expect(screen.getByRole('heading', { name: /Café Orgánico de Mistrató/i })).toBeInTheDocument();

    const stars = screen.getAllByRole('button', { name: /estrellas/i });
    await userEvent.click(stars[4]);
    await userEvent.type(
      screen.getByPlaceholderText(/comparte tu experiencia/i),
      'Un comentario nuevo de prueba con suficiente longitud.',
    );
    await userEvent.click(screen.getByRole('button', { name: /publicar reseña/i }));

    await waitFor(() => {
      expect(screen.getByText(/comentario nuevo de prueba/i)).toBeInTheDocument();
    });
  });
});

describe('Contact flow', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStorage();
  });

  it('abre contacto dinámico para guía turística', async () => {
    renderDetail('svc-guia');
    expect(screen.getByRole('heading', { name: /Guía Turística/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /contactar/i }));
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Información de Contacto/i })).toBeInTheDocument();
      expect(screen.getByText(/\+57 310 222 3344/i)).toBeInTheDocument();
      expect(screen.getByText(/Contactar por WhatsApp/i)).toBeInTheDocument();
    });
  });
});
