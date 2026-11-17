import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '../context/ToastContext';
import { AuthProvider } from '../context/AuthContext';
import { ServiceProvider } from '../context/ServiceContext';

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ToastProvider>
        <AuthProvider>
          <ServiceProvider>{ui}</ServiceProvider>
        </AuthProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}
