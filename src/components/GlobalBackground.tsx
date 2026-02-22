"use client";

import { useTheme } from "next-themes";
import StarBackground from "./StarBackground";
import { Aura } from "./ui/Aura";
import Novatrix from "./ui/novatrix-background";
import { useEffect, useState } from "react";

export function GlobalBackground() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="fixed inset-0 z-[-1] bg-white dark:bg-[#050505] transition-colors duration-300">
                <StarBackground />
                <Aura />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[-1] bg-white dark:bg-[#050505] transition-colors duration-300">
            {theme === "vibe" ? (
                <div className="absolute inset-0 opacity-80 mix-blend-screen">
                    <Novatrix />
                    {/* Add blur overlay to ensure content readability */}
                    {/* <div className="absolute inset-0 backdrop-blur-[60px] pointer-events-none" /> */}
                </div>
            ) : (
                <>
                    <StarBackground />
                    <Aura />
                </>
            )}
        </div>
    );
}
