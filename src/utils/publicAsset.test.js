import { describe, it, expect } from 'vitest';
import { publicAsset } from './publicAsset';

describe('publicAsset', () => {
  it('concatena base de Vite con ruta sin barra inicial', () => {
    expect(publicAsset('images/cafe-organico.jpeg')).toContain('images/cafe-organico.jpeg');
  });

  it('normaliza ruta con barra inicial', () => {
    expect(publicAsset('/images/test.jpg')).toContain('images/test.jpg');
  });
});
