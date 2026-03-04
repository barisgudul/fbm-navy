/* app/page.tsx */
/**
 * Homepage - Natural scroll flow with vitrin section
 */

import { HeroSection } from '@/app/components/HeroSection';
import { PropertyGrid } from '@/app/components/PropertyGrid';
import { supabase } from '@/app/lib/supabaseClient';
import { transformToProperty } from '@/types';
import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { seoConfig, getFAQSchema } from '@/app/config/seo';
import { ArrowRight } from 'lucide-react';
import type { PropertyRow } from '@/types';

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    'Isparta Emlak, Gayrimenkul, İnşaat, Mimar ve İç Mimar Hizmetleri | Ferah Tabak',
  description:
    'Isparta merkezli Ferah Tabak Gayrimenkul; satılık-kiralık emlak, inşaat proje danışmanlığı, mimar, iç mimar ve yatırım danışmanlığı hizmetlerini tek çatı altında sunar.',
  keywords: [
    'Isparta emlak',
    'Isparta gayrimenkul',
    'Isparta inşaat',
    'Isparta mimar',
    'Isparta iç mimar',
    'Isparta mimarlık',
    'Isparta tasarım',
    'Isparta yatırım danışmanlığı',
    'Isparta satılık daire',
    'Isparta kiralık daire',
    'Ferah Tabak Gayrimenkul',
  ],
  openGraph: {
    title: 'Isparta Emlak, Mimarlık ve Yatırım Danışmanlığı',
    description:
      'Isparta satılık/kiralık emlak, mimari tasarım ve gayrimenkul yatırım danışmanlığı çözümleri.',
    url: seoConfig.siteUrl,
    type: 'website',
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Isparta emlak, mimarlık, tasarım ve yatırım danışmanlığı',
      },
    ],
  },
  alternates: {
    canonical: seoConfig.siteUrl,
    languages: {
      'tr-TR': seoConfig.siteUrl,
    },
  },
};

const serviceHighlights = [
  {
    title: 'Isparta Emlak Danışmanlığı',
    description:
      'Satılık ve kiralık daire, ev, villa ve arsa süreçlerinde bölgesel piyasa analizi ile doğru alım-satım kararları.',
    href: '/satilik',
    cta: 'Satılık portföyü inceleyin',
  },
  {
    title: 'Isparta Mimar ve İç Mimar Hizmetleri',
    description:
      'Konut ve ticari alanlarda mimar ve iç mimar desteğiyle, mimari proje ve iç mekan planlama çözümleri.',
    href: '/isparta-insaat-mimar-ic-mimar',
    cta: 'Mimar/iç mimar sayfasına git',
  },
  {
    title: 'Isparta İnşaat ve Yatırım Danışmanlığı',
    description:
      'Arsa, inşaat fizibilitesi, potansiyel kira getirisi ve bütçe kriterlerine göre yatırım odaklı analiz.',
    href: '/isparta-gayrimenkul-mimarlik-ve-yatirim',
    cta: 'İnşaat/yatırım rehberini görüntüleyin',
  },
];

export default async function HomePage() {
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'aktif')
    .order('created_at', { ascending: false })
    .limit(6);

  const properties = data ? (data as PropertyRow[]).map(transformToProperty) : [];

  const faqs = [
    {
      question: "Isparta'da emlak yatırımı için hangi bölgeler öne çıkıyor?",
      answer:
        'Isparta Merkez, Eğirdir ve Keçiborlu gibi bölgeler kullanım amacı, bütçe ve getiri beklentisine göre farklı yatırım fırsatları sunar. Bölge ve portföy eşleştirmesi için danışmanlık almanızı öneririz.',
    },
    {
      question: 'Isparta mimarlık ve iç mekan tasarımı hizmeti veriyor musunuz?',
      answer:
        'Evet. Konut ve ticari alanlar için mimari tasarım, iç mekan planlama ve proje bazlı tasarım danışmanlığı hizmeti sunuyoruz.',
    },
    {
      question: 'Isparta inşaat, Isparta mimar ve Isparta iç mimar desteği alabilir miyim?',
      answer:
        'Evet. Isparta için inşaat proje danışmanlığı, mimar ve iç mimar odaklı planlama desteği sağlıyoruz.',
    },
    {
      question: 'Satılık ve kiralık ilanlar güncel mi?',
      answer:
        'Sitedeki ilanlar düzenli olarak güncellenir. Güncel fiyat ve uygunluk bilgisi için ilan detay sayfasını inceleyebilir veya doğrudan bizimle iletişime geçebilirsiniz.',
    },
    {
      question: 'Isparta gayrimenkul yatırım danışmanlığı nasıl ilerliyor?',
      answer:
        'Süreç, yatırım hedefi ve bütçe analizi ile başlar; ardından bölge değerlendirmesi, uygun portföy sunumu, değerleme ve satın alma/kiralama adımlarıyla devam eder.',
    },
  ];

  const faqSchema = getFAQSchema(faqs);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="w-full">
        <HeroSection />

        <section id="vitrin" className="py-24 md:py-32 bg-[#12161f]">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="text-center mb-16">
              <p className="text-fbm-gold-400 text-xs tracking-[0.4em] uppercase mb-4">Öne Çıkan İlanlar</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white">Seçkin Portföyümüz</h2>
            </div>

            <PropertyGrid properties={properties} />

            <div className="flex justify-center mt-16">
              <Link
                href="/satilik"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-lg hover:bg-fbm-gold-400 hover:border-fbm-gold-400 hover:text-fbm-navy-900 transition-all duration-300 group"
              >
                <span className="text-sm font-medium tracking-wide">TÜM İLANLARI GÖR</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <section id="isparta-seo-hizmetleri" className="py-24 md:py-32 bg-fbm-navy-900 border-y border-white/[0.06]">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="max-w-4xl mx-auto text-center mb-14">
              <p className="text-fbm-gold-400 text-xs tracking-[0.35em] uppercase mb-4">Isparta Odaklı Hizmetler</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                Isparta&apos;da Emlak, Mimarlık, Tasarım ve Yatırım Çözümleri
              </h2>
              <p className="text-white/70 leading-relaxed text-base md:text-lg">
                Ferah Tabak Gayrimenkul ve Tasarım, Isparta&apos;da gayrimenkul danışmanlığı ile mimarlık ve tasarım uzmanlığını bir araya getirir.
                Isparta inşaat, Isparta mimar ve Isparta iç mimar ihtiyaçlarında da yaşam alanı seçimi, mekan dönüşümü ve yatırım kararları için veriye dayalı,
                uygulanabilir ve sürdürülebilir bir yol haritası sunar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {serviceHighlights.map((service) => (
                <article
                  key={service.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-8 hover:border-fbm-gold-400/30 transition-colors"
                >
                  <h3 className="font-serif text-2xl text-white mb-4">{service.title}</h3>
                  <p className="text-white/65 leading-relaxed mb-6">{service.description}</p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-fbm-gold-400 hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-3 px-7 py-3 border border-fbm-gold-400/40 text-fbm-gold-400 rounded-lg hover:bg-fbm-gold-400 hover:text-fbm-navy-900 transition-all duration-300"
              >
                <span className="text-sm tracking-wide">Isparta için danışmanlık alın</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
