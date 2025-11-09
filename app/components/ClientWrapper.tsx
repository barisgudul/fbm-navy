/* app/components/ClientWrapper.tsx */

'use client';

import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Preloader } from "@/app/components/ui/Preloader";
import { CustomCursor } from "@/app/components/ui/CustomCursor";
import Navbar from "@/app/components/layout/Navbar";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Her sayfa değişiminde preloader'ı göster
    const showPreloader = setTimeout(() => setIsLoading(true), 0);
    
    // Süreyi animasyonla senkronize et (1s anim + 0.5s bekleme + 0.5s çıkış)
    const hidePreloader = setTimeout(() => setIsLoading(false), 2500);
    
    return () => {
      clearTimeout(showPreloader);
      clearTimeout(hidePreloader);
    };
  }, [pathname]); // pathname değiştiğinde çalışır

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key={pathname} />}
      </AnimatePresence>
      <div style={{ display: isLoading ? 'none' : 'block' }}>
        <Navbar />
        {children}
      </div>
    </>
  );
}

