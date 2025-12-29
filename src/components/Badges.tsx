'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Badges() {
    const { content } = useLanguage();
    // Assuming 'badges' section exists in the content
    const badgesContent = content.badges;

    if (!badgesContent) return null;

    return (
        <section id="badges" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute right-0 top-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
                        {badgesContent.title}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {badgesContent.items.map((badge: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {badge.linkUrl ? (
                                <Link
                                    href={badge.linkUrl}
                                    target="_blank"
                                    className="group block h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                                >
                                    <div className="flex flex-col h-full items-center text-center">
                                        <div className="relative w-32 h-32 mb-6 bg-white rounded-xl p-2 overflow-hidden shadow-inner">
                                            <Image
                                                src={badge.imageUrl}
                                                alt={badge.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        <h3 className="text-xl font-semibold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                                            {badge.name}
                                        </h3>

                                        {badge.description && (
                                            <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3">
                                                {badge.description}
                                            </p>
                                        )}

                                        <div className="mt-auto flex items-center gap-2 text-sm text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            View Badge <ExternalLink className="w-3 h-3" />
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="group block h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 cursor-default">
                                    <div className="flex flex-col h-full items-center text-center">
                                        <div className="relative w-32 h-32 mb-6 bg-white rounded-xl p-2 overflow-hidden shadow-inner">
                                            <Image
                                                src={badge.imageUrl}
                                                alt={badge.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        <h3 className="text-xl font-semibold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                                            {badge.name}
                                        </h3>

                                        {badge.description && (
                                            <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3">
                                                {badge.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
