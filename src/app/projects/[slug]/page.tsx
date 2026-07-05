import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Globe, Laptop } from "lucide-react";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6 mt-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 px-1 text-xs text-zinc-500 font-mono">
        <Link href="/projects" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={12} /> Projects
        </Link>
        <span>/</span>
        <span className="text-zinc-800 dark:text-zinc-300 font-medium truncate max-w-[200px]">{project.title}</span>
      </div>

      {/* Main Container */}
      <div className="bg-white/90 dark:bg-[#0E0E0E]/90 vibe:bg-black/60 backdrop-blur-md vibe:backdrop-blur-3xl rounded-[20px] border border-black/5 dark:border-white/5 vibe:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Laptop size={12} className="text-blue-500 dark:text-blue-400" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-blue-500 dark:text-blue-400 font-bold">
              {project.platform || "Web Project"}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {project.title}
          </h1>
        </div>

        {/* Hero Screenshot */}
        <div className={`relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 ${project.color || 'bg-zinc-800/10'}`}>
          <Image
            src={project.image}
            alt={`${project.title} main mockup`}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-w-768px) 100vw, 540px"
          />
        </div>

        {/* Direct Site Link Button */}
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black text-xs font-bold rounded-xl transition-colors shadow-sm"
        >
          <Globe size={14} />
          Visit Website
          <ArrowUpRight size={14} />
        </Link>

        {/* Overview Section */}
        <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/5">
          <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-400 font-mono">Overview</h3>
          {project.longDescription && project.longDescription.length > 0 ? (
            <div className="space-y-4">
              {project.longDescription.map((paragraph, index) => (
                <p key={index} className="text-neutral-700 dark:text-zinc-300 text-sm leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-neutral-700 dark:text-zinc-300 text-sm leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {/* Key Highlights */}
        {project.keyContributions && project.keyContributions.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/5">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-400 font-mono">Key Highlights</h3>
            <ul className="space-y-3">
              {project.keyContributions.map((contribution, index) => (
                <li key={index} className="flex items-center gap-3 text-neutral-700 dark:text-zinc-300 text-sm leading-relaxed">
                  <span className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </span>
                  <span>{contribution}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {project.stack && (
          <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/5">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-400 font-mono">Technologies</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-mono bg-neutral-200/40 dark:bg-white/5 text-neutral-600 dark:text-zinc-400 rounded border border-neutral-300/20 dark:border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Screenshot Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-400 font-mono">Gallery</h3>
            <div className="grid grid-cols-1 gap-4">
              {project.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-black/5 dark:border-white/5 bg-zinc-800/10 group">
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    fill
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    sizes="(max-w-768px) 100vw, 540px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
