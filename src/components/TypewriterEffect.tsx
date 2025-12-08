'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function TypewriterEffect({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) => words[index].slice(0, latest));
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        const textLength = words[index].length;

        const controls = animate(count, textLength, {
            type: 'tween',
            duration: 1.5, // Increased speed (was 2s)
            ease: 'easeInOut',
            onComplete: () => {
                setTimeout(() => {
                    // Backspacing animation
                    animate(count, 0, {
                        type: 'tween',
                        duration: 1.2,
                        ease: 'easeInOut',
                        onComplete: () => {
                            setIndex((prev) => (prev + 1) % words.length);
                        },
                    });
                }, 1500); // Pause before deleting (was 2s)
            },
        });

        return controls.stop;
    }, [index, words, count]);

    // Blinking cursor effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="font-mono text-emerald-400">
            <span>&gt; </span>
            <motion.span>{displayText}</motion.span>
            <span style={{ opacity: cursorVisible ? 1 : 0 }}>_</span>
        </span>
    );
}
