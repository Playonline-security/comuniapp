import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gift, Sparkles, Users, TrendingUp, User, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import AuthLayout from './AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const REGISTER_FEATURES = [
  { icon: Gift, title: 'Gratis', description: 'Sin costos ocultos ni suscripciones' },
  { icon: Sparkles, title: 'Fácil de usar', description: 'Interfaz diseñada para todos' },
  { icon: Users, title: 'Comunidad local', description: 'Conecta con tus vecinos' },
  { icon: TrendingUp, title: 'Impulsa tu Negocio', description: 'Si eres emprendedor, publica tus servicios' },
];

function RoleCard({ role, selected, onSelect, icon: Icon, title, subtitle }) {
  const active = selected === role;
  return (
    <button
      type="button"
      onClick={() => onSelect(role)}
      className={`flex flex-1 flex-col items-center rounded-3xl border-2 px-5 py-6 transition ${
        active
          ? 'border-brand-700 bg-brand-50 text-brand-800'
          : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
      }`}
    >
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-[14px] ${
          active ? 'bg-brand-700 text-white' : 'bg-gray-200 text-gray-600'
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm font-semibold capitalize">{title}</span>
      <span className={`mt-1 text-xs font-medium ${active ? 'text-brand-700' : 'text-gray-500'}`}>
        {subtitle}
      </span>
    </button>
  );
}

export default function RegisterView() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'residente',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Ingresa tu nombre completo.';
    if (!isValidEmail(form.email)) next.email = 'Correo electrónico no válido.';
    if (!isValidPassword(form.password)) next.password = 'Mínimo 6 caracteres.';
    if (form.password !== form.confirmPassword) next.confirmPassword = 'Las contraseñas no coinciden.';
    if (Object.keys(next).length) {
      setErrors(next);
      showToast('Revisa los campos del formulario.', 'error');
      return;
    }
    setErrors({});
    if (register({ name: form.name, email: form.email, password: form.password, role: form.role })) {
      showToast('¡Bienvenido a ComuniApp!');
      navigate('/home');
    }
  };

  return (
    <AuthLayout
      title="Únete a ComuniApp"
      subtitle="Forma parte de la red de emprendedores y servicios de Mistrató, Risaralda."
      features={REGISTER_FEATURES}
      showBack
    >
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Crear Cuenta</h2>
        <p className="mt-2 text-base text-gray-600">Únete a la comunidad de Mistrató</p>
      </div>

      <div className="rounded-3xl border border-brand-200/50 bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-700">¿Cómo te quieres registrar?</p>
            <div className="flex gap-3">
              <RoleCard
                role="residente"
                selected={form.role}
                onSelect={(role) => setForm({ ...form, role })}
                icon={User}
                title="Residente"
                subtitle="Buscar servicios"
              />
              <RoleCard
                role="emprendedor"
                selected={form.role}
                onSelect={(role) => setForm({ ...form, role })}
                icon={Briefcase}
                title="Emprendedor"
                subtitle="Ofrecer servicios"
              />
            </div>
          </div>

          <Input
            label="Nombre Completo"
            placeholder="Juan Pérez"
            hint="Como aparecerá en tu perfil."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
            required
          />
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="tu@ejemplo.com"
            hint="Te enviaremos notificaciones importantes a este correo."
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="Mínimo 6 caracteres"
            hint="Usa al menos 6 caracteres con letras y números."
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            required
          />
          <Input
            label="Confirmar Contraseña"
            type="password"
            placeholder="Repite tu contraseña"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            required
          />

          <Button type="submit" className="w-full rounded-3xl" size="lg">
            Crear Cuenta
          </Button>
        </form>

        <div className="mt-6 border-t border-gray-100 pt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
