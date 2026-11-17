import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useServices } from '../../context/ServiceContext';
import { Plus } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import BackButton from '../../components/common/BackButton';
import Button from '../../components/common/Button';
import { formatPrice, getAverageRating } from '../../utils/serviceHelpers';
import { RatingDisplay } from '../../components/common/RatingStars';

export default function EntrepreneurDashboardView() {
  const { user } = useAuth();
  const { services, deleteService } = useServices();
  const mine = services.filter((s) => s.entrepreneurId === user?.id);

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <BackButton to="/home" label="Volver al Dashboard" className="mb-6" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis publicaciones</h1>
            <p className="text-gray-600">Gestiona tus servicios en ComuniApp</p>
          </div>
          <Link to="/emprendedor/nuevo">
            <Button>
              <Plus className="mr-2 inline h-4 w-4" />
              Nueva publicación
            </Button>
          </Link>
        </div>

        <div className="mt-10 space-y-4">
          {mine.length === 0 && (
            <p className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
              Aún no tienes publicaciones. ¡Crea la primera!
            </p>
          )}
          {mine.map((service) => (
            <article
              key={service.id}
              className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
            >
              {service.images?.[0] && (
                <img src={service.images[0]} alt="" className="h-24 w-32 shrink-0 rounded-xl object-cover" />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-bold">{service.title}</h2>
                <p className="text-brand-600 font-semibold">{formatPrice(service.price)}</p>
                <RatingDisplay average={getAverageRating(service.reviews)} count={service.reviews?.length || 0} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Link to={`/emprendedor/editar/${service.id}`}>
                  <Button variant="secondary" size="sm">
                    Editar
                  </Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => deleteService(service.id)}>
                  Eliminar
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
