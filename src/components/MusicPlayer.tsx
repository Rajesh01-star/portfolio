'use client';

import { motion } from 'framer-motion';
import { Orb } from '@/components/ui/orb';
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export const MusicPlayer = ({ className }: { className?: string }) => {
    const { isPlaying, togglePlay, agentState } = useAudio();

    return (
        <div className={cn("relative group w-full h-full rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-purple-500/20", className)}>
            {/* Orb container */}
            <div className="absolute inset-0 flex justify-center items-center z-10">
                <div className="relative w-full h-full">
                    <div className="w-full h-full rounded-full overflow-hidden">
                        <Orb
                            agentState={agentState}
                            colors={["#A0B9D1", "#CADCFC"]}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Play/Pause Button Overlay */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                }}
                className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out bg-black/40 rounded-full"
            >
                <div className="p-1 bg-white rounded-full text-black shadow-lg transform transition-transform duration-500 group-hover:scale-110">
                    {isPlaying ? (
                        <Pause className="w-2.5 h-2.5 fill-current" />
                    ) : (
                        <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    )}
                </div>
            </button>
        </div>
    );
};
