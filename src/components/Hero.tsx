"use client";

import dynamic from "next/dynamic";
import { ProfileCard } from "./ProfileCard";

const Map = dynamic(() => import("@/components/ui/Map"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
});
import { TimeWidget } from "./TimeWidget";
import { TechStack } from "./TechStack";

export function Hero() {
    return (
        <section className="flex flex-col w-full gap-6">
            <div className="w-full bg-white/90 dark:bg-[#0E0E0E]/90 backdrop-blur-md rounded-[20px] border border-black/5 dark:border-white/5 overflow-hidden shadow-2xl relative">
                {/* Map Section */}
                <div className="relative w-full h-[200px]">
                    <div className="absolute inset-0 z-0">
                        <Map />
                    </div>
                    {/* Time Widget */}
                    <div className="absolute top-2 right-2 z-20">
                        <TimeWidget />
                    </div>
                    {/* Gradient Overlay for smooth transition */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-[#0E0E0E] to-transparent z-10" />
                </div>

                {/* Profile Section */}
                <div className=" flex flex-col gap-8">
                    <ProfileCard />

                    {/* Tech Stack integrated here */}
                    <div className="pt-2">
                        <TechStack />
                    </div>
                </div>
            </div>
        </section>
    );
}
