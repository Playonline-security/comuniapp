import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Home, LayoutGrid, UserPen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from './Logo';
import Button from '../common/Button';

export default function Navbar() {
  const { user, isAuthenticated, isEntrepreneur, logout, getCurrentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const profile = getCurrentUser();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const avatarSrc = profile?.avatar;

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/85 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Logo />
        <nav className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Ingresar
                </Button>
              </Link>
              <Link to="/registro">
                <Button size="sm">Únete Ahora</Button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-2xl border-l border-gray-200 pl-4 transition hover:bg-gray-50"
                aria-expanded={open}
                aria-haspopup="true"
              >
                {avatarSrc ? (
                  <img src={avatarSrc} alt="" className="h-10 w-10 rounded-xl border-2 border-brand-200 object-cover" />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-brand-200 bg-gradient-to-br from-brand-100 to-brand-50 text-sm font-bold text-brand-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="hidden font-semibold text-gray-900 sm:inline">{user.name}</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && (
                <>
                  <button type="button" className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-label="Cerrar menú" />
                  <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
                    <div className="border-b border-gray-100 px-4 py-2">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs capitalize text-gray-500">{user.role}</p>
                    </div>
                    <Link
                      to="/home"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-brand-50"
                      onClick={() => setOpen(false)}
                    >
                      <Home className="h-4 w-4 text-brand-600" />
                      Inicio
                    </Link>
                    <Link
                      to="/perfil"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-brand-50"
                      onClick={() => setOpen(false)}
                    >
                      <UserPen className="h-4 w-4 text-brand-600" />
                      Editar perfil
                    </Link>
                    {isEntrepreneur && (
                      <Link
                        to="/emprendedor"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-brand-50"
                        onClick={() => setOpen(false)}
                      >
                        <LayoutGrid className="h-4 w-4 text-brand-600" />
                        Mis publicaciones
                      </Link>
                    )}
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
