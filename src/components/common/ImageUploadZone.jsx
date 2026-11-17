import { useRef, useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { readFilesAsBase64 } from '../../utils/imageFiles';
import { validateImageFiles } from '../../utils/validators';

export default function ImageUploadZone({ value, onChange, error }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState('');

  const processFile = async (fileList) => {
    const validation = validateImageFiles(fileList);
    if (!validation.valid) {
      setLocalError(validation.message);
      return;
    }
    const encoded = await readFilesAsBase64(fileList);
    setLocalError('');
    onChange(encoded[0] || null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) processFile(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    if (e.target.files?.length) processFile(e.target.files);
    e.target.value = '';
  };

  const displayError = error || localError;

  if (value) {
    return (
      <div className="relative inline-block">
        <img src={value} alt="Vista previa" className="h-48 w-full max-w-sm rounded-2xl object-cover ring-2 ring-brand-200" />
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
          aria-label="Quitar imagen"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 transition ${
          dragOver
            ? 'border-brand-500 bg-brand-50 scale-[1.01]'
            : 'border-gray-300 bg-gray-50/80 hover:border-brand-400 hover:bg-brand-50/50'
        }`}
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
          <Camera className="h-7 w-7" />
        </div>
        <p className="text-center text-sm font-semibold text-gray-800">
          Arrastra tu imagen aquí o haz clic para seleccionar
        </p>
        <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
          <Upload className="h-3.5 w-3.5" />
          JPG, PNG — una imagen por publicación
        </p>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </div>
      {displayError && <p className="mt-2 text-xs text-red-600">{displayError}</p>}
    </div>
  );
}
