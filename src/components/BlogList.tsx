"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const posts = [
    {
        title: "Building a Realtime Sudoku Game",
        date: "Feb 08, 2026",
        slug: "#",
        views: "1.2k"
    },
    {
        title: "Why I Switched from Gatsby to Next.js",
        date: "Jan 15, 2026",
        slug: "#",
        views: "850"
    },
    {
        title: "Mastering Tailwind CSS Grid",
        date: "Dec 22, 2025",
        slug: "#",
        views: "2.1k"
    }
];

export function BlogList() {
    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-4 sm:px-0">
                <h2 className="text-xl font-bold text-white">Writing</h2>
                <Link href="/blog" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                    View All <ArrowRight size={14} />
                </Link>
            </div>

            <div className="flex flex-col gap-2">
                {posts.map((post, index) => (
                    <Link
                        href={post.slug}
                        key={index}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                        <div className="flex flex-col gap-1">
                            <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                {post.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                                <span>{post.views} views</span>
                            </div>
                        </div>
                        <span className="text-zinc-500 text-sm font-mono whitespace-nowrap">
                            {post.date}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
