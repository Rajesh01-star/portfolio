import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Atharv Portfolio",
  description: "A showcase of works, small projects, and experimental builds made by Atharv.",
};

export default function ProjectsPage() {
  const works = projects.filter((p) => p.category === "work");
  const smallProjects = projects.filter((p) => p.category === "small");
  const oldWorks = projects.filter((p) => p.category === "old");

  const renderProjectGrid = (projectList: typeof projects) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {projectList.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="group flex flex-col bg-neutral-50/50 dark:bg-[#161616]/40 border border-neutral-200/30 dark:border-white/5 rounded-2xl overflow-hidden hover:bg-neutral-100/50 dark:hover:bg-[#1C1C1C]/60 hover:border-neutral-200 dark:hover:border-white/10 transition-all duration-300 h-full shadow-sm"
        >
          {/* Thumbnail Container */}
          <div className={`h-40 w-full ${project.color || 'bg-zinc-800/10'} flex items-center justify-center relative overflow-hidden`}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              sizes="(max-w-768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-[#0E0E0E]/90 via-transparent to-transparent opacity-60 dark:opacity-90" />
          </div>

          {/* Details */}
          <div className="p-5 flex flex-col flex-grow">
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors flex items-center justify-between">
              {project.title}
              <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-neutral-900 dark:text-white" />
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 line-clamp-3 leading-relaxed">
              {project.description}
            </p>

            <div className="flex-grow" />

            {project.stack && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono bg-neutral-200/40 dark:bg-white/5 text-neutral-600 dark:text-zinc-400 rounded border border-neutral-300/20 dark:border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="max-w-[540px] mx-auto px-4 sm:px-0">
      <div className="space-y-8 bg-white/90 dark:bg-[#0E0E0E]/90 vibe:bg-black/60 backdrop-blur-md vibe:backdrop-blur-3xl rounded-[20px] border border-black/5 dark:border-white/5 vibe:border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8 mt-4">
        {/* Page Header */}
        <div className="relative pb-6 border-b border-black/5 dark:border-white/5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-blue-500 dark:text-blue-400 font-bold">
                Portfolio / Projects
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1">
                Projects
              </h1>
              <p className="text-sm text-zinc-500 mt-2 max-w-sm sm:max-w-md">
                A curated collection of SaaS platforms, web applications, bot automation, and early frontend experiments.
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-2xl font-bold text-neutral-950 dark:text-neutral-200">{projects.length}</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Total Builds</span>
            </div>
          </div>
        </div>

        {/* Main Works Section */}
        {works.length > 0 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-semibold tracking-wider uppercase text-zinc-400 font-mono">Selected Works</h2>
              <div className="h-[1px] bg-black/5 dark:bg-white/5 flex-grow" />
            </div>
            {renderProjectGrid(works)}
          </section>
        )}

        {/* Small Projects Section */}
        {smallProjects.length > 0 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-semibold tracking-wider uppercase text-zinc-400 font-mono">Small Projects</h2>
              <div className="h-[1px] bg-black/5 dark:bg-white/5 flex-grow" />
            </div>
            {renderProjectGrid(smallProjects)}
          </section>
        )}

        {/* Old Works Section */}
        {oldWorks.length > 0 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-semibold tracking-wider uppercase text-zinc-400 font-mono">Old Works</h2>
              <div className="h-[1px] bg-black/5 dark:bg-white/5 flex-grow" />
            </div>
            {renderProjectGrid(oldWorks)}
          </section>
        )}

        <Footer />
      </div>
    </div>
  );
}
