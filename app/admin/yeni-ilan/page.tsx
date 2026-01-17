/* app/admin/yeni-ilan/page.tsx */
'use client';

import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { createClient } from '@/app/lib/supabaseBrowser';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ZONING_STATUS_OPTIONS, PropertyCategory } from '@/types';

export default function YeniIlanPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Category state
  const [category, setCategory] = useState<PropertyCategory>('konut');

  // State'lere video için değişkenler
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);

  // Form values for price per m² calculation
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');

  // Calculate price per m² for Land
  const pricePerM2 = useMemo(() => {
    if (category !== 'arsa' || !price || !area) return null;
    const numericPrice = parseFloat(price.replace(/[^\d]/g, ''));
    const numericArea = parseFloat(area);
    if (isNaN(numericPrice) || isNaN(numericArea) || numericArea === 0) return null;
    return Math.round(numericPrice / numericArea).toLocaleString('tr-TR');
  }, [category, price, area]);

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

  // Dosya seçilince çalışacak fonksiyon
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

    // Conditional validation
    if (category === 'arsa') {
      const zoningStatus = formData.get('zoning_status');
      if (!zoningStatus) {
        alert('Lütfen imar durumunu seçin.');
        setLoading(false);
        return;
      }
    }

    const imageUrls: string[] = [];
    const videoUrls: string[] = [];

    try {
      // Upload images
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        console.log(`Yükleniyor [${i + 1}/${selectedFiles.length}]:`, {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          type: file.type
        });

        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${Date.now()}-${i}.${fileExt}`;
        const filePath = fileName;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        console.log('Upload sonucu:', { uploadData, uploadError });

        if (uploadError) {
          console.error('Upload hatası detayı:', uploadError);
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        imageUrls.push(urlData.publicUrl);
      }

      // Upload videos
      for (let i = 0; i < selectedVideos.length; i++) {
        const file = selectedVideos[i];

        console.log(`Video yükleniyor [${i + 1}/${selectedVideos.length}]:`, {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          type: file.type
        });

        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
        const fileName = `video-${Date.now()}-${i}.${fileExt}`;
        const filePath = fileName;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        console.log('Video upload sonucu:', { uploadData, uploadError });

        if (uploadError) {
          console.error('Video upload hatası detayı:', uploadError);
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        videoUrls.push(urlData.publicUrl);
      }

      // Build insert data with conditional fields
      const insertData: Record<string, unknown> = {
        title: formData.get('title'),
        location: formData.get('location'),
        price: formData.get('price'),
        area: Number(formData.get('area')),
        type: formData.get('type'),
        category: category,
        image_urls: imageUrls,
        video_urls: videoUrls,
        description: formData.get('description'),
      };

      // Add category-specific fields, send null for irrelevant ones
      if (category === 'konut') {
        insertData.rooms = Number(formData.get('rooms')) || null;
        insertData.living_rooms = Number(formData.get('living_rooms')) || null;
        insertData.bathrooms = Number(formData.get('bathrooms')) || null;
        insertData.floor = formData.get('floor') || null;
        // Null out land fields
        insertData.zoning_status = null;
        insertData.ada = null;
        insertData.parsel = null;
        insertData.kaks = null;
        insertData.taks = null;
        insertData.gabari = null;
        insertData.tapu_durumu = null;
        insertData.kredi_uygunluk = null;
      } else {
        // Arsa category
        insertData.zoning_status = formData.get('zoning_status');
        insertData.ada = formData.get('ada') || null;
        insertData.parsel = formData.get('parsel') || null;
        insertData.kaks = formData.get('kaks') ? Number(formData.get('kaks')) : null;
        insertData.taks = formData.get('taks') ? Number(formData.get('taks')) : null;
        insertData.gabari = formData.get('gabari') || null;
        insertData.tapu_durumu = formData.get('tapu_durumu') || null;
        insertData.kredi_uygunluk = formData.get('kredi_uygunluk') === 'true';
        // Null out residential fields
        insertData.rooms = null;
        insertData.living_rooms = null;
        insertData.bathrooms = null;
        insertData.floor = null;
      }

      const { error: insertError } = await supabase.from('properties').insert(insertData);

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
          {/* CATEGORY SELECTOR TABS */}
          <div className="mb-6">
            <label className="block text-xs text-fbm-gold-400 mb-2 font-bold">Kategori Seçin</label>
            <div className="flex rounded-lg overflow-hidden border border-fbm-gold-400/30">
              <button
                type="button"
                onClick={() => setCategory('konut')}
                className={`flex-1 py-4 px-6 text-center font-bold transition-all duration-300 ${category === 'konut'
                    ? 'bg-fbm-gold-400 text-fbm-navy-900'
                    : 'bg-fbm-navy-900/50 text-white/70 hover:bg-fbm-navy-900 hover:text-white'
                  }`}
              >
                🏠 Konut
                <span className="block text-xs font-normal mt-1 opacity-70">Daire, Villa, Müstakil</span>
              </button>
              <button
                type="button"
                onClick={() => setCategory('arsa')}
                className={`flex-1 py-4 px-6 text-center font-bold transition-all duration-300 ${category === 'arsa'
                    ? 'bg-fbm-gold-400 text-fbm-navy-900'
                    : 'bg-fbm-navy-900/50 text-white/70 hover:bg-fbm-navy-900 hover:text-white'
                  }`}
              >
                🏞️ Arsa
                <span className="block text-xs font-normal mt-1 opacity-70">Arsa, Tarla, Arazi</span>
              </button>
            </div>
          </div>

          {/* COMMON FIELDS */}
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

          <div>
            <label className="block text-xs text-fbm-gold-400 mb-1">Konum</label>
            <input name="location" placeholder="Konum" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-fbm-gold-400 mb-1">Fiyat (₺)</label>
              <input
                name="price"
                placeholder="Fiyat"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-fbm-gold-400 mb-1">Alan (m²)</label>
              <input
                name="area"
                type="number"
                placeholder="m²"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none"
              />
            </div>
          </div>

          {/* Price per m² Calculator for Land */}
          {category === 'arsa' && pricePerM2 && (
            <div className="bg-fbm-gold-400/10 border border-fbm-gold-400/30 rounded-lg p-4 flex items-center justify-between">
              <span className="text-fbm-gold-400 font-medium">Birim Fiyatı:</span>
              <span className="text-2xl font-bold text-fbm-gold-400">{pricePerM2} ₺/m²</span>
            </div>
          )}

          {/* CONDITIONAL FIELDS: KONUT */}
          {category === 'konut' && (
            <div className="space-y-4 p-4 bg-fbm-navy-900/30 rounded-lg border border-white/10">
              <h3 className="text-sm font-bold text-fbm-gold-400 flex items-center gap-2">
                🏠 Konut Bilgileri
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Oda</label>
                  <input name="rooms" type="number" placeholder="Oda" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Salon</label>
                  <input name="living_rooms" type="number" placeholder="Salon" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Banyo</label>
                  <input name="bathrooms" type="number" placeholder="Banyo" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Kat</label>
                  <input name="floor" placeholder="Kat" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* CONDITIONAL FIELDS: ARSA */}
          {category === 'arsa' && (
            <div className="space-y-4 p-4 bg-fbm-navy-900/30 rounded-lg border border-white/10">
              <h3 className="text-sm font-bold text-fbm-gold-400 flex items-center gap-2">
                🏞️ Arsa Bilgileri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs text-white/60 mb-1">İmar Durumu *</label>
                  <select name="zoning_status" required className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none text-white">
                    <option value="">Seçiniz...</option>
                    {ZONING_STATUS_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Ada No</label>
                  <input name="ada" placeholder="Ada" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Parsel No</label>
                  <input name="parsel" placeholder="Parsel" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">KAKS (Emsal)</label>
                  <input name="kaks" type="number" step="0.01" placeholder="Örn: 0.30" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">TAKS</label>
                  <input name="taks" type="number" step="0.01" placeholder="Örn: 0.20" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Gabari</label>
                  <input name="gabari" placeholder="Örn: 3 Kat" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Tapu Durumu</label>
                  <input name="tapu_durumu" placeholder="Örn: Hisseli" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-white/60 mb-1">Krediye Uygunluk</label>
                  <select name="kredi_uygunluk" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none text-white">
                    <option value="">Belirtilmemiş</option>
                    <option value="true">Krediye Uygun</option>
                    <option value="false">Krediye Uygun Değil</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-fbm-gold-400 mb-1">Açıklama</label>
            <textarea name="description" placeholder="Açıklama" rows={4} className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none"></textarea>
          </div>

          {/* FOTOĞRAF ALANI */}
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