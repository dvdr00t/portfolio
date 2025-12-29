'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Play, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Conferences() {
    const { content } = useLanguage();
    const conferencesContent = content.conferences;

    if (!conferencesContent) return null;

    // Extract YouTube video ID from URL
    const getYouTubeId = (url: string) => {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
        return match ? match[1] : null;
    };

    // Get YouTube thumbnail URL
    const getYouTubeThumbnail = (videoId: string) => {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    };

    return (
        <section id="conferences" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute left-0 top-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
                        {conferencesContent.title}
                    </h2>
                    {conferencesContent.subtitle && (
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            {conferencesContent.subtitle}
                        </p>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {conferencesContent.items.map((conference: any, index: number) => {
                        const videoId = getYouTubeId(conference.url);
                        const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : '';

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                            >
                                <Link
                                    href={conference.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
                                >
                                    {/* Video Thumbnail */}
                                    <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                                        <Image
                                            src={thumbnailUrl}
                                            alt={conference.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                                            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                                                <Play className="w-7 h-7 text-white fill-white ml-1" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-slate-100 mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                                            {conference.title}
                                        </h3>

                                        {conference.description && (
                                            <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3">
                                                {conference.description}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-500 font-medium">
                                                {conference.organization}
                                            </span>
                                            <div className="flex items-center gap-2 text-sm text-purple-500 font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                Watch <ExternalLink className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
