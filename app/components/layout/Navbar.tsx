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
                <div className="flex items-center justify-between h-24 md:h-32">
                    <Link href="/" className="flex-shrink-0 z-10">
                        <Image 
                            src="/fbm.png" 
                            alt="FBM Logo" 
                            width={120} 
                            height={60} 
                            className="h-auto"
                            priority 
                            unoptimized
                        />
                    </Link>
                    <nav className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group font-sans text-sm tracking-widest text-white hover:text-fbm-gold-400 relative transition-colors duration-300"
                            >
                                {link.label}
                                <span className="absolute bottom-[-5px] left-0 w-full h-[1px] bg-fbm-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                            </Link>
                        ))}
                    </nav>
                    <div className="z-10">
                        <button className="font-sans text-sm tracking-widest px-6 py-3 text-fbm-navy-900 bg-fbm-cream-100 hover:bg-fbm-bronze-500 hover:text-white transition-all duration-300">
                            PROJELER
                        </button>
                    </div>
                </div>
            </motion.div>
        </header>
    );
}

