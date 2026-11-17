import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, Users, HeartHandshake } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import AuthLayout from './AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const LOGIN_FEATURES = [
  { icon: Store, title: 'Servicios Locales', description: 'Accede a más de 500 servicios en Mistrató' },
  { icon: Users, title: 'Emprendedores Locales', description: 'Apoya la economía de tu municipio' },
  { icon: HeartHandshake, title: 'Comunidad Unida', description: '1,000+ mistrateños conectados' },
];

export default function LoginView() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!email.trim()) next.email = 'Ingresa tu correo electrónico.';
    if (!password) next.password = 'Ingresa tu contraseña.';
    if (Object.keys(next).length) {
      setErrors(next);
      showToast('Completa los campos obligatorios.', 'error');
      return;
    }
    setErrors({});
    if (login(email, password)) {
      showToast('¡Sesión iniciada correctamente!');
      navigate('/home');
    }
  };

  return (
    <AuthLayout
      title="Bienvenido de Nuevo"
      subtitle="Tu comunidad en Mistrató te está esperando. Conecta con emprendedores y servicios locales."
      features={LOGIN_FEATURES}
      showBack
    >
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
        <p className="mt-2 text-base text-gray-600">Accede a tu cuenta de ComuniApp</p>
      </div>

      <div className="rounded-2xl border border-brand-200/50 bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="login-email"
            label="Correo Electrónico"
            type="email"
            placeholder="tu@ejemplo.com"
            hint="Usa el correo con el que te registraste."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="email"
          />
          <Input
            id="login-password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            hint="Mínimo 6 caracteres."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="text-xs font-medium text-[#008A4B] hover:underline"
            onClick={() => showToast('Recuperación de contraseña no disponible en la demo.', 'info')}
          >
            ¿Olvidaste tu contraseña?
          </button>
          <Button type="submit" className="w-full rounded-3xl" size="lg">
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-6 border-t border-gray-100 pt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" className="font-semibold text-brand-600 hover:underline">
            Regístrate aquí
          </Link>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Demo: alicia@residente.com o martha@cafe.com — contraseña demo1234
        </p>
      </div>
    </AuthLayout>
  );
}
