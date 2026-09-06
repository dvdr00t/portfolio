'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
    const { content } = useLanguage();
    const { contact } = content;

    const cards = contact.cards || [
        {
            type: 'email',
            label: 'Email',
            value: contact.email,
            url: `mailto:${contact.email}`,
        },
        {
            type: 'linkedin',
            label: 'LinkedIn',
            value: 'linkedin.com/in/davidearcolini',
            url: 'https://www.linkedin.com/in/davidearcolini/',
        },
        {
            type: 'github',
            label: 'GitHub',
            value: 'github.com/dvdr00t',
            url: 'https://github.com/dvdr00t',
        },
        {
            type: 'location',
            label: 'Location',
            value: 'Turin, Italy',
            url: null,
        },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'email':
                return Mail;
            case 'linkedin':
                return Linkedin;
            case 'github':
                return Github;
            case 'location':
                return MapPin;
            default:
                return Mail;
        }
    };

    return (
        <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-outfit mb-4 text-white">
                        {contact.title}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-12 sm:mb-16 leading-relaxed">
                        {contact.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {cards.map((card, index) => {
                            const Icon = getIcon(card.type);
                            const isClickable = Boolean(card.url);
                            const Component = isClickable ? 'a' : 'div';
                            const linkProps = isClickable
                                ? {
                                      href: card.url!,
                                      target: card.type === 'email' ? undefined : '_blank',
                                      rel: card.type === 'email' ? undefined : 'noopener noreferrer',
                                  }
                                : {};

                            return (
                                <motion.div
                                    key={card.type || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Component
                                        {...linkProps}
                                        className={`group relative h-full p-5 sm:p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 shadow-lg backdrop-blur-sm flex items-center gap-4 ${
                                            isClickable ? 'cursor-pointer hover:shadow-blue-500/5' : ''
                                        }`}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col text-left min-w-0">
                                            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">
                                                {card.label}
                                            </span>
                                            <span className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                                                {card.value}
                                            </span>
                                        </div>
                                    </Component>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
