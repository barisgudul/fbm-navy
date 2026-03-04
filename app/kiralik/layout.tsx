/* app/kiralik/layout.tsx */
import type { Metadata } from 'next';
import { seoConfig, getAbsoluteUrl } from '@/app/config/seo';

export const metadata: Metadata = {
  title: 'Isparta Kiralık Daire, Ev ve İşyeri İlanları | Ferah Tabak Gayrimenkul',
  description:
    'Isparta ve çevresinde kiralık daire, ev, villa ve işyeri ilanları. Ferah Tabak Gayrimenkul ile bütçenize ve lokasyonunuza uygun kiralık portföyleri hızlıca keşfedin.',
  keywords: [
    'Isparta kiralık daire',
    'Isparta kiralık ev',
    'Isparta kiralık işyeri',
    'Isparta kiralık emlak',
    'Isparta aylık kiralık',
    'Isparta merkez kiralık daire',
    'Isparta kira piyasası',
    'Ferah Tabak gayrimenkul kiralık',
  ],
  openGraph: {
    title: 'Isparta Kiralık Emlak Portföyü | Ferah Tabak Gayrimenkul',
    description: 'Isparta kiralık daire, ev ve işyeri ilanları. Güncel kiralık portföyleri inceleyin.',
    url: getAbsoluteUrl('/kiralik'),
    type: 'website',
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Isparta kiralık emlak ilanları',
      },
    ],
  },
  alternates: {
    canonical: getAbsoluteUrl('/kiralik'),
    languages: {
      'tr-TR': getAbsoluteUrl('/kiralik'),
    },
  },
};

export default function KiralikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
