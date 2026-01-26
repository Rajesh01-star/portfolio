"use client";

import { motion } from "framer-motion";

export function ProfileCard() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-24 w-24 rounded-full bg-gradient-to-tr from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 p-1 shadow-2xl shadow-blue-900/20 border-2 border-white/10"
                >
                    {/* Placeholder for avatar */}
                    <div className="h-full w-full rounded-full bg-neutral-300 dark:bg-neutral-800" />
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="hidden sm:block"
                >
                    <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Available for work
                    </div>
                </motion.div>
            </div>

            <div className="space-y-4">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl sm:text-5xl font-bold tracking-tight"
                >
                    Hey, I&apos;m Duy <br />
                    <span className="text-neutral-500 dark:text-neutral-500 text-2xl sm:text-3xl font-normal">(doo·ee) 👋</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg"
                >
                    I&apos;m a <span className="text-black dark:text-white font-semibold">frontend engineer</span> passionate about building accessible and performant web applications.
                    Currently, I&apos;m focused on <span className="text-black dark:text-white font-semibold">React</span>, <span className="text-black dark:text-white font-semibold">Next.js</span>, and <span className="text-black dark:text-white font-semibold">TypeScript</span>.
                </motion.p>
            </div>
        </div>
    );
}
