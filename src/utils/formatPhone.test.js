import { describe, it, expect } from 'vitest';
import { formatPhoneCO, phoneDigitsForWa } from './formatPhone';

describe('formatPhone', () => {
  it('formatea número colombiano de 10 dígitos', () => {
    expect(formatPhoneCO('3004567890')).toBe('+57 300 456 7890');
    expect(formatPhoneCO('+57 300 456 7890')).toBe('+57 300 456 7890');
  });

  it('extrae dígitos para WhatsApp', () => {
    expect(phoneDigitsForWa('300 456 7890')).toBe('573004567890');
  });

  it('maneja valores vacíos o inválidos', () => {
    expect(formatPhoneCO('')).toBe('No registrado');
    expect(formatPhoneCO('123')).toBe('123');
    expect(phoneDigitsForWa('')).toBe('');
  });
});
