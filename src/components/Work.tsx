'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import content from '@/data/content.json';

export default function Work() {
    const { work } = content;

    return (
        <section id="work" className="py-24 relative bg-slate-900/20">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold font-outfit mb-16 text-center"
                >
                    {work.title}
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {work.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-colors group cursor-default"
                        >
                            <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                                <ExternalLink className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-outfit text-slate-100">{project.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {project.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold transition-all duration-300"
                    >
                        {work.cta}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
