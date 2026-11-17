import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import {
  isValidDescription,
  isValidPrice,
  isValidRating,
  isValidReviewComment,
  isValidTitle,
} from '../utils/validators';

const ServiceContext = createContext(null);

export function ServiceProvider({ children }) {
  const [state, persist] = useLocalStorage();
  const { user } = useAuth();
  const { showToast } = useToast();

  const services = state.services;

  const getServiceById = useCallback((id) => services.find((s) => s.id === id), [services]);

  const addService = useCallback(
    (payload) => {
      if (!user || user.role !== 'emprendedor') {
        showToast('Solo emprendedores pueden publicar.', 'error');
        return false;
      }
      if (!isValidTitle(payload.title) || !isValidDescription(payload.description) || !isValidPrice(payload.price)) {
        showToast('Revisa los campos del formulario.', 'error');
        return false;
      }
      const service = {
        id: `svc-${Date.now()}`,
        entrepreneurId: user.id,
        entrepreneurName: user.name,
        reviews: [],
        createdAt: new Date().toISOString(),
        ...payload,
        title: payload.title.trim(),
        description: payload.description.trim(),
        price: Number(payload.price),
      };
      persist((s) => ({ ...s, services: [service, ...s.services] }));
      showToast('Publicación creada con éxito.');
      return true;
    },
    [user, persist, showToast],
  );

  const updateService = useCallback(
    (id, payload) => {
      const existing = services.find((s) => s.id === id);
      if (!existing || existing.entrepreneurId !== user?.id) {
        showToast('No tienes permiso para editar esta publicación.', 'error');
        return false;
      }
      persist((s) => ({
        ...s,
        services: s.services.map((svc) =>
          svc.id === id
            ? {
                ...svc,
                ...payload,
                title: payload.title?.trim() ?? svc.title,
                description: payload.description?.trim() ?? svc.description,
                price: Number(payload.price ?? svc.price),
              }
            : svc,
        ),
      }));
      showToast('Publicación actualizada.');
      return true;
    },
    [services, user, persist, showToast],
  );

  const deleteService = useCallback(
    (id) => {
      const existing = services.find((s) => s.id === id);
      if (!existing || existing.entrepreneurId !== user?.id) {
        showToast('No tienes permiso para eliminar esta publicación.', 'error');
        return false;
      }
      persist((s) => ({ ...s, services: s.services.filter((svc) => svc.id !== id) }));
      showToast('Publicación eliminada.');
      return true;
    },
    [services, user, persist, showToast],
  );

  const addReview = useCallback(
    (serviceId, { rating, comment }) => {
      if (!user) {
        showToast('Debes iniciar sesión para dejar una reseña.', 'error');
        return false;
      }
      const target = services.find((s) => s.id === serviceId);
      if (!target) return false;
      if (target.entrepreneurId === user.id) {
        showToast('No puedes reseñar tu propia publicación.', 'error');
        return false;
      }
      if (user.role !== 'residente' && user.role !== 'emprendedor') {
        showToast('No tienes permiso para dejar reseñas.', 'error');
        return false;
      }
      if (!isValidRating(rating) || !isValidReviewComment(comment)) {
        showToast('La calificación debe ser 1-5 y el comentario entre 10 y 500 caracteres.', 'error');
        return false;
      }
      const review = {
        id: `rev-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        rating: Number(rating),
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
      };
      persist((s) => ({
        ...s,
        services: s.services.map((svc) =>
          svc.id === serviceId ? { ...svc, reviews: [review, ...(svc.reviews || [])] } : svc,
        ),
      }));
      showToast('¡Gracias por tu reseña!');
      return true;
    },
    [user, services, persist, showToast],
  );

  const value = useMemo(
    () => ({
      services,
      getServiceById,
      addService,
      updateService,
      deleteService,
      addReview,
    }),
    [services, getServiceById, addService, updateService, deleteService, addReview],
  );

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>;
}

export function useServices() {
  const ctx = useContext(ServiceContext);
  if (!ctx) throw new Error('useServices debe usarse dentro de ServiceProvider');
  return ctx;
}
