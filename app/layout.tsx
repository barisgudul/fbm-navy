/* app/layout.tsx */

import type { Metadata } from "next";
import { Inter, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/app/components/ClientWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-bodoni" });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fbm-gayrimenkul-tasarim.com'),
  title: {
    default: "FBM Emlak Isparta | Satılık & Kiralık Daire, Villa, Arsa",
    template: "%s | FBM Emlak Isparta"
  },
  description: "Isparta'da güvenilir emlak danışmanlığı. Merkez, Eğirdir ve Yalvaç'ta en uygun satılık daireler, kiralık evler ve mimari tasarım çözümleri FBM Emlak'ta.",
  keywords: ['Isparta Emlak', 'Isparta Satılık Daire', 'Isparta Kiralık Ev', 'Ferah Tabak', 'Bolat Çelebi', 'Isparta Mimarlık'],
  openGraph: {
    title: 'FBM Emlak Isparta',
    description: 'Isparta ve çevresinde lüks konut, arsa ve mimari tasarım çözümleri.',
    url: 'https://www.fbm-gayrimenkul-tasarim.com',
    siteName: 'FBM Emlak',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${bodoni.variable} text-white bg-fixed`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
