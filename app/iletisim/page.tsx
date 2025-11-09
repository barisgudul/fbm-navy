/* app/iletisim/page.tsx */

'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';

export default function IletisimPage() {
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
            İletişim
          </h1>
          <p className="font-sans text-lg md:text-xl text-white/80 text-center max-w-3xl mx-auto leading-relaxed">
            Bize ulaşmak için aşağıdaki iletişim bilgilerini kullanabilirsiniz. 
            Sorularınız ve talepleriniz için bizimle iletişime geçmekten çekinmeyin.
          </p>
        </motion.div>

        {/* İletişim Bilgileri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Adres */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-fbm-cream-100/20 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-fbm-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400 mb-4">
                  Adres
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Fatih, Toptancılar Cd. Yener İş Merkezi no:59/61, 32200 Merkez/Isparta
                </p>
              </div>
            </div>
          </motion.div>

          {/* Telefon */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-fbm-cream-100/20 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-fbm-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400 mb-4">
                  Telefon
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Telefon numarası bilgisi eklenecek
                </p>
              </div>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-fbm-cream-100/20 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-fbm-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400 mb-4">
                  E-posta
                </h3>
                <a 
                  href="mailto:destek@fbm.com"
                  className="text-white/80 hover:text-fbm-gold-400 transition-colors duration-300"
                >
                  destek@fbm.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Çalışma Saatleri */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-fbm-cream-100/20 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-fbm-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400 mb-4">
                  Çalışma Saatleri
                </h3>
                <div className="space-y-2 text-white/80 leading-relaxed">
                  <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                  <p>Cumartesi: 09:00 - 14:00</p>
                  <p>Pazar: Kapalı</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Harita Bölümü */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400 mb-6">
            Konumumuz
          </h3>
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent('Fatih, Toptancılar Cd. Yener İş Merkezi no:59/61, 32200 Merkez/Isparta')}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

