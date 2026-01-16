/* app/satilik/layout.tsx */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Satılık Daire ve Ev İlanları Isparta & Burdur | FRH Gayrimenkul ve Tasarım',
  description: 'Isparta ve Burdur\'da satılık daire, ev, villa ve arsa ilanları. Merkez, Eğirdir, Yalvaç, Burdur, Dinar ve Keçiborlu\'da en uygun fiyatlı satılık konutları FRH Gayrimenkul ve Tasarım güvencesiyle bulun. Detaylı bilgi ve fiyatlar için hemen inceleyin.',
  keywords: [
    'Isparta Satılık Daire',
    'Burdur Satılık Daire',
    'Dinar Satılık Ev',
    'Keçiborlu Satılık Daire',
    'Isparta Satılık Ev',
    'Isparta Satılık Villa',
    'Burdur Satılık Ev',
    'Isparta Satılık Arsa',
    'Satılık Konut Isparta',
    'Satılık Konut Burdur',
    'Isparta Merkez Satılık Daire',
    'Eğirdir Satılık Ev',
    'Yalvaç Satılık Daire',
    'Isparta Ev Fiyatları',
    'Burdur Ev Fiyatları',
    'Isparta Daire Fiyatları',
    'Satılık Emlak Isparta',
    'Satılık Emlak Burdur',
    'FRH Gayrimenkul ve Tasarım Satılık'
  ],
  openGraph: {
    title: 'Satılık Daire ve Ev İlanları Isparta & Burdur | FRH Gayrimenkul ve Tasarım',
    description: 'Isparta ve Burdur\'da en uygun fiyatlı satılık daire, ev, villa ve arsa ilanları. Güvenilir emlak danışmanlığı.',
    url: 'https://www.fbmgayrimenkul.com/satilik',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Isparta Satılık Daire ve Ev İlanları',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.fbmgayrimenkul.com/satilik',
  },
};

export default function SatilikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

