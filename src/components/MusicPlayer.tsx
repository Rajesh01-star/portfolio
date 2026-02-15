'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Orb, AgentState } from '@/components/ui/orb';
import { cn } from '@/lib/utils';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { GradualBlur } from './GradualBlur';

export const MusicPlayer = () => {
    const [agentState, setAgentState] = useState<AgentState>("listening");
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);

    const audioRef = useRef<HTMLAudioElement>(null);

    // Sample track URL (using a copyright-free placeholder or one from the example if available)
    // Using a generic reliable placeholder for now.
    const TRACK_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setAgentState("listening"); // Revert to listening/idle when paused
            } else {
                audioRef.current.play();
                setAgentState("talking"); // Animate orb when playing
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setAgentState("listening");
        setCurrentTime(0);
    };

    return (
        <div className="relative group w-12 h-12 mx-auto rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-purple-500/20">

            <audio
                ref={audioRef}
                src={TRACK_URL}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

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
                onClick={togglePlay}
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
