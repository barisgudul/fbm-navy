/* app/template.tsx */
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Global variable to track if this is the first load
// This persists across re-renders but resets on page refresh/hard navigation
let isInitialLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
    // Initialize state based on the global variable. 
    // On server: isInitialLoad is true -> shouldAnimate is false.
    // On client first load: isInitialLoad is true -> shouldAnimate is false.
    // On client navigation: isInitialLoad is false (set in useEffect) -> shouldAnimate is true.
    const [shouldAnimate] = useState(!isInitialLoad);

    useEffect(() => {
        isInitialLoad = false;
    }, []);

    // Initial Load: Render children directly (No Wrapper = No JS Delay = Fast LCP)
    if (!shouldAnimate) {
        return <>{children}</>;
    }

    // Navigation: Render with Animation
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </motion.div>
    );
}
