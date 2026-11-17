import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidPassword,
  isValidPrice,
  isValidTitle,
  isValidDescription,
  isValidReviewComment,
  isValidRating,
  validateImageFiles,
} from './validators';

describe('validators', () => {
  it('valida email', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('invalid')).toBe(false);
  });

  it('valida contraseña', () => {
    expect(isValidPassword('123456')).toBe(true);
    expect(isValidPassword('123')).toBe(false);
  });

  it('valida precio positivo', () => {
    expect(isValidPrice(100)).toBe(true);
    expect(isValidPrice(0)).toBe(false);
    expect(isValidPrice(-5)).toBe(false);
  });

  it('valida título y descripción', () => {
    expect(isValidTitle('Café')).toBe(true);
    expect(isValidTitle('ab')).toBe(false);
    expect(isValidDescription('Descripción válida larga')).toBe(true);
    expect(isValidDescription('corta')).toBe(false);
  });

  it('valida reseñas', () => {
    expect(isValidReviewComment('Comentario con más de diez caracteres')).toBe(true);
    expect(isValidReviewComment('corto')).toBe(false);
    expect(isValidRating(3)).toBe(true);
    expect(isValidRating(6)).toBe(false);
  });

  it('valida archivos de imagen', () => {
    expect(validateImageFiles(null).valid).toBe(true);
    const file = { type: 'image/png' };
    expect(validateImageFiles([file]).valid).toBe(true);
    expect(validateImageFiles([file, { type: 'image/jpeg' }]).valid).toBe(false);
    expect(validateImageFiles([{ type: 'text/plain' }]).valid).toBe(false);
  });
});
