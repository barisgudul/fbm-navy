/**
 * Admin yüklemelerinde HEIC/HEIF ve diğer raster görselleri web uyumlu JPEG'e çevirir.
 * Tarayıcıda `<img>` / `next/image` ile kırık görünmeyi önler.
 */
const MAX_DIMENSION = 2560;
const JPEG_QUALITY = 0.88;

function isHeicFile(file: File): boolean {
  const n = file.name.toLowerCase();
  return (
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    n.endsWith('.heic') ||
    n.endsWith('.heif')
  );
}

export async function prepareImageForUpload(file: File): Promise<File> {
  const looksRaster =
    file.type.startsWith('image/') || isHeicFile(file);
  if (!looksRaster) {
    return file;
  }

  let decodeBlob: Blob = file;

  if (isHeicFile(file)) {
    const heic2any = (await import('heic2any')).default;
    const converted = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.92,
    });
    decodeBlob = Array.isArray(converted) ? converted[0] : converted;
  }

  let bitmap: ImageBitmap | undefined;
  try {
    bitmap = await createImageBitmap(decodeBlob);
    let { width, height } = bitmap;
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      const scale = MAX_DIMENSION / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas desteklenmiyor');
    }
    ctx.drawImage(bitmap, 0, 0, width, height);

    const jpegBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('JPEG oluşturulamadı'))),
        'image/jpeg',
        JPEG_QUALITY
      );
    });

    const base = file.name.replace(/\.[^/.]+$/, '') || 'image';
    return new File([jpegBlob], `${base}.jpg`, { type: 'image/jpeg' });
  } catch {
    if (isHeicFile(file)) {
      throw new Error(
        'HEIC/HEIF dönüşümü başarısız. Lütfen JPEG veya PNG olarak dışa aktarıp tekrar deneyin.'
      );
    }
    return file;
  } finally {
    bitmap?.close();
  }
}
