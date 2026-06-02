import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useServices } from '../../context/ServiceContext';
import { CATEGORIES, SORT_OPTIONS } from '../../constants/categories';
import { filterAndSortServices } from '../../utils/serviceHelpers';
import MainLayout from '../../components/layout/MainLayout';
import ServiceCard from '../../components/common/ServiceCard';

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

        <div className="mt-8 rounded-3xl border border-brand-200/50 bg-white p-4 shadow-lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="hidden rounded-xl bg-brand-100 p-3 text-brand-600 sm:inline-flex">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="search"
              placeholder="Buscar productos y servicios en Mistrató..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-3xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-500"
              aria-label="Buscar servicios"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-2xl border border-gray-200 px-4 py-3 text-sm"
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
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`rounded-3xl px-5 py-3 text-sm font-semibold transition ${
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
        </div>
        {filtered.length === 0 && (
          <p className="py-16 text-center text-gray-500">No se encontraron servicios con esos filtros.</p>
        )}
      </div>
    </MainLayout>
  );
}
