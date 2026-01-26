"use client";

import { useEffect, useState } from "react";

export function TimeWidget() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const chicagoTime = new Date().toLocaleTimeString("en-US", {
                timeZone: "America/Chicago",
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setTime(chicagoTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 bg-white/50 dark:bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200 dark:border-white/10 shadow-sm">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Chicago, IL</span>
            <span className="text-neutral-900 dark:text-white font-medium w-[88px] tabular-nums">
                {time || "--:--:-- --"}
            </span>
        </div>
    );
}
