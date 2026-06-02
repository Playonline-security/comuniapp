import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ to, label = 'Volver', className = '' }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-brand-50 hover:text-brand-700 ${className}`}
    >
      <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
      {label}
    </button>
  );
}
