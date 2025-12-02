/* app/mekan-tasarimlari/layout.tsx */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mekan Tasarımları ve İç Mimarlık | FBM Gayrimenkul Isparta & Burdur',
  description: 'Isparta ve Burdur\'da profesyonel mekan tasarımı ve iç mimarlık hizmetleri. Modern ve fonksiyonel tasarımlarla yaşam alanlarınızı dönüştürüyoruz. FBM Gayrimenkul ile hayalinizdeki mekanı yaratın.',
  keywords: [
    'Isparta Mekan Tasarımı',
    'Burdur Mekan Tasarımı',
    'Isparta İç Mimarlık',
    'Burdur İç Mimarlık',
    'Isparta Mimari Tasarım',
    'FBM Tasarım',
    'Isparta Dekorasyon',
    'Burdur Dekorasyon',
    'Isparta Mimarlık Ofisi',
    'İç Mekan Tasarımı Isparta',
    'İç Mekan Tasarımı Burdur',
    'Ofis Tasarımı Isparta',
    'Ev Dekorasyonu Isparta',
    'Ev Dekorasyonu Burdur'
  ],
  openGraph: {
    title: 'Mekan Tasarımları ve İç Mimarlık | FBM Gayrimenkul',
    description: 'Yaratıcı ve fonksiyonel mekan tasarımları. Isparta ve Burdur\'da profesyonel iç mimarlık hizmetleri.',
    url: 'https://www.fbmgayrimenkul.com/mekan-tasarimlari',
    type: 'website',
    images: [
      {
        url: '/fbm-logo.png',
        width: 1200,
        height: 630,
        alt: 'FBM Gayrimenkul Mekan Tasarımları',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.fbmgayrimenkul.com/mekan-tasarimlari',
  },
};

export default function MekanTasarimlariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

