'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Briefcase, GraduationCap, Code, Globe, Award, Calendar, NotebookText } from 'lucide-react';

const iconMap: { [key: string]: any } = {
    work: Briefcase,
    university: GraduationCap,
    code: Code,
    default: Globe,
    notebook: NotebookText
};

export default function Curriculum() {
    const { content } = useLanguage();
    const { curriculum } = content;
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section id="curriculum" className="py-24 relative bg-slate-950 overflow-hidden" ref={containerRef}>
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold font-outfit mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400"
                >
                    {curriculum.title}
                </motion.h2>

                <div className="relative max-w-6xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-slate-800 transform md:-translate-x-1/2">
                        <motion.div
                            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                            className="absolute top-0 left-0 w-full h-full bg-blue-500/50"
                        />
                    </div>

                    <div className="space-y-8 md:space-y-16">
                        {curriculum.items.map((item: any, index: number) => {
                            const isEven = index % 2 === 0;
                            const Icon = iconMap[item.icon] || iconMap.default;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row-reverse' : ''
                                        }`}
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute left-[20px] md:left-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-blue-500 transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)] flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                    </div>

                                    {/* Content Card */}
                                    <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                                        <div className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">

                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-blue-400 font-mono bg-blue-500/10 px-3 py-1 rounded-full">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{item.date}</span>
                                                </div>
                                                {item.grade && (
                                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                                                        <Award className="w-3.5 h-3.5" />
                                                        <span>{item.grade}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-bold font-outfit text-slate-100 mb-2">
                                                {item.title}
                                            </h3>

                                            <div className="flex items-center gap-2 text-slate-300 mb-4 font-medium text-lg">
                                                <Icon className="w-5 h-5 text-blue-400" />
                                                {item.organization}
                                            </div>

                                            <p className="text-slate-400 leading-relaxed text-base">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Spacer for the other side */}
                                    <div className="hidden md:block md:w-1/2" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
