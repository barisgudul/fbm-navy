/* app/hakkimizda/layout.tsx */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda | FBM Gayrimenkul Isparta & Burdur',
  description: 'FBM Gayrimenkul olarak Isparta ve Burdur bölgesinde gayrimenkul sektöründe güvenilir hizmet sunuyoruz. Kurucu ortaklarımız Ferah Tabak ve Bolat Çelebi ile Merkez, Eğirdir, Yalvaç, Burdur, Dinar ve Keçiborlu\'da profesyonel emlak danışmanlığı ve mekan tasarımı hizmetleri.',
  keywords: [
    'FBM Gayrimenkul Hakkında',
    'Ferah Tabak',
    'Bolat Çelebi',
    'Isparta Emlakçı',
    'Burdur Emlakçı',
    'FBM Emlak',
    'Isparta Gayrimenkul Danışmanı',
    'Burdur Gayrimenkul Danışmanı',
    'Güvenilir Emlak Isparta',
    'Güvenilir Emlak Burdur'
  ],
  openGraph: {
    title: 'Hakkımızda | FBM Gayrimenkul Isparta & Burdur',
    description: 'Isparta ve Burdur\'un güvenilir gayrimenkul danışmanlık firması. Profesyonel ekibimiz ve deneyimimizle hizmetinizdeyiz.',
    url: 'https://www.fbmgayrimenkul.com/hakkimizda',
    type: 'website',
    images: [
      {
        url: '/fbm-logo.png',
        width: 1200,
        height: 630,
        alt: 'FBM Gayrimenkul Hakkımızda',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.fbmgayrimenkul.com/hakkimizda',
  },
};

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

