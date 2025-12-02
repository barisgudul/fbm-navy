/* app/iletisim/page.tsx */

'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                  Fatih, 201. Cadde Yener İş Merkezi no:59/61, 32200 Merkez/Isparta
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
                <a 
                  href="tel:+905435910932"
                  className="text-white/80 hover:text-fbm-gold-400 transition-colors duration-300"
                >
                  +90 543 591 09 32
                </a>
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
                  href="mailto:FBMgayrimenkul.32@gmail.com"
                  className="text-white/80 hover:text-fbm-gold-400 transition-colors duration-300"
                >
                  fbmgayrimenkul.32@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Çalışma Saatleri */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
                  <p>Hafta İçi: 09:00 - 19:00</p>
                  <p>Cumartesi: 09:00 - 19:00</p>
                  <p>Pazar: Kapalı</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instagram */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30 group hover:border-fbm-gold-400 transition-all duration-300 cursor-pointer"
          >
            <a 
              href="https://www.instagram.com/fbm_gayrimenkul"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 mb-6"
            >
              <div className="bg-fbm-cream-100/20 p-3 rounded-lg group-hover:bg-fbm-gold-400/20 transition-all duration-300">
                <Instagram className="w-6 h-6 text-fbm-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400 mb-2">
                  Instagram
                </h3>
                <p className="text-white/60 mb-4 text-sm leading-relaxed">
                  En güncel portföyümüz ve projelerimiz için bizi Instagram&apos;da takip edin.
                </p>
                <span className="text-white/80 group-hover:text-fbm-gold-400 transition-colors duration-300 flex items-center gap-2 font-medium">
                  @fbm_gayrimenkul
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30 group hover:border-fbm-gold-400 transition-all duration-300 cursor-pointer"
          >
            <a 
              href="https://wa.me/905435910932"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 mb-6"
            >
              <div className="bg-fbm-cream-100/20 p-3 rounded-lg group-hover:bg-fbm-gold-400/20 transition-all duration-300">
                <MessageCircle className="w-6 h-6 text-fbm-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400 mb-2">
                  WhatsApp
                </h3>
                <p className="text-white/60 mb-4 text-sm leading-relaxed">
                  Hızlı iletişim ve detaylı bilgi almak için bize WhatsApp üzerinden ulaşabilirsiniz.
                </p>
                <span className="text-white/80 group-hover:text-fbm-gold-400 transition-colors duration-300 flex items-center gap-2 font-medium">
                  Mesaj Gönder
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Harita Bölümü */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg p-8 border border-fbm-sage-200/30"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl md:text-3xl text-fbm-gold-400">
              Konumumuz
            </h3>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Fatih, 201. Cadde Yener İş Merkezi no:59/61, 32200 Merkez/Isparta')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-fbm-gold-400 hover:bg-fbm-bronze-400 text-fbm-navy-900 rounded-lg transition-all duration-300 font-medium text-sm group"
            >
              <MapPin className="w-4 h-4" />
              <span>Yol Tarifi Al</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="w-full h-96 rounded-lg overflow-hidden border border-fbm-gold-400/30">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent('Fatih, 201. Cadde Yener İş Merkezi no:59/61, 32200 Merkez/Isparta')}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="FBM Gayrimenkul - Yener İş Merkezi"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

