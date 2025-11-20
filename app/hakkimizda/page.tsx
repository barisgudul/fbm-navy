/* app/hakkimizda/page.tsx */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function HakkimizdaPage() {
  const router = useRouter();

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="font-serif text-5xl md:text-7xl text-fbm-gold-400 mb-6 text-center">
            Hakkımızda
          </h1>
          <p className="font-sans text-lg md:text-xl text-white/80 text-center max-w-3xl mx-auto leading-relaxed">
            FBM Emlak & Tasarım, gayrimenkul ve mekan tasarımı alanında uzman ekibimizle, 
            hayallerinizi gerçeğe dönüştürmek için buradayız.
          </p>
        </motion.div>

        {/* Şirket Hakkında */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-fbm-sage-200/30 mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-fbm-gold-400 mb-6">
            FBM Emlak & Tasarım
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              FBM Emlak & Tasarım olarak, Isparta ve çevresinde gayrimenkul sektöründe 
              güvenilir hizmet sunmayı hedefliyoruz. Satılık ve kiralık konut seçeneklerinden 
              profesyonel mekan tasarımı hizmetlerine kadar geniş bir yelpazede müşterilerimizin 
              ihtiyaçlarını karşılıyoruz.
            </p>
            <p>
              Modern tasarım anlayışı ile geleneksel değerleri harmanlayan yaklaşımımız, 
              her projede estetik ve fonksiyonelliği bir araya getirmektedir. Müşteri memnuniyetini 
              ön planda tutan hizmet anlayışımız, sektördeki deneyimimiz ve profesyonel ekibimizle 
              fark yaratıyoruz.
            </p>
            <p>
              Satın alma, satış, kiralama ve mekan tasarımı süreçlerinde, müşterilerimize 
              rehberlik ederek hayallerindeki yaşam alanlarını gerçekleştirmelerine destek oluyoruz.
            </p>
          </div>
        </motion.div>

        {/* Takım Üyeleri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Ferah Tabak */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30"
          >
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop"
                alt="Ferah Tabak"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400 mb-4">
              Ferah Tabak
            </h3>
            <p className="text-fbm-bronze-400 mb-4 font-semibold">Kurucu Ortak & Tasarımcı Emlak Uzmanı</p>
            <div className="space-y-3 text-white/80 leading-relaxed">
              <p>
                Ferah Tabak, gayrimenkul sektöründe yılların deneyimi ile müşterilerine 
                güvenilir ve profesyonel hizmet sunmaktadır. Emlak yatırımları, konut 
                alım-satım ve kiralama konularında uzmanlaşmıştır.
              </p>
              <p>
                Isparta ve çevresindeki gayrimenkul piyasasına hakimiyeti, müşteri 
                odaklı yaklaşımı ve detaylara verdiği önem ile sektörde fark yaratmaktadır.
              </p>
              <p>
                Her müşterinin ihtiyacını anlayarak, en uygun çözümleri sunmak konusunda 
                kararlılıkla çalışmaktadır.
              </p>
            </div>
          </motion.div>

          {/* Bolat Çelebi */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30"
          >
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                alt="Bolat Çelebi"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400 mb-4">
              Bolat Çelebi
            </h3>
            <p className="text-fbm-bronze-400 mb-4 font-semibold">Kurucu Ortak & Emlak Uzmanı</p>
            <div className="space-y-3 text-white/80 leading-relaxed">
              <p>
                Bolat Çelebi, gayrimenkul sektöründe yılların deneyimi ile müşterilerine 
                güvenilir ve profesyonel hizmet sunmaktadır. Emlak yatırımları, konut 
                alım-satım ve kiralama konularında uzmanlaşmıştır.
              </p>
              <p>
                Isparta ve çevresindeki gayrimenkul piyasasına hakimiyeti, müşteri 
                odaklı yaklaşımı ve detaylara verdiği önem ile sektörde fark yaratmaktadır.
              </p>
              <p>
                Her müşterinin ihtiyacını anlayarak, en uygun çözümleri sunmak konusunda 
                kararlılıkla çalışmaktadır.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Misyon & Vizyon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30">
            <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400 mb-4">
              Misyonumuz
            </h3>
            <p className="text-white/80 leading-relaxed">
              Müşterilerimizin gayrimenkul ve mekan tasarımı ihtiyaçlarını en üst seviyede 
              karşılamak, güvenilir ve profesyonel hizmet sunmak. Her projede kaliteyi 
              ön planda tutarak, müşteri memnuniyetini sağlamak ve sektörde öncü olmaktır.
            </p>
          </div>

          <div className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30">
            <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400 mb-4">
              Vizyonumuz
            </h3>
            <p className="text-white/80 leading-relaxed">
              Isparta ve Türkiye&apos;de gayrimenkul ve mekan tasarımı alanında referans olmak. 
              Yenilikçi yaklaşımlarımız ve müşteri odaklı hizmet anlayışımızla, sektörde 
              öncü bir konumda yer almak ve büyümeye devam etmektir.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
