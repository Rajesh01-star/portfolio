"use client";

import Map from "@/components/ui/Map";
import { ProfileCard } from "./ProfileCard";
import { TimeWidget } from "./TimeWidget";

export function Hero() {
    return (
        <section className="flex flex-col items-center pt-32 pb-10">
            <div className="w-full flex flex-col gap-8">
                {/* Map Card */}
                <div className="relative w-full h-[300px] rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-lg">
                    <div className="absolute inset-0 z-0">
                        <Map />
                    </div>

                    {/* Top Overlay Gradient for TimeWidget Readability if needed */}
                    <div className="absolute top-0 right-0 p-2 z-20">
                        <TimeWidget />
                    </div>


                </div>

                {/* Profile Info Below Map */}
                <div className="px-2">
                    <ProfileCard />
                </div>
            </div>
        </section>
    );
}
