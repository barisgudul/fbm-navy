/* app/components/layout/Navbar.tsx */

'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/satilik", label: "Satılık" },
  { href: "/kiralik", label: "Kiralık" },
  { href: "/mekan-tasarimlari", label: "Mekan Tasarımları" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[linear-gradient(120deg,rgba(20,30,46,0.92)_0%,rgba(37,51,72,0.88)_55%,rgba(54,72,95,0.85)_100%)] backdrop-blur-md border-b border-fbm-gold-400/15">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="flex items-center justify-between h-28 md:h-36">
                    <Link href="/" className="flex-shrink-0 z-10 flex items-center gap-3 group relative h-full pl-2">
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
                        <div className="hidden xl:flex flex-col justify-center border-l border-fbm-gold-400/30 pl-4 py-1 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="font-serif text-sm tracking-[0.25em] text-fbm-gold-400 leading-relaxed whitespace-nowrap">GAYRİMENKUL</span>
                            <span className="font-serif text-xs tracking-[0.2em] text-white/90 leading-relaxed whitespace-nowrap">DEĞERLEME & TASARIM</span>
                        </div>
                    </Link>
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
                </div>
            </motion.div>
        </header>
    );
}

