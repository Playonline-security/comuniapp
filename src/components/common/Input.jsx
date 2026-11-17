export default function Input({ label, error, hint, id, className = '', ...props }) {
  const inputId = id || props.name || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-3xl border-2 px-5 py-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400/80 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 ${
          error ? 'border-red-400' : 'border-gray-200'
        }`}
        {...props}
      />
      {hint && !error && <span className="text-xs text-gray-500">{hint}</span>}
      {error && <span className="text-xs font-medium text-red-600">{error}</span>}
    </div>
  );
}
