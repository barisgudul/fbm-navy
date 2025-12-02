/* app/components/ui/Preloader.tsx */

'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const logoVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const textVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 0.7,
    transition: {
      duration: 1,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export const Preloader = () => (
  <motion.div
    variants={containerVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-fbm-navy-900 via-fbm-denim-750 via-fbm-amber-250 via-fbm-bronze-400 to-fbm-cream-100"
  >
    <motion.div variants={logoVariants} className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative p-4">
      <div className="relative w-64 h-64 md:w-[500px] md:h-[500px] flex items-center justify-center">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-fbm-gold-400/20 blur-[80px] rounded-full animate-pulse" />
         <Image
            src="/fbm-logo.png"
            alt="FBM Emlak & Tasarım Logo"
            width={1000}
            height={1000}
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
            priority
            unoptimized
         />
      </div>

      <div className="flex flex-col items-center md:items-start justify-center md:border-l-2 border-fbm-gold-400/50 md:pl-16 py-6 text-center md:text-left">
          <span className="font-serif text-2xl md:text-5xl tracking-[0.25em] text-fbm-gold-400 leading-relaxed mb-3 md:mb-4 font-bold drop-shadow-lg">GAYRİMENKUL</span>
          <span className="font-serif text-lg md:text-3xl tracking-[0.2em] text-white leading-relaxed font-medium drop-shadow-md">DEĞERLEME & TASARIM</span>
      </div>
    </motion.div>
    <motion.p 
      variants={textVariants} 
      className="font-serif text-lg md:text-3xl text-white mt-12 md:mt-16 tracking-[0.3em] border-t border-white/20 pt-6 md:pt-8 font-bold drop-shadow-lg"
    >
      FERAH TABAK & BOLAT ÇELEBİ
    </motion.p>
  </motion.div>
);

