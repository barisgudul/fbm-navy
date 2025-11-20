/* app/layout.tsx */

import type { Metadata } from "next";
import { Inter, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/app/components/ClientWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-bodoni" });

export const metadata: Metadata = {
  title: "FBM Emlak & Tasarım",
  description: "Lüks konut ve tasarım çözümleri.",
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
