/* app/hakkimizda/layout.tsx */
import type { Metadata } from 'next';
import { seoConfig, getAbsoluteUrl } from '@/app/config/seo';

export const metadata: Metadata = {
  title: 'Hakkımızda | Ferah Tabak Gayrimenkul ve Tasarım Isparta',
  description:
    'Ferah Tabak Gayrimenkul ve Tasarım; Isparta’da emlak, mimarlık, tasarım ve yatırım danışmanlığı alanlarında güvenilir ve veri odaklı hizmet sunar.',
  keywords: [
    'Ferah Tabak kimdir',
    'Isparta gayrimenkul danışmanı',
    'Isparta yatırım danışmanı',
    'Isparta mimarlık ofisi',
    'Isparta tasarım ofisi',
    'Ferah Tabak gayrimenkul ve tasarım',
  ],
  openGraph: {
    title: 'Ferah Tabak Gayrimenkul ve Tasarım Hakkında',
    description: 'Isparta emlak, mimarlık, tasarım ve yatırım danışmanlığı yaklaşımımızı keşfedin.',
    url: getAbsoluteUrl('/hakkimizda'),
    type: 'website',
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Ferah Tabak Gayrimenkul ve Tasarım Hakkında',
      },
    ],
  },
  alternates: {
    canonical: getAbsoluteUrl('/hakkimizda'),
    languages: {
      'tr-TR': getAbsoluteUrl('/hakkimizda'),
    },
  },
};

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
