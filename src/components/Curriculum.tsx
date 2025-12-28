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
                        {curriculum.items.map((row: any, rowIndex: number) => {
                            const isParallel = row.type === 'parallel';

                            return (
                                <div key={row.id} className={`relative flex flex-col md:flex-row gap-8 ${isParallel ? 'md:items-start' : ''}`}>

                                    {/* Left Side */}
                                    <div className={`md:w-1/2 ${isParallel
                                        ? 'md:pr-12'
                                        : rowIndex % 2 === 0
                                            ? 'md:pr-12 md:text-right'
                                            : 'hidden md:block'
                                        }`}>
                                        {((isParallel && row.items[0]) || (rowIndex % 2 === 0 && row.items[0])) && (
                                            <CurriculumCard item={row.items[0]} side="left" />
                                        )}
                                    </div>

                                    {/* Timeline Node (Center) */}
                                    <div className="absolute left-[20px] md:left-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-blue-500 transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)] flex items-center justify-center mt-6">
                                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                    </div>

                                    {/* Right Side */}
                                    <div className={`md:w-1/2 pl-12 md:pl-12 ${isParallel
                                        ? ''
                                        : rowIndex % 2 !== 0
                                            ? ''
                                            : 'hidden md:block'
                                        }`}>
                                        {((isParallel && row.items[1]) || (rowIndex % 2 !== 0 && row.items[0])) && (
                                            <CurriculumCard item={isParallel ? row.items[1] : row.items[0]} side="right" />
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CurriculumCard({ item, side }: { item: any, side: "left" | "right" }) {
    const Icon = iconMap[item.icon] || iconMap.default;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
        >
            <div className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">

                {/* Organization Header */}
                <div className="flex items-center gap-3 text-slate-100 mb-6 font-medium text-xl border-b border-slate-800 pb-4">
                    <Icon className="w-6 h-6 text-blue-400" />
                    {item.organization}
                </div>

                {/* Nested Roles */}
                <div className="space-y-8 relative">
                    {/* Vertical connector for multiple roles */}
                    {item.roles.length > 1 && (
                        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-800" />
                    )}

                    {item.roles.map((role: any, index: number) => (
                        <div key={index} className="relative pl-8">
                            {/* Role Dot */}
                            <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-slate-900 border border-blue-500 z-10" />

                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h4 className="text-lg font-bold font-outfit text-slate-100">{role.title}</h4>
                                {role.grade && (
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                                        <Award className="w-3 h-3" />
                                        <span>{role.grade}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-blue-400 font-mono mb-3">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{role.date}</span>
                            </div>

                            <p className="text-slate-400 leading-relaxed text-sm mb-4 text-justify">
                                {role.description}
                            </p>

                            {/* Skills Tags */}
                            {role.skills && (
                                <div className="flex flex-wrap gap-2">
                                    {role.skills.map((skill: string, i: number) => (
                                        <span key={i} className="text-xs font-medium text-slate-300 bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-700/50 hover:border-blue-500/30 transition-colors cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
