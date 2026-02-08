"use client";

import { motion } from "framer-motion";

export function ProfileCard() {
    return (
        <div className="flex flex-col gap-6 relative z-10">
            {/* Halo Effect Removed - Global Background used instead */}


            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="h-16 w-16 rounded-full overflow-hidden border-2 border-white/10 shadow-lg"
                    >
                        <img
                            src="/atharv.jpeg"
                            alt="Atharv"
                            className="h-full w-full object-cover"
                        />
                    </motion.div>

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
