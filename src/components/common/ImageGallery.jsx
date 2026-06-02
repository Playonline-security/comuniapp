import { useState } from 'react';

export default function ImageGallery({ images = [], alt = 'Galería' }) {
  const [active, setActive] = useState(0);
  if (!images.length) {
    return <div className="flex h-64 items-center justify-center rounded-3xl bg-gray-100 text-gray-500">Sin imágenes</div>;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
        <img src={images[active]} alt={alt} className="h-72 w-full object-cover md:h-96" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                i === active ? 'border-brand-500' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
