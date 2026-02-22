"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function DynamicFavicon() {
    const { theme, resolvedTheme } = useTheme();

    useEffect(() => {
        const currentTheme = theme === "system" ? resolvedTheme : theme;
        // Swap to the colorful gradient version when in Vibe mode!
        const faviconPath = currentTheme === "vibe" ? "/icon-vibe.png" : "/icon-bw.png";

        // Browsers aggressively cache favicons, use a cache-buster!
        const faviconUrl = `${faviconPath}?v=${Date.now()}`;

        const links = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
        if (links.length > 0) {
            links.forEach((link) => {
                link.href = faviconUrl;
            });
        } else {
            const link = document.createElement("link");
            link.rel = "icon";
            link.href = faviconUrl;
            document.head.appendChild(link);
        }
    }, [theme, resolvedTheme]);

    return null;
}
