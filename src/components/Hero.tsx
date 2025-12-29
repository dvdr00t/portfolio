'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import TypewriterEffect from './TypewriterEffect';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
    const { content } = useLanguage();
    const { hero } = content;

    return (
        <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="text-center md:text-left order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6 tracking-tight">
                            <span className="text-gradient drop-shadow-lg">
                                {hero.title.replace("Hi, I’m ", "Hi, I'm\n")}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto md:mx-0 mb-6 leading-relaxed"
                    >
                        {hero.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mb-10 h-8 flex justify-center md:justify-start"
                    >
                        <TypewriterEffect words={hero.dynamicText} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link
                            href="#about"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-full font-semibold hover:bg-slate-200 transition-colors duration-300 group"
                        >
                            {hero.cta}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Profile Picture */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-1 md:order-2 flex justify-center md:justify-end"
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                        {/* Decorative Circle */}
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />

                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl"
                        >
                            <Image
                                src="/profile.png"
                                alt="Profile Picture"
                                fill
                                className="object-cover hover:scale-110 transition-transform duration-700"
                                priority
                            />
                        </motion.div>

                        {/* Floating Badge/Element (Optional - e.g. a code icon or small decoration) */}
                        <motion.div
                            animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -right-4 w-16 h-16 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center shadow-xl"
                        >
                            <span className="text-3xl">🚀</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
