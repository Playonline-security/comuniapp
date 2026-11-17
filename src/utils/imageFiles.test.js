import { describe, it, expect, vi, afterEach } from 'vitest';
import { readFilesAsBase64, readSingleFileAsBase64 } from './imageFiles';

describe('readFilesAsBase64', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('convierte archivos a data URL', async () => {
    const file = new File(['pixels'], 'photo.png', { type: 'image/png' });
    class MockFileReader {
      readAsDataURL() {
        this.result = 'data:image/png;base64,abc';
        if (this.onload) this.onload();
      }
    }
    vi.stubGlobal('FileReader', MockFileReader);

    const result = await readFilesAsBase64([file]);
    expect(result[0]).toBe('data:image/png;base64,abc');
  });

  it('readSingleFileAsBase64 devuelve null sin archivo', async () => {
    expect(await readSingleFileAsBase64(null)).toBeNull();
  });

  it('readSingleFileAsBase64 convierte un solo archivo', async () => {
    const file = new File(['x'], 'a.png', { type: 'image/png' });
    class MockFileReader {
      readAsDataURL() {
        this.result = 'data:image/png;base64,x';
        if (this.onload) this.onload();
      }
    }
    vi.stubGlobal('FileReader', MockFileReader);
    expect(await readSingleFileAsBase64(file)).toBe('data:image/png;base64,x');
  });
});
