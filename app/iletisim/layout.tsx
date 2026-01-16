/* app/iletisim/layout.tsx */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | FRH Gayrimenkul ve Tasarım Isparta & Burdur',
  description: 'FRH Gayrimenkul ve Tasarım ile iletişime geçin. Adres: Fatih, 201. Cadde Yener İş Merkezi no:59/61, Isparta. Telefon: +90 543 591 09 32. Isparta ve Burdur bölgesinde gayrimenkul danışmanlığı için bize ulaşın.',
  keywords: [
    'FRH Gayrimenkul ve Tasarım İletişim',
    'Isparta Emlak İletişim',
    'Burdur Emlak İletişim',
    'FRH Gayrimenkul ve Tasarım Telefon',
    'FRH Gayrimenkul ve Tasarım Adres',
    'Isparta Emlakçı İletişim',
    'Burdur Emlakçı İletişim',
    'FT Emlak Telefon'
  ],
  openGraph: {
    title: 'İletişim | FRH Gayrimenkul ve Tasarım Isparta & Burdur',
    description: 'Isparta ve Burdur\'da gayrimenkul ihtiyaçlarınız için FRH Gayrimenkul ve Tasarım ile iletişime geçin. Profesyonel danışmanlık hizmetleri.',
    url: 'https://www.fbmgayrimenkul.com/iletisim',
    type: 'website',
    images: [
      {
        url: '/FRH-logo.png',
        width: 1200,
        height: 630,
        alt: 'FRH Gayrimenkul ve Tasarım İletişim',
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

