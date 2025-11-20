/* app/admin/duzenle/[id]/page.tsx */
'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabaseBrowser';
import Image from 'next/image';
import { ArrowLeft, X, Plus } from 'lucide-react';

export default function EditPropertyPage() {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    area: 0,
    rooms: 0,
    living_rooms: 0,
    bathrooms: 0,
    type: 'satilik',
    description: '',
    status: 'aktif'
  });

  // Görsel State'leri
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error || !data) {
        alert('İlan bulunamadı');
        router.push('/admin/panel');
      } else {
        setFormData({
          title: data.title,
          location: data.location,
          price: data.price,
          area: data.area,
          rooms: data.rooms,
          living_rooms: data.living_rooms,
          bathrooms: data.bathrooms,
          type: data.type,
          description: data.description || '',
          status: data.status || 'aktif'
        });
        setExistingImages(data.image_urls || []);
      }
      setLoading(false);
    };

    checkAuthAndFetch();
  }, [params.id, router, supabase]);

  // Input Değişikliği
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Yeni Dosya Seçimi
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setNewFiles(prev => [...prev, ...files]);
      
      const previews = files.map(file => URL.createObjectURL(file));
      setNewPreviews(prev => [...prev, ...previews]);
    }
  };

  // Mevcut Görseli Silme
  const removeExistingImage = (index: number) => {
    if(window.confirm("Bu fotoğrafı silmek istediğinize emin misiniz?")) {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Yeni Yüklenen Görseli İptal Etme
  const removeNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const moveExistingImageLeft = (index: number) => {
    if (index === 0) return;
    setExistingImages(prev => {
      const newImages = [...prev];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      return newImages;
    });
  };

  const moveExistingImageRight = (index: number) => {
    if (index === existingImages.length - 1) return;
    setExistingImages(prev => {
      const newImages = [...prev];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      return newImages;
    });
  };

  const setExistingCoverImage = (index: number) => {
    if (index === 0) return;
    setExistingImages(prev => {
      const newImages = [...prev];
      const [moved] = newImages.splice(index, 1);
      newImages.unshift(moved);
      return newImages;
    });
  };

  const moveNewFileLeft = (index: number) => {
    if (index === 0) return;
    setNewFiles(prev => {
      const newFiles = [...prev];
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
      return newFiles;
    });
    setNewPreviews(prev => {
      const newPreviews = [...prev];
      [newPreviews[index - 1], newPreviews[index]] = [newPreviews[index], newPreviews[index - 1]];
      return newPreviews;
    });
  };

  const moveNewFileRight = (index: number) => {
    if (index === newFiles.length - 1) return;
    setNewFiles(prev => {
      const newFiles = [...prev];
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
      return newFiles;
    });
    setNewPreviews(prev => {
      const newPreviews = [...prev];
      [newPreviews[index], newPreviews[index + 1]] = [newPreviews[index + 1], newPreviews[index]];
      return newPreviews;
    });
  };

  const setNewCoverImage = (index: number) => {
    if (index === 0) return;
    setNewFiles(prev => {
      const newFiles = [...prev];
      const [moved] = newFiles.splice(index, 1);
      newFiles.unshift(moved);
      return newFiles;
    });
    setNewPreviews(prev => {
      const newPreviews = [...prev];
      const [moved] = newPreviews.splice(index, 1);
      newPreviews.unshift(moved);
      return newPreviews;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 1. Yeni Fotoğrafları Yükle
      const uploadedUrls: string[] = [];
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${i}-edit.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName);

        uploadedUrls.push(urlData.publicUrl);
      }

      // 2. Eski ve Yeni Fotoğrafları Birleştir
      const finalImages = [...existingImages, ...uploadedUrls];

      // 3. Veritabanını Güncelle
      const { error: updateError } = await supabase
        .from('properties')
        .update({
          ...formData,
          image_urls: finalImages
        })
        .eq('id', params.id);

      if (updateError) throw updateError;

      alert('İlan başarıyla güncellendi!');
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
    <main className="min-h-screen pt-32 px-4 pb-20 bg-fbm-navy-900 text-white">
      <div className="max-w-3xl mx-auto bg-fbm-denim-750 p-8 rounded-xl border border-fbm-gold-400/30 shadow-2xl">
        
        <div className="flex items-center justify-between mb-8">
            <button onClick={() => router.back()} className="flex items-center text-fbm-gold-400 hover:text-white transition-colors">
                <ArrowLeft className="mr-2" size={20} /> Geri
            </button>
            <h1 className="text-3xl font-serif text-fbm-gold-400">İlanı Düzenle</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5 font-sans">
          
          {/* İlan Tipi ve Durumu */}
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs text-fbm-gold-400 mb-1">İlan Tipi</label>
               <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 text-white">
                  <option value="satilik">Satılık</option>
                  <option value="kiralik">Kiralık</option>
               </select>
             </div>
             <div>
               <label className="block text-xs text-fbm-gold-400 mb-1">Durum</label>
               <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 text-white">
                  <option value="aktif">Aktif (Yayında)</option>
                  <option value="satildi">Satıldı</option>
                  <option value="kiralandi">Kiralandı</option>
               </select>
             </div>
          </div>

          {/* Başlık ve Konum */}
          <div>
             <label className="block text-xs text-fbm-gold-400 mb-1">Başlık</label>
             <input name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
          </div>
          <div>
             <label className="block text-xs text-fbm-gold-400 mb-1">Konum</label>
             <input name="location" value={formData.location} onChange={handleInputChange} required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
          </div>

          {/* Detaylar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
                <label className="block text-xs text-fbm-gold-400 mb-1">Fiyat</label>
                <input name="price" value={formData.price} onChange={handleInputChange} required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            </div>
            <div>
                <label className="block text-xs text-fbm-gold-400 mb-1">m²</label>
                <input name="area" type="number" value={formData.area} onChange={handleInputChange} required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            </div>
            <div>
                <label className="block text-xs text-fbm-gold-400 mb-1">Oda</label>
                <input name="rooms" type="number" value={formData.rooms} onChange={handleInputChange} required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            </div>
            <div>
                <label className="block text-xs text-fbm-gold-400 mb-1">Salon</label>
                <input name="living_rooms" type="number" value={formData.living_rooms} onChange={handleInputChange} required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            </div>
          </div>

          <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} placeholder="Açıklama" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none"></textarea>

          {/* Fotoğraf Yönetimi */}
          <div className="space-y-4 border-t border-white/10 pt-4">
            <label className="block text-sm font-bold text-fbm-gold-400">Fotoğraflar</label>
            <p className="text-xs text-fbm-gold-400/80">İlk fotoğraf kapak fotoğrafı olarak kullanılacaktır.</p>
            
            {/* Mevcut Fotoğraflar */}
            <div className="space-y-3">
              {existingImages.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {existingImages.map((url, idx) => (
                    <div key={`old-${idx}`} className={`relative aspect-square rounded border-2 group ${idx === 0 ? 'border-fbm-gold-400 ring-2 ring-fbm-gold-400/50' : 'border-green-500/30'}`}>
                      <Image src={url} alt="Mevcut" fill className="object-cover rounded" />
                      {idx === 0 && (
                        <div className="absolute top-1 left-1 bg-fbm-gold-400 text-fbm-navy-900 text-[10px] font-bold px-2 py-0.5 rounded">
                          KAPAK
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button type="button" onClick={() => moveExistingImageLeft(idx)} disabled={idx === 0} className="bg-fbm-navy-900/90 text-white p-1.5 rounded hover:bg-fbm-gold-400 hover:text-fbm-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Sola Taşı">←</button>
                        <button type="button" onClick={() => setExistingCoverImage(idx)} disabled={idx === 0} className="bg-fbm-gold-400 text-fbm-navy-900 p-1.5 rounded hover:bg-fbm-bronze-400 font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Kapak Yap">⭐</button>
                        <button type="button" onClick={() => moveExistingImageRight(idx)} disabled={idx === existingImages.length - 1} className="bg-fbm-navy-900/90 text-white p-1.5 rounded hover:bg-fbm-gold-400 hover:text-fbm-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Sağa Taşı">→</button>
                        <button type="button" onClick={() => removeExistingImage(idx)} className="absolute top-1 right-1 bg-red-600/90 text-white p-1.5 rounded hover:bg-red-500 transition-colors" title="Sil"><X size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Yeni Yüklenecekler */}
              {newPreviews.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {newPreviews.map((url, idx) => (
                    <div key={`new-${idx}`} className={`relative aspect-square rounded border-2 group ${idx === 0 && existingImages.length === 0 ? 'border-fbm-gold-400 ring-2 ring-fbm-gold-400/50' : 'border-yellow-500/30'}`}>
                      <Image src={url} alt="Yeni" fill className="object-cover rounded" />
                      <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/80 text-black text-[10px] text-center py-1">YENİ</div>
                      {idx === 0 && existingImages.length === 0 && (
                        <div className="absolute top-1 left-1 bg-fbm-gold-400 text-fbm-navy-900 text-[10px] font-bold px-2 py-0.5 rounded">
                          KAPAK
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button type="button" onClick={() => moveNewFileLeft(idx)} disabled={idx === 0} className="bg-fbm-navy-900/90 text-white p-1.5 rounded hover:bg-fbm-gold-400 hover:text-fbm-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Sola Taşı">←</button>
                        <button type="button" onClick={() => setNewCoverImage(idx)} disabled={idx === 0 && existingImages.length === 0} className="bg-fbm-gold-400 text-fbm-navy-900 p-1.5 rounded hover:bg-fbm-bronze-400 font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Kapak Yap">⭐</button>
                        <button type="button" onClick={() => moveNewFileRight(idx)} disabled={idx === newFiles.length - 1} className="bg-fbm-navy-900/90 text-white p-1.5 rounded hover:bg-fbm-gold-400 hover:text-fbm-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Sağa Taşı">→</button>
                        <button type="button" onClick={() => removeNewFile(idx)} className="absolute top-1 right-1 bg-red-600/90 text-white p-1.5 rounded hover:bg-red-500 transition-colors" title="Sil"><X size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Ekleme Butonu */}
              <label className="aspect-square rounded border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors text-white/50 hover:text-white hover:border-white/40">
                <Plus size={24} />
                <span className="text-xs mt-1">Ekle</span>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
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
