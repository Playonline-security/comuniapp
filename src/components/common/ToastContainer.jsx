import { useToast } from '../../context/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="pointer-events-none fixed left-4 right-4 top-20 z-[100] flex flex-col gap-2 sm:left-auto sm:right-4 sm:top-24 sm:items-end">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={`pointer-events-auto w-full rounded-2xl px-5 py-4 shadow-lg transition sm:min-w-[280px] sm:max-w-sm ${
            toast.type === 'error'
              ? 'border border-red-200 bg-red-50 text-red-800'
              : 'border border-brand-200 bg-white text-gray-900'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium break-words">{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="rounded-md text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
