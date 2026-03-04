/* app/mekan-tasarimlari/layout.tsx */
import type { Metadata } from 'next';
import { seoConfig, getAbsoluteUrl } from '@/app/config/seo';

export const metadata: Metadata = {
  title: 'Isparta Mimarlık ve İç Mekan Tasarım Projeleri | Ferah Tabak Gayrimenkul',
  description:
    'Isparta merkezli mimarlık, iç mimarlık ve mekan tasarımı projeleri. Konut ve ticari alanlarda estetik, işlevsel ve yatırım değerini artıran tasarım çözümleri.',
  keywords: [
    'Isparta inşaat',
    'Isparta mimar',
    'Isparta iç mimar',
    'Isparta mimarlık',
    'Isparta iç mimarlık',
    'Isparta mekan tasarımı',
    'Isparta mimari tasarım',
    'Isparta iç mekan dekorasyon',
    'Isparta villa tasarımı',
    'Isparta ofis tasarımı',
    'Ferah Tabak tasarım',
  ],
  openGraph: {
    title: 'Isparta Mimarlık ve Tasarım Projeleri | Ferah Tabak Gayrimenkul',
    description: 'Isparta için modern mimarlık ve iç mekan tasarımı portföyü.',
    url: getAbsoluteUrl('/mekan-tasarimlari'),
    type: 'website',
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Isparta mimarlık ve mekan tasarımı projeleri',
      },
    ],
  },
  alternates: {
    canonical: getAbsoluteUrl('/mekan-tasarimlari'),
    languages: {
      'tr-TR': getAbsoluteUrl('/mekan-tasarimlari'),
    },
  },
};

export default function MekanTasarimlariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
