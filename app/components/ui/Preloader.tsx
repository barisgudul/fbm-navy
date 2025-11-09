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
    <motion.div variants={logoVariants} className="w-48 md:w-64 relative">
      <Image
        src="/fbm.png"
        alt="FBM Emlak & Mimarlık Logo"
        width={400}
        height={400}
        className="w-full h-auto"
        priority
        unoptimized
      />
    </motion.div>
    <motion.p 
      variants={textVariants} 
      className="font-sans text-xl md:text-2xl lg:text-3xl text-white mt-6 md:mt-8 tracking-widest"
    >
      FERAH TABAK & BOLAT ÇELEBİ
    </motion.p>
  </motion.div>
);

