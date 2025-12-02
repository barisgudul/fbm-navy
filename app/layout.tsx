/* app/layout.tsx */

import type { Metadata } from "next";
import { Inter, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/app/components/ClientWrapper";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@/app/components/GoogleAnalytics";
import { seoConfig, getLocalBusinessSchema } from "@/app/config/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-bodoni", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: "%s | FBM Gayrimenkul Isparta"
  },
  description: seoConfig.defaultDescription,
  keywords: [
    // Isparta Ana Anahtar Kelimeler
    'Isparta Gayrimenkul',
    'Isparta Emlak',
    'Isparta Emlakçı',
    'Isparta Satılık Daire',
    'Isparta Satılık Ev',
    'Isparta Satılık Villa',
    'Isparta Satılık Arsa',
    'Isparta Kiralık Ev',
    'Isparta Kiralık Daire',
    'Isparta Emlak İlanları',
    'Isparta Konut',
    'Isparta Ev Fiyatları',
    'Isparta Daire Fiyatları',
    'Isparta Merkez Emlak',
    'Isparta Mimarlık',
    'Isparta İç Mimarlık',
    'Isparta Mekan Tasarım',
    'Isparta Gayrimenkul Danışmanlığı',
    
    // Burdur Ana Anahtar Kelimeler
    'Burdur Gayrimenkul',
    'Burdur Emlak',
    'Burdur Emlakçı',
    'Burdur Satılık Daire',
    'Burdur Satılık Ev',
    'Burdur Kiralık Ev',
    'Burdur Ev Fiyatları',
    'Burdur Mimarlık',
    
    // Diğer Bölgeler
    'Dinar Emlak',
    'Dinar Satılık Ev',
    'Keçiborlu Emlak',
    'Keçiborlu Satılık Daire',
    'Eğirdir Emlak',
    'Eğirdir Satılık Ev',
    'Yalvaç Emlak',
    'Yalvaç Satılık Daire',
    'Gönen Emlak',
    'Şarkikaraağaç Emlak',
    'Senirkent Emlak',
    'Gelendost Emlak',
    
    // Marka ve Ekip
    'FBM Gayrimenkul',
    'FBM Emlak',
    'Ferah Tabak',
    'Bolat Çelebi',
  ],
  authors: [{ name: 'FBM Gayrimenkul' }],
  creator: 'FBM Gayrimenkul',
  publisher: 'FBM Gayrimenkul',
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
        alt: 'FBM Gayrimenkul Isparta - Satılık ve Kiralık Ev İlanları',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Local Business JSON-LD Structured Data (from seo config)
  const localBusinessSchema = getLocalBusinessSchema();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seoConfig.siteName,
    "url": seoConfig.siteUrl,
    "logo": `${seoConfig.siteUrl}${seoConfig.logo}`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": seoConfig.contact.phone,
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": ["Turkish"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": seoConfig.contact.address.street,
      "addressLocality": seoConfig.contact.address.city,
      "addressRegion": seoConfig.contact.address.city,
      "postalCode": seoConfig.contact.address.postalCode,
      "addressCountry": seoConfig.contact.address.country
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": seoConfig.siteName,
    "url": seoConfig.siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${seoConfig.siteUrl}/satilik?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="tr">
      <head>
        {/* Structured Data Schemas */}
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
        
        {/* Google Analytics & Tag Manager */}
        <GoogleAnalytics gaId={seoConfig.analytics.googleAnalyticsId} />
        <GoogleTagManager gtmId={seoConfig.analytics.googleTagManagerId} />
      </head>
      <body className={`${inter.variable} ${bodoni.variable} text-white bg-fixed`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
