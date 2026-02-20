"use client";

import dynamic from "next/dynamic";
import { ProfileCard } from "./ProfileCard";

const Map = dynamic(() => import("@/components/ui/Map"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900 animate-ping" />
});
import { TimeWidget } from "./TimeWidget";
import { TechStack } from "./TechStack";

export function Hero() {
    return (
        <section className="flex flex-col w-full gap-6">
            {/* Wrapper to allow TimeWidget to breakout of overflow-hidden */}
            <div className="relative w-full">
                <div className="w-full relative z-0">
                    {/* Map Section */}
                    <div className="relative w-full h-[200px]">
                        <div className="absolute inset-0 z-0">
                            <Map />
                        </div>

                        {/* Gradient Overlay for smooth transition */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-[#0E0E0E] to-transparent z-10" />
                    </div>

                    {/* Profile Section */}
                    <div className=" flex flex-col gap-8">
                        <ProfileCard />
                    </div>
                </div>

                {/* Time Widget - Moved outside to escape overflow-hidden */}
                <div className="absolute top-2 right-2 z-50">
                    <TimeWidget />
                </div>
            </div>
        </section>
    );
}
