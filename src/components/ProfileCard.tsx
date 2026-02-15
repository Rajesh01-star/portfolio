"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTrigger } from "@/context/TriggerContext";

export function ProfileCard() {
    const { setTriggered } = useTrigger();
    const [isHovering, setIsHovering] = useState(false);
    return (
        <div className="flex flex-col gap-6 relative z-10">
            {/* Halo Effect Removed - Global Background used instead */}


            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 px-1">
                    <div
                        className="relative group cursor-pointer"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="h-16 w-16 rounded-full overflow-hidden shadow-lg relative z-20"
                        >
                            <img
                                src="/atharv.jpeg"
                                alt="Atharv"
                                className="h-full w-full object-cover transition-all duration-300 group-hover:saturate-[0.7]"
                            />
                        </motion.div>

                        {/* Progress Ring */}
                        <svg
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[76px] h-[76px] -rotate-90 z-10 pointer-events-none"
                            viewBox="0 0 76 76"
                        >
                            {/* Background Ring - Subtle Muted */}
                            <motion.circle
                                cx="38"
                                cy="38"
                                r="34"
                                fill="none"
                                stroke="currentColor"
                                className="text-neutral-200 dark:text-neutral-800"
                                strokeWidth="3"
                                animate={{ opacity: isHovering ? 0.5 : 0 }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Animated Progress Ring - Vibrant Green */}
                            <motion.circle
                                cx="38"
                                cy="38"
                                r="34"
                                fill="none"
                                stroke="currentColor"
                                className="text-green-500"
                                strokeWidth="3"
                                strokeDasharray="213.6" // 2 * PI * 34
                                strokeDashoffset="213.6"
                                strokeLinecap="round"
                                animate={{
                                    strokeDashoffset: isHovering ? 0 : 213.6,
                                    opacity: isHovering ? 1 : 0
                                }}
                                transition={{
                                    strokeDashoffset: { duration: isHovering ? 0.8 : 0, ease: "easeInOut" },
                                    opacity: { duration: 0.3 }
                                }}
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col">
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2"
                        >
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                Hey, I&apos;m Atharv 👋
                            </h1>
                        </motion.div>
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-2 mt-1"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-zinc-500 dark:text-zinc-500 text-xs font-medium">Available for work</span>
                        </motion.div>
                    </div>
                </div>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl"
                >
                    I&apos;m a <span className="text-neutral-900 dark:text-white font-medium">frontend engineer</span> passionate about building accessible and performant web applications.
                    Currently, I&apos;m focused on <span className="text-neutral-900 dark:text-white font-medium">React</span>, <span className="text-neutral-900 dark:text-white font-medium">Next.js</span>, and <span className="text-neutral-900 dark:text-white font-medium">TypeScript</span>.
                </motion.p>
            </div>
        </div>
    );
}
