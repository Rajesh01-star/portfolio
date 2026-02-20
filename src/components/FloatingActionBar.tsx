'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicPlayer } from './MusicPlayer';
import { ChatInterface } from './ChatInterface';
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { Moon, Sun, Home, BookText, Briefcase, Users, MessageCircle, X } from "lucide-react";

const navItems = [
    { name: "blog", href: "/blog", Icon: BookText },
    { name: "projects", href: "/projects", Icon: Briefcase },
    { name: "visitors", href: "/visitors", Icon: Users },
];

export const FloatingActionBar: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const dockItemVariants = {
        rest: { scale: 1, margin: "0px 0px" },
        hover: { scale: 1.4, margin: "0px 10px" }
    };

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 flex flex-col items-center justify-end pb-6 pointer-events-none">
            <div className="relative pointer-events-auto flex flex-col items-center w-full max-w-[540px] px-4 sm:px-0">
                {/* Pop-up Chat Window */}
                <AnimatePresence>
                    {isChatOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="absolute bottom-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-full sm:w-[450px] shadow-2xl origin-bottom rounded-3xl"
                        >
                            <ChatInterface onClose={() => setIsChatOpen(false)} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* The Pill Action Bar (Static Always Visible) */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="bg-white/70 dark:bg-[#1a1a1a]/70 backdrop-blur-2xl border border-black/5 dark:border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full flex items-center justify-center gap-2 sm:gap-4 shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-visible w-fit mx-auto"
                >
                    {/* Navigation Links */}
                    <motion.div
                        variants={dockItemVariants}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="origin-bottom flex items-center"
                    >
                        <Link
                            href="/"
                            className={clsx(
                                "p-3 rounded-full transition-colors flex items-center justify-center bg-white dark:bg-neutral-800 shadow-sm border border-black/5 dark:border-white/5",
                                pathname === "/" ? "text-blue-500" : "text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                            )}
                            aria-label="Home"
                        >
                            <Home size={20} />
                        </Link>
                    </motion.div>

                    {navItems.map((item) => (
                        <motion.div
                            key={item.name}
                            variants={dockItemVariants}
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="origin-bottom flex items-center"
                        >
                            <Link
                                href={item.href}
                                className={clsx(
                                    "p-3 rounded-full transition-colors flex items-center justify-center bg-white dark:bg-neutral-800 shadow-sm border border-black/5 dark:border-white/5",
                                    pathname === item.href
                                        ? "text-blue-500"
                                        : "text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                                )}
                                aria-label={item.name}
                            >
                                <item.Icon size={20} />
                            </Link>
                        </motion.div>
                    ))}

                    <div className="w-[1px] h-8 bg-black/10 dark:bg-white/10 mx-1 hidden sm:block" />

                    {/* Theme Toggle */}
                    {mounted && (
                        <motion.div
                            variants={dockItemVariants}
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="origin-bottom"
                        >
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-3 rounded-full bg-white dark:bg-neutral-800 shadow-sm border border-black/5 dark:border-white/5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors flex items-center justify-center"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                        </motion.div>
                    )}

                    <div className="w-[1px] h-8 bg-black/10 dark:bg-white/10 mx-1 hidden sm:block" />

                    {/* Music Player */}
                    <motion.div
                        variants={dockItemVariants}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="origin-bottom flex items-center justify-center shrink-0"
                    >
                        <MusicPlayer />
                    </motion.div>

                    {/* Chat Toggle */}
                    <motion.div
                        variants={dockItemVariants}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="origin-bottom"
                    >
                        <button
                            onClick={() => setIsChatOpen(!isChatOpen)}
                            className={clsx(
                                "p-3 w-[46px] h-[46px] rounded-full flex items-center justify-center transition-colors shadow-sm border border-black/5 dark:border-white/5",
                                isChatOpen
                                    ? "bg-blue-600 text-white shadow-blue-500/25 border-blue-500"
                                    : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                            )}
                            aria-label="Toggle chat"
                        >
                            {isChatOpen ? <X size={20} /> : <MessageCircle size={20} />}
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
