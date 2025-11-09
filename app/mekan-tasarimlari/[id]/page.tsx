/* app/mekan-tasarimlari/[id]/page.tsx */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { generateRandomDesigns } from '@/app/lib/designData';
import { Design } from '@/app/lib/designData';
import Image from 'next/image';
import { Square, ArrowLeft, MapPin, Calendar } from 'lucide-react';

export default function MekanTasarimlariDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [design, setDesign] = useState<Design | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const allDesigns = generateRandomDesigns(100);
      const foundDesign = allDesigns.find(d => d.id === Number(params.id));
      setDesign(foundDesign || null);
    }, 0);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (!design) {
    return (
      <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <p className="text-white">Tasarım bulunamadı.</p>
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
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
            {design.image ? (
              <Image
                src={design.image}
                alt={design.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-fbm-navy-900 via-fbm-denim-750 to-fbm-gold-400">
                <Square className="w-20 h-20 text-fbm-gold-400/30" />
              </div>
            )}
          </div>

          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-fbm-gold-400 mb-4">
              {design.title}
            </h1>
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <MapPin className="w-5 h-5 text-fbm-gold-400" />
              <span>{design.location}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 mb-6">
              <span className="px-3 py-1 bg-fbm-sage-200/20 rounded-full text-sm border border-fbm-sage-200/40 text-fbm-gold-400">
                {design.type}
              </span>
            </div>

            <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-fbm-sage-200/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Square className="w-5 h-5 text-fbm-gold-400" />
                  </div>
                  <p className="text-white font-bold text-2xl">{design.area}</p>
                  <p className="text-white/60 text-sm">m²</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-fbm-gold-400" />
                  </div>
                  <p className="text-white font-bold text-2xl">{design.year}</p>
                  <p className="text-white/60 text-sm">Yıl</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-fbm-cream-100 text-fbm-navy-900 px-8 py-4 rounded-lg font-sans font-bold hover:bg-fbm-bronze-500 hover:text-white transition-all duration-300">
              İletişime Geç
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30">
            <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Proje Bilgileri</h2>
            <div className="space-y-4 text-white/80">
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Proje Adı:</span>
                <span className="text-white font-semibold">{design.title}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Tasarım Tipi:</span>
                <span className="text-white font-semibold">{design.type}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Konum:</span>
                <span className="text-white font-semibold">{design.location}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Toplam Alan:</span>
                <span className="text-white font-semibold">{design.area} m²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Tamamlanma:</span>
                <span className="text-white font-semibold">{design.year}</span>
              </div>
            </div>
          </div>

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
        </div>

        <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30 mt-8">
          <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Proje Açıklaması</h2>
          <p className="text-white/80 leading-relaxed">
            {design.title} projesi, {design.location} bölgesinde {design.year} yılında tamamlanmıştır. 
            {design.type} kategorisinde yer alan bu proje, toplam {design.area} m² alan üzerine inşa edilmiştir. 
            Modern iç tasarım anlayışıyla planlanan bu mekan, estetik ve fonksiyonelliği bir araya getirmektedir. 
            Özenle seçilmiş malzemeler ve dikkatli planlanmış detaylarla, kullanıcılar için konforlu ve ilham verici bir ortam yaratılmıştır.
          </p>
        </div>
      </div>
    </main>
  );
}
