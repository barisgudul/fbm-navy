/* app/hakkimizda/page.tsx */
/**
 * Hakkımızda - Premium Corporate Page
 * Dense, content-rich experience with visual sophistication
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/app/components/layout/PageHeader';
import { ArrowRight, Award, Users, Home, Star } from 'lucide-react';

// Animated Counter
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Stats data
const stats = [
  { value: 10, suffix: '+', label: 'Yıl Sektörel Tecrübe', icon: Award },
  { value: 50, suffix: '+', label: 'Mutlu Müşteri', icon: Users },
  { value: 100, suffix: '+', label: 'Portföy', icon: Home },
  { value: 20, suffix: '+', label: 'Tasarım Projesi', icon: Star },
];

// Values data
const values = [
  {
    title: 'Güvenilirlik',
    description: 'Her işlemde şeffaflık ve dürüstlük ilkesiyle hareket ediyoruz. Müşterilerimizin güvenini kazanmak en büyük önceliğimiz.',
  },
  {
    title: 'Uzmanlık',
    description: 'Bölgedeki gayrimenkul piyasasına tam hakimiyet ve yılların birikimi ile en doğru yönlendirmeleri sunuyoruz.',
  },
  {
    title: 'Müşteri Odaklılık',
    description: 'Her müşterimizin ihtiyacını anlıyor, kişiselleştirilmiş çözümler üretiyoruz. Memnuniyetiniz bizim başarımızdır.',
  },
];

export default function HakkimizdaPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <main className="min-h-screen">
      {/* Hero Header */}
      <PageHeader
        title="Mükemmelliği İnşa Ediyoruz"
        subtitle="FBM Gayrimenkul & Tasarım"
        bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
      />

      {/* Our Story - Grid Layout */}
      <section ref={storyRef} className="py-24 md:py-32 bg-[#12161f]">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: Sticky Image */}
            <div className="relative lg:sticky lg:top-32">
              <motion.div
                className="relative aspect-[3/4] rounded-2xl overflow-hidden"
                style={{ y: imageY }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
                  alt="FBM Ofis"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Overlay accent */}
                {/* Stronger overlay for image quality */}
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#12161f] to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <p className="text-fbm-gold-400 text-xs tracking-[0.2em] uppercase mb-1">Kuruluş</p>
                  <p className="text-white font-serif text-2xl">2025, Isparta</p>
                </div>
              </motion.div>
            </div>

            {/* Right: Typography-rich content */}
            <div className="lg:py-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-fbm-gold-400 text-xs tracking-[0.3em] uppercase mb-4">Hikayemiz</p>
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-8 leading-tight">
                  Bölgenin Yenilikçi<br />Gayrimenkul Partneri
                </h2>
              </motion.div>

              <div
                className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed text-justify"
              >
                <p>
                  <strong className="text-white">FBM Gayrimenkul</strong>, 2025 yılında Isparta&apos;da kurulmuş olup,
                  kısa sürede Isparta ve Burdur bölgesinin en vizyoner gayrimenkul firmalarından biri olma yolunda emin adımlarla ilerlemektedir.
                  Merkez, Eğirdir, Yalvaç, Burdur, Dinar ve Keçiborlu başta olmak üzere geniş bir coğrafyada
                  hizmet vermekteyiz.
                </p>
                <p>
                  Kurucularımız <strong className="text-white">Ferah Tabak</strong> ve <strong className="text-white">Bolat Çelebi</strong>&apos;nin
                  vizyonuyla şekillenen firmamız, sadece gayrimenkul alım-satım ve kiralama işlemleri değil,
                  aynı zamanda profesyonel mekan tasarımı hizmetleri de sunmaktadır. Her projede estetik ve
                  fonksiyonelliği harmanlayan yaklaşımımız, bizi rakiplerimizden ayırmaktadır.
                </p>
                <p>
                  Müşteri memnuniyetini her şeyin üstünde tutan anlayışımız, şeffaf iletişim politikamız ve
                  bölgedeki gayrimenkul piyasasına olan derin hakimiyetimiz sayesinde, onlarca ailenin
                  hayallerindeki eve kavuşmasına aracılık ettik.
                </p>
                <p>
                  Bugün, modern vizyonumuzla geleceğe emin adımlarla yürüyor, Isparta ve Burdur
                  bölgesinin referans gayrimenkul firması olma hedefimize her geçen gün daha da yaklaşıyoruz.
                </p>
              </div>

              {/* Values */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 grid grid-cols-1 gap-6"
              >
                {values.map((item, i) => (
                  <div key={i} className="border-l-2 border-fbm-gold-400/30 pl-6">
                    <h4 className="text-white font-medium mb-2">{item.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Dark Mode */}
      <section className="py-24 md:py-32 bg-fbm-navy-900 border-y border-white/[0.04]">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-fbm-gold-400 text-xs tracking-[0.3em] uppercase mb-4">Rakamlarla Biz</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Başarılarımız</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-fbm-gold-400/10 mb-4">
                  <stat.icon className="w-5 h-5 text-fbm-gold-400" />
                </div>
                <div className="font-serif text-4xl md:text-5xl text-fbm-gold-400 mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/40 text-sm tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 bg-[#12161f]">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-fbm-gold-400 text-xs tracking-[0.3em] uppercase mb-4">Ekibimiz</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Kurucularımız</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ferah Tabak */}
            <div
              className="bg-white/[0.02] rounded-2xl p-8 md:p-10 border border-white/[0.06] hover:border-fbm-gold-400/20 transition-colors duration-500"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fbm-gold-400 to-fbm-bronze-400 flex items-center justify-center text-white font-serif text-xl">
                  FT
                </div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-white">Ferah Tabak</h3>
                  <p className="text-fbm-gold-400 text-sm tracking-wide">Kurucu Ortak & Tasarımcı</p>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed text-justify">
                Gayrimenkul ve tasarım sektöründeki köklü deneyimiyle, müşterilerine güvenilir ve profesyonel
                hizmet sunmaktadır. Mekan tasarımı konusundaki uzmanlığı, projelere estetik bir bakış açısı
                kazandırmaktadır. Detaylara verdiği önem ve müşteri odaklı yaklaşımıyla sektörde fark yaratmaktadır.
              </p>
            </div>

            {/* Bolat Çelebi */}
            <div
              className="bg-white/[0.02] rounded-2xl p-8 md:p-10 border border-white/[0.06] hover:border-fbm-gold-400/20 transition-colors duration-500"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fbm-gold-400 to-fbm-bronze-400 flex items-center justify-center text-white font-serif text-xl">
                  BÇ
                </div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-white">Bolat Çelebi</h3>
                  <p className="text-fbm-gold-400 text-sm tracking-wide">Kurucu Ortak & Emlak Uzmanı</p>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed text-justify">
                Isparta ve Burdur bölgesindeki gayrimenkul piyasasına derin hakimiyeti ile bilinmektedir.
                Emlak yatırımları, konut alım-satım ve kiralama konularındaki uzmanlığı, müşterilere en
                doğru yatırım kararlarını vermelerinde rehberlik etmektedir. Sektördeki geniş ağı ve
                profesyonel yaklaşımıyla güven veren bir iş ortağıdır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80"
            alt="Luxury Interior"
            fill
            className="object-cover brightness-[0.3]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12161f]/80 via-[#12161f]/50 to-[#12161f]/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-fbm-gold-400 text-xs tracking-[0.3em] uppercase mb-6">Hayalinizi Gerçekleştirin</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 max-w-3xl mx-auto leading-tight">
              Hayalinizdeki Eve<br />Birlikte Ulaşalım
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-10">
              Satılık, kiralık veya özel mekan tasarımı — ihtiyacınız ne olursa olsun,
              uzman ekibimiz yanınızda.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold transition-all duration-300 group"
              style={{
                backgroundColor: '#bc9648',
                color: '#0a0f1a'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#bc9648';
              }}
            >
              <span>Bizimle İletişime Geçin</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: '#0a0f1a' }} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
