/* app/page.tsx */
/**
 * Homepage - Natural scroll flow with vitrin section
 */

import { HeroSection } from "@/app/components/HeroSection";
import { PropertyGrid } from "@/app/components/PropertyGrid";
import { supabase } from "@/app/lib/supabaseClient";
import { transformToProperty } from "@/types";
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { seoConfig, getFAQSchema } from "@/app/config/seo";
import { ArrowRight } from "lucide-react";
import type { PropertyRow } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "FBM Gayrimenkul Isparta & Burdur | Satılık & Kiralık Ev, Daire, Villa, Arsa İlanları",
  description: "Isparta ve Burdur'un lider gayrimenkul firması FBM Gayrimenkul. Satılık daire, kiralık ev, villa, arsa ilanları ve profesyonel mimari tasarım hizmetleri. Merkez, Eğirdir, Yalvaç, Burdur, Dinar ve Keçiborlu'da güvenilir emlak danışmanlığı.",
  keywords: [
    'Isparta Gayrimenkul',
    'Burdur Gayrimenkul',
    'Isparta Emlak',
    'Satılık Daire Isparta',
    'Kiralık Ev Isparta',
    'Isparta Villa',
    'FBM Gayrimenkul',
    'Isparta Emlakçı',
  ],
  openGraph: {
    title: 'FBM Gayrimenkul Isparta & Burdur | En İyi Emlak İlanları',
    description: 'Isparta ve Burdur bölgesinde satılık ve kiralık gayrimenkul ilanları.',
    url: seoConfig.siteUrl,
    type: 'website',
    images: [{ url: seoConfig.ogImage, width: 1200, height: 630, alt: 'FBM Gayrimenkul Isparta' }],
  },
  alternates: { canonical: seoConfig.siteUrl },
};

export default async function HomePage() {
  // Fetch featured properties
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'aktif')
    .order('created_at', { ascending: false })
    .limit(6);

  const properties = data ? (data as PropertyRow[]).map(transformToProperty) : [];

  const faqs = [
    {
      question: "Isparta'da en güvenilir emlak firması hangisi?",
      answer: "FBM Gayrimenkul, Isparta ve Burdur bölgesinde yıllardır güvenilir emlak danışmanlığı hizmeti vermektedir."
    },
    {
      question: "FBM Gayrimenkul hangi hizmetleri sunuyor?",
      answer: "Satılık ve kiralık ev, daire, villa, arsa ilanları ile profesyonel mekan tasarımı hizmetleri sunuyoruz."
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
        {/* Hero Section */}
        <HeroSection />

        {/* Vitrin Section - Target for Keşfet button */}
        <section id="vitrin" className="py-24 md:py-32 bg-[#12161f]">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-16">
              <p className="text-fbm-gold-400 text-xs tracking-[0.4em] uppercase mb-4">Öne Çıkan İlanlar</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white">Seçkin Portföyümüz</h2>
            </div>

            {/* Property Grid */}
            <PropertyGrid properties={properties} />

            {/* View All Button */}
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
      </main>
    </>
  );
}
