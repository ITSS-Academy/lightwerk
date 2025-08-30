export function convertToSupabaseUrl(path: string, type: 'video' | 'thumbnail'): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const base = 'https://zkeqdgfyxlmcrmfehjde.supabase.co/storage/v1/object/public';
  if (type === 'video') {
    return `${base}/videos/${path}`;
  } else {
    return `${base}/thumbnails/${path}`;
  }
}
