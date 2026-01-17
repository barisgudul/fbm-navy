/* app/admin/yeni-proje/page.tsx */
'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { createClient } from '@/app/lib/supabaseBrowser';
import {
  DESIGN_CATEGORIES,
  POOL_SYSTEM_TYPES,
  BUDGET_SEGMENTS,
  type DesignCategory,
  type DesignSpecs
} from '@/app/lib/constants';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Partial spec state for form (before category is added)
type PartialSpecs = Omit<DesignSpecs, 'category'> | Record<string, unknown>;

export default function YeniProjePage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Video State'leri
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);

  // Category and Specs State
  const [selectedCategory, setSelectedCategory] = useState<DesignCategory>(DESIGN_CATEGORIES[0]);
  const [specs, setSpecs] = useState<PartialSpecs>({});

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    }
    checkAuth();
  }, [router, supabase]);

  // Clear specs when category changes
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as DesignCategory;
    setSelectedCategory(newCategory);
    setSpecs({}); // Reset specs on category change
  };

  // Update a single spec field
  const updateSpec = (key: string, value: string | number | boolean) => {
    setSpecs(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      if (selectedFiles.length + newFiles.length > 30) {
        alert('Toplamda en fazla 30 fotoğraf yükleyebilirsiniz.');
        return;
      }

      setSelectedFiles(prev => [...prev, ...newFiles]);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
      e.target.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[indexToRemove]);
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  // Video İşlemleri
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newVideos = Array.from(e.target.files);

      if (selectedVideos.length + newVideos.length > 2) {
        alert('En fazla 2 video yükleyebilirsiniz.');
        return;
      }
      setSelectedVideos(prev => [...prev, ...newVideos]);
      const newPreviews = newVideos.map(file => URL.createObjectURL(file));
      setVideoPreviews(prev => [...prev, ...newPreviews]);
      e.target.value = '';
    }
  };

  const removeVideo = (indexToRemove: number) => {
    setSelectedVideos(prev => prev.filter((_, index) => index !== indexToRemove));
    setVideoPreviews(prev => {
      URL.revokeObjectURL(prev[indexToRemove]);
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    if (selectedFiles.length === 0) {
      alert('Lütfen en az bir fotoğraf seçin.');
      setLoading(false);
      return;
    }

    const imageUrls: string[] = [];
    const videoUrls: string[] = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${i}-design.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('design-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('design-images')
          .getPublicUrl(filePath);

        imageUrls.push(urlData.publicUrl);
      }

      // Video Yükleme
      for (let i = 0; i < selectedVideos.length; i++) {
        const file = selectedVideos[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `video-${Date.now()}-${i}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('design-images') // Videoları da aynı bucket'a atabiliriz
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('design-images')
          .getPublicUrl(filePath);

        videoUrls.push(urlData.publicUrl);
      }

      // Build specs with category for discriminated union
      const finalSpecs = Object.keys(specs).length > 0
        ? { ...specs, category: selectedCategory }
        : null;

      const { error: insertError } = await supabase.from('designs').insert({
        title: formData.get('title'),
        type: selectedCategory,
        location: formData.get('location'),
        area: Number(formData.get('area')),
        year: Number(formData.get('year')),
        image_urls: imageUrls,
        video_urls: videoUrls,
        description: formData.get('description'),
        specs: finalSpecs,
      });

      if (insertError) throw insertError;

      alert('Proje başarıyla yüklendi!');
      router.push('/admin/panel');
      router.refresh();

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      alert('Hata: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Render category-specific spec inputs
  const renderSpecInputs = () => {
    const inputClass = "w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none text-white";
    const labelClass = "block text-xs text-fbm-gold-400 mb-1";

    switch (selectedCategory) {
      case 'Havuz Tasarımı':
        return (
          <div className="space-y-4 p-4 bg-fbm-navy-900/50 rounded-lg border border-blue-500/30">
            <h3 className="text-sm font-bold text-blue-400">🏊 Havuz Teknik Özellikleri</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Derinlik (cm)</label>
                <input
                  type="number"
                  value={(specs as { depth?: number }).depth || ''}
                  onChange={e => updateSpec('depth', Number(e.target.value))}
                  placeholder="150"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Su Hacmi (m³)</label>
                <input
                  type="number"
                  step="0.1"
                  value={(specs as { volume_m3?: number }).volume_m3 || ''}
                  onChange={e => updateSpec('volume_m3', Number(e.target.value))}
                  placeholder="50"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Sistem Tipi</label>
                <select
                  value={(specs as { systemType?: string }).systemType || ''}
                  onChange={e => updateSpec('systemType', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Seçiniz</option>
                  {POOL_SYSTEM_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Kaplama Malzemesi</label>
                <input
                  type="text"
                  value={(specs as { coatingMaterial?: string }).coatingMaterial || ''}
                  onChange={e => updateSpec('coatingMaterial', e.target.value)}
                  placeholder="Mozaik, Liner, vb."
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        );

      case 'Peyzaj & Bahçe':
        return (
          <div className="space-y-4 p-4 bg-fbm-navy-900/50 rounded-lg border border-green-500/30">
            <h3 className="text-sm font-bold text-green-400">🌳 Peyzaj Teknik Özellikleri</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Sert Zemin Alanı (m²)</label>
                <input
                  type="number"
                  step="0.1"
                  value={(specs as { hardscapeArea_m2?: number }).hardscapeArea_m2 || ''}
                  onChange={e => updateSpec('hardscapeArea_m2', Number(e.target.value))}
                  placeholder="100"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Yeşil Alan (m²)</label>
                <input
                  type="number"
                  step="0.1"
                  value={(specs as { softscapeArea_m2?: number }).softscapeArea_m2 || ''}
                  onChange={e => updateSpec('softscapeArea_m2', Number(e.target.value))}
                  placeholder="200"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Bitki Çeşidi Sayısı</label>
                <input
                  type="number"
                  value={(specs as { plantVarietyCount?: number }).plantVarietyCount || ''}
                  onChange={e => updateSpec('plantVarietyCount', Number(e.target.value))}
                  placeholder="15"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Sulama Sistemi</label>
                <select
                  value={(specs as { irrigationSystem?: boolean }).irrigationSystem === true ? 'true' : (specs as { irrigationSystem?: boolean }).irrigationSystem === false ? 'false' : ''}
                  onChange={e => updateSpec('irrigationSystem', e.target.value === 'true')}
                  className={inputClass}
                >
                  <option value="">Seçiniz</option>
                  <option value="true">Mevcut</option>
                  <option value="false">Yok</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'Konut İç Mekan':
      case 'Ticari İç Mekan':
      case 'Ofis Tasarımı':
      case 'Otel Konsepti':
      case 'Villa Projesi':
        return (
          <div className="space-y-4 p-4 bg-fbm-navy-900/50 rounded-lg border border-amber-500/30">
            <h3 className="text-sm font-bold text-amber-400">🏠 İç Mekan Teknik Özellikleri</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Oda Sayısı</label>
                <input
                  type="number"
                  value={(specs as { roomCount?: number }).roomCount || ''}
                  onChange={e => updateSpec('roomCount', Number(e.target.value))}
                  placeholder="5"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Bütçe Segmenti</label>
                <select
                  value={(specs as { budgetSegment?: string }).budgetSegment || ''}
                  onChange={e => updateSpec('budgetSegment', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Seçiniz</option>
                  {BUDGET_SEGMENTS.map(segment => (
                    <option key={segment} value={segment}>{segment}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Tasarım Stili</label>
                <input
                  type="text"
                  value={(specs as { style?: string }).style || ''}
                  onChange={e => updateSpec('style', e.target.value)}
                  placeholder="Modern, Minimalist, Klasik, vb."
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        );

      case 'Cephe Tasarımı':
        return (
          <div className="space-y-4 p-4 bg-fbm-navy-900/50 rounded-lg border border-purple-500/30">
            <h3 className="text-sm font-bold text-purple-400">🏢 Cephe Teknik Özellikleri</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Cephe Malzemesi</label>
                <input
                  type="text"
                  value={(specs as { material?: string }).material || ''}
                  onChange={e => updateSpec('material', e.target.value)}
                  placeholder="Cam, Alüminyum, Taş, vb."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Yalıtım Tipi</label>
                <input
                  type="text"
                  value={(specs as { insulationType?: string }).insulationType || ''}
                  onChange={e => updateSpec('insulationType', e.target.value)}
                  placeholder="Mantolama, Cam Yünü, vb."
                  className={inputClass}
                />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Bina Yüksekliği (m)</label>
                <input
                  type="number"
                  step="0.1"
                  value={(specs as { buildingHeight_m?: number }).buildingHeight_m || ''}
                  onChange={e => updateSpec('buildingHeight_m', Number(e.target.value))}
                  placeholder="25"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen pt-40 px-4 pb-20 bg-fbm-navy-900 text-white">
      <div className="max-w-2xl mx-auto bg-fbm-denim-750 p-8 rounded-xl border border-fbm-gold-400/30 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-fbm-gold-400">Yeni Proje</h1>
          <button onClick={() => supabase.auth.signOut().then(() => router.push('/admin/login'))} className="text-xs text-red-400 hover:text-red-300 transition-colors underline">Çıkış Yap</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-sans">
          <div>
            <label className="block text-xs text-fbm-gold-400 mb-1">Başlık</label>
            <input name="title" placeholder="Proje Başlığı" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-fbm-gold-400 mb-1">Tasarım Tipi</label>
              <select
                name="type"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none text-white"
              >
                {DESIGN_CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-fbm-gold-400 mb-1">Konum</label>
              <input name="location" placeholder="Konum" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-fbm-gold-400 mb-1">Alan (m²)</label>
              <input name="area" type="number" placeholder="m²" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            </div>
            <div>
              <label className="block text-xs text-fbm-gold-400 mb-1">Yıl</label>
              <input name="year" type="number" placeholder="Yıl" required min="2000" max={new Date().getFullYear()} className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            </div>
          </div>

          {/* Dynamic Spec Inputs */}
          {renderSpecInputs()}

          <textarea name="description" placeholder="Açıklama" rows={4} className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none"></textarea>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-white/20 p-8 rounded-lg text-center hover:border-fbm-gold-400/50 hover:bg-fbm-navy-900/30 transition-all cursor-pointer relative group">
              <input
                type="file"
                name="image"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className="pointer-events-none group-hover:scale-105 transition-transform duration-300">
                <span className="text-4xl block mb-3">📷</span>
                <p className="text-sm text-fbm-gold-400 font-semibold">Fotoğrafları Seç veya Sürükle</p>
                <p className="text-xs text-gray-500 mt-2">Maksimum 30 Fotoğraf (JPG, PNG)</p>
              </div>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 animate-reveal-line mt-4">
                {previews.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-fbm-gold-400/30 group">
                    <Image
                      src={url}
                      alt={`Önizleme ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600/80 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs hover:bg-red-500 transition-colors z-10"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedFiles.length > 0 && (
              <p className="text-xs text-green-400 text-center">{selectedFiles.length} fotoğraf seçildi.</p>
            )}
          </div>

          {/* Video Alanı */}
          <div className="space-y-4 border-t border-white/10 pt-4 mt-4">
            <label className="block text-sm font-bold text-fbm-gold-400">Videolar</label>

            <div className="grid grid-cols-3 gap-3">
              {videoPreviews.map((url, index) => (
                <div key={`vid-${index}`} className="relative aspect-video rounded-lg overflow-hidden border border-blue-500/30 group bg-black">
                  <video src={url} className="w-full h-full object-contain bg-black" controls />
                  <button type="button" onClick={() => removeVideo(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs z-10">
                    X
                  </button>
                </div>
              ))}

              <label className="aspect-video rounded border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors text-white/50 hover:text-white hover:border-white/40 relative">
                <span className="text-2xl">🎥</span>
                <span className="text-xs mt-1">Video Ekle veya Sürükle</span>
                <input type="file" multiple accept="video/*" onChange={handleVideoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded font-bold text-fbm-navy-900 bg-fbm-gold-400 
            border-2 border-fbm-gold-400 
            hover:bg-fbm-navy-900 hover:text-fbm-gold-400 
            hover:shadow-[0_0_20px_rgba(188,150,72,0.4)] 
            hover:-translate-y-1 hover:scale-[1.02] 
            active:scale-95 active:shadow-none
            transition-all duration-300 ease-out
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Yükleniyor...' : 'Projeyi Yayınla'}
          </button>
        </form>
      </div>
    </main>
  );
}

