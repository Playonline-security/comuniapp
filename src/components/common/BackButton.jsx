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
      className={`group inline-flex min-h-11 items-center gap-2.5 rounded-2xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.99] ${className}`}
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-hover:bg-brand-100"
        aria-hidden
      >
        <ArrowLeft className="h-4 w-4" />
      </span>
      {label}
    </button>
  );
}
