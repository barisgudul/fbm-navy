import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/app/components/layout/PageHeader';
import {
  getAbsoluteUrl,
  getBreadcrumbSchema,
  getFAQSchema,
  getServiceSchema,
  seoConfig,
} from '@/app/config/seo';

export const metadata: Metadata = {
  title: 'Isparta İnşaat, Mimar ve İç Mimar Hizmetleri',
  description:
    'Isparta inşaat proje danışmanlığı, Isparta mimar ve Isparta iç mimar hizmetleri ile konut ve ticari alanlarda planlama, tasarım ve yatırım değeri odaklı çözümler.',
  keywords: [
    'Isparta inşaat',
    'Isparta mimar',
    'Isparta iç mimar',
    'Isparta inşaat proje danışmanlığı',
    'Isparta mimarlık ofisi',
    'Isparta iç mimar ofisi',
    'Isparta mekan tasarımı',
  ],
  openGraph: {
    title: 'Isparta İnşaat, Mimar ve İç Mimar Hizmetleri',
    description:
      'Isparta için inşaat danışmanlığı, mimar ve iç mimar hizmetlerini tek sayfada keşfedin.',
    url: getAbsoluteUrl('/isparta-insaat-mimar-ic-mimar'),
    type: 'article',
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Isparta inşaat, mimar ve iç mimar hizmetleri',
      },
    ],
  },
  alternates: {
    canonical: getAbsoluteUrl('/isparta-insaat-mimar-ic-mimar'),
    languages: {
      'tr-TR': getAbsoluteUrl('/isparta-insaat-mimar-ic-mimar'),
    },
  },
};

const focusAreas = [
  {
    title: 'Isparta İnşaat Danışmanlığı',
    description:
      'Arsa potansiyeli, proje senaryosu, yatırım fizibilitesi ve süreç planlaması ile inşaat kararlarını güvenli hale getirir.',
  },
  {
    title: 'Isparta Mimar Desteği',
    description:
      'Mimar odaklı yaklaşım ile konut ve ticari alanlarda fonksiyon, estetik, maliyet ve kullanım dengesini birlikte optimize eder.',
  },
  {
    title: 'Isparta İç Mimar Çözümleri',
    description:
      'İç mimar planlamasıyla yaşam alanlarını kullanıcı ihtiyaçlarına uygun, modern ve değer odaklı şekilde dönüştürür.',
  },
];

export default function IspartaArchitectAndConstructionPage() {
  const faqSchema = getFAQSchema([
    {
      question: 'Isparta inşaat sürecinde danışmanlık neden önemlidir?',
      answer:
        'Doğru fizibilite, maliyet kontrolü ve zaman planı için inşaat sürecinin başında profesyonel danışmanlık kritik avantaj sağlar.',
    },
    {
      question: 'Isparta mimar ve Isparta iç mimar hizmetleri birlikte alınabilir mi?',
      answer:
        'Evet. Mimari planlama ve iç mimar çözümleri birlikte yürütüldüğünde proje bütünlüğü ve kullanım verimi artar.',
    },
    {
      question: 'Bu hizmetler yatırım değerini artırır mı?',
      answer:
        'Doğru planlanan inşaat, mimari kurgu ve iç mekan tasarımı gayrimenkulün kullanım kalitesi ile pazardaki algılanan değerini yükseltebilir.',
    },
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Isparta İnşaat Mimar İç Mimar', url: '/isparta-insaat-mimar-ic-mimar' },
  ]);

  const serviceGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      getServiceSchema({
        name: 'Isparta İnşaat Danışmanlığı',
        description: 'Isparta inşaat süreçleri için proje ve yatırım fizibilitesi odaklı danışmanlık.',
        areaServed: 'Isparta',
      }),
      getServiceSchema({
        name: 'Isparta Mimar Hizmeti',
        description: 'Isparta bölgesinde mimar destekli konut ve ticari alan proje danışmanlığı.',
        areaServed: 'Isparta',
      }),
      getServiceSchema({
        name: 'Isparta İç Mimar Hizmeti',
        description: 'Isparta iç mimar desteği ile mekan planlama ve tasarım danışmanlığı.',
        areaServed: 'Isparta',
      }),
    ],
  };

  return (
    <>
      <Script
        id="isparta-insaat-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="isparta-insaat-breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="isparta-insaat-service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceGraph) }}
      />

      <main className="min-h-screen bg-[#12161f]">
        <PageHeader
          title="Isparta İnşaat, Mimar ve İç Mimar"
          subtitle="Planlama • Tasarım • Değer"
          bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        />

        <section className="py-20 md:py-24 px-6 md:px-12">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-4xl mx-auto text-center mb-14">
              <h1 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
                Isparta İnşaat, Isparta Mimar ve Isparta İç Mimar Hizmetleri
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Ferah Tabak Gayrimenkul ve Tasarım, Isparta&apos;da inşaat kararlarını mimar ve iç mimar perspektifiyle
                birleştirerek hem kullanım kalitesini hem de yatırım değerini artıran yol haritaları oluşturur.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {focusAreas.map((area) => (
                <article
                  key={area.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-8 hover:border-fbm-gold-400/30 transition-colors"
                >
                  <h2 className="font-serif text-2xl text-white mb-4">{area.title}</h2>
                  <p className="text-white/70 leading-relaxed">{area.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-fbm-gold-400/20 bg-fbm-gold-400/5 p-8 md:p-10 text-center">
              <h2 className="font-serif text-3xl text-white mb-4">Isparta Projeniz İçin Yol Haritası Oluşturalım</h2>
              <p className="text-white/70 leading-relaxed mb-8 max-w-3xl mx-auto">
                İster yeni bir inşaat yatırımı, ister mevcut bir gayrimenkulün mimar/iç mimar dönüşümü olsun,
                ihtiyaçlarınıza göre uygulanabilir ve bütçe odaklı bir plan oluşturabiliriz.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/mekan-tasarimlari"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white hover:border-fbm-gold-400 hover:text-fbm-gold-400 transition-colors"
                >
                  Projeleri incele
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-fbm-gold-400 text-fbm-navy-900 font-medium hover:bg-white transition-colors"
                >
                  Ücretsiz ön görüşme al
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
