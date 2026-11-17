import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 [&_span]:text-white">
              <Logo showText />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Plataforma digital para conectar emprendedores locales con la comunidad de Mistrató.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Acceso rápido</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#/registro" className="hover:text-brand-200">
                  Registrarse
                </a>
              </li>
              <li>
                <a href="#/login" className="hover:text-brand-200">
                  Iniciar sesión
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Nuestra Tierra</h4>
            <p className="text-sm">Mistrató, Risaralda · Colombia</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-800 pt-8 text-sm">
          <p>© 2026 ComuniApp — Hecho con ❤️ para Mistrató</p>
          <div className="flex items-center gap-2">
            <span className="h-4 w-6 rounded bg-brand-500" />
            <span className="h-4 w-6 rounded bg-white" />
            <span className="h-4 w-6 rounded bg-accent-400" />
            <span className="text-gray-500">Colores de nuestra bandera</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
