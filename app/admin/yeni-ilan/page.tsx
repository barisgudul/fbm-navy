/* app/admin/yeni-ilan/page.tsx */
'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { createClient } from '@/app/lib/supabaseBrowser';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function YeniIlanPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  // State'lere video için değişkenler ekleyin
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  
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
  
  // Dosya seçilince çalışacak fonksiyon (GÜNCELLENDİ: Üzerine Ekleme Yapar)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Toplam limit kontrolü (Mevcutlar + Yeniler)
      if (selectedFiles.length + newFiles.length > 30) {
        alert('Toplamda en fazla 30 fotoğraf yükleyebilirsiniz.');
        return;
      }
      
      // 1. Dosyaları Mevcutların Üzerine Ekle
      setSelectedFiles(prev => [...prev, ...newFiles]);

      // 2. Önizlemeleri Oluştur ve Ekle
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
      
      // Input'u temizle ki aynı dosyayı peş peşe seçebilsin
      e.target.value = '';
    }
  };

  // YENİ: Fotoğraf Silme Fonksiyonu (Bunu handleFileChange altına ekle)
  const removeImage = (indexToRemove: number) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[indexToRemove]);
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  const moveImageLeft = (index: number) => {
    if (index === 0) return;
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
      return newFiles;
    });
    setPreviews(prev => {
      const newPreviews = [...prev];
      [newPreviews[index - 1], newPreviews[index]] = [newPreviews[index], newPreviews[index - 1]];
      return newPreviews;
    });
  };

  const moveImageRight = (index: number) => {
    if (index === selectedFiles.length - 1) return;
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
      return newFiles;
    });
    setPreviews(prev => {
      const newPreviews = [...prev];
      [newPreviews[index], newPreviews[index + 1]] = [newPreviews[index + 1], newPreviews[index]];
      return newPreviews;
    });
  };

  const setCoverImage = (index: number) => {
    if (index === 0) return;
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      const [moved] = newFiles.splice(index, 1);
      newFiles.unshift(moved);
      return newFiles;
    });
    setPreviews(prev => {
      const newPreviews = [...prev];
      const [moved] = newPreviews.splice(index, 1);
      newPreviews.unshift(moved);
      return newPreviews;
    });
  };

  // Video seçimi için handler
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newVideos = Array.from(e.target.files);

      // Maksimum 2 video limiti (isteğe bağlı)
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
    const videoUrls: string[] = []; // Yeni: Video URL dizisi

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        // Dosya ismini temizle ve benzersiz yap
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${i}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);
          
        imageUrls.push(urlData.publicUrl);
      }

      // YENİ: Video Yükleme Döngüsü
      for (let i = 0; i < selectedVideos.length; i++) {
        const file = selectedVideos[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `video-${Date.now()}-${i}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('property-images') // Videoları da aynı bucket'a atabiliriz veya yeni bucket açabilirsiniz
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);
          
        videoUrls.push(urlData.publicUrl);
      }

      const { error: insertError } = await supabase.from('properties').insert({
        title: formData.get('title'),
        location: formData.get('location'),
        price: formData.get('price'),
        area: Number(formData.get('area')),
        rooms: Number(formData.get('rooms')),
        living_rooms: Number(formData.get('living_rooms')),
        bathrooms: Number(formData.get('bathrooms')),
        floor: formData.get('floor'),
        type: formData.get('type'),
        image_urls: imageUrls,
        video_urls: videoUrls, // Yeni sütuna kaydet
        description: formData.get('description'),
      });

      if (insertError) throw insertError;

      alert('İlan başarıyla yüklendi!');
      router.push(formData.get('type') === 'satilik' ? '/satilik' : '/kiralik');
      router.refresh();

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      alert('Hata: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen pt-40 px-4 pb-20 bg-fbm-navy-900 text-white">
      <div className="max-w-2xl mx-auto bg-fbm-denim-750 p-8 rounded-xl border border-fbm-gold-400/30 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif text-fbm-gold-400">Yeni İlan</h1>
            <button onClick={() => supabase.auth.signOut().then(() => router.push('/admin/login'))} className="text-xs text-red-400 hover:text-red-300 transition-colors underline">Çıkış Yap</button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="md:col-span-1">
               <label className="block text-xs text-fbm-gold-400 mb-1">İlan Tipi</label>
               <select name="type" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none text-white">
                  <option value="satilik">Satılık</option>
                  <option value="kiralik">Kiralık</option>
               </select>
             </div>
             <div className="md:col-span-2">
               <label className="block text-xs text-fbm-gold-400 mb-1">Başlık</label>
               <input name="title" placeholder="Başlık" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
             </div>
          </div>

          <input name="location" placeholder="Konum" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
          
          <div className="grid grid-cols-2 gap-4">
            <input name="price" placeholder="Fiyat" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            <input name="area" type="number" placeholder="m²" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input name="rooms" type="number" placeholder="Oda" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            <input name="living_rooms" type="number" placeholder="Salon" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            <input name="bathrooms" type="number" placeholder="Banyo" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
            <input name="floor" placeholder="Bulunduğu Kat" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
          </div>

          <textarea name="description" placeholder="Açıklama" rows={4} className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none"></textarea>

          {/* GÜNCELLENEN FOTOĞRAF ALANI */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-white/20 p-8 rounded-lg text-center hover:border-fbm-gold-400/50 hover:bg-fbm-navy-900/30 transition-all cursor-pointer relative group">
              {/* z-index 20 ile en üste çıkardık */}
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

            {/* Seçilen Fotoğrafların Önizlemesi (Sıralama ve Kapak Yap Butonlu) */}
            {previews.length > 0 && (
              <div className="space-y-4 mt-4">
                <p className="text-xs text-fbm-gold-400/80">İlk fotoğraf kapak fotoğrafı olarak kullanılacaktır.</p>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 animate-reveal-line">
                  {previews.map((url, index) => (
                    <div key={index} className={`relative aspect-square rounded-lg overflow-hidden border-2 group ${index === 0 ? 'border-fbm-gold-400 ring-2 ring-fbm-gold-400/50' : 'border-fbm-gold-400/30'}`}>
                      <Image 
                        src={url} 
                        alt={`Önizleme ${index + 1}`} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-fbm-gold-400 text-fbm-navy-900 text-[10px] font-bold px-2 py-0.5 rounded">
                          KAPAK
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveImageLeft(index)}
                          disabled={index === 0}
                          className="bg-fbm-navy-900/90 text-white p-1.5 rounded hover:bg-fbm-gold-400 hover:text-fbm-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Sola Taşı"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverImage(index)}
                          disabled={index === 0}
                          className="bg-fbm-gold-400 text-fbm-navy-900 p-1.5 rounded hover:bg-fbm-bronze-400 font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Kapak Yap"
                        >
                          ⭐
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImageRight(index)}
                          disabled={index === previews.length - 1}
                          className="bg-fbm-navy-900/90 text-white p-1.5 rounded hover:bg-fbm-gold-400 hover:text-fbm-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Sağa Taşı"
                        >
                          →
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-red-600/90 text-white p-1.5 rounded hover:bg-red-500 transition-colors absolute top-1 right-1"
                          title="Sil"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
            {loading ? 'Yükleniyor...' : 'İlanı Yayınla'}
          </button>
        </form>
      </div>
    </main>
  );
}