/* app/admin/duzenle-proje/[id]/page.tsx */
'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabaseBrowser';
import Image from 'next/image';
import { ArrowLeft, X, Plus } from 'lucide-react';
import {
  DESIGN_CATEGORIES,
  POOL_SYSTEM_TYPES,
  BUDGET_SEGMENTS,
  type DesignCategory,
  type DesignSpecs
} from '@/app/lib/constants';

// Partial spec state for form
// Unified Image Type
type ImageItem =
  | { type: 'existing'; id: string; url: string }
  | { type: 'new'; id: string; file: File; previewUrl: string };

type PartialSpecs = Omit<DesignSpecs, 'category'> | Record<string, unknown>;

export default function EditDesignPage() {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: '' as DesignCategory | '',
    location: '',
    area: 0,
    year: new Date().getFullYear(),
    description: ''
  });

  const [specs, setSpecs] = useState<PartialSpecs>({});



  // Unified Image State
  const [images, setImages] = useState<ImageItem[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Video State'leri
  const [existingVideos, setExistingVideos] = useState<string[]>([]);
  const [newVideos, setNewVideos] = useState<File[]>([]);
  const [newVideoPreviews, setNewVideoPreviews] = useState<string[]>([]);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }

      const { data, error } = await supabase
        .from('designs')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error || !data) {
        alert('Proje bulunamadı');
        router.push('/admin/panel');
      } else {
        setFormData({
          title: data.title,
          type: data.type,
          location: data.location,
          area: data.area,
          year: data.year,
          description: data.description || ''
        });
        // Remove category from specs object to avoid duplication/conflicts in state
        const { category, ...restSpecs } = data.specs || {};
        setSpecs(restSpecs);
        // Populate images state
        const loadedImages: ImageItem[] = (data.image_urls || []).map((url: string, idx: number) => ({
          type: 'existing',
          id: `existing-${idx}`,
          url
        }));
        setImages(loadedImages);

        setExistingVideos(data.video_urls || []);
      }
      setLoading(false);
    };

    checkAuthAndFetch();
  }, [params.id, router, supabase]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as DesignCategory;
    setFormData(prev => ({ ...prev, type: newCategory }));
    setSpecs({}); // Reset specs on category change
  };

  const updateSpec = (key: string, value: string | number | boolean) => {
    setSpecs(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newItems: ImageItem[] = files.map((file, idx) => ({
        type: 'new',
        id: `new-${Date.now()}-${idx}`,
        file,
        previewUrl: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newItems]);
    }
  };

  const removeImage = (index: number) => {
    if (window.confirm("Bu fotoğrafı silmek istediğinize emin misiniz?")) {
      setImages(prev => {
        const item = prev[index];
        if (item.type === 'new') {
          URL.revokeObjectURL(item.previewUrl);
        }
        return prev.filter((_, i) => i !== index);
      });
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Set a transparent ghost image or just let default happen
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    // Optional: Add visual indicator here
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setImages(prev => {
      const newArr = [...prev];
      const [movedItem] = newArr.splice(draggedIndex, 1);
      newArr.splice(index, 0, movedItem);
      return newArr;
    });
    setDraggedIndex(null);
  };

  // Arrow Movement Handlers
  const moveImage = (fromIndex: number, direction: 'left' | 'right') => {
    const toIndex = direction === 'left' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= images.length) return;

    setImages(prev => {
      const newArr = [...prev];
      [newArr[fromIndex], newArr[toIndex]] = [newArr[toIndex], newArr[fromIndex]];
      return newArr;
    });
  };

  const setCover = (index: number) => {
    if (index === 0) return;
    setImages(prev => {
      const newArr = [...prev];
      const [moved] = newArr.splice(index, 1);
      newArr.unshift(moved);
      return newArr;
    });
  };

  // Video İşlemleri
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      if (existingVideos.length + newVideos.length + files.length > 2) {
        alert('En fazla 2 video yükleyebilirsiniz.');
        return;
      }
      setNewVideos(prev => [...prev, ...files]);
      const previews = files.map(file => URL.createObjectURL(file));
      setNewVideoPreviews(prev => [...prev, ...previews]);
      e.target.value = '';
    }
  };

  const removeExistingVideo = (index: number) => {
    if (window.confirm("Bu videoyu silmek istediğinize emin misiniz?")) {
      setExistingVideos(prev => prev.filter((_, i) => i !== index));
    }
  };

  const removeNewVideo = (index: number) => {
    setNewVideos(prev => prev.filter((_, i) => i !== index));
    setNewVideoPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Render category-specific spec inputs
  const renderSpecInputs = () => {
    const inputClass = "w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none text-white";
    const labelClass = "block text-xs text-fbm-gold-400 mb-1";

    if (!formData.type) return null;

    switch (formData.type) {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const finalImages: string[] = [];

      for (const item of images) {
        if (item.type === 'existing') {
          finalImages.push(item.url);
        } else {
          // Upload new file
          const file = item.file;
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-design-edit.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('design-images')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from('design-images')
            .getPublicUrl(fileName);

          finalImages.push(urlData.publicUrl);
        }
      }

      // 2. Yeni Videoları Yükle
      const uploadedVideoUrls: string[] = [];
      for (let i = 0; i < newVideos.length; i++) {
        const file = newVideos[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `video-${Date.now()}-${i}-design-edit.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('design-images') // Videoları da design-images bucket'ına yükleyebiliriz
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('design-images')
          .getPublicUrl(fileName);

        uploadedVideoUrls.push(urlData.publicUrl);
      }

      // Video upload logic stays same (omitted changes)

      const finalVideos = [...existingVideos, ...uploadedVideoUrls];

      const { error: updateError } = await supabase
        .from('designs')
        .update({
          ...formData,
          image_urls: finalImages,
          video_urls: finalVideos,
          specs: Object.keys(specs).length > 0 ? { ...specs, category: formData.type } : null
        })
        .eq('id', params.id);

      if (updateError) throw updateError;

      alert('Proje başarıyla güncellendi!');
      router.push('/admin/panel');

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      alert('Hata oluştu: ' + errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-fbm-navy-900 flex items-center justify-center text-white">Yükleniyor...</div>;

  return (
    <main className="min-h-screen pt-40 md:pt-48 px-4 pb-20 bg-fbm-navy-900 text-white">
      <div className="max-w-3xl mx-auto bg-fbm-denim-750 p-8 rounded-xl border border-fbm-gold-400/30 shadow-2xl">

        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="flex items-center text-fbm-gold-400 hover:text-white transition-colors">
            <ArrowLeft className="mr-2" size={20} /> Geri
          </button>
          <h1 className="text-3xl font-serif text-fbm-gold-400">Projeyi Düzenle</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-sans">

          <div>
            <label className="block text-xs text-fbm-gold-400 mb-1">Başlık</label>
            <input name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-fbm-gold-400 mb-1">Tasarım Tipi</label>
              <select name="type" value={formData.type} onChange={handleCategoryChange} className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 text-white">
                {DESIGN_CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-fbm-gold-400 mb-1">Konum</label>
              <input name="location" value={formData.location} onChange={handleInputChange} required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-fbm-gold-400 mb-1">Alan (m²)</label>
              <input name="area" type="number" value={formData.area} onChange={handleInputChange} required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            </div>
            <div>
              <label className="block text-xs text-fbm-gold-400 mb-1">Yıl</label>
              <input name="year" type="number" value={formData.year} onChange={handleInputChange} required min="2000" max={new Date().getFullYear()} className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            </div>
          </div>

          {/* Dynamic Spec Inputs */}
          {renderSpecInputs()}

          <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} placeholder="Açıklama" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none"></textarea>

          <div className="space-y-4 border-t border-white/10 pt-4">
            <label className="block text-sm font-bold text-fbm-gold-400">Fotoğraflar</label>
            <p className="text-xs text-white/50">İlk fotoğraf kapak olarak kullanılır. Hover ile sırala.</p>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {images.map((item, idx) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 group cursor-move ${idx === 0
                    ? 'border-fbm-gold-400 ring-2 ring-fbm-gold-400/50'
                    : item.type === 'new' ? 'border-yellow-500/30' : 'border-green-500/30'
                    } ${draggedIndex === idx ? 'opacity-50' : ''}`}
                >
                  <Image
                    src={item.type === 'existing' ? item.url : item.previewUrl}
                    alt="Proje Görseli"
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 640px) 25vw, 20vw"
                  />

                  {item.type === 'new' && (
                    <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/80 text-black text-[10px] text-center py-1">YENİ</div>
                  )}

                  {idx === 0 && (
                    <div className="absolute top-1 left-1 bg-fbm-gold-400 text-fbm-navy-900 text-[10px] font-bold px-2 py-0.5 rounded z-10">
                      KAPAK
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveImage(idx, 'left')}
                      disabled={idx === 0}
                      className="bg-fbm-navy-900/90 text-white p-1.5 rounded hover:bg-fbm-gold-400 hover:text-fbm-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Sola Taşı"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => setCover(idx)}
                      disabled={idx === 0}
                      className="bg-fbm-gold-400 text-fbm-navy-900 p-1.5 rounded hover:bg-fbm-bronze-400 font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Kapak Yap"
                    >
                      ⭐
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(idx, 'right')}
                      disabled={idx === images.length - 1}
                      className="bg-fbm-navy-900/90 text-white p-1.5 rounded hover:bg-fbm-gold-400 hover:text-fbm-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Sağa Taşı"
                    >
                      →
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="bg-red-600/90 text-white p-1.5 rounded hover:bg-red-500 transition-colors absolute top-1 right-1"
                      title="Sil"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}

              <label className="aspect-square rounded border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors text-white/50 hover:text-white hover:border-white/40 relative">
                <Plus size={24} />
                <span className="text-xs mt-1">Ekle/Sürükle</span>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              </label>
            </div>
          </div>

          {/* Video Yönetimi */}
          <div className="space-y-4 border-t border-white/10 pt-4">
            <label className="block text-sm font-bold text-fbm-gold-400">Videolar</label>

            <div className="grid grid-cols-3 gap-3">
              {existingVideos.map((url, idx) => (
                <div key={`old-vid-${idx}`} className="relative aspect-video rounded-lg overflow-hidden border border-green-500/30 group bg-black">
                  <video src={url} className="w-full h-full object-contain bg-black" controls />
                  <div className="absolute top-0 right-0 p-1">
                    <button type="button" onClick={() => removeExistingVideo(idx)} className="bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs z-10">
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}
              {newVideoPreviews.map((url, idx) => (
                <div key={`new-vid-${idx}`} className="relative aspect-video rounded-lg overflow-hidden border border-yellow-500/30 group bg-black">
                  <video src={url} className="w-full h-full object-contain bg-black" controls />
                  <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/80 text-black text-[10px] text-center py-1">YENİ</div>
                  <button type="button" onClick={() => removeNewVideo(idx)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs z-10">
                    <X size={12} />
                  </button>
                </div>
              ))}

              <label className="aspect-video rounded border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors text-white/50 hover:text-white hover:border-white/40 relative">
                <span className="text-2xl">🎥</span>
                <span className="text-xs mt-1">Ekle/Sürükle</span>
                <input type="file" multiple accept="video/*" onChange={handleVideoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded font-bold text-fbm-navy-900 bg-fbm-gold-400 hover:bg-fbm-bronze-400 transition-all disabled:opacity-50"
          >
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </form>
      </div>
    </main>
  );
}

