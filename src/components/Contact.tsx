'use client';

import { motion } from 'framer-motion';
import { Mail, Github } from 'lucide-react';
import content from '@/data/content.json';

export default function Contact() {
    const { contact } = content;

    return (
        <section id="contact" className="py-24 md:py-32 relative">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 p-12 rounded-3xl"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-6">
                        {contact.title}
                    </h2>
                    <p className="text-lg text-slate-300 mb-10">
                        {contact.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-slate-200 transition-colors w-full sm:w-auto justify-center"
                        >
                            <Mail className="w-5 h-5" />
                            {contact.email}
                        </a>

                        {contact.socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-8 py-4 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-colors w-full sm:w-auto justify-center"
                            >
                                <Github className="w-5 h-5" />
                                {social.name}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
