"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        title: "Realtime Sudoku",
        description: "Multiplayer sudoku game with real-time updates.",
        image: "/project-sudoku.jpg", // Placeholder
        link: "#",
        color: "bg-blue-500/20",
    },
    {
        title: "Portfolio v1",
        description: "My previous portfolio site built with Gatsby.",
        image: "/project-portfolio.jpg", // Placeholder
        link: "#",
        color: "bg-purple-500/20",
    },
    {
        title: "AI Chatbot",
        description: "A chatbot interface powered by OpenAI API.",
        image: "/project-ai.jpg", // Placeholder
        link: "#",
        color: "bg-green-500/20",
    },
    {
        title: "Task Master",
        description: "Productivity app for managing daily tasks.",
        image: "/project-task.jpg", // Placeholder
        link: "#",
        color: "bg-orange-500/20",
    },
];

export function Projects() {
    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-4 sm:px-0">
                <h2 className="text-xl font-bold text-white">Selected Work</h2>
                <Link href="/projects" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                    View All <ArrowUpRight size={14} />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                    <Link
                        href={project.link}
                        key={index}
                        className="group relative bg-[#0E0E0E]/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
                    >
                        {/* Image Placeholder area */}
                        <div className={`h-48 w-full ${project.color} flex items-center justify-center relative overflow-hidden`}>
                            {/* Use Next.js Image if real images exist, otherwise fallback or div */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] to-transparent opacity-60" />
                            <span className="relative z-10 font-bold text-white/20 text-4xl uppercase tracking-widest">
                                {project.title.split(" ")[0]}
                            </span>
                        </div>

                        <div className="p-5">
                            <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors flex items-center justify-between">
                                {project.title}
                                <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-blue-400" />
                            </h3>
                            <p className="text-zinc-500 text-sm mt-2 line-clamp-2">
                                {project.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
