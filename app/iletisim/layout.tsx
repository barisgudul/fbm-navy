/* app/iletisim/layout.tsx */
import type { Metadata } from 'next';
import { seoConfig, getAbsoluteUrl } from '@/app/config/seo';

export const metadata: Metadata = {
  title: 'İletişim | Isparta Emlak, Mimarlık ve Yatırım Danışmanlığı',
  description:
    'Ferah Tabak Gayrimenkul ve Tasarım iletişim bilgileri. Isparta’da emlak, mimarlık, iç mekan tasarımı ve yatırım danışmanlığı için bizimle iletişime geçin.',
  keywords: [
    'Isparta emlak iletişim',
    'Isparta mimarlık iletişim',
    'Isparta yatırım danışmanlığı iletişim',
    'Ferah Tabak telefon',
    'Ferah Tabak ofis adresi',
  ],
  openGraph: {
    title: 'İletişim | Ferah Tabak Gayrimenkul ve Tasarım',
    description: 'Isparta merkez ofisimize ulaşın. Emlak, tasarım ve yatırım danışmanlığı desteği alın.',
    url: getAbsoluteUrl('/iletisim'),
    type: 'website',
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Ferah Tabak Gayrimenkul ve Tasarım İletişim',
      },
    ],
  },
  alternates: {
    canonical: getAbsoluteUrl('/iletisim'),
    languages: {
      'tr-TR': getAbsoluteUrl('/iletisim'),
    },
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
