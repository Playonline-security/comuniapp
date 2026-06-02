import { useState } from 'react';
import { User, Upload } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/layout/MainLayout';
import BackButton from '../../components/common/BackButton';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { readSingleFileAsBase64 } from '../../utils/imageFiles';

export default function ProfileEditView() {
  const { getCurrentUser, updateProfile, isEntrepreneur } = useAuth();
  const profile = getCurrentUser();

  const [form, setForm] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
    bio: profile?.bio || '',
    avatar: profile?.avatar || null,
    instagram: profile?.instagram || '',
    facebook: profile?.facebook || '',
    businessName: profile?.businessName || '',
  });

  if (!profile) return null;

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await readSingleFileAsBase64(file);
    setForm((f) => ({ ...f, avatar: base64 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <BackButton to="/home" label="Volver al Dashboard" />
        </div>

        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar perfil</h1>
            <p className="text-gray-600">Completa tu perfil para que la comunidad de Mistrató te conozca mejor</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Foto de perfil</h2>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-gray-200 bg-brand-600 text-4xl font-bold text-white">
                {form.avatar ? (
                  <img src={form.avatar} alt="" className="h-full w-full object-cover" />
                ) : (
                  form.name.charAt(0)
                )}
              </div>
              <div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700">
                  <Upload className="h-4 w-4" />
                  Subir foto
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
                </label>
                <p className="mt-2 text-sm text-gray-500">Formatos: JPG, PNG. Tamaño máximo: 5MB</p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Información básica</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Nombre completo *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input label="Correo electrónico" value={profile.email} disabled />
              <Input
                label="Teléfono / WhatsApp"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </section>

          {isEntrepreneur && (
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Perfil profesional</h2>
              <Input
                label="Nombre del negocio"
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                className="mb-4"
              />
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Sobre ti</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                maxLength={500}
                rows={4}
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
              <p className="text-right text-xs text-gray-500">{form.bio.length}/500</p>
            </section>
          )}

          {!isEntrepreneur && (
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Sobre ti</h2>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                maxLength={500}
                rows={4}
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
              <p className="text-right text-xs text-gray-500">{form.bio.length}/500</p>
            </section>
          )}

          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Redes sociales</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Instagram"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                placeholder="@usuario"
              />
              <Input
                label="Facebook"
                value={form.facebook}
                onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                placeholder="@usuario"
              />
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <Button type="submit">Guardar cambios</Button>
            <Button type="button" variant="secondary" onClick={() => window.history.back()}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
