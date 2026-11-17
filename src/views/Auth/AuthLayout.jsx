import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { IMAGES } from '../../constants/images';
import logo from '../../assets/logo.svg';

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-4 rounded-3xl border border-white/30 bg-white/20 p-5 text-left backdrop-blur-sm">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-accent-400/60">
        <Icon className="h-6 w-6 text-white" aria-hidden />
      </div>
      <div>
        <p className="text-lg font-semibold text-white">{title}</p>
        <p className="text-sm text-brand-100">{description}</p>
      </div>
    </div>
  );
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  features = [],
  showBack = true,
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative hidden min-h-[320px] flex-1 overflow-hidden bg-gradient-to-br from-brand-600 to-[#004f3b] lg:flex lg:min-h-screen">
        <img src={IMAGES.authPanel} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative z-10 flex flex-1 items-center justify-center p-8 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">{title}</h1>
              <p className="mx-auto mt-3 max-w-sm text-lg leading-relaxed text-brand-100">{subtitle}</p>
            </div>
            {features.length > 0 && (
              <div className="mt-8 flex flex-col gap-4">
                {features.map((f) => (
                  <FeatureCard key={f.title} {...f} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-brand-500/[0.03] via-white to-accent-400/[0.03] px-6 py-12 sm:px-12">
        {showBack && (
          <Link
            to="/"
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-brand-50 hover:text-brand-700 sm:left-8 sm:top-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Inicio
          </Link>
        )}

        <div className="mb-8 flex w-full max-w-md flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-3xl bg-brand-500/20 blur-2xl" aria-hidden />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg">
              <img src={logo} alt="" className="h-10 w-10" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">ComuniApp</p>
          <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-gray-500">
            <MapPin className="h-4 w-4 text-brand-600" aria-hidden />
            Mistrató, Risaralda
          </p>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
