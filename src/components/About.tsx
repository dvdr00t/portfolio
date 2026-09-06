'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, GraduationCap, Award, Presentation, ArrowRight, Maximize2, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
    const { content } = useLanguage();
    const { about } = content;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const captionText = about.imageCaption || "Reply XChange 2026 - GenAI for ITSM Ticket Validation";

    const navigationBoxes = [
        {
            href: '#work',
            label: about.cta,
            icon: Briefcase,
        },
        {
            href: '#curriculum',
            label: about.ctaCurriculum,
            icon: GraduationCap,
        },
        {
            href: '#badges',
            label: about.ctaBadges,
            icon: Award,
        },
        {
            href: '#conferences',
            label: about.ctaConferences,
            icon: Presentation,
        },
    ];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsModalOpen(false);
        };
        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <section id="about" className="py-12 sm:py-16 md:py-32 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-outfit mb-6 md:mb-12 text-center">
                        {about.title}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        
                        {/* Left Column: Talk Showcase Image & Caption */}
                        <div className="lg:col-span-5 flex flex-col">
                            <figure
                                onClick={() => setIsModalOpen(true)}
                                className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-blue-500/5 cursor-pointer flex flex-col justify-between h-full"
                            >
                                <div className="relative aspect-[3/2] lg:aspect-auto lg:flex-1 w-full min-h-[260px] overflow-hidden bg-slate-950">
                                    <Image
                                        src="/reply-talk.jpg"
                                        alt={captionText}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 500px"
                                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                    {/* Hover overlay with expand icon */}
                                    <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="p-3 rounded-full bg-slate-900/85 text-white backdrop-blur-sm shadow-xl border border-slate-700/60 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <Maximize2 className="w-5 h-5" />
                                        </span>
                                    </div>
                                </div>
                                <figcaption className="p-4 sm:p-5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0 animate-pulse" />
                                        <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
                                            {captionText}
                                        </p>
                                    </div>
                                    <span className="hidden sm:inline-flex items-center text-xs text-slate-400 font-medium group-hover:text-blue-400 transition-colors shrink-0">
                                        <Maximize2 className="w-3.5 h-3.5" />
                                    </span>
                                </figcaption>
                            </figure>
                        </div>

                        {/* Right Column: Bio Card (Text & Navigation Boxes) */}
                        <div className="lg:col-span-7 bg-slate-900/50 p-6 sm:p-8 md:p-10 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm flex flex-col justify-between">
                            <div className="space-y-4 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
                                {about.description.map((paragraph, index) => (
                                    <p key={index}>
                                        {paragraph.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
                                            const match = part.match(/\[(.*?)\]\((.*?)\)/);
                                            if (match) {
                                                const [, text, url] = match;
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

                                            return part.split(/(\*\*.*?\*\*)/g).map((subPart, j) => {
                                                if (subPart.startsWith('**') && subPart.endsWith('**')) {
                                                    return <strong key={j} className="font-bold text-slate-100">{subPart.slice(2, -2)}</strong>;
                                                }

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
                            </div>

                            {/* Navigation Boxes (2x2 Grid, zero blank space) */}
                            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 pt-6 mt-6 border-t border-slate-800/60">
                                {navigationBoxes.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={idx}
                                            href={item.href}
                                            className="group relative p-3 sm:p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-blue-500/10 flex flex-col justify-between min-h-[76px] sm:min-h-[84px]"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all shrink-0">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">
                                                {item.label}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl cursor-default"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700/50"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="relative aspect-[3/2] w-full bg-slate-950">
                                <Image
                                    src="/reply-talk.jpg"
                                    alt={captionText}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
                                <p className="text-sm sm:text-base font-medium text-slate-200">
                                    {captionText}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
