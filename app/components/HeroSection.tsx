/* app/components/HeroSection.tsx */
/**
 * Premium Hero Section
 * Full-screen with luxurious typography
 * Fixed: Keşfet button now scrolls to #vitrin section
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const narratives = [
  {
    line1: "HAYALİNİZE AÇILAN",
    highlight: "KAPIYI SUNUYORUZ.",
    paragraph: "Seçkin portföyümüzle, sadece bir ev değil; size özel bir yaşam tarzı ve değerli bir yatırım vadediyoruz."
  },
  {
    line1: "MEKANLARA SANAT KATAN",
    highlight: "TASARIM USTALIĞI.",
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
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Disable first render flag after mount
    setIsFirstRender(false);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % narratives.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = narratives[currentIndex];

  // Smooth scroll to vitrin section
  const scrollToVitrin = () => {
    const element = document.getElementById('vitrin');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#12161f]">
      {/* Optimized Background Image (Poster) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-poster.jpg"
          alt="Hero Background"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-0 transition-opacity duration-700 ease-in"
        onCanPlay={(e) => e.currentTarget.classList.remove('opacity-0')}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12161f]/70 via-[#12161f]/50 to-[#12161f]/90 z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={isFirstRender ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center"
          >
            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.1] mb-8">
              {current.line1}
              <br />
              <span className="text-fbm-gold-400">{current.highlight}</span>
            </h1>

            {/* Paragraph */}
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {current.paragraph}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {narratives.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${i === currentIndex
                ? 'bg-fbm-gold-400 w-8'
                : 'bg-white/20 hover:bg-white/40'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator - Now clickable */}
      <motion.button
        onClick={scrollToVitrin}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer group z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/40 group-hover:text-fbm-gold-400 transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Keşfet</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
