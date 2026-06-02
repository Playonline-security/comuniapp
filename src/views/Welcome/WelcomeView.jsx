import { Link } from 'react-router-dom';
import {
  Search,
  TrendingUp,
  Users,
  ChevronRight,
  MapPin,
  UserCircle,
  Store,
} from 'lucide-react';
import { IMAGES } from '../../constants/images';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button';
const whyCards = [
  {
    title: 'Búsqueda Local',
    desc: 'Encuentra fácilmente servicios en Mistrató, organizados por categorías que conoces: agricultura, turismo, artesanías y más.',
    stat: 'Más de 500 servicios',
    statColor: 'text-brand-600',
    icon: Search,
    iconBg: 'from-brand-100 to-brand-50',
    iconColor: 'text-brand-600',
  },
  {
    title: 'Economía Local',
    desc: 'Apoya a tus vecinos emprendedores. Cada servicio que contratas fortalece la economía de nuestro municipio.',
    stat: '100+ emprendedores locales',
    statColor: 'text-[#D08700]',
    icon: TrendingUp,
    iconBg: 'from-[#FEF9C2] to-[#FFFBEB]',
    iconColor: 'text-[#D08700]',
  },
  {
    title: 'Comunidad Unida',
    desc: 'Conecta con tus vecinos. Información confiable y contacto directo con personas que conoces y en quienes confías.',
    stat: 'Hecho en Mistrató',
    statColor: 'text-brand-600',
    icon: Users,
    iconBg: 'from-brand-100 to-brand-50',
    iconColor: 'text-brand-600',
  },
];

const residentBenefits = [
  'Encuentra productos y servicios locales verificados rápidamente.',
  'Contacta directamente con los proveedores vía telefónica o WhatsApp.',
  'Apoya la economía y el talento de nuestro municipio.',
];

const entrepreneurBenefits = [
  'Crea un perfil profesional para tu negocio o servicio.',
  'Publica tu portafolio, precios y fotos detalladas.',
  'Obtén mayor visibilidad y nuevos clientes en la región.',
];

export default function WelcomeView() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative min-h-[85vh] overflow-hidden">
        <img src={IMAGES.welcomeHero} alt="Paisaje de Mistrató" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/85 via-brand-800/70 to-brand-900/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/60 bg-white/90 px-4 py-2 text-sm font-semibold text-brand-700 shadow-md backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            Plataforma Local
            <span className="text-gray-400">·</span>
            <MapPin className="h-3.5 w-3.5 text-gray-500" />
            Mistrató, Risaralda
          </span>
          <h1 className="mt-8 max-w-4xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-7xl lg:leading-[1.1]">
            Nuestra comunidad, ahora más{' '}
            <span className="text-accent-400">conectada</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-brand-100 sm:text-xl">
            ComuniApp es el puente digital entre nuestros emprendedores y residentes. Apoya el comercio local y
            hagamos crecer nuestra economía juntos.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/registro">
              <Button variant="accent" size="lg" className="min-w-[220px]">
                Únete a la Comunidad
              </Button>
            </Link>
            <Link to="/home">
              <Button
                size="lg"
                className="min-w-[220px] !border-2 !border-[rgba(0,212,146,0.3)] !bg-[#57D796] !text-black shadow-md hover:!brightness-105"
              >
                Explorar Servicios
                <ChevronRight className="ml-2 inline h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ¿Por qué usar ComuniApp? */}
      <section className="bg-gradient-to-br from-brand-500/[0.03] via-white to-accent-400/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">¿Por qué usar ComuniApp?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Una plataforma diseñada especialmente para fortalecer la economía y comunidad de Mistrató
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {whyCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="flex flex-col rounded-3xl border border-brand-500/10 bg-white p-8 shadow-sm transition hover:shadow-md"
                >
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${card.iconBg}`}
                  >
                    <Icon className={`h-8 w-8 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                  <p className="mt-3 flex-1 text-gray-600 leading-relaxed">{card.desc}</p>
                  <div className="mt-6 flex items-center gap-2 border-t border-gray-100 pt-4">
                    <span className={`text-sm font-medium ${card.statColor}`}>{card.stat}</span>
                    <ChevronRight className={`h-4 w-4 ${card.statColor}`} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dos formas de participar */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Dos formas de <span className="text-brand-600">participar</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
              Nuestra plataforma está diseñada para organizar la oferta y demanda del municipio, con perfiles
              específicos para cada necesidad.
            </p>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <article className="rounded-[32px] border border-slate-100 bg-white p-10 shadow-xl">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-100 shadow-sm">
                <UserCircle className="h-10 w-10 text-brand-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Como Residente</h3>
              <ul className="mt-6 space-y-5">
                {residentBenefits.map((text) => (
                  <li key={text} className="flex gap-3 text-lg text-gray-600">
                    <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-brand-500" />
                    {text}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-[32px] border border-slate-100 bg-white p-10 shadow-xl">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FEF3C6] shadow-sm">
                <Store className="h-10 w-10 text-[#E17100]" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Como Emprendedor</h3>
              <ul className="mt-6 space-y-5">
                {entrepreneurBenefits.map((text) => (
                  <li key={text} className="flex gap-3 text-lg text-gray-600">
                    <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-[#FE9A00]" />
                    {text}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-16 text-center shadow-xl sm:px-16">
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden />
          <h2 className="text-3xl font-bold text-white sm:text-4xl">¿Listo para unirte a tu comunidad?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
            Más de 1,000 mistrateños ya están conectados. Sé parte del cambio en nuestro municipio.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/registro">
              <Button variant="accent" size="lg" className="min-w-[200px]">
                Crea una cuenta
              </Button>
            </Link>
            <Link
              to="/login"
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-3xl border border-gray-200 !bg-white px-6 text-sm font-semibold !text-black shadow-sm transition-colors hover:!bg-gray-100"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
