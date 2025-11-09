/* app/components/ProjectsSection.tsx */

'use client';

import { motion } from 'framer-motion';

export function ProjectsSection() {
  return (
    <section className="w-screen h-screen flex-shrink-0 snap-start relative flex justify-center items-center bg-gradient-to-br from-fbm-navy-900 via-fbm-denim-750 via-fbm-amber-250 via-fbm-bronze-400 to-fbm-cream-100 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h2 
          className="font-serif text-5xl md:text-7xl text-fbm-gold-400"
          style={{ textShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)' }}
        >
          Öne Çıkan Projeler
        </h2>
        <p className="mt-4 text-white">Yakında burada sergilenecek.</p>
      </motion.div>
    </section>
  );
}

