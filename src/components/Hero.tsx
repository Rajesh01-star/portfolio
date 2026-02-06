"use client";

import Map from "@/components/ui/Map";
import { ProfileCard } from "./ProfileCard";
import { TimeWidget } from "./TimeWidget";

export function Hero() {
    return (
        <section className="flex flex-col items-center px-4 sm:px-0">
            <div className="w-full max-w-xl bg-neutral-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Map Section */}
                <div className="relative w-full h-48">
                    <div className="absolute inset-0 z-0">
                        <Map />
                    </div>
                    {/* Top Overlay Gradient for TimeWidget Readability if needed */}
                    <div className="absolute top-0 right-0 p-4 z-20">
                        <TimeWidget />
                    </div>
                </div>

                {/* Profile Section */}
                <div className="p-6 pt-8 relative">
                    <ProfileCard />
                </div>
            </div>
        </section>
    );
}
