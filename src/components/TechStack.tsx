"use client";

import { motion } from "framer-motion";

const techStack = [
    {
        name: "Motion",
        icon: (
            <svg viewBox="0 0 180 180" fill="currentColor" className="w-12 h-12">
                <path d="M30 15L15 30V150L30 165H150L165 150V30L150 15H30ZM78.75 123.75L56.25 146.25L33.75 123.75V56.25L56.25 33.75L78.75 56.25V123.75ZM146.25 56.25L123.75 33.75L101.25 56.25V123.75L123.75 146.25L146.25 123.75V56.25Z" />
            </svg>
        ),
    },
    {
        name: "HTML 5",
        icon: (
            <svg viewBox="0 0 384 512" fill="currentColor" className="w-10 h-10">
                <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z" />
            </svg>
        ),
    },
    {
        name: "CSS",
        icon: (
            <svg viewBox="0 0 384 512" fill="currentColor" className="w-10 h-10">
                <path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 206.8l-7.8 87.8-104.5 34.8-104.5-34.8-7.1-79.5h51.3l3.6 40.2 56.8 15.4 56.9-15.4 5.9-65.5H84.4l-4.1-46.5h183.9l3.2-35.3H79.7L75.5 98.3h233l-4.4 49.8H152.8l4.1 46.5h155.3l-7.1 44.2z" />
            </svg>
        ),
    },
    {
        name: "TypeScript",
        icon: (
            <svg viewBox="0 0 400 400" fill="currentColor" className="w-12 h-12">
                <rect width="400" height="400" rx="50" fill="currentColor" />
                <path d="M150 200h40v120h30V200h40v-30h-110v30zm90 0h30v90c0 16.5 13.5 30 30 30s30-13.5 30-30v-15h-25v15c0 2.75-2.25 5-5 5s-5-2.25-5-5v-90h30v-30h-85v30z" fill="#000" />
            </svg>
        ),
    },
    {
        name: "Next.js",
        icon: (
            <svg viewBox="0 0 180 180" fill="currentColor" className="w-12 h-12">
                <mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                    <circle cx="90" cy="90" r="90" fill="white" />
                </mask>
                <g mask="url(#a)">
                    <circle cx="90" cy="90" r="90" fill="black" />
                    <path d="M149.508 157.52L69.142 54H54v72h12.114V69.384l73.885 85.096A90.304 90.304 0 0 0 149.508 157.52z" fill="url(#b)" />
                    <rect x="115" y="54" width="12" height="72" fill="url(#c)" />
                </g>
                <defs>
                    <linearGradient id="b" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="c" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        name: "Tailwind CSS",
        icon: (
            <svg viewBox="0 0 248 152" fill="currentColor" className="w-12 h-12">
                <path fillRule="evenodd" clipRule="evenodd" d="M61.5 38C42.5 38 32 48.5 32 69c0 30.5 27.5 30.5 27.5 30.5S87 99.5 87 69c0-20.5-10.5-31-25.5-31zm0 46.5c-8.5 0-15.5-7-15.5-15.5s7-15.5 15.5-15.5 15.5 7 15.5 15.5-7 15.5-15.5 15.5zM124 0c-19 0-29.5 10.5-29.5 31 0 30.5 27.5 30.5 27.5 30.5S149.5 61.5 149.5 31C149.5 10.5 139 0 124 0zm0 46.5c-8.5 0-15.5-7-15.5-15.5S115.5 15.5 124 15.5s15.5 7 15.5 15.5-7 15.5-15.5 15.5zM186.5 38c-19 0-29.5 10.5-29.5 31 0 30.5 27.5 30.5 27.5 30.5S212 99.5 212 69c0-20.5-10.5-31-25.5-31zm0 46.5c-8.5 0-15.5-7-15.5-15.5s7-15.5 15.5-15.5 15.5 7 15.5 15.5-7 15.5-15.5 15.5z" />
            </svg>
        ),
    },
    {
        name: "Supabase",
        icon: (
            <svg viewBox="0 0 109 113" fill="currentColor" className="w-10 h-10">
                <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" />
                <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fillOpacity="0.2" />
                <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" />
            </svg>
        ),
    },
    {
        name: "React.js",
        icon: (
            <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" className="w-12 h-12">
                <circle cx="0" cy="0" r="2.05" />
                <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
            </svg>
        ),
    },
];

export function TechStack() {
    return (
        <section className="flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {techStack.map((tech, index) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index, duration: 0.4 }}
                        className="group flex flex-col items-center justify-center gap-4 p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 hover:bg-black/60 transition-all duration-300 cursor-default"
                    >
                        <div className="text-white/90 group-hover:text-white transition-colors duration-300">
                            {tech.icon}
                        </div>
                        <span className="font-medium text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors">
                            {tech.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
