/* app/components/HeroSection.tsx */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Anlatı metinlerini bir veri yapısında saklayalım
const narratives = [
  {
    line1: "HAYALİNİZE AÇILAN",
    highlight: "KAPIYI SUNUYORUZ.",
    paragraph: "Seçkin portföyümüzle, sadece bir ev değil; size özel bir yaşam tarzı ve değerli bir yatırım vadediyoruz."
  },
  {
    line1: "MEKANLARA SANAT KATAN",
    highlight: "MİMARİ USTALIK.",
    paragraph: "Her detayı özenle tasarlanan projelerimizle, estetik ve fonksiyonu kusursuz bir dengeyle birleştiriyoruz."
  },
  {
    line1: "GELECEĞE DEĞER KATAN",
    highlight: "GÜVENLİ YATIRIM.",
    paragraph: "Doğru lokasyon ve uzman analizlerimizle, yatırımınızın bugününe ve yarınına değer katıyoruz."
  }
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % narratives.length);
    }, 5000); // Metinleri her 5 saniyede bir değiştir

    return () => clearInterval(interval); // Bileşen kaldırıldığında interval'ı temizle
  }, []);

  const currentNarrative = narratives[currentIndex];

  return (
    <section className="w-screen h-screen flex-shrink-0 snap-start relative flex flex-col justify-center items-start text-left p-4">
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-br from-fbm-navy-900/85 via-fbm-denim-750/70 via-fbm-amber-250/60 via-fbm-bronze-400/45 to-fbm-cream-100/35"
      ></div>
      
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* AnimatePresence, elemanlar değiştiğinde animasyonları yönetir */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex} // Değişimi algılamak için key prop'u şart!
            className="min-h-[300px] md:min-h-[350px]" // Düzen kaymasını engellemek için
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-serif text-5xl md:text-8xl font-bold uppercase text-white"
              style={{ lineHeight: '1.1', textShadow: '0px 2px 10px rgba(0, 0, 0, 0.7)' }}
            >
              {currentNarrative.line1}
              <br />
              <span className="text-fbm-gold-400">
                {currentNarrative.highlight}
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-sans mt-8 text-white max-w-xl text-lg md:text-xl"
              style={{ textShadow: '0px 2px 8px rgba(0, 0, 0, 0.8)' }}
            >
              {currentNarrative.paragraph}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-10 right-10 z-20 flex items-center space-x-3"
      >
        <span className="font-sans text-sm uppercase tracking-widest text-white">Portfolyo</span>
        <ArrowRight className="w-8 h-8 text-fbm-gold-400 animate-pulse" />
      </motion.div>
    </section>
  );
}

