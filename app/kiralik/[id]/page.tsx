/* app/kiralik/[id]/page.tsx */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { generateRandomProperties } from '@/app/lib/propertyData';
import { Property } from '@/app/lib/propertyData';
import Image from 'next/image';
import { Bed, Bath, Square, ArrowLeft, MapPin } from 'lucide-react';

export default function KiralikDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const allProperties = generateRandomProperties(100, true);
      const foundProperty = allProperties.find(p => p.id === Number(params.id));
      setProperty(foundProperty || null);
    }, 0);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (!property) {
    return (
      <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <p className="text-white">İlan bulunamadı.</p>
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
            {property.image ? (
              <Image
                src={property.image}
                alt={property.title}
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
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-white/80 mb-6">
              <MapPin className="w-5 h-5 text-fbm-gold-400" />
              <span>{property.location}</span>
            </div>

            <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-fbm-sage-200/30">
              <p className="font-serif text-4xl text-fbm-gold-400 font-bold mb-6">
                {property.price}
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Bed className="w-5 h-5 text-fbm-gold-400" />
                  </div>
                  <p className="text-white font-bold">{property.rooms} + {property.livingRoom}</p>
                  <p className="text-white/60 text-sm">Oda + Salon</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Bath className="w-5 h-5 text-fbm-gold-400" />
                  </div>
                  <p className="text-white font-bold">{property.bathrooms}</p>
                  <p className="text-white/60 text-sm">Banyo</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Square className="w-5 h-5 text-fbm-gold-400" />
                  </div>
                  <p className="text-white font-bold">{property.area}</p>
                  <p className="text-white/60 text-sm">m²</p>
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
            <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Genel Bilgiler</h2>
            <div className="space-y-4 text-white/80">
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Konum:</span>
                <span className="text-white font-semibold">{property.location}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Oda Sayısı:</span>
                <span className="text-white font-semibold">{property.rooms} + {property.livingRoom}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Banyo Sayısı:</span>
                <span className="text-white font-semibold">{property.bathrooms}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fbm-sage-200/20">
                <span className="text-white/60">Brüt Alan:</span>
                <span className="text-white font-semibold">{property.area} m²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Net Alan:</span>
                <span className="text-white font-semibold">{Math.round(property.area * 0.85)} m²</span>
              </div>
            </div>
          </div>

          <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30">
            <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Kira Bilgileri</h2>
            <div className="space-y-4">
              <div className="mb-6">
                <p className="text-white/60 mb-2">Aylık Kira</p>
                <p className="font-serif text-4xl text-fbm-gold-400 font-bold">{property.price}</p>
              </div>
              <div className="space-y-3 text-sm text-white/80">
                <p>• Aylık ödeme yapılabilir</p>
                <p>• Depozito ve kira sigortası gereklidir</p>
                <p>• Uzun dönem kiralama seçenekleri mevcuttur</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30 mt-8">
          <h2 className="font-serif text-3xl text-fbm-gold-400 mb-6">Açıklama</h2>
          <p className="text-white/80 leading-relaxed">
            {property.title} olan bu özel konut, {property.location} bölgesinde konumlanmıştır. 
            {property.rooms} oda ve {property.livingRoom} salondan oluşan geniş yaşam alanına sahiptir. 
            Toplam {property.area} m² brüt alanı bulunan konut, modern tasarım dinamikleriyle anlayışla tasarlanmıştır. 
            {property.bathrooms} banyosu ile konforlu bir yaşam sunmaktadır. 
            Bölgenin en özel lokasyonlarından birinde yer alan bu konut, şehir merkezine yakınlığı ile dikkat çekmektedir. 
            Kısa veya uzun dönem kiralama seçenekleri ile hizmetinizdedir.
          </p>
        </div>
      </div>
    </main>
  );
}
