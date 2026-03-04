/* app/satilik/layout.tsx */
import type { Metadata } from 'next';
import { seoConfig, getAbsoluteUrl } from '@/app/config/seo';

export const metadata: Metadata = {
  title: 'Isparta Satılık Daire, Ev, Villa ve Arsa İlanları | Ferah Tabak Gayrimenkul',
  description:
    'Isparta merkez ve ilçelerinde satılık daire, ev, villa ve arsa ilanları. Ferah Tabak Gayrimenkul ile oturum ve yatırım amaçlı satılık gayrimenkulleri güvenle karşılaştırın.',
  keywords: [
    'Isparta satılık daire',
    'Isparta satılık ev',
    'Isparta satılık villa',
    'Isparta satılık arsa',
    'Isparta emlak ilanları',
    'Isparta yatırım fırsatları',
    'Isparta gayrimenkul yatırımı',
    'Isparta merkez satılık daire',
    'Ferah Tabak gayrimenkul satılık',
  ],
  openGraph: {
    title: 'Isparta Satılık Emlak Portföyü | Ferah Tabak Gayrimenkul',
    description:
      'Isparta satılık daire, ev, villa ve arsa ilanları. Yatırım ve yaşam odaklı portföyler.',
    url: getAbsoluteUrl('/satilik'),
    type: 'website',
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Isparta satılık emlak ilanları',
      },
    ],
  },
  alternates: {
    canonical: getAbsoluteUrl('/satilik'),
    languages: {
      'tr-TR': getAbsoluteUrl('/satilik'),
    },
  },
};

export default function SatilikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
