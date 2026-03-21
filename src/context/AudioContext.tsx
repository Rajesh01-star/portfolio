'use client';

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { AgentState } from '@/components/ui/orb';

interface AudioContextType {
    isPlaying: boolean;
    togglePlay: () => void;
    agentState: AgentState;
    currentTime: number;
    duration: number;
    volume: number;
    setVolume: (volume: number) => void;
    handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formatTime: (time: number) => string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
    const [agentState, setAgentState] = useState<AgentState>("listening");
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);

    const audioRef = useRef<HTMLAudioElement>(null);
    const TRACK_URL = "/social-network.mp3";

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setAgentState("listening");
            } else {
                audioRef.current.play().catch(err => {
                    console.error("Playback failed:", err);
                });
                setAgentState("talking");
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
        <AudioContext.Provider value={{
            isPlaying,
            togglePlay,
            agentState,
            currentTime,
            duration,
            volume,
            setVolume,
            handleSeek,
            handleVolumeChange,
            formatTime
        }}>
            {children}
            <audio
                ref={audioRef}
                src={TRACK_URL}
                loop
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
}
