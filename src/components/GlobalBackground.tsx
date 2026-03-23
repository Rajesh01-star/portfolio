"use client";

import { useTheme } from "next-themes";
import StarBackground from "./StarBackground";
import { Aura } from "./ui/Aura";
import AuroraBackground from "./ui/aurora-background";
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
                    <AuroraBackground 
                        colorStops={["#5227FF", "#7cff67", "#5227FF"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={0.5}
                    />
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
