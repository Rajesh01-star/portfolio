"use client";

import Map from "@/components/ui/Map";
import { ProfileCard } from "./ProfileCard";
import { TimeWidget } from "./TimeWidget";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="flex flex-col gap-6 pt-32 pb-10">
            {/* Map Container */}
            <div className="relative h-[450px] sm:h-[550px] w-full rounded-[2.5rem] overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 group shadow-2xl dark:shadow-none">
                {/* Map Layer */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full opacity-60 dark:opacity-50 group-hover:opacity-80 dark:group-hover:opacity-70 transition-opacity duration-1000 grayscale dark:grayscale-0 contrast-125">
                        <Map />
                    </div>
                </div>

                {/* Gradient Overlays for readability */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/90 dark:from-black/90 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white/90 dark:from-black/90 via-white/40 dark:via-black/40 to-transparent z-10 pointer-events-none" />

                {/* Content Layer */}
                <div className="absolute inset-0 z-20 p-8 sm:p-12 flex flex-col justify-between">
                    <div className="flex justify-end">
                        <TimeWidget />
                    </div>

                    <ProfileCard />
                </div>
            </div>
        </section>
    );
}
