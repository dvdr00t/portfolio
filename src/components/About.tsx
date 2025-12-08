'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
    const { content } = useLanguage();
    const { about } = content;

    return (
        <section id="about" className="py-24 md:py-32 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-12 text-center">
                        {about.title}
                    </h2>

                    <div className="space-y-8 text-lg text-slate-300 leading-relaxed bg-slate-900/50 p-8 md:p-12 rounded-2xl border border-slate-800">
                        {about.description.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}

                        <div className="pt-4">
                            <Link
                                href="#work"
                                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                            >
                                {about.cta}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
