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
        <div className="font-mono text-xs sm:text-xs text-neutral-400 flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 shadow-sm">
            {/* <span>Kolkata, IN</span> */}
            <span className="text-white font-medium min-w-[60px] tabular-nums text-center">
                {time || "--:-- --"}
            </span>
            <span className="text-neutral-500 font-medium text-[10px]">
                IST
            </span>
        </div>
    );
}
