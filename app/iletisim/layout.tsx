/* app/iletisim/layout.tsx */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | FBM Gayrimenkul Isparta & Burdur',
  description: 'FBM Gayrimenkul ile iletişime geçin. Adres: Fatih, 201. Cadde Yener İş Merkezi no:59/61, Isparta. Telefon: +90 543 591 09 32. Isparta ve Burdur bölgesinde gayrimenkul danışmanlığı için bize ulaşın.',
  keywords: [
    'FBM Gayrimenkul İletişim',
    'Isparta Emlak İletişim',
    'Burdur Emlak İletişim',
    'FBM Gayrimenkul Telefon',
    'FBM Gayrimenkul Adres',
    'Isparta Emlakçı İletişim',
    'Burdur Emlakçı İletişim',
    'FBM Emlak Telefon'
  ],
  openGraph: {
    title: 'İletişim | FBM Gayrimenkul Isparta & Burdur',
    description: 'Isparta ve Burdur\'da gayrimenkul ihtiyaçlarınız için FBM Gayrimenkul ile iletişime geçin. Profesyonel danışmanlık hizmetleri.',
    url: 'https://www.fbmgayrimenkul.com/iletisim',
    type: 'website',
    images: [
      {
        url: '/fbm-logo.png',
        width: 1200,
        height: 630,
        alt: 'FBM Gayrimenkul İletişim',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.fbmgayrimenkul.com/iletisim',
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

