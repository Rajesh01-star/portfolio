"use client";

import { useEffect, useState } from "react";

export function TimeWidget() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const kolkataTime = new Date().toLocaleTimeString("en-US", {
                timeZone: "Asia/Kolkata",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            setTime(kolkataTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 bg-white/50 dark:bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200 dark:border-white/10 shadow-sm">
            <span>Kolkata, IN</span>
            <span className="text-neutral-900 dark:text-white font-medium w-[68px] tabular-nums">
                {time || "--:-- --"}
            </span>
        </div>
    );
}
