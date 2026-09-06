'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Briefcase, GraduationCap, Code, Globe, Award, Calendar, NotebookText, ExternalLink, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    // A single reading path is clearer than the former alternating layout. Some
    // entries contain two simultaneous roles, which now become consecutive cards.
    const timelineItems = [...curriculum.items]
        .sort((a: any, b: any) => Number(a.id) - Number(b.id))
        .flatMap((row: any) => row.items);
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

                <div className="relative max-w-5xl mx-auto">
                    {/* A single left rail keeps every experience easy to scan. */}
                    <div className="absolute left-[15px] sm:left-5 top-0 bottom-0 w-px bg-slate-800">
                        <motion.div
                            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                            className="absolute top-0 left-0 w-full h-full bg-blue-500/50"
                        />
                    </div>

                    <div className="space-y-8 md:space-y-10">
                        {timelineItems.map((item: any, index: number) => (
                            <div key={`${item.organization}-${index}`} className="relative pl-10 sm:pl-14">
                                {/* Timeline node */}
                                <div className="absolute left-[15px] sm:left-5 top-7 h-7 w-7 -translate-x-1/2 rounded-full border-2 border-blue-500 bg-slate-950 shadow-[0_0_10px_rgba(59,130,246,0.35)] flex items-center justify-center z-10">
                                    <div className="h-2 w-2 rounded-full bg-blue-400" />
                                </div>
                                <CurriculumCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CurriculumCard({ item }: { item: any }) {
    const Icon = iconMap[item.icon] || iconMap.default;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
        >
            <div className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-6 sm:p-8 rounded-2xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">

                {/* Organization Header */}
                <div className="flex items-center gap-3 text-slate-100 mb-6 font-medium text-xl border-b border-slate-800 pb-4">
                    <Icon className="w-6 h-6 text-blue-400" />
                    {item.url ? (
                        <Link
                            href={item.url}
                            target="_blank"
                            className="hover:text-blue-400 transition-colors flex items-center gap-2 group/link"
                        >
                            {item.organization}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </Link>
                    ) : (
                        item.organization
                    )}
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
                            <div className="flex flex-wrap gap-2 mb-4">
                                {role.skills && role.skills.map((skill: string, i: number) => (
                                    <span key={i} className="text-xs font-medium text-slate-300 bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-700/50 hover:border-blue-500/30 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Links & Badges */}
                            {(role.links || role.badges) && (
                                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-800/50">
                                    {/* Links */}
                                    {role.links && role.links.length > 0 && (
                                        <div className="flex flex-wrap gap-4">
                                            {role.links.map((link: any, i: number) => (
                                                <Link
                                                    key={i}
                                                    href={link.url}
                                                    target="_blank"
                                                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                                >
                                                    <LinkIcon className="w-3 h-3" />
                                                    {link.label}
                                                    <ExternalLink className="w-3 h-3 opacity-50" />
                                                </Link>
                                            ))}
                                        </div>
                                    )}

                                    {/* Badges/Awards */}
                                    {role.badges && role.badges.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {role.badges.map((badge: any, i: number) => (
                                                <Link
                                                    key={i}
                                                    href={badge.linkUrl}
                                                    target="_blank"
                                                    title={badge.name}
                                                    className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500 transition-colors group/badge bg-white"
                                                >
                                                    <Image
                                                        src={badge.imageUrl}
                                                        alt={badge.name}
                                                        fill
                                                        className="object-contain p-1"
                                                    />
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
