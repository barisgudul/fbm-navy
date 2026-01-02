/* app/components/layout/PageHeader.tsx */
/**
 * Premium Page Header - Cinematic Design
 * Fixed: No initial animation delays, content visible immediately
 */

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    bgImage: string;
}

export function PageHeader({ title, subtitle, bgImage }: PageHeaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax effects
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

    return (
        <div
            ref={containerRef}
            className="relative h-[55vh] md:h-[60vh] overflow-hidden flex items-center justify-center"
        >
            {/* Parallax Background Image */}
            <motion.div
                className="absolute inset-0"
                style={{ y, scale }}
            >
                <Image
                    src={bgImage}
                    alt={title}
                    fill
                    priority
                    className="object-cover brightness-[0.35]"
                    sizes="100vw"
                />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#12161f]/30 via-transparent to-[#12161f]" />

            {/* Content - Staggered Animation with LCP Protection */}
            <motion.div
                className="relative z-10 text-center px-6"
                style={{ opacity }}
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
                    hidden: {}
                }}
            >
                {/* Subtitle */}
                {subtitle && (
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                        }}
                        className="text-fbm-gold-400 text-xs md:text-sm font-sans tracking-[0.4em] uppercase mb-5"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Title */}
                <motion.h1
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
                >
                    {title}
                </motion.h1>

                {/* Decorative Line */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, scaleX: 0 },
                        visible: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    className="w-16 h-[1px] bg-fbm-gold-400/60 mx-auto mt-8"
                />
            </motion.div>
        </div>
    );
}
