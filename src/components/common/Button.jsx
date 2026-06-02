const variants = {
  primary: 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-600 hover:to-brand-700 shadow-md',
  secondary: 'bg-white text-gray-700 border-2 border-gray-200 hover:border-brand-200 hover:bg-brand-50',
  accent: 'bg-accent-400 text-[#461901] hover:bg-accent-500 font-semibold',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-2.5 text-base rounded-2xl',
  lg: 'px-7 py-3.5 text-base rounded-3xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
