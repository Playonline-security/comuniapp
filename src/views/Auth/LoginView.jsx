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

const DEMO_ACCOUNTS = [
  { label: 'Entrar como residente', email: 'alicia@residente.com', password: 'demo1234' },
  { label: 'Entrar como emprendedor', email: 'martha@cafe.com', password: 'demo1234' },
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

  const handleDemoLogin = (account) => {
    if (login(account.email, account.password)) {
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
        <section
          aria-labelledby="demo-access-title"
          aria-describedby="demo-access-help"
          className="rounded-2xl border border-brand-200/70 bg-brand-50/70 p-5"
        >
          <div className="flex flex-wrap items-center gap-2">
            <h3 id="demo-access-title" className="text-sm font-semibold text-brand-800">
              Acceso de demostración
            </h3>
            <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
              Prototipo
            </span>
          </div>
          <p id="demo-access-help" className="mt-2 text-sm leading-relaxed text-gray-600">
            Estos botones son solo un atajo para explorar el prototipo interactivo. También puedes
            iniciar sesión manualmente con las cuentas de demostración.
          </p>
          <div className="mt-4 grid gap-2">
            {DEMO_ACCOUNTS.map((account, index) => (
              <Button
                key={account.email}
                type="button"
                size="sm"
                variant={index === 0 ? 'primary' : 'secondary'}
                onClick={() => handleDemoLogin(account)}
              >
                {account.label}
              </Button>
            ))}
          </div>
          <div className="mt-4 space-y-1.5 border-t border-brand-200/70 pt-3 text-xs text-gray-600">
            <p>
              <span className="font-semibold text-gray-700">Residente:</span>{' '}
              <code className="font-mono">alicia@residente.com</code>
            </p>
            <p>
              <span className="font-semibold text-gray-700">Emprendedor:</span>{' '}
              <code className="font-mono">martha@cafe.com</code>
            </p>
            <p>
              <span className="font-semibold text-gray-700">Contraseña para ambas:</span>{' '}
              <code className="font-mono">demo1234</code>
            </p>
            <p className="text-gray-500">Son cuentas ficticias del prototipo, no usuarios reales.</p>
          </div>
        </section>

        <div className="my-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            o ingresa manualmente
          </span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

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
            className="rounded text-xs font-medium text-[#008A4B] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
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
      </div>
    </AuthLayout>
  );
}
