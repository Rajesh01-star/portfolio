'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicPlayer } from './MusicPlayer';
import { ChatInterface } from './ChatInterface';
import { FloatingDock } from '@/components/ui/floating-dock';
import { useTheme } from "next-themes";
import { Moon, Sun, X } from "lucide-react";
import { HomeIcon } from "@/components/ui/home";
import { FeatherIcon } from "@/components/ui/feather";
import { SnowflakeIcon } from "@/components/ui/snowflake";
import { SparklesIcon } from './ui/sparkles';
import { BoxIcon } from './ui/box';

const navItems = [
    { name: "blog", href: "/blog", Icon: FeatherIcon },
    { name: "projects", href: "/projects", Icon: BoxIcon },
    { name: "visitors", href: "/visitors", Icon: SnowflakeIcon },
];

export const FloatingActionBar: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const items = [
        {
            title: "Home",
            icon: <HomeIcon size={18} />,
            href: "/"
        },
        ...navItems.map(item => ({
            title: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            icon: <item.Icon size={18} />,
            href: item.href
        })),
        {
            title: "Theme",
            icon: mounted ? (theme === "dark" ? <Moon size={18} /> : <Sun size={18} />) : <Sun size={18} />,
            onClick: () => setTheme(theme === "dark" ? "light" : "dark")
        },
        {
            title: "Chat",
            icon: isChatOpen ? <X size={18} /> : <SparklesIcon size={18} />,
            onClick: () => setIsChatOpen(!isChatOpen)
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 flex flex-col items-center justify-end pb-6 pointer-events-none">
            <div className="relative pointer-events-auto flex flex-col items-center w-full sm:w-[540px]">
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

                {mounted && <FloatingDock items={items} />}
            </div>

            {/* Music Player Fixed at Bottom Right */}
            <div className="absolute right-4 bottom-0 sm:right-0 pointer-events-auto h-12 w-12 flex items-center justify-center">
                <MusicPlayer className="w-9 h-9" />
            </div>
        </div>
    );
};
