/* app/hakkimizda/layout.tsx */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda | FRH Gayrimenkul ve Tasarım Isparta & Burdur',
  description: 'FRH Gayrimenkul ve Tasarım olarak Isparta ve Burdur bölgesinde gayrimenkul sektöründe güvenilir hizmet sunuyoruz. Kurucumuz Ferah Tabak ile Merkez, Eğirdir, Yalvaç, Burdur, Dinar ve Keçiborlu\'da profesyonel emlak danışmanlığı ve mekan tasarımı hizmetleri.',
  keywords: [
    'FRH Gayrimenkul ve Tasarım Hakkında',
    'Ferah Tabak',
    'Isparta Emlakçı',
    'Burdur Emlakçı',
    'FRH Gayrimenkul Emlak',
    'Isparta Gayrimenkul Danışmanı',
    'Burdur Gayrimenkul Danışmanı',
    'Güvenilir Emlak Isparta',
    'Güvenilir Emlak Burdur'
  ],
  openGraph: {
    title: 'Hakkımızda | FRH Gayrimenkul ve Tasarım Isparta & Burdur',
    description: 'Isparta ve Burdur\'un güvenilir gayrimenkul danışmanlık firması. Profesyonel ekibimiz ve deneyimimizle hizmetinizdeyiz.',
    url: 'https://www.fbmgayrimenkul.com/hakkimizda',
    type: 'website',
    images: [
      {
        url: '/FRH-logo.png',
        width: 1200,
        height: 630,
        alt: 'FRH Gayrimenkul ve Tasarım Hakkımızda',
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

