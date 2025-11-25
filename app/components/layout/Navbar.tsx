/* app/components/layout/Navbar.tsx */

'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/satilik", label: "Satılık" },
  { href: "/kiralik", label: "Kiralık" },
  { href: "/mekan-tasarimlari", label: "Mekan Tasarımları" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLinkClick = () => {
        closeMobileMenu();
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[linear-gradient(120deg,rgba(20,30,46,0.92)_0%,rgba(37,51,72,0.88)_55%,rgba(54,72,95,0.85)_100%)] backdrop-blur-md border-b border-fbm-gold-400/15">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="container mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <div className="flex items-center justify-between h-28 md:h-36">
                        <Link 
                            href="/" 
                            className="flex-shrink-0 z-10 flex items-center gap-2 md:gap-3 group relative h-full pl-2"
                            onClick={handleLinkClick}
                        >
                            <div className="relative h-full w-28 md:w-40 flex items-center justify-center">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-fbm-gold-400/0 group-hover:bg-fbm-gold-400/20 blur-3xl rounded-full transition-all duration-700" />
                                <Image 
                                    src="/logo.png" 
                                    alt="FBM Logo" 
                                    width={800} 
                                    height={400} 
                                    className="relative z-10 h-full w-auto object-contain transform scale-125 md:scale-150 transition-all duration-500 drop-shadow-xl group-hover:scale-[1.6] group-hover:drop-shadow-[0_0_20px_rgba(188,150,72,0.6)]"
                                    priority 
                                    unoptimized
                                />
                            </div>
                            <div className="flex flex-col justify-center border-l border-fbm-gold-400/30 pl-2 md:pl-4 py-1 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="font-serif text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.25em] text-fbm-gold-400 leading-tight md:leading-relaxed whitespace-nowrap">GAYRİMENKUL</span>
                                <span className="font-serif text-[9px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] text-white/90 leading-tight md:leading-relaxed whitespace-nowrap">DEĞERLEME & TASARIM</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8 lg:space-x-16 ml-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group font-serif text-xl italic tracking-wider text-white/90 hover:text-fbm-gold-400 relative transition-all duration-500 hover:scale-110"
                                >
                                    <span className="relative z-10 drop-shadow-lg">{link.label}</span>
                                    <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-fbm-gold-400 to-transparent transform -translate-x-1/2 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(188,150,72,0.8)]" />
                                    <span className="absolute inset-0 bg-fbm-gold-400/0 group-hover:bg-fbm-gold-400/10 blur-xl transition-all duration-500 rounded-full -z-10" />
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Hamburger Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:text-fbm-gold-400 transition-colors duration-300 z-10"
                            aria-label="Menüyü Aç"
                        >
                            <Menu size={28} strokeWidth={1.5} />
                        </button>
                    </div>
                </motion.div>
            </header>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={closeMobileMenu}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-screen w-[80%] max-w-sm bg-gradient-to-b from-fbm-navy-900 via-fbm-denim-750 to-fbm-navy-900 z-[70] shadow-2xl"
                        >
                            <div className="flex flex-col h-full">
                                {/* Drawer Header */}
                                <div className="flex items-center justify-between p-6 border-b border-white/10">
                                    <Link 
                                        href="/" 
                                        className="flex items-center gap-3 group relative"
                                        onClick={handleLinkClick}
                                    >
                                        <div className="relative h-16 w-32 flex items-center justify-center">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-fbm-gold-400/0 group-hover:bg-fbm-gold-400/20 blur-3xl rounded-full transition-all duration-700" />
                                            <Image 
                                                src="/logo.png" 
                                                alt="FBM Logo" 
                                                width={800} 
                                                height={400} 
                                                className="relative z-10 h-full w-auto object-contain transform scale-125 transition-all duration-500 drop-shadow-xl group-hover:scale-[1.4] group-hover:drop-shadow-[0_0_20px_rgba(188,150,72,0.6)]"
                                                priority 
                                                unoptimized
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center border-l border-fbm-gold-400/30 pl-3 py-1 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                            <span className="font-serif text-xs tracking-[0.2em] text-fbm-gold-400 leading-relaxed whitespace-nowrap">GAYRİMENKUL</span>
                                            <span className="font-serif text-[10px] tracking-[0.15em] text-white/90 leading-relaxed whitespace-nowrap">DEĞERLEME & TASARIM</span>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={closeMobileMenu}
                                        className="flex items-center justify-center w-10 h-10 text-white hover:text-fbm-gold-400 transition-colors duration-300 flex-shrink-0"
                                        aria-label="Menüyü Kapat"
                                    >
                                        <X size={28} strokeWidth={1.5} />
                                    </button>
                                </div>

                                {/* Drawer Navigation Links */}
                                <nav className="flex-1 flex flex-col pt-6">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={handleLinkClick}
                                            className="group px-6 py-5 font-serif text-xl italic tracking-wider text-white/90 hover:text-fbm-gold-400 relative transition-all duration-500 border-b border-white/10 active:text-fbm-gold-400"
                                        >
                                            <span className="relative z-10 drop-shadow-lg">{link.label}</span>
                                            <span className="absolute left-6 bottom-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-fbm-gold-400 to-transparent group-hover:w-[calc(100%-3rem)] transition-all duration-500 ease-out shadow-[0_0_10px_rgba(188,150,72,0.8)]" />
                                            <span className="absolute inset-0 bg-fbm-gold-400/0 group-hover:bg-fbm-gold-400/10 blur-xl transition-all duration-500 rounded-full -z-10" />
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
