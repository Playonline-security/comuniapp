import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from '../context/ToastContext';
import { AuthProvider } from '../context/AuthContext';
import { ServiceProvider } from '../context/ServiceContext';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import WelcomeView from '../views/Welcome/WelcomeView';
import LoginView from '../views/Auth/LoginView';
import RegisterView from '../views/Auth/RegisterView';
import HomeView from '../views/Home/HomeView';
import ServiceDetailView from '../views/ServiceDetail/ServiceDetailView';
import EntrepreneurDashboardView from '../views/DashboardEntrepreneur/EntrepreneurDashboardView';
import ServiceFormView from '../views/DashboardEntrepreneur/ServiceFormView';
import ProfileEditView from '../views/Profile/ProfileEditView';

export default function AppRoutes() {
  return (
    <HashRouter>
      <ToastProvider>
        <AuthProvider>
          <ServiceProvider>
            <Routes>
              <Route path="/" element={<WelcomeView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/registro" element={<RegisterView />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomeView />
                  </ProtectedRoute>
                }
              />
              <Route path="/servicio/:id" element={<ServiceDetailView />} />
              <Route
                path="/perfil"
                element={
                  <ProtectedRoute>
                    <ProfileEditView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/emprendedor"
                element={
                  <ProtectedRoute role="emprendedor">
                    <EntrepreneurDashboardView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/emprendedor/nuevo"
                element={
                  <ProtectedRoute role="emprendedor">
                    <ServiceFormView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/emprendedor/editar/:id"
                element={
                  <ProtectedRoute role="emprendedor">
                    <ServiceFormView />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ServiceProvider>
        </AuthProvider>
      </ToastProvider>
    </HashRouter>
  );
}
