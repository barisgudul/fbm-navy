/**
 * Supabase Storage public object URL'leri için `next/image` optimizasyonunu
 * baypas etmek üzere (üretimde /_next/image + Sharp hatalarını önlemek).
 */
export function isSupabaseStoragePublicUrl(src: string): boolean {
  if (!src || src.startsWith('/')) return false;
  try {
    const u = new URL(src);
    return (
      u.hostname.endsWith('.supabase.co') &&
      u.pathname.includes('/storage/v1/object/public/')
    );
  } catch {
    return false;
  }
}
