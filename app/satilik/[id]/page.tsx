/* app/satilik/[id]/page.tsx */
'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import Image from 'next/image';
import { Bed, Bath, Square, ArrowLeft, MapPin, X, ChevronLeft, ChevronRight, Maximize2, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Veri Tipi
interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  rooms: number;
  livingRoom: number;
  bathrooms: number;
  description: string;
  images: string[];
}

export default function SatilikDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function fetchProperty() {
      if (!params.id) return;

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Hata:', error);
      } else if (data) {
        const imagesList = (data.image_urls && data.image_urls.length > 0) 
          ? data.image_urls 
          : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'];

        setProperty({
          id: data.id,
          title: data.title,
          location: data.location,
          price: data.price,
          area: data.area,
          rooms: data.rooms,
          livingRoom: data.living_rooms,
          bathrooms: data.bathrooms,
          description: data.description,
          images: imagesList
        });
        setActiveImageIndex(0);
      }
      setLoading(false);
    }

    fetchProperty();
  }, [params.id]);

  // Lightbox Metotları
  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!property) return;
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!property) return;
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length);
  };

  // FORM GÖNDERME
  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      note: formData.get('note'),
      propertyTitle: property?.title,
      propertyId: property?.id,
      propertyLocation: property?.location,
      propertyLink: window.location.href,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
        setTimeout(() => {
          setIsContactModalOpen(false);
          setFormStatus('idle'); 
        }, 2500);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
        console.error(error);
        setFormStatus('error');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-40 pb-20 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fbm-gold-400"></div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen pt-40 pb-20 px-4 text-center text-white">
        <p>İlan bulunamadı.</p>
        <button onClick={() => router.back()} className="mt-4 text-fbm-gold-400 underline">Geri Dön</button>
      </main>
    );
  }

  const currentActiveImage = property.images[activeImageIndex];

  return (
    <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-fbm-gold-400 hover:text-fbm-bronze-400 transition-colors duration-300">
          <ArrowLeft className="w-5 h-5" /> <span>Geri Dön</span>
        </button>

        {/* ÜST KISIM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden border border-fbm-gold-400/20 group bg-black/20">
            <motion.div key={activeImageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="relative w-full h-full">
              <Image src={currentActiveImage} alt={property.title} fill className="object-cover cursor-pointer" priority onClick={() => openLightbox(activeImageIndex)} />
            </motion.div>
            <button onClick={() => openLightbox(activeImageIndex)} className="absolute top-4 right-4 bg-fbm-navy-900/60 p-2 rounded-full text-fbm-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-10 hover:scale-110">
               <Maximize2 className="w-5 h-5" />
            </button>
            {property.images.length > 1 && (
              <>
                <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-fbm-navy-900/60 p-2 rounded-full text-fbm-gold-400 hover:bg-fbm-gold-400 hover:text-fbm-navy-900 transition-all opacity-0 group-hover:opacity-100 duration-300 backdrop-blur-sm z-10">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-fbm-navy-900/60 p-2 rounded-full text-fbm-gold-400 hover:bg-fbm-gold-400 hover:text-fbm-navy-900 transition-all opacity-0 group-hover:opacity-100 duration-300 backdrop-blur-sm z-10">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-fbm-gold-400 mb-4">{property.title}</h1>
            <div className="flex items-center gap-2 text-white/80 mb-6">
              <MapPin className="w-5 h-5 text-fbm-gold-400" /> <span>{property.location}</span>
            </div>
            <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-fbm-sage-200/30">
              <p className="font-serif text-4xl text-fbm-gold-400 font-bold mb-6">{property.price}</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Bed className="w-5 h-5 text-fbm-gold-400 mx-auto mb-2" />
                  <p className="text-white font-bold">{property.rooms} + {property.livingRoom}</p>
                  <p className="text-white/60 text-sm">Oda</p>
                </div>
                <div className="text-center">
                  <Bath className="w-5 h-5 text-fbm-gold-400 mx-auto mb-2" />
                  <p className="text-white font-bold">{property.bathrooms}</p>
                  <p className="text-white/60 text-sm">Banyo</p>
                </div>
                <div className="text-center">
                  <Square className="w-5 h-5 text-fbm-gold-400 mx-auto mb-2" />
                  <p className="text-white font-bold">{property.area}</p>
                  <p className="text-white/60 text-sm">m²</p>
                </div>
              </div>
            </div>
            {/* GÜNCELLENEN ANA BUTON */}
            <button 
                onClick={() => setIsContactModalOpen(true)} 
                className="w-full bg-fbm-gold-400 text-fbm-navy-900 px-8 py-4 rounded-lg font-sans font-bold hover:bg-fbm-bronze-400 transition-all duration-300 shadow-[0_0_20px_rgba(188,150,72,0.3)] hover:shadow-[0_0_30px_rgba(188,150,72,0.6)] hover:-translate-y-1 border border-fbm-gold-400"
            >
              İletişime Geç
            </button>
          </div>
        </div>

        {/* ALT BİLGİLER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30">
            <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Genel Bilgiler</h2>
            <div className="space-y-4 text-white/80">
              <div className="flex justify-between pb-3 border-b border-fbm-sage-200/20"><span className="text-white/60">Konum:</span> <span className="font-semibold">{property.location}</span></div>
              <div className="flex justify-between pb-3 border-b border-fbm-sage-200/20"><span className="text-white/60">Oda:</span> <span className="font-semibold">{property.rooms} + {property.livingRoom}</span></div>
              <div className="flex justify-between pb-3 border-b border-fbm-sage-200/20"><span className="text-white/60">Banyo:</span> <span className="font-semibold">{property.bathrooms}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Alan:</span> <span className="font-semibold">{property.area} m²</span></div>
            </div>
          </div>
          <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30">
            <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Açıklama</h2>
            <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{property.description || "Açıklama girilmemiştir."}</p>
          </div>
        </div>

        {/* GALERİ */}
        {property.images.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Tüm Fotoğraflar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {property.images.map((img, index) => (
                <div key={index} onClick={() => openLightbox(index)} className={`relative h-32 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2 ${index === activeImageIndex ? 'border-fbm-gold-400 scale-105' : 'border-transparent opacity-80 hover:opacity-100'}`}>
                  <Image src={img} alt="galeri" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-fbm-navy-900/90 flex items-center justify-center backdrop-blur-lg" onClick={() => setIsLightboxOpen(false)}>
            <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white z-50 text-3xl p-2"><X /></button>
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.div key={activeImageIndex} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full h-full border border-fbm-gold-400/50 rounded-lg overflow-hidden">
                <Image src={property.images[activeImageIndex]} alt="lightbox" fill className="object-contain" />
              </motion.div>
            </div>
            {property.images.length > 1 && (
              <>
                <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full text-white hover:bg-fbm-gold-400 hover:text-black transition-all"><ChevronLeft className="w-8 h-8" /></button>
                <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full text-white hover:bg-fbm-gold-400 hover:text-black transition-all"><ChevronRight className="w-8 h-8" /></button>
              </>
            )}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-sans bg-black/50 px-4 py-1 rounded-full text-sm md:text-base">
               {activeImageIndex + 1} / {property.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YENİLENEN İLETİŞİM FORMU MODAL (DARK & PREMIUM) */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Arka plan bulanıklığını artırdık
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsContactModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              // Arka plan rengi: Denim-750 (Sitenin ana koyu rengi) + Altın Kenarlık + Derin Gölge
              className="bg-fbm-denim-750 w-full max-w-md rounded-xl border border-fbm-gold-400/20 shadow-[0_0_50px_rgba(0,0,0,0.7)] overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Kapat Butonu */}
              <button 
                onClick={() => setIsContactModalOpen(false)} 
                className="absolute top-4 right-4 text-white/40 hover:text-red-400 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Form İçeriği */}
              <div className="p-8">
                <div className="text-center mb-8">
                   <h3 className="text-3xl font-serif text-fbm-gold-400 mb-2">İletişime Geç</h3>
                   <p className="text-sm text-white/60 font-sans border-b border-white/10 pb-4 mx-auto max-w-[200px]">
                      {property.title}
                   </p>
                </div>

                {formStatus === 'success' ? (
                  <div className="text-center py-8 animate-reveal-line">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 drop-shadow-lg" />
                    <h4 className="text-xl text-white font-bold mb-2">Talebiniz Alındı</h4>
                    <p className="text-white/60">En kısa sürede size dönüş yapacağız.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5 font-sans">
                    <div>
                      <label className="block text-xs font-bold text-fbm-gold-400/80 uppercase tracking-wider mb-1">Adınız Soyadınız</label>
                      <input 
                        name="name" 
                        required 
                        placeholder="Ad Soyad" 
                        // Input arka planı: Navy-900 (Daha koyu lacivert)
                        className="w-full bg-fbm-navy-900/50 p-3 rounded border border-white/10 text-white placeholder:text-white/30 focus:border-fbm-gold-400 focus:bg-fbm-navy-900 outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-fbm-gold-400/80 uppercase tracking-wider mb-1">Telefon</label>
                      <input 
                        name="phone" 
                        required 
                        placeholder="0555 555 55 55" 
                        className="w-full bg-fbm-navy-900/50 p-3 rounded border border-white/10 text-white placeholder:text-white/30 focus:border-fbm-gold-400 focus:bg-fbm-navy-900 outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-fbm-gold-400/80 uppercase tracking-wider mb-1">Mesajınız</label>
                      <textarea 
                        name="note" 
                        rows={4} 
                        defaultValue={`Merhaba, "${property.title}" ilanı hakkında detaylı bilgi almak istiyorum.`}
                        className="w-full bg-fbm-navy-900/50 p-3 rounded border border-white/10 text-white focus:border-fbm-gold-400 focus:bg-fbm-navy-900 outline-none transition-all resize-none text-sm"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === 'sending'}
                      className="w-full bg-fbm-gold-400 text-fbm-navy-900 font-bold py-4 rounded hover:bg-fbm-bronze-400 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(188,150,72,0.3)] mt-4"
                    >
                      {formStatus === 'sending' ? (
                        'İletiliyor...'
                      ) : (
                        <>
                          MESAJI GÖNDER <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}