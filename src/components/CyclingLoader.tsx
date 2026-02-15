"use client";

import { useEffect, useState } from "react";
import GradientText from "./ui/GradientText";

export default function CyclingLoader() {
    const [loaderIndex, setLoaderIndex] = useState<number | null>(null);

    // Fight Club Quotes
    const quotes = [
        "It's only after we've lost everything that we're free to do anything.",
        "The first rule is: You do not talk about it.",
        "This is your life and it's ending one minute at a time.",
        "You are not a beautiful and unique snowflake.",
        "We buy things we don't need with money we don't have to impress people we don't like.",
        "The things you own end up owning you.",
        "On a long enough timeline, the survival rate for everyone drops to zero.",
        "Self-improvement is masturbation. Now self-destruction is the answer.",
        "You're the same decaying organic matter as everything else.",
        "If you wake up at a different time, in a different place, could you wake up as a different person?",
    ];

    const loaders = quotes.map((quote, index) => (
        <div key={`quote-${index}`} className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
            <GradientText
                colors={["#404040", "#ffffff", "#404040", "#404040"]} // Minimal gray/white shimmer
                animationSpeed={5} // Slower for elegance
                showBorder={false}
                className="text-xs sm:text-base md:text-2xl px-4 py-2 md:px-8 md:py-4 text-center max-w-[90vw] md:max-w-6xl leading-relaxed"
            >
                {quote}
            </GradientText>
        </div>
    ));

    useEffect(() => {
        // Only access sessionStorage on the client
        if (typeof window !== "undefined") {
            const storedIndex = sessionStorage.getItem("loaderIndex");
            let nextIndex = 0;

            if (storedIndex !== null) {
                nextIndex = (parseInt(storedIndex, 10) + 1) % loaders.length;
            }

            sessionStorage.setItem("loaderIndex", nextIndex.toString());
            setLoaderIndex(nextIndex);
        }
    }, []);

    // Return null or a default primitive loader while mounting to avoid hydration mismatch
    if (loaderIndex === null) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-black text-white">
                Loading...
            </div>
        );
    }

    return loaders[loaderIndex];
}
