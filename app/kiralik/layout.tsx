/* app/kiralik/layout.tsx */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kiralık Daire ve Ev İlanları Isparta & Burdur | FRH Gayrimenkul ve Tasarım',
  description: 'Isparta ve Burdur\'da kiralık daire, ev, villa ve işyeri ilanları. Merkez, Eğirdir, Yalvaç, Burdur, Dinar ve Keçiborlu\'da en uygun fiyatlı kiralık konutları FRH Gayrimenkul ve Tasarım güvencesiyle bulun. Detaylı bilgi ve fiyatlar için hemen inceleyin.',
  keywords: [
    'Isparta Kiralık Daire',
    'Burdur Kiralık Daire',
    'Dinar Kiralık Ev',
    'Keçiborlu Kiralık Daire',
    'Isparta Kiralık Ev',
    'Burdur Kiralık Ev',
    'Isparta Kiralık Villa',
    'Kiralık Konut Isparta',
    'Kiralık Konut Burdur',
    'Isparta Merkez Kiralık Daire',
    'Eğirdir Kiralık Ev',
    'Yalvaç Kiralık Daire',
    'Isparta Kira Fiyatları',
    'Burdur Kira Fiyatları',
    'Isparta Daire Kiralama',
    'Kiralık Emlak Isparta',
    'Kiralık Emlak Burdur',
    'FRH Gayrimenkul ve Tasarım Kiralık',
    'Isparta Aylık Kiralık'
  ],
  openGraph: {
    title: 'Kiralık Daire ve Ev İlanları Isparta & Burdur | FRH Gayrimenkul ve Tasarım',
    description: 'Isparta ve Burdur\'da en uygun fiyatlı kiralık daire, ev ve villa ilanları. Güvenilir emlak danışmanlığı.',
    url: 'https://www.fbmgayrimenkul.com/kiralik',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Isparta Kiralık Daire ve Ev İlanları',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.fbmgayrimenkul.com/kiralik',
  },
};

export default function KiralikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

