import { MAX_IMAGES } from './validators';

export function readSingleFileAsBase64(file) {
  if (!file) return Promise.resolve(null);
  return readFilesAsBase64([file]).then((arr) => arr[0] || null);
}

export function readFilesAsBase64(files) {
  const list = Array.from(files || []).slice(0, MAX_IMAGES);
  return Promise.all(
    list.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }),
    ),
  );
}
