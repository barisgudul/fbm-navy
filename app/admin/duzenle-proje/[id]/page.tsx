/* app/admin/duzenle-proje/[id]/page.tsx */
'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabaseBrowser';
import Image from 'next/image';
import { ArrowLeft, X, Plus } from 'lucide-react';

export default function EditDesignPage() {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    area: 0,
    year: new Date().getFullYear(),
    description: ''
  });

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
        setExistingImages(data.image_urls || []);
      }
      setLoading(false);
    };

    checkAuthAndFetch();
  }, [params.id, router, supabase]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setNewFiles(prev => [...prev, ...files]);
      
      const previews = files.map(file => URL.createObjectURL(file));
      setNewPreviews(prev => [...prev, ...previews]);
    }
  };

  const removeExistingImage = (index: number) => {
    if(window.confirm("Bu fotoğrafı silmek istediğinize emin misiniz?")) {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const removeNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${i}-design-edit.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('design-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('design-images')
          .getPublicUrl(fileName);

        uploadedUrls.push(urlData.publicUrl);
      }

      const finalImages = [...existingImages, ...uploadedUrls];

      const { error: updateError } = await supabase
        .from('designs')
        .update({
          ...formData,
          image_urls: finalImages
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
    <main className="min-h-screen pt-32 px-4 pb-20 bg-fbm-navy-900 text-white">
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
              <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 text-white">
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

          <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} placeholder="Açıklama" className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 focus:border-fbm-gold-400 outline-none"></textarea>

          <div className="space-y-4 border-t border-white/10 pt-4">
            <label className="block text-sm font-bold text-fbm-gold-400">Fotoğraflar</label>
            
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {existingImages.map((url, idx) => (
                    <div key={`old-${idx}`} className="relative aspect-square rounded border border-green-500/30 group">
                        <Image src={url} alt="Mevcut" fill className="object-cover rounded" />
                        <button type="button" onClick={() => removeExistingImage(idx)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs z-10">
                            <X size={12} />
                        </button>
                    </div>
                ))}
                {newPreviews.map((url, idx) => (
                    <div key={`new-${idx}`} className="relative aspect-square rounded border border-yellow-500/30 group">
                        <Image src={url} alt="Yeni" fill className="object-cover rounded" />
                        <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/80 text-black text-[10px] text-center py-1">YENİ</div>
                        <button type="button" onClick={() => removeNewFile(idx)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs z-10">
                            <X size={12} />
                        </button>
                    </div>
                ))}
                
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

