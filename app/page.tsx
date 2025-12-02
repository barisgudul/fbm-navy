/* app/page.tsx */

import { HeroSection } from "@/app/components/HeroSection";
import type { Metadata } from "next";
import Script from "next/script";
import { seoConfig, getFAQSchema } from "@/app/config/seo";

export const metadata: Metadata = {
  title: "FBM Gayrimenkul Isparta & Burdur | Satılık & Kiralık Ev, Daire, Villa, Arsa İlanları",
  description: "Isparta ve Burdur'un lider gayrimenkul firması FBM Gayrimenkul. Satılık daire, kiralık ev, villa, arsa ilanları ve profesyonel mimari tasarım hizmetleri. Merkez, Eğirdir, Yalvaç, Burdur, Dinar ve Keçiborlu'da güvenilir emlak danışmanlığı.",
  keywords: [
    'Isparta Gayrimenkul',
    'Burdur Gayrimenkul',
    'Isparta Emlak',
    'Burdur Emlak',
    'Dinar Emlak',
    'Keçiborlu Emlak',
    'Satılık Daire Isparta',
    'Satılık Daire Burdur',
    'Kiralık Ev Isparta',
    'Kiralık Ev Burdur',
    'Isparta Villa',
    'Isparta Arsa',
    'FBM Gayrimenkul',
    'Isparta Emlakçı',
    'Burdur Emlakçı',
    'Isparta Konut',
    'Eğirdir Emlak',
    'Yalvaç Emlak',
    'Gönen Emlak',
    'Şarkikaraağaç Emlak'
  ],
  openGraph: {
    title: 'FBM Gayrimenkul Isparta & Burdur | En İyi Emlak İlanları',
    description: 'Isparta ve Burdur bölgesinde satılık ve kiralık gayrimenkul ilanları. Merkez, Eğirdir, Yalvaç, Burdur, Dinar ve Keçiborlu\'da profesyonel emlak danışmanlığı hizmetleri.',
    url: seoConfig.siteUrl,
    type: 'website',
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'FBM Gayrimenkul Isparta',
      },
    ],
  },
  alternates: {
    canonical: seoConfig.siteUrl,
  },
};

export default function HomePage() {
  // FAQ Schema for better SEO
  const faqs = [
    {
      question: "Isparta'da en güvenilir emlak firması hangisi?",
      answer: "FBM Gayrimenkul, Isparta ve Burdur bölgesinde yıllardır güvenilir emlak danışmanlığı hizmeti vermektedir. Merkez, Eğirdir, Yalvaç, Burdur, Dinar ve Keçiborlu'da geniş portföyümüzle hizmetinizdeyiz."
    },
    {
      question: "FBM Gayrimenkul hangi hizmetleri sunuyor?",
      answer: "Satılık ve kiralık ev, daire, villa, arsa ilanları ile profesyonel mekan tasarımı ve iç mimarlık hizmetleri sunuyoruz. Gayrimenkul alım-satım, kiralama ve danışmanlık konularında uzmanız."
    },
    {
      question: "Isparta'da hangi bölgelerde hizmet veriyorsunuz?",
      answer: "Isparta Merkez, Eğirdir, Yalvaç, Gönen, Şarkikaraağaç, Senirkent, Gelendost ve Uluborlu ile Burdur, Dinar ve Keçiborlu bölgelerinde aktif olarak hizmet vermekteyiz."
    },
    {
      question: "FBM Gayrimenkul'e nasıl ulaşabilirim?",
      answer: "Telefon: +90 543 591 09 32, E-posta: fbmgayrimenkul.32@gmail.com, WhatsApp ve Instagram (@fbm_gayrimenkul) üzerinden 7/24 bize ulaşabilirsiniz. Ofisimiz: Fatih, 201. Cadde Yener İş Merkezi no:59/61, Isparta."
    },
    {
      question: "Mekan tasarımı hizmeti de veriyor musunuz?",
      answer: "Evet, profesyonel iç mimarlık ve mekan tasarımı hizmetleri sunuyoruz. Ev, ofis, işyeri ve ticari alanlar için modern ve fonksiyonel tasarımlar gerçekleştiriyoruz."
    }
  ];

  const faqSchema = getFAQSchema(faqs);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <main className="w-full h-screen">
        <HeroSection />
      </main>
    </>
  );
}
