"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "Visitors", href: "/visitors" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
            <nav className="flex items-center gap-2 p-1.5 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-white/10 shadow-sm">
                <div className="flex items-center gap-4 px-4">
                    <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
                        DUY LE
                    </Link>
                </div>

                <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-2" />

                <ul className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={clsx(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-white/10",
                                    pathname === item.href
                                        ? "text-black dark:text-white bg-neutral-100 dark:bg-white/10"
                                        : "text-neutral-600 dark:text-neutral-400"
                                )}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-2" />

                <div className="pr-1">
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}
