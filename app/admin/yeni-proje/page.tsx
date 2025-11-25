/* app/admin/yeni-proje/page.tsx */
'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { createClient } from '@/app/lib/supabaseBrowser';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

      const { error: insertError } = await supabase.from('designs').insert({
        title: formData.get('title'),
        type: formData.get('type'),
        location: formData.get('location'),
        area: Number(formData.get('area')),
        year: Number(formData.get('year')),
        image_urls: imageUrls,
        video_urls: videoUrls,
        description: formData.get('description'),
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
              <select name="type" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none text-white">
                <option value="İç Tasarım">İç Tasarım</option>
                <option value="Dış Tasarım">Dış Tasarım</option>
                <option value="Peyzaj">Peyzaj</option>
                <option value="Ofis Tasarımı">Ofis Tasarımı</option>
                <option value="Konut Tasarımı">Konut Tasarımı</option>
                <option value="Ticari Mekan">Ticari Mekan</option>
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

