/* app/mekan-tasarimlari/[id]/DesignDetailClient.tsx */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Square, ArrowLeft, MapPin, Calendar, Play, Ruler, Droplets, Leaf, Home, Building2 } from 'lucide-react';
import { SocialShare } from '@/app/components/SocialShare';
import { SPEC_LABEL_MAP, formatSpecValue, type DesignSpecs } from '@/app/lib/constants';

interface Design {
  id: number;
  title: string;
  type: string;
  location: string;
  area: number;
  year: number;
  image: string;
  description?: string;
  images?: string[];
  videos?: string[];
  specs?: DesignSpecs | null;
}

// TechnicalSpecs Component - Renders specs with Turkish labels and units
function TechnicalSpecs({ specs, type }: { specs: DesignSpecs | null | undefined; type: string }) {
  if (!specs || Object.keys(specs).length === 0) return null;

  // Get icon and color based on category
  const getCategoryStyle = () => {
    if (specs.category === 'Havuz Tasarımı') {
      return { icon: <Droplets className="w-5 h-5" />, color: 'text-blue-400', border: 'border-blue-500/30' };
    }
    if (specs.category === 'Peyzaj & Bahçe') {
      return { icon: <Leaf className="w-5 h-5" />, color: 'text-green-400', border: 'border-green-500/30' };
    }
    if (specs.category === 'Cephe Tasarımı') {
      return { icon: <Building2 className="w-5 h-5" />, color: 'text-purple-400', border: 'border-purple-500/30' };
    }
    // Interior categories
    return { icon: <Home className="w-5 h-5" />, color: 'text-amber-400', border: 'border-amber-500/30' };
  };

  const style = getCategoryStyle();

  // Filter out the 'category' key and only show actual spec values
  const specEntries = Object.entries(specs).filter(([key, value]) => {
    if (key === 'category') return false;
    if (value === undefined || value === null || value === '') return false;
    return SPEC_LABEL_MAP[key] !== undefined;
  });

  if (specEntries.length === 0) return null;

  return (
    <div className={`bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border ${style.border}`}>
      <h2 className={`font-serif text-3xl ${style.color} mb-6 flex items-center gap-3`}>
        {style.icon}
        Teknik Özellikler
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {specEntries.map(([key, value]) => {
          const config = SPEC_LABEL_MAP[key];
          if (!config) return null;

          const formattedValue = formatSpecValue(key, value);
          if (!formattedValue) return null;

          return (
            <div
              key={key}
              className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20"
            >
              <span className="text-white/60">{config.label}:</span>
              <span className="text-white font-semibold">{formattedValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DesignDetailClient({ initialDesign }: { initialDesign: Design }) {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Görseller ve Videoları Birleştirme Mantığı
  const mediaItems = [
    ...(initialDesign?.images || []).map(url => ({ type: 'image', url })),
    ...(initialDesign?.videos || []).map(url => ({ type: 'video', url }))
  ];

  const activeMedia = mediaItems[activeImageIndex] || (initialDesign?.image ? { type: 'image', url: initialDesign.image } : null);

  if (!initialDesign) {
    return (
      <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <p className="text-white">Tasarım bulunamadı.</p>
          <button onClick={() => router.back()} className="mt-4 text-fbm-gold-400 underline">Geri Dön</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-fbm-gold-400 hover:text-fbm-bronze-400 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Geri Dön</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden bg-black flex items-center justify-center">
            {activeMedia ? (
              activeMedia.type === 'video' ? (
                <video
                  src={activeMedia.url}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={activeMedia.url}
                  alt={initialDesign.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-fbm-navy-900 via-fbm-denim-750 to-fbm-gold-400">
                <Square className="w-20 h-20 text-fbm-gold-400/30" />
              </div>
            )}
          </div>

          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-fbm-gold-400 mb-4">
              {initialDesign.title}
            </h1>
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <MapPin className="w-5 h-5 text-fbm-gold-400" />
              <span>{initialDesign.location}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 mb-6">
              <span className="px-3 py-1 bg-fbm-sage-200/20 rounded-full text-sm border border-fbm-sage-200/40 text-fbm-gold-400">
                {initialDesign.type}
              </span>
            </div>

            <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-fbm-sage-200/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Square className="w-5 h-5 text-fbm-gold-400" />
                  </div>
                  <p className="text-white font-bold text-2xl">{initialDesign.area}</p>
                  <p className="text-white/60 text-sm">m²</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-fbm-gold-400" />
                  </div>
                  <p className="text-white font-bold text-2xl">{initialDesign.year}</p>
                  <p className="text-white/60 text-sm">Yıl</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-fbm-cream-100 text-fbm-navy-900 px-8 py-4 rounded-lg font-sans font-bold hover:bg-fbm-bronze-500 hover:text-white transition-all duration-300">
              İletişime Geç
            </button>
          </div>
        </div>

        {/* Sosyal Medya Paylaşım */}
        <div className="mb-8 bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-6 border border-fbm-sage-200/30">
          <SocialShare
            title={initialDesign.title}
            description={initialDesign.description || `${initialDesign.title} - ${initialDesign.type} mekan tasarımı projesi, ${initialDesign.location}`}
            url={typeof window !== 'undefined' ? window.location.href : ''}
            image={initialDesign.images?.[0] || initialDesign.image}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30">
            <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Proje Bilgileri</h2>
            <div className="space-y-4 text-white/80">
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Proje Adı:</span>
                <span className="text-white font-semibold">{initialDesign.title}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Tasarım Tipi:</span>
                <span className="text-white font-semibold">{initialDesign.type}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Konum:</span>
                <span className="text-white font-semibold">{initialDesign.location}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Toplam Alan:</span>
                <span className="text-white font-semibold">{initialDesign.area} m²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Tamamlanma:</span>
                <span className="text-white font-semibold">{initialDesign.year}</span>
              </div>
            </div>
          </div>

          {/* Technical Specs - Conditionally rendered based on specs existence */}
          {initialDesign.specs ? (
            <TechnicalSpecs specs={initialDesign.specs} type={initialDesign.type} />
          ) : (
            <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30">
              <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Tasarım Özellikleri</h2>
              <div className="space-y-4">
                <div className="space-y-3 text-sm text-white/80">
                  <p>• Modern ve fonksiyonel tasarım anlayışı</p>
                  <p>• Yüksek kaliteli malzeme kullanımı</p>
                  <p>• Estetik ve kullanılabilirlik odaklı yaklaşım</p>
                  <p>• Özel tasarım detayları</p>
                  <p>• Sürdürülebilir tasarım prensipleri</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30 mt-8">
          <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Proje Açıklaması</h2>
          <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
            {initialDesign.description || `${initialDesign.title} projesi, ${initialDesign.location} bölgesinde ${initialDesign.year} yılında tamamlanmıştır. ${initialDesign.type} kategorisinde yer alan bu proje, toplam ${initialDesign.area} m² alan üzerine inşa edilmiştir. Modern iç tasarım anlayışıyla planlanan bu mekan, estetik ve fonksiyonelliği bir araya getirmektedir. Özenle seçilmiş malzemeler ve dikkatli planlanmış detaylarla, kullanıcılar için konforlu ve ilham verici bir ortam yaratılmıştır.`}
          </p>
        </div>

        {mediaItems.length > 1 && (
          <div className="mt-12">
            <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Galeri ({mediaItems.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => { setActiveImageIndex(index); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`relative h-32 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 border-2 bg-black/40 group ${index === activeImageIndex ? 'border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.5)] opacity-100' : 'border-fbm-sage-200/30 opacity-70 hover:opacity-100 hover:border-white hover:scale-[1.02]'}`}
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
                      alt={`${initialDesign.title} - ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


