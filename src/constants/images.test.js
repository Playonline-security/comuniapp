import { describe, it, expect } from 'vitest';
import { IMAGES } from './images';

describe('IMAGES', () => {
  it('usa rutas locales sin URLs externas', () => {
    Object.values(IMAGES).forEach((src) => {
      expect(src).not.toMatch(/^https?:\/\//);
      expect(src).toContain('images/');
    });
  });
});
