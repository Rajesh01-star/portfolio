"use client";

import { motion } from "framer-motion";

const techStack = [
    {
        name: "Motion",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <path d="M4 0L0 4V20L4 24H20L24 20V4L20 0H4ZM10.5 16.5L7.5 19.5L4.5 16.5V7.5L7.5 4.5L10.5 7.5V16.5ZM19.5 7.5L16.5 4.5L13.5 7.5V16.5L16.5 19.5L19.5 16.5V7.5Z" fill="currentColor" />
            </svg>
        ), // Simplified representation or placeholder if actual logo is complex
        color: "group-hover:text-purple-500",
    },
    {
        name: "HTML5",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 2h19l-3 18-9 4-9-4L2.5 2z" />
                <path d="M12 19V5" />
            </svg>
        ),
        color: "group-hover:text-orange-500",
    },
    {
        name: "CSS",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 2h19l-3 18-9 4-9-4L2.5 2z" />
                <path d="M12 19V5" />
            </svg>
        ),
        color: "group-hover:text-blue-500",
    },
    {
        name: "TypeScript",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                <path d="M7 12h2" />
                <path d="M8 12v6" />
                <path d="M15 16.5A1.5 1.5 0 0 0 16.5 15c0-1-1.5-1-2.5-1s-2.5-1-2.5-2.5 1.5-2.5 2.5-2.5c1 0 1.5.5 2 1.5" />
            </svg>
        ),
        color: "group-hover:text-blue-600",
    },
    {
        name: "Next.js",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                <path d="M9 9h1v6" />
                <path d="M16 9l-4 6" />
                <path d="M16 15h-1" />
            </svg> // Simplified Next.js logo
        ),
        color: "group-hover:text-black dark:group-hover:text-white",
    },
    {
        name: "Tailwind CSS",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19c0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3 3 3-1.3 3-3z" />
                <path d="M15.5 6.5C14.1 6.5 13 5.4 13 4s1.1-2.5 2.5-2.5S18 2.6 18 4s-1.1 2.5-2.5 2.5z" />
                <path d="M6.5 12C5.1 12 4 10.9 4 9.5S5.1 7 6.5 7 9 8.1 9 9.5 7.9 12 6.5 12z" />
                <path d="M4.5 18c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5S8.4 20.5 7 20.5 4.5 19.4 4.5 18z" />
                <path d="M19.5 12c0-1.4-1.1-2.5-2.5-2.5S14.5 10.6 14.5 12 15.6 14.5 17 14.5 19.5 13.4 19.5 12z" />
            </svg> // Placeholder for Tailwind
        ),
        color: "group-hover:text-cyan-400",
    },
    {
        name: "Supabase",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 2L4 12h8l-2 10 10-10h-8z" />
            </svg>
        ),
        color: "group-hover:text-green-400",
    },
    {
        name: "React.js",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="12" cy="12" r="2" />
                <path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5-5 2.2-5 5z" transform="rotate(30 12 12)" />
                <path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5-5 2.2-5 5z" transform="rotate(90 12 12)" />
                <path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5-5 2.2-5 5z" transform="rotate(150 12 12)" />
            </svg>
        ),
        color: "group-hover:text-blue-400",
    },
];

export function TechStack() {
    return (
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
                <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="group flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 transition-colors cursor-default"
                >
                    <div className={`text-neutral-500 dark:text-neutral-400 transition-colors duration-300 ${tech.color}`}>
                        {tech.icon}
                    </div>
                    <span className="font-medium text-sm text-neutral-600 dark:text-neutral-300">
                        {tech.name}
                    </span>
                </motion.div>
            ))}
        </section>
    );
}
