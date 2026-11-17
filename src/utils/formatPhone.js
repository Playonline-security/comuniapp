/** Formato visual Colombia: +57 3XX XXX XXXX */
export function formatPhoneCO(phone) {
  if (!phone) return 'No registrado';
  const digits = String(phone).replace(/\D/g, '');
  const local = digits.startsWith('57') ? digits.slice(2) : digits;
  if (local.length !== 10) return String(phone);
  return `+57 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
}

export function phoneDigitsForWa(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.startsWith('57')) return digits;
  if (digits.length === 10) return `57${digits}`;
  return digits;
}
