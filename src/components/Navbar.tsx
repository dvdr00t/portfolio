'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Languages, Moon, Sun, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { language, setLanguage, content } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { href: '#about', label: content.navbar.about },
        { href: '#work', label: content.navbar.work },
        { href: '#curriculum', label: content.navbar.curriculum },
        { href: '#badges', label: content.navbar.badges },
        { href: '#conferences', label: content.navbar.conferences },
        { href: '#contact', label: content.navbar.contact },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'it' : 'en');
    };

    return (
        <nav
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                scrolled ? 'bg-slate-950/80 backdrop-blur-md border-slate-800/50 py-4' : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-slate-700/50 group-hover:border-slate-500 transition-colors shrink-0">
                            <Image
                                src="/profile.png"
                                alt="Davide Arcolini"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-base sm:text-lg font-bold font-outfit text-white tracking-tight group-hover:text-slate-200 transition-colors leading-tight">
                                Davide Arcolini
                            </span>
                            <span className="text-xs font-medium text-slate-400 group-hover:text-blue-400 transition-colors">
                                {content.navbar.subtitle}
                            </span>
                        </div>
                    </Link>
                    <span
                        aria-disabled="true"
                        title={content.navbar.cvUnavailable}
                        className="hidden lg:flex items-center gap-1.5 rounded-full border border-slate-700/70 bg-slate-800/50 px-3 py-1.5 text-xs font-semibold text-slate-400 cursor-not-allowed"
                    >
                        <Download className="h-3.5 w-3.5" />
                        {content.navbar.cv}
                    </span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all text-xs font-semibold uppercase tracking-wider text-slate-300"
                        title="Switch Language"
                    >
                        <Languages className="w-3.5 h-3.5" />
                        <span>{language}</span>
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800"
                        title={theme === 'dark' ? content.navbar.lightMode : content.navbar.darkMode}
                        aria-label={theme === 'dark' ? content.navbar.lightMode : content.navbar.darkMode}
                    >
                        {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                    </button>
                </div>

                {/* Mobile Menu Button & Language */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-all text-xs font-semibold uppercase tracking-wider text-slate-300"
                    >
                        <span>{language}</span>
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 transition-all"
                        title={theme === 'dark' ? content.navbar.lightMode : content.navbar.darkMode}
                        aria-label={theme === 'dark' ? content.navbar.lightMode : content.navbar.darkMode}
                    >
                        {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                    </button>

                    <button
                        className="text-slate-300"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-950/95 backdrop-blur-lg border-b border-slate-800"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            <span
                                aria-disabled="true"
                                title={content.navbar.cvUnavailable}
                                className="flex w-fit items-center gap-2 rounded-full border border-slate-700/70 bg-slate-800/50 px-3 py-2 text-sm font-semibold text-slate-400 cursor-not-allowed"
                            >
                                <Download className="h-4 w-4" />
                                {content.navbar.cv}
                            </span>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-medium text-slate-300 hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
