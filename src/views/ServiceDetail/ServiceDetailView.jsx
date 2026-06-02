import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle, AtSign, Globe } from 'lucide-react';
import { SEED_USERS } from '../../services/seedData';
import { useAuth } from '../../context/AuthContext';
import { useServices } from '../../context/ServiceContext';
import { useToast } from '../../context/ToastContext';
import { CATEGORIES } from '../../constants/categories';
import { getAverageRating, formatPrice } from '../../utils/serviceHelpers';
import MainLayout from '../../components/layout/MainLayout';
import BackButton from '../../components/common/BackButton';
import ImageGallery from '../../components/common/ImageGallery';
import { RatingDisplay } from '../../components/common/RatingStars';
import ReviewForm from '../../components/common/ReviewForm';
import ReviewList from '../../components/common/ReviewList';
import ContactModal from '../../components/common/ContactModal';
import Button from '../../components/common/Button';

export default function ServiceDetailView() {
  const { id } = useParams();
  const { getServiceById, addReview } = useServices();
  const { user, isResident, isEntrepreneur, isAuthenticated, getUserById } = useAuth();
  const { showToast } = useToast();
  const [contactOpen, setContactOpen] = useState(false);

  const service = getServiceById(id);

  const resolveEntrepreneur = () => {
    if (!service) return null;
    return (
      getUserById(service.entrepreneurId) ||
      SEED_USERS.find((u) => u.id === service.entrepreneurId) ||
      null
    );
  };

  const openContact = () => {
    const owner = resolveEntrepreneur();
    if (!owner?.phone && !owner?.whatsapp) {
      showToast('No hay datos de contacto para este emprendedor.', 'error');
      return;
    }
    setContactOpen(true);
    showToast('Información de contacto del emprendedor');
  };

  if (!service) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-gray-600">Servicio no encontrado.</p>
          <BackButton to="/home" label="Volver al Dashboard" className="mt-4" />
        </div>
      </MainLayout>
    );
  }

  const entrepreneur = resolveEntrepreneur();
  const avg = getAverageRating(service.reviews);
  const count = service.reviews?.length || 0;
  const categoryLabel = CATEGORIES.find((c) => c.id === service.category)?.label;
  const canLeaveReview =
    isAuthenticated &&
    user &&
    service.entrepreneurId !== user.id &&
    (isResident || isEntrepreneur);

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <BackButton to="/home" label="Volver al Dashboard" className="mb-6" />

        <div className="rounded-3xl border border-brand-200/50 bg-white p-6 shadow-lg md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{service.title}</h1>
              <RatingDisplay average={avg} count={count} size="md" />
            </div>
            <div className="rounded-3xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow">
              <p className="text-sm font-medium text-brand-600">Precio</p>
              <p className="text-3xl font-bold text-gray-900">{formatPrice(service.price)}</p>
            </div>
          </div>

          <div className="mt-8">
            <ImageGallery images={service.images} alt={service.title} />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <section>
                <h2 className="mb-4 text-xl font-bold">Descripción del Servicio</h2>
                <p className="whitespace-pre-line leading-relaxed text-gray-700">
                  {service.longDescription || service.description}
                </p>
              </section>

              <section className="rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-6">
                {service.address && (
                  <p className="mb-2">
                    <strong>Dirección:</strong> {service.address}
                  </p>
                )}
                {service.schedule && (
                  <p>
                    <strong>Horario:</strong> {service.schedule}
                  </p>
                )}
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">Reseñas ({count})</h2>
                <ReviewList reviews={service.reviews} />
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-brand-200/50 bg-white p-6 shadow">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-500 to-brand-600 text-3xl font-bold text-white">
                  {service.entrepreneurName.charAt(0)}
                </div>
                <h3 className="text-xl font-bold">{entrepreneur?.name || service.entrepreneurName}</h3>
                <span className="mt-2 inline-block rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                  Emprendedor local
                </span>
                {categoryLabel && <p className="mt-4 text-sm text-gray-600">Categoría: {categoryLabel}</p>}
                {entrepreneur?.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">{entrepreneur.bio}</p>
                )}
                {(entrepreneur?.instagram || entrepreneur?.facebook) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entrepreneur.instagram && (
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-pink-50 px-3 py-2 text-xs font-medium text-pink-700 hover:bg-pink-100"
                        onClick={(e) => e.preventDefault()}
                      >
                        <AtSign className="h-3.5 w-3.5" />
                        {entrepreneur.instagram}
                      </a>
                    )}
                    {entrepreneur.facebook && (
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Globe className="h-3.5 w-3.5" />
                        {entrepreneur.facebook}
                      </a>
                    )}
                  </div>
                )}
                <Button className="mt-6 w-full" type="button" onClick={openContact}>
                  <MessageCircle className="mr-2 inline h-5 w-5" />
                  Contactar
                </Button>
              </div>

              {canLeaveReview && (
                <ReviewForm onSubmit={(data) => addReview(service.id, data)} />
              )}
            </aside>
          </div>
        </div>
      </div>

      {contactOpen && (
        <ContactModal entrepreneur={entrepreneur} service={service} onClose={() => setContactOpen(false)} />
      )}
    </MainLayout>
  );
}
