import { useState } from 'react';
import { User, FileText } from 'lucide-react';
import { CATEGORIES } from '../../constants/categories';
import { isValidDescription, isValidPrice, isValidTitle } from '../../utils/validators';
import Input from './Input';
import Button from './Button';
import ImageUploadZone from './ImageUploadZone';

const categoryOptions = CATEGORIES.filter((c) => c.id !== 'todos');

export default function ServiceForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    longDescription: initial?.longDescription || '',
    category: initial?.category || 'agricultura',
    price: initial?.price || '',
    schedule: initial?.schedule || '',
    address: initial?.address || '',
    deliveryOptions: initial?.deliveryOptions || ['local'],
  });
  const [image, setImage] = useState(initial?.images?.[0] || null);
  const [errors, setErrors] = useState({});

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const toggleDelivery = (opt) => {
    setForm((f) => {
      const has = f.deliveryOptions.includes(opt);
      const next = has ? f.deliveryOptions.filter((o) => o !== opt) : [...f.deliveryOptions, opt];
      return { ...f, deliveryOptions: next.length ? next : ['local'] };
    });
  };

  const validate = () => {
    const next = {};
    if (!isValidTitle(form.title)) next.title = 'Título entre 3 y 100 caracteres.';
    if (!isValidDescription(form.description)) next.description = 'Descripción entre 10 y 500 caracteres.';
    if (!isValidPrice(form.price)) next.price = 'Precio numérico mayor a cero.';
    if (!image) next.images = 'Debes subir una imagen para la publicación.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, images: image ? [image] : [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <FileText className="h-5 w-5 text-brand-600" />
          Información básica
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Título del servicio *"
            name="title"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            maxLength={100}
            error={errors.title}
            hint={`${form.title.length}/100`}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Categoría *</label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            >
              {categoryOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Descripción detallada *</label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            maxLength={500}
            rows={5}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
          <p className="text-xs text-gray-500">{form.description.length}/500</p>
          {errors.description && <p className="text-xs text-red-600">{errors.description}</p>}
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Información adicional</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            label="Precio *"
            type="number"
            min="1"
            value={form.price}
            onChange={(e) => update('price', e.target.value)}
            error={errors.price}
          />
          <Input label="Horario" value={form.schedule} onChange={(e) => update('schedule', e.target.value)} />
          <Input label="Dirección (opcional)" value={form.address} onChange={(e) => update('address', e.target.value)} />
        </div>
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">Opciones de atención</p>
          <div className="flex flex-wrap gap-2">
            {['domicilio', 'local'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleDelivery(opt)}
                className={`rounded-xl border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                  form.deliveryOptions.includes(opt)
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-gray-300 text-gray-600 hover:border-brand-200'
                }`}
              >
                {opt === 'domicilio' ? 'A domicilio' : 'En el local'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <User className="h-5 w-5 text-brand-600" />
          Imagen del servicio *
        </h2>
        <ImageUploadZone value={image} onChange={setImage} error={errors.images} />
      </section>

      <div className="flex flex-wrap gap-3">
        <Button type="submit">{initial ? 'Guardar cambios' : 'Publicar servicio'}</Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
