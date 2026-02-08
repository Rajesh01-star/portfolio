"use client";

import Map from "@/components/ui/Map";
import { ProfileCard } from "./ProfileCard";
import { TimeWidget } from "./TimeWidget";
import { TechStack } from "./TechStack";

export function Hero() {
    return (
        <section className="flex flex-col w-full gap-6">
            <div className="w-full bg-[#0E0E0E]/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative">
                {/* Map Section */}
                <div className="relative w-full h-[240px]">
                    <div className="absolute inset-0 z-0">
                        <Map />
                    </div>
                    {/* Time Widget */}
                    <div className="absolute top-4 right-4 z-20">
                        <TimeWidget />
                    </div>
                    {/* Gradient Overlay for smooth transition */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0E0E0E] to-transparent z-10" />
                </div>

                {/* Profile Section */}
                <div className="p-6 sm:p-8 flex flex-col gap-8">
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
