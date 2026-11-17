/** Rutas de assets en public/ compatibles con GitHub Pages (base de Vite). */
export function publicAsset(path) {
  const normalized = path.replace(/^\//, '');
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${normalized}`;
}
