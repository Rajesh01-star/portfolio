"use client";

import { useEffect, useState } from "react";

export function TimeWidget() {
    const [time, setTime] = useState<string>("");
    const [diff, setDiff] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const kolkataTime = now.toLocaleTimeString("en-US", {
                timeZone: "Asia/Kolkata",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            setTime(kolkataTime);

            // Calculate time difference
            // IST is UTC+5:30
            const istOffset = 5.5 * 60; // 330 minutes
            // getTimezoneOffset() returns (UTC - Local) in minutes.
            // So Local = UTC - getTimezoneOffset()
            // We want Local - IST = (UTC - getTimezoneOffset()) - (UTC + 5.5*60)
            // = -getTimezoneOffset() - 330

            const localOffset = -now.getTimezoneOffset(); // in minutes. e.g. UTC+1 -> 60. UTC-5 -> -300.
            const diffMinutes = localOffset - istOffset;

            if (diffMinutes === 0) {
                setDiff("You're in the same timezone");
            } else {
                const ahead = diffMinutes > 0;
                const absDiff = Math.abs(diffMinutes);
                const hours = Math.floor(absDiff / 60);
                const mins = absDiff % 60;

                let diffString = ahead ? "+" : "-";
                // Formatting like "+12:00" or "+0:30"
                diffString += `${hours}:${mins.toString().padStart(2, '0')}`;

                setDiff(`You're ${diffString} hours ${ahead ? "ahead" : "behind"}`);
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative group flex items-center">
            {/* Tooltip */}
            {diff && (
                <div className="absolute z-[60] bottom-full left-1/2 -translate-x-1/2 mb-3 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                    <div className="relative bg-neutral-900/90 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                        {diff}
                        {/* Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900/90 border-b border-r border-white/10 rotate-45 transform"></div>
                    </div>
                </div>
            )}
            <div className="font-mono text-xs sm:text-xs text-neutral-400 flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 shadow-sm hover:border-white/10 transition-colors cursor-default">
                {/* <span>Kolkata, IN</span> */}
                <span className="text-[hsl(0 0% 63.9%)] min-w-[60px] tabular-nums text-center">
                    {time || "--:-- --"}
                </span>
                <span className="text-neutral-500 font-medium text-[10px]">
                    IST
                </span>
            </div>
        </div>
    );
}
