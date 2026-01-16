/* app/components/layout/Navbar.tsx */
/**
 * Premium Navbar - Fixed contact button visibility and hover states
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
    { name: 'ANASAYFA', href: '/' },
    { name: 'SATILIK', href: '/satilik' },
    { name: 'KİRALIK', href: '/kiralik' },
    { name: 'PROJELER', href: '/mekan-tasarimlari' },
    { name: 'KURUMSAL', href: '/hakkimizda' },
    { name: 'İLETİŞİM', href: '/iletisim' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => setIsMobileMenuOpen(false), [pathname]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-fbm-navy-900/95 backdrop-blur-md py-3 shadow-lg border-b border-white/5'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
                    {/* LOGO */}
                    <Link href="/" className="relative z-50 flex-shrink-0">
                        <div className={`relative transition-all duration-500 ${isScrolled ? 'w-20 md:w-24' : 'w-24 md:w-32'}`}>
                            <Image
                                src="/logo.png"
                                alt="FRH Logo"
                                width={150}
                                height={150}
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* DESKTOP LINKS */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-xs font-bold tracking-[0.15em] transition-colors duration-300 ${isActive ? 'text-fbm-gold-400' : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-2 left-0 h-[1px] bg-fbm-gold-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 hover:w-full'
                                        }`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* RIGHT SECTION: Contact + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        {/* Contact Button - Always Visible */}
                        <a
                            href="tel:+905435910932"
                            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-2.5 rounded-full border text-white transition-all duration-300 border-fbm-gold-400/50 bg-fbm-gold-400/10 hover:bg-fbm-gold-400 hover:text-fbm-navy-900 hover:border-fbm-gold-400"
                        >
                            <Phone className="w-4 h-4" />
                            <span className="hidden sm:inline text-xs font-bold tracking-wider">BİZE ULAŞIN</span>
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden text-white p-2 z-50"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menü"
                        >
                            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* FULL SCREEN MOBILE MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-40 bg-[#12161f]/98 backdrop-blur-xl flex flex-col justify-center items-center"
                    >
                        <div className="flex flex-col gap-6 text-center">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.08 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`font-serif text-3xl transition-colors ${pathname === link.href ? 'text-fbm-gold-400' : 'text-white hover:text-fbm-gold-400'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile Contact */}
                        <a
                            href="tel:+905435910932"
                            className="mt-12 flex items-center gap-3 px-8 py-4 rounded-full bg-fbm-gold-400 text-fbm-navy-900 font-bold"
                        >
                            <Phone className="w-5 h-5" />
                            <span>BİZE ULAŞIN</span>
                        </a>

                        <div className="absolute bottom-10 text-white/20 text-xs tracking-widest">
                            FT GAYRİMENKUL TASARIM
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}