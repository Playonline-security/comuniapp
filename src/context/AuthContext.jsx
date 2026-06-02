import { createContext, useCallback, useContext, useMemo } from 'react';
import { isValidEmail, isValidPassword } from '../utils/validators';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, persist] = useLocalStorage();
  const { showToast } = useToast();

  const user = state.session;

  const login = useCallback(
    (email, password) => {
      const found = state.users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
      );
      if (!found) {
        showToast('Correo o contraseña incorrectos.', 'error');
        return false;
      }
      persist((s) => ({
        ...s,
        session: { id: found.id, name: found.name, email: found.email, role: found.role },
      }));
      showToast(`¡Bienvenido, ${found.name}!`);
      return true;
    },
    [state.users, persist, showToast],
  );

  const register = useCallback(
    ({ name, email, password, role }) => {
      if (!isValidEmail(email)) {
        showToast('Ingresa un correo electrónico válido.', 'error');
        return false;
      }
      if (!isValidPassword(password)) {
        showToast('La contraseña debe tener al menos 6 caracteres.', 'error');
        return false;
      }
      if (state.users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
        showToast('Este correo ya está registrado.', 'error');
        return false;
      }
      const newUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
        phone: '',
        bio: '',
        avatar: null,
        instagram: '',
        facebook: '',
        businessName: role === 'emprendedor' ? '' : undefined,
      };
      persist((s) => ({
        ...s,
        users: [...s.users, newUser],
        session: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      }));
      showToast('¡Cuenta creada con éxito!');
      return true;
    },
    [state.users, persist, showToast],
  );

  const logout = useCallback(() => {
    persist((s) => ({ ...s, session: null }));
    showToast('Sesión cerrada correctamente.');
  }, [persist, showToast]);

  const getUserById = useCallback(
    (id) => state.users.find((u) => u.id === id) || null,
    [state.users],
  );

  const getCurrentUser = useCallback(() => {
    if (!user) return null;
    return state.users.find((u) => u.id === user.id) || null;
  }, [user, state.users]);

  const updateProfile = useCallback(
    (payload) => {
      if (!user) return false;
      if (!payload.name?.trim()) {
        showToast('El nombre es obligatorio.', 'error');
        return false;
      }
      persist((s) => ({
        ...s,
        users: s.users.map((u) =>
          u.id === user.id
            ? {
                ...u,
                name: payload.name.trim(),
                phone: payload.phone?.trim() || '',
                bio: payload.bio?.trim() || '',
                avatar: payload.avatar ?? u.avatar,
                instagram: payload.instagram?.trim() || '',
                facebook: payload.facebook?.trim() || '',
                ...(u.role === 'emprendedor' ? { businessName: payload.businessName?.trim() || '' } : {}),
              }
            : u,
        ),
        session: { ...s.session, name: payload.name.trim() },
      }));
      showToast('Perfil actualizado correctamente.');
      return true;
    },
    [user, persist, showToast],
  );

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      getUserById,
      getCurrentUser,
      updateProfile,
      isAuthenticated: !!user,
      isEntrepreneur: user?.role === 'emprendedor',
      isResident: user?.role === 'residente',
    }),
    [user, login, register, logout, getUserById, getCurrentUser, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
