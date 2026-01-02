/* app/components/ui/FadeIn.tsx */
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
    fullWidth?: boolean;
}

export function FadeIn({
    children,
    delay = 0,
    direction = 'up',
    className = '',
    fullWidth = false
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    };

    return (
        <div ref={ref} className={`${fullWidth ? 'w-full' : ''} ${className}`}>
            <motion.div
                initial={{
                    opacity: 0,
                    x: directionOffset[direction].x,
                    y: directionOffset[direction].y,
                    filter: 'blur(8px)'
                }}
                animate={isInView ? {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    filter: 'blur(0px)'
                } : {}}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.21, 0.47, 0.32, 0.98]
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
