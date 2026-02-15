'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GradualBlur } from './GradualBlur';
import { ScrollableBlurSection } from './ScrollableBlurSection';

export const MusicShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the blur background
    // As we scroll down, the background moves slightly to create depth
    const yBackground = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    // Transform for the music player to slide/fade in
    const yPlayer = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
    const opacityPlayer = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

    return (
        <section ref={containerRef} className="relative min-h-[120vh] overflow-hidden py-20 flex items-center justify-center">

            {/* Background with Parallax and Gradual Blur */}
            <motion.div
                style={{ y: yBackground }}
                className="absolute inset-x-0 bottom-0 h-[80vh] w-full z-0"
            >
                {/* Using the new GradualBlur API 
             target="parent" means it positions itself absolutely within this container.
             position="bottom" means it fades from bottom (opaque) to top (transparent).
         */}
                <GradualBlur
                    target="parent"
                    position="bottom"
                    height="100%" // Cover the whole background div
                    strength={2}
                    divCount={5}
                    curve="bezier"
                    exponential
                    opacity={1}
                    className="w-full"
                />
            </motion.div>

        </section>
    );
};
