"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const navItems = [
    { name: "blog", href: "/blog" },
    { name: "projects", href: "/projects" },
    { name: "visitors", href: "/visitors" },
];

export function Header() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="w-full flex justify-center py-5">
            <nav className="flex items-center justify-between w-full max-w-[540px] px-4 sm:px-0">
                <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity uppercase">
                    Atharv
                </Link>

                <div className="flex items-center gap-6">
                    <ul className="flex items-center gap-4 sm:gap-6">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "text-sm font-medium transition-colors hover:text-black dark:hover:text-white",
                                        pathname === item.href
                                            ? "text-black dark:text-white"
                                            : "text-neutral-500 dark:text-neutral-400"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="hover:text-black dark:hover:text-white transition-colors p-1"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}
