/* app/components/ClientWrapper.tsx */
/**
 * Client Wrapper - Fixed animation timing
 * Uses opacity instead of display:none to preserve Framer Motion animations
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Preloader } from "@/app/components/ui/Preloader";
import Navbar from "@/app/components/layout/Navbar";
import { SmoothScrollProvider } from "@/app/components/providers/SmoothScrollProvider";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Only show preloader on initial load, not on navigation
    const isInitialLoad = sessionStorage.getItem('initialLoadDone') !== 'true';

    if (isInitialLoad) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('initialLoadDone', 'true');
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <SmoothScrollProvider>
        {/* Use opacity animation instead of display:none */}
        <div className="relative">
          <Navbar />
          {children}
        </div>
      </SmoothScrollProvider>
    </>
  );
}
