import { useMemo, useState } from 'react';
import { Search, SearchX } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useServices } from '../../context/ServiceContext';
import { CATEGORIES, SORT_OPTIONS } from '../../constants/categories';
import { filterAndSortServices } from '../../utils/serviceHelpers';
import MainLayout from '../../components/layout/MainLayout';
import ServiceCard from '../../components/common/ServiceCard';
import Button from '../../components/common/Button';

export default function HomeView() {
  const { user } = useAuth();
  const { services } = useServices();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('todos');
  const [sort, setSort] = useState('name-asc');

  const filtered = useMemo(
    () => filterAndSortServices(services, { search, category, sort }),
    [services, search, category, sort],
  );

  const greeting = user?.name?.split(' ')[0] || 'visitante';

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-500 to-brand-600 p-8 text-white shadow-lg md:p-12">
          <h1 className="text-3xl font-bold md:text-4xl">¡Hola, {greeting}! 👋</h1>
          <p className="mt-2 text-brand-100">Contacta con más de 300 emprendedores en tu área</p>
        </div>

        <div className="sticky top-20 z-30 mt-8 rounded-3xl border border-brand-200/50 bg-white/95 p-4 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                aria-hidden
              />
              <input
                type="search"
                placeholder="Buscar productos y servicios en Mistrató..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-3xl border-2 border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                aria-label="Buscar servicios"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              aria-label="Ordenar"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Categorías</h2>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                aria-pressed={category === cat.id}
                className={`shrink-0 rounded-3xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                  category === cat.id
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md'
                    : 'border-2 border-gray-200 bg-white text-gray-700 hover:border-brand-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <SearchX className="h-7 w-7" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">No encontramos servicios</h2>
              <p className="mt-2 max-w-md text-gray-500">
                Prueba con otra palabra o cambia de categoría para ver más resultados.
              </p>
              <Button
                variant="secondary"
                className="mt-6"
                onClick={() => {
                  setSearch('');
                  setCategory('todos');
                  setSort('name-asc');
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
