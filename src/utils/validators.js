const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(String(email).trim());
}

export function isValidPassword(password) {
  return String(password).length >= 6;
}

export function isValidPrice(price) {
  const num = Number(price);
  return !Number.isNaN(num) && num > 0;
}

export function isValidTitle(title) {
  const t = String(title).trim();
  return t.length >= 3 && t.length <= 100;
}

export function isValidDescription(desc) {
  const d = String(desc).trim();
  return d.length >= 10 && d.length <= 500;
}

export function isValidReviewComment(comment) {
  const c = String(comment).trim();
  return c.length >= 10 && c.length <= 500;
}

export function isValidRating(rating) {
  const r = Number(rating);
  return Number.isInteger(r) && r >= 1 && r <= 5;
}

export const MAX_IMAGES = 1;

export function validateImageFiles(files) {
  if (!files || files.length === 0) return { valid: true, message: '' };
  if (files.length > MAX_IMAGES) {
    return { valid: false, message: 'Solo se permite una (1) imagen por publicación.' };
  }
  const invalid = Array.from(files).some((f) => !f.type.startsWith('image/'));
  if (invalid) return { valid: false, message: 'Solo se permiten archivos de imagen.' };
  return { valid: true, message: '' };
}
