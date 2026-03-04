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
  title: 'Isparta Emlak, İnşaat, Mimar, İç Mimar ve Yatırım Danışmanlığı',
  description:
    'Isparta için emlak, gayrimenkul, inşaat, mimar, iç mimar ve yatırım danışmanlığı süreçlerini tek yerden yönetin. Bölgesel uzmanlıkla doğru karar alın.',
  keywords: [
    'Isparta emlak',
    'Isparta gayrimenkul',
    'Isparta emlak danışmanlığı',
    'Isparta inşaat',
    'Isparta mimar',
    'Isparta iç mimar',
    'Isparta mimarlık hizmeti',
    'Isparta iç mekan tasarımı',
    'Isparta yatırım danışmanlığı',
    'Isparta gayrimenkul yatırım',
  ],
  openGraph: {
    title: 'Isparta Emlak, Mimarlık, Tasarım ve Yatırım',
    description:
      'Isparta odaklı emlak, mimarlık, tasarım ve yatırım danışmanlığı hizmetleri hakkında detaylı bilgi.',
    url: getAbsoluteUrl('/isparta-gayrimenkul-mimarlik-ve-yatirim'),
    type: 'article',
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
    canonical: getAbsoluteUrl('/isparta-gayrimenkul-mimarlik-ve-yatirim'),
    languages: {
      'tr-TR': getAbsoluteUrl('/isparta-gayrimenkul-mimarlik-ve-yatirim'),
    },
  },
};

const cards = [
  {
    title: 'Isparta Emlak Danışmanlığı',
    description:
      'Satılık ve kiralık portföy seçimi, bölgesel fiyat analizi ve doğru pazarlık stratejisiyle güvenli işlem yönetimi.',
    href: '/satilik',
    cta: 'Satılık portföye git',
  },
  {
    title: 'Isparta Mimar ve İç Mimar Hizmetleri',
    description:
      'Konut ve ticari alanlar için mimar ve iç mimar planlama desteği; estetik ve fonksiyon odaklı tasarım yaklaşımı.',
    href: '/isparta-insaat-mimar-ic-mimar',
    cta: 'Mimar/iç mimar detaylarını gör',
  },
  {
    title: 'Isparta İnşaat ve Gayrimenkul Yatırım Danışmanlığı',
    description:
      'Lokasyon, bütçe, inşaat fizibilitesi, getiri beklentisi ve risk profiline göre yatırım odaklı karar desteği.',
    href: '/iletisim',
    cta: 'Danışmanlık al',
  },
];

export default function IspartaServicesPage() {
  const faqSchema = getFAQSchema([
    {
      question: 'Isparta’da gayrimenkul yatırımı yaparken nelere dikkat edilmeli?',
      answer:
        'Lokasyon, arz-talep dengesi, kira getirisi, imar durumu ve çıkış stratejisi birlikte değerlendirilmelidir. Bütçeye uygun portföy seçimi ve doğru zamanlama önemlidir.',
    },
    {
      question: 'Mimarlık ve tasarım hizmetleri yatırım değerini artırır mı?',
      answer:
        'Evet. Doğru mimari planlama ve iç mekan tasarımı, kullanım kalitesini ve piyasa algısını yükselterek gayrimenkulün değerini olumlu etkileyebilir.',
    },
    {
      question: 'Isparta satılık ve kiralık portföyleri nasıl takip edebilirim?',
      answer:
        'Sitemizde güncel satılık/kiralık listelerini inceleyebilir, ihtiyaç ve bütçenizi ileterek size özel portföy önerisi alabilirsiniz.',
    },
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Isparta Hizmetler', url: '/isparta-gayrimenkul-mimarlik-ve-yatirim' },
  ]);

  const servicesGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      getServiceSchema({
        name: 'Isparta Emlak Danışmanlığı',
        description: 'Isparta satılık ve kiralık emlak portföyleri için danışmanlık hizmeti.',
        areaServed: 'Isparta',
      }),
      getServiceSchema({
        name: 'Isparta Mimarlık ve Tasarım Danışmanlığı',
        description: 'Konut ve ticari alanlarda mimari tasarım ve iç mekan planlama hizmeti.',
        areaServed: 'Isparta',
      }),
      getServiceSchema({
        name: 'Isparta İnşaat, Mimar ve İç Mimar Danışmanlığı',
        description: 'Isparta bölgesinde inşaat proje planlama, mimar ve iç mimar odaklı danışmanlık.',
        areaServed: 'Isparta',
      }),
      getServiceSchema({
        name: 'Isparta Gayrimenkul Yatırım Danışmanlığı',
        description: 'Yatırım hedeflerine uygun gayrimenkul seçimi ve değerleme odaklı danışmanlık.',
        areaServed: 'Isparta',
      }),
    ],
  };

  return (
    <>
      <Script
        id="services-page-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="services-page-breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="services-page-service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesGraph) }}
      />

      <main className="min-h-screen bg-[#12161f]">
        <PageHeader
          title="Isparta'da Değer Üreten Hizmetler"
          subtitle="Emlak • Mimarlık • Tasarım • Yatırım"
          bgImage="https://images.unsplash.com/photo-1494526585095-c41746248156?w=1920&q=80"
        />

        <section className="py-20 md:py-24 px-6 md:px-12">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-4xl mx-auto text-center mb-14">
              <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
                Isparta Emlak, Mimarlık, Tasarım ve Yatırım Danışmanlığı
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Ferah Tabak Gayrimenkul ve Tasarım, Isparta odaklı saha bilgisi ile gayrimenkul kararlarını mimarlık
                ve tasarım perspektifiyle birleştirir. Böylece hem yaşam kalitesine hem de yatırım performansına
                katkı sağlayan çözümler sunar. Isparta inşaat, Isparta mimar ve Isparta iç mimar ihtiyaçlarında
                süreç yönetimini tek noktadan koordine eder.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {cards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-8 hover:border-fbm-gold-400/30 transition-colors"
                >
                  <h2 className="font-serif text-2xl text-white mb-4">{card.title}</h2>
                  <p className="text-white/70 mb-6 leading-relaxed">{card.description}</p>
                  <Link href={card.href} className="inline-flex items-center gap-2 text-fbm-gold-400 hover:text-white transition-colors">
                    {card.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-fbm-gold-400/20 bg-fbm-gold-400/5 p-8 md:p-10">
              <h2 className="font-serif text-3xl text-white mb-4">Neden Isparta Odaklı Çalışıyoruz?</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Yerel pazarın dinamiklerini yakından takip ederek doğru lokasyon, doğru fiyat ve doğru zaman
                kombinasyonunu oluşturuyoruz. Bu yaklaşım; emlak seçiminden tasarım planlamasına, yatırım hedefinden
                satış/kiralama süreç yönetimine kadar tüm adımlarda daha güçlü sonuçlar üretir.
              </p>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-fbm-gold-400 text-fbm-navy-900 font-medium hover:bg-white transition-colors"
              >
                Isparta için ücretsiz ön görüşme planla
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
