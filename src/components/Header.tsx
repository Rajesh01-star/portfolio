"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
    { name: "blog", href: "/blog" },
    { name: "projects", href: "/projects" },
    { name: "visitors", href: "/visitors" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 backdrop-blur-sm bg-background/50">
            <nav className="flex items-center justify-between w-full max-w-xl px-6">
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
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}
