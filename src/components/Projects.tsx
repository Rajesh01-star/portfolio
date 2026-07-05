"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export function Projects() {
    // Show top 4 works on the homepage
    const featuredProjects = projects.filter(p => p.category === "work").slice(0, 4);

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-4 sm:px-0">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Selected Work</h2>
                <Link href="/projects" className="text-sm text-zinc-500 hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1">
                    View All <ArrowUpRight size={14} />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredProjects.map((project) => (
                    <Link
                        href={`/projects/${project.id}`}
                        key={project.id}
                        className="group relative bg-[#0E0E0E]/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors flex flex-col h-full"
                    >
                        {/* Image area */}
                        <div className={`h-48 w-full ${project.color || 'bg-zinc-800/20'} flex items-center justify-center relative overflow-hidden`}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                                sizes="(max-w-768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors flex items-center justify-between">
                                {project.title}
                                <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-blue-400" />
                            </h3>
                            <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                                {project.description}
                            </p>
                            <div className="flex-grow" />
                            {project.stack && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {project.stack.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 text-[10px] font-mono bg-white/5 text-zinc-300 rounded border border-white/10"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.stack.length > 3 && (
                                        <span className="text-[10px] text-zinc-500 self-center font-mono">
                                            +{project.stack.length - 3}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
