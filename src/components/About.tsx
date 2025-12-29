'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
    const { content } = useLanguage();
    const { about } = content;

    return (
        <section id="about" className="py-12 sm:py-16 md:py-32 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-outfit mb-6 md:mb-12 text-center">
                        {about.title}
                    </h2>

                    <div className="space-y-4 md:space-y-8 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed bg-slate-900/50 p-4 sm:p-6 md:p-12 rounded-xl md:rounded-2xl border border-slate-800">
                        {about.description.map((paragraph, index) => (
                            <p key={index}>
                                {paragraph.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
                                    const match = part.match(/\[(.*?)\]\((.*?)\)/);
                                    if (match) {
                                        const [, text, url] = match;
                                        // Handle bold text inside links: remove ** wrap if present
                                        const cleanText = text.replace(/\*\*/g, '');
                                        const isBold = text.includes('**');

                                        return (
                                            <Link
                                                key={i}
                                                href={url}
                                                target="_blank"
                                                className={`text-blue-400 hover:text-blue-300 transition-colors ${isBold ? 'font-bold' : ''}`}
                                            >
                                                {cleanText}
                                            </Link>
                                        );
                                    }

                                    // Handle standalone bold text
                                    return part.split(/(\*\*.*?\*\*)/g).map((subPart, j) => {
                                        if (subPart.startsWith('**') && subPart.endsWith('**')) {
                                            return <strong key={j} className="font-bold text-slate-100">{subPart.slice(2, -2)}</strong>;
                                        }

                                        // Handle code blocks (backticks)
                                        return subPart.split(/(`.*?`)/g).map((codePart, k) => {
                                            if (codePart.startsWith('`') && codePart.endsWith('`')) {
                                                return (
                                                    <code key={k} className="font-mono text-blue-400 bg-slate-800/50 px-1.5 py-0.5 rounded text-sm border border-slate-700/50">
                                                        {codePart.slice(1, -1)}
                                                    </code>
                                                );
                                            }
                                            return codePart;
                                        });
                                    });
                                })}
                            </p>
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
