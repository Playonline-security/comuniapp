import { useToast } from '../../context/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={`pointer-events-auto min-w-[280px] max-w-sm rounded-2xl px-5 py-4 shadow-lg transition ${
            toast.type === 'error'
              ? 'border border-red-200 bg-red-50 text-red-800'
              : 'border border-brand-200 bg-white text-gray-900'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600"
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
