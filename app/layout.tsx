/* app/layout.tsx */

import type { Metadata } from 'next';
import { Inter, Bodoni_Moda } from 'next/font/google';
import './globals.css';
import { ClientWrapper } from '@/app/components/ClientWrapper';
import Script from 'next/script';
import {
  GoogleAnalytics,
  GoogleTagManagerHead,
  GoogleTagManagerBody,
} from '@/app/components/GoogleAnalytics';
import {
  seoConfig,
  getLocalBusinessSchema,
  getOrganizationSchema,
  getWebsiteSchema,
  getServiceSchemas,
} from '@/app/config/seo';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const bodoni = Bodoni_Moda({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-bodoni', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  applicationName: seoConfig.siteName,
  title: {
    default: seoConfig.defaultTitle,
    template: `%s | ${seoConfig.brandName}`,
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.mainKeywords,
  category: 'real estate',
  classification: 'Gayrimenkul, Mimarlık, Tasarım, Yatırım',
  authors: [{ name: 'Ferah Tabak', url: seoConfig.siteUrl }],
  creator: seoConfig.brandName,
  publisher: seoConfig.brandName,
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: seoConfig.siteUrl,
    languages: {
      'tr-TR': seoConfig.siteUrl,
    },
  },
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Isparta emlak, mimarlık, tasarım ve yatırım danışmanlığı',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [seoConfig.ogImage],
  },
  verification: {
    google: seoConfig.analytics.googleSiteVerification,
  },
  icons: {
    icon: [
      { url: '/icon1.png', sizes: '96x96' },
      { url: '/apple-icon.png', sizes: '192x192' },
      { url: '/apple-icon.png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  other: {
    'geo.region': 'TR-32',
    'geo.placename': seoConfig.contact.address.city,
    'geo.position': `${seoConfig.geo.latitude};${seoConfig.geo.longitude}`,
    ICBM: `${seoConfig.geo.latitude}, ${seoConfig.geo.longitude}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = getLocalBusinessSchema();
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@graph': getServiceSchemas(),
  };

  return (
    <html lang="tr-TR">
      <head>
        <GoogleTagManagerHead gtmId={seoConfig.analytics.googleTagManagerId} />
        <GoogleAnalytics gaId={seoConfig.analytics.googleAnalyticsId} />

        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <Script
          id="services-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${bodoni.variable} text-white bg-fixed`}>
        <GoogleTagManagerBody gtmId={seoConfig.analytics.googleTagManagerId} />

        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
