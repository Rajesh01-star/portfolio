"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAnimeQuote } from "@/hooks/useAnimeQuote";

export default function NotFound() {
    const { anime, quoteInfo, isLoading, isError } = useAnimeQuote();

    // Fallback if the query fails entirely
    const displayQuote = isError || (!isLoading && !quoteInfo) 
        ? { quote: "Sometimes, the best place to be is nowhere.", character: "Lost Wanderer" }
        : quoteInfo;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center z-10 relative overflow-hidden">
            <Link
                href="/"
                className="absolute top-6 left-6 group flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 text-sm font-medium rounded-lg hover:bg-neutral-200 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-all duration-200"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Go Back Home
            </Link>
            
            <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 drop-shadow-sm">404</h1>
            <h2 className="text-lg font-bold mb-8 text-neutral-800 dark:text-neutral-200">Page Not Found</h2>

            {anime && (
                <div className="mb-10 w-full max-w-2xl flex flex-col items-center">
                    <div className="relative w-64 h-64 mx-auto mb-8 rounded-2xl overflow-hidden  transform rotate-2 hover:rotate-0 transition-transform duration-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={anime.gif} 
                            alt={`${anime.anime} gif`} 
                            className="object-cover w-full h-full" 
                        />
                    </div>

                    <div className="min-h-[120px] flex items-center justify-center w-full px-4">
                        {isLoading ? (
                            <div className="w-full max-w-lg space-y-3 animate-pulse">
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6 mx-auto"></div>
                                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3 mx-auto mt-4"></div>
                            </div>
                        ) : displayQuote ? (
                            <div className="flex flex-col items-center space-y-4">
                                <blockquote className="text-lg md:text-xl font-serif italic text-neutral-700 dark:text-neutral-300 leading-relaxed relative">
                                    <span className="absolute -top-4 -left-4 text-3xl text-neutral-300 dark:text-neutral-700 font-serif">"</span>
                                    {displayQuote.quote}
                                    <span className="absolute -bottom-4 -right-4 text-3xl text-neutral-300 dark:text-neutral-700 font-serif">"</span>
                                </blockquote>
                                <div className="flex flex-col items-center mt-4">
                                    <span className="text-xs font-bold text-orange-500 tracking-wider uppercase">— {displayQuote.character}</span>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{anime.anime}</span>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}
