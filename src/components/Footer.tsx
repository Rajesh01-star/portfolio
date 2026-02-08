"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full py-8 text-center text-sm text-zinc-600 border-t border-white/5 mt-12">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-6">
                    <Link href="https://github.com" target="_blank" className="hover:text-white transition-colors">
                        GitHub
                    </Link>
                    <Link href="https://twitter.com" target="_blank" className="hover:text-white transition-colors">
                        Twitter
                    </Link>
                    <Link href="mailto:contact@atharv.dev" className="hover:text-white transition-colors">
                        Contact
                    </Link>
                </div>
                <p>
                    &copy; {new Date().getFullYear()} Atharv. All rights reserved.
                </p>
                <p className="text-xs text-zinc-700">
                    Last updated: Feb 08, 2026
                </p>
            </div>
        </footer>
    );
}
