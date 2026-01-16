/* app/components/PropertyDetailClient.tsx */
'use client';

import { useEffect, useState, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import Image from 'next/image';
import { Bed, Bath, Square, ArrowLeft, MapPin, X, ChevronLeft, ChevronRight, Maximize2, Send, CheckCircle, Play, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PropertyCard } from '@/app/components/PropertyCard';
import { SocialShare } from '@/app/components/SocialShare';
import { toast, Toaster } from 'sonner';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  floor?: string;
  rooms: number;
  livingRoom: number;
  bathrooms: number;
  description: string;
  images: string[];
  videos?: string[]; // Yeni alan (opsiyonel olabilir)
  type?: string;
}

interface RelatedProperty {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  rooms: number;
  livingRoom: number;
  bathrooms: number;
  image: string;
}

interface DBProperty {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  rooms: number;
  living_rooms: number;
  bathrooms: number;
  image_urls: string[] | null;
  type: string;
  status: string;
}

export default function PropertyDetailClient({ initialProperty }: { initialProperty: Property }) {
  const router = useRouter();
  const [property] = useState<Property | null>(initialProperty);
  const [relatedProperties, setRelatedProperties] = useState<RelatedProperty[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Görseller ve Videoları Birleştirme Mantığı
  const mediaItems = [
    ...(property?.images || []).map(url => ({ type: 'image', url })),
    ...(property?.videos || []).map(url => ({ type: 'video', url }))
  ];

  const activeMedia = mediaItems[activeImageIndex];

  useEffect(() => {
    async function fetchRelatedProperties() {
      if (!property) return;

      // Aynı konumda veya benzer fiyatta 3 ilan getir
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('type', property.type || 'satilik')
        .eq('status', 'aktif')
        .neq('id', property.id)
        .or(`location.ilike.%${property.location.split(',')[0]}%,location.ilike.%${property.location}%`)
        .limit(3);

      if (!error && data) {
        const formatted: RelatedProperty[] = data.map((item: DBProperty) => ({
          id: item.id,
          title: item.title,
          location: item.location,
          price: item.price,
          area: item.area,
          rooms: item.rooms,
          livingRoom: item.living_rooms,
          bathrooms: item.bathrooms,
          image: (item.image_urls && item.image_urls.length > 0)
            ? item.image_urls[0]
            : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
        }));
        setRelatedProperties(formatted);
      }
    }

    fetchRelatedProperties();
  }, [property]);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!property) return;
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!property) return;
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === 'sending') return;
    setFormStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      note: formData.get('note'),
      propertyTitle: property?.title,
      propertyId: property?.id,
      propertyLocation: property?.location,
      propertyLink: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError);
        throw new Error('Sunucu yanıtı okunamadı.');
      }

      if (response.ok) {
        setFormStatus('success');
        toast.success('Mesajınız başarıyla gönderildi!', {
          description: 'En kısa sürede size dönüş yapacağız.',
        });
        setTimeout(() => {
          setIsContactModalOpen(false);
          setFormStatus('idle');
        }, 2500);
      } else if (response.status === 429) {
        // Rate limit exceeded
        toast.error('Çok fazla istek gönderdiniz', {
          description: 'Lütfen bir süre bekleyip tekrar deneyin.',
        });
        setFormStatus('error');
      } else if (response.status === 400 && result.errors) {
        // Validation errors
        const firstError = result.errors[0];
        toast.error('Form hatası', {
          description: firstError?.message || 'Lütfen tüm alanları kontrol edin.',
        });
        setFormStatus('error');
      } else {
        throw new Error(result.message || 'Bir hata oluştu');
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Mesaj gönderilemedi', {
        description: error.message || 'Lütfen daha sonra tekrar deneyin.',
      });
      setFormStatus('error');
    }
  };

  if (!property) {
    return (
      <main className="min-h-screen pt-40 pb-20 px-4 text-center text-white">
        <p>İlan bulunamadı.</p>
        <button onClick={() => router.back()} className="mt-4 text-fbm-gold-400 underline">Geri Dön</button>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" theme="dark" richColors />
      <div className="container mx-auto max-w-6xl">
        <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-fbm-gold-400 hover:text-fbm-bronze-400 transition-colors duration-300">
          <ArrowLeft className="w-5 h-5" /> <span>Geri Dön</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden border border-fbm-gold-400/20 group bg-black/20">
            <motion.div key={activeImageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="relative w-full h-full flex items-center justify-center bg-black">

              {/* Video mu Resim mi Kontrolü */}
              {activeMedia?.type === 'video' ? (
                <video
                  src={activeMedia.url}
                  controls
                  className="w-full h-full object-contain"
                // Videoya tıklandığında lightbox açılmasın istiyorsanız onClick'i kaldırın
                />
              ) : (
                <Image
                  src={activeMedia?.url || '/FRH-logo.png'}
                  alt={property.title}
                  fill
                  className="object-cover cursor-pointer"
                  priority
                  onClick={() => openLightbox(activeImageIndex)}
                />
              )}

            </motion.div>

            {/* Video değilse veya video olsa bile lightbox açmak isterseniz bu butonu tutabilirsiniz */}
            {activeMedia?.type !== 'video' && (
              <button onClick={() => openLightbox(activeImageIndex)} className="absolute top-4 right-4 bg-fbm-navy-900/60 p-2 rounded-full text-fbm-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-10 hover:scale-110">
                <Maximize2 className="w-5 h-5" />
              </button>
            )}

            {mediaItems.length > 1 && (
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
              <p className="font-serif text-4xl text-fbm-gold-400 font-bold mb-6">{property.price} ₺</p>
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
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full bg-fbm-gold-400 text-fbm-navy-900 px-8 py-4 rounded-lg font-sans font-bold hover:bg-fbm-bronze-400 transition-all duration-300 shadow-[0_0_20px_rgba(188,150,72,0.3)] hover:shadow-[0_0_30px_rgba(188,150,72,0.6)] hover:-translate-y-1 border border-fbm-gold-400"
            >
              İletişime Geç
            </button>
          </div>
        </div>

        {/* Sosyal Medya Paylaşım */}
        <div className="mb-8 bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-6 border border-fbm-sage-200/30">
          <SocialShare
            title={property.title}
            description={property.description || `${property.title} - ${property.rooms}+${property.livingRoom}, ${property.area}m², ${property.location}`}
            url={typeof window !== 'undefined' ? window.location.href : ''}
            image={property.images[0]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30">
            <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Genel Bilgiler</h2>
            <div className="space-y-4 text-white/80">
              <div className="flex justify-between pb-3 border-b border-fbm-sage-200/20"><span className="text-white/60">Konum:</span> <span className="font-semibold">{property.location}</span></div>
              <div className="flex justify-between pb-3 border-b border-fbm-sage-200/20"><span className="text-white/60">Bulunduğu Kat:</span> <span className="font-semibold">{property.floor || '-'}</span></div>
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

        {mediaItems.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Galeri ({mediaItems.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => { setActiveImageIndex(index); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`relative h-32 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 border-2 bg-black/40 group ${index === activeImageIndex ? 'border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.5)] opacity-100' : 'border-fbm-sage-200/30 opacity-70 hover:opacity-100 hover:border-white'}`}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full flex items-center justify-center relative">
                      <video src={item.url} className="w-full h-full object-cover pointer-events-none" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 text-white group-hover:bg-fbm-gold-400 group-hover:text-fbm-navy-900 group-hover:scale-110 transition-all duration-300">
                          <Play className="w-5 h-5 fill-current" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={item.url}
                      alt="galeri"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benzer İlanlar */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-3xl text-fbm-gold-400 mb-8">Benzer İlanlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((relatedProp, index) => (
                <PropertyCard key={relatedProp.id} property={relatedProp} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-fbm-navy-900/90 flex items-center justify-center backdrop-blur-lg" onClick={() => setIsLightboxOpen(false)}>
              <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white z-50 text-3xl p-2"><X /></button>
              <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {mediaItems[activeImageIndex].type === 'video' ? (
                    <video src={mediaItems[activeImageIndex].url} controls autoPlay className="w-full h-full object-contain max-h-[85vh]" />
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={mediaItems[activeImageIndex].url}
                        alt="lightbox"
                        fill
                        className="object-contain"
                        sizes="100vw"
                        quality={90}
                        priority
                      />
                    </div>
                  )}
                </motion.div>
              </div>
              {mediaItems.length > 1 && (
                <>
                  <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full text-white hover:bg-fbm-gold-400 hover:text-black transition-all"><ChevronLeft className="w-8 h-8" /></button>
                  <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full text-white hover:bg-fbm-gold-400 hover:text-black transition-all"><ChevronRight className="w-8 h-8" /></button>
                </>
              )}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-sans bg-black/50 px-4 py-1 rounded-full text-sm md:text-base">
                {activeImageIndex + 1} / {mediaItems.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isContactModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overscroll-contain"
              onClick={() => setIsContactModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-[#1b2838] w-full max-w-lg rounded-xl border border-fbm-gold-400 shadow-2xl shadow-black/50 overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="absolute top-4 right-4 text-fbm-gold-400 hover:text-white transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="p-8 md:p-10">
                  <div className="mb-8">
                    <h3 className="text-3xl font-serif text-fbm-gold-400 mb-2">İletişime Geç</h3>
                    <p className="text-sm text-white/60 font-sans">
                      {property.title}
                    </p>
                  </div>

                  {formStatus === 'success' ? (
                    <div className="text-center py-10 flex flex-col items-center justify-center h-full animate-in fade-in zoom-in duration-500">
                      <div className="w-20 h-20 bg-fbm-gold-400/10 rounded-full flex items-center justify-center mb-6 border border-fbm-gold-400/30 shadow-[0_0_30px_rgba(188,150,72,0.2)]">
                        <CheckCircle className="w-10 h-10 text-fbm-gold-400" />
                      </div>
                      <h4 className="text-3xl font-serif text-white mb-3 tracking-wide">Talebiniz Bize Ulaştı</h4>
                      <p className="text-white/60 mb-8 max-w-xs mx-auto leading-relaxed font-sans">
                        İlginiz için teşekkür ederiz. Danışmanlarımız en kısa sürede sizinle iletişime geçecektir.
                      </p>
                      <button
                        onClick={() => setIsContactModalOpen(false)}
                        className="px-8 py-3 bg-fbm-navy-900 border border-fbm-gold-400 text-fbm-gold-400 hover:bg-fbm-gold-400 hover:text-fbm-navy-900 transition-all duration-300 rounded text-sm font-bold tracking-wider uppercase"
                      >
                        Tamam
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-5 font-sans">
                      <div>
                        <label className="block text-xs text-fbm-gold-400 mb-1 font-bold tracking-wider">ADINIZ SOYADINIZ</label>
                        <input
                          name="name"
                          required
                          placeholder="Ad Soyad"
                          className="w-full bg-[#24364b] p-3 rounded border border-fbm-gold-400/20 focus:border-fbm-gold-400 outline-none text-white placeholder:text-white/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-fbm-gold-400 mb-1 font-bold tracking-wider">TELEFON</label>
                        <input
                          name="phone"
                          required
                          placeholder="0555 555 55 55"
                          className="w-full bg-[#24364b] p-3 rounded border border-fbm-gold-400/20 focus:border-fbm-gold-400 outline-none text-white placeholder:text-white/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-fbm-gold-400 mb-1 font-bold tracking-wider">MESAJINIZ</label>
                        <textarea
                          name="note"
                          rows={4}
                          defaultValue={`Merhaba, "${property.title}" ilanı hakkında detaylı bilgi almak istiyorum.`}
                          className="w-full bg-[#24364b] p-3 rounded border border-fbm-gold-400/20 focus:border-fbm-gold-400 outline-none text-white placeholder:text-white/20 transition-colors resize-none text-sm"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === 'sending'}
                        className="w-full bg-fbm-gold-400 text-fbm-navy-900 font-bold py-4 rounded hover:bg-fbm-bronze-400 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg mt-6 border border-fbm-gold-400"
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
        </AnimatePresence>,
        document.body
      )}
    </main >
  );
}

