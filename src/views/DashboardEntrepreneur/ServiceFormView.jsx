import { useNavigate, useParams } from 'react-router-dom';
import { useServices } from '../../context/ServiceContext';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/layout/MainLayout';
import BackButton from '../../components/common/BackButton';
import ServiceForm from '../../components/common/ServiceForm';

export default function ServiceFormView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getServiceById, addService, updateService } = useServices();
  const isEdit = Boolean(id);
  const existing = isEdit ? getServiceById(id) : null;

  if (isEdit && (!existing || existing.entrepreneurId !== user?.id)) {
    navigate('/emprendedor', { replace: true });
    return null;
  }

  const handleSubmit = (payload) => {
    const ok = isEdit ? updateService(id, payload) : addService(payload);
    if (ok) navigate('/emprendedor');
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
        <BackButton to="/emprendedor" label="Volver a mis publicaciones" className="mb-6" />
        <h1 className="mb-2 text-3xl font-bold">{isEdit ? 'Editar publicación' : 'Publicar nuevo servicio'}</h1>
        <p className="mb-8 text-gray-600">Completa la información para publicar en Mistrató, Risaralda</p>
        <ServiceForm initial={existing} onSubmit={handleSubmit} onCancel={() => navigate('/emprendedor')} />
      </div>
    </MainLayout>
  );
}
