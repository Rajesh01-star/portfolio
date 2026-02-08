"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Eraser } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InteractiveShowcase() {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white px-4 sm:px-0">UI</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <TypingWidget />
                <DrawingWidget />
                <StatusWidget />
            </div>
        </section>
    );
}

function TypingWidget() {
    const text = "The quick brown fox jumps over the lazy dog";
    const [input, setInput] = useState("");
    const [wpm, setWpm] = useState(0);
    const startTimeRef = useRef<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (!startTimeRef.current) startTimeRef.current = Date.now();
        setInput(val);

        const words = val.trim().split(/\s+/).length;
        const minutes = (Date.now() - startTimeRef.current) / 60000;
        setWpm(Math.round(words / minutes) || 0);
    };

    return (
        <div className="bg-[#0E0E0E]/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-[200px] relative overflow-hidden group">
            <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                    <span className="text-zinc-500 text-xs font-mono uppercase">Typing Speed</span>
                    <span className="text-4xl font-bold text-white mt-2">{wpm}<span className="text-sm font-normal text-zinc-500 ml-1">WPM</span></span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
            </div>

            <div className="z-10 mt-auto">
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="Type here..."
                    className="w-full bg-transparent border-b border-white/10 text-white focus:outline-none focus:border-white/30 py-2 text-sm font-mono placeholder:text-zinc-700"
                />
            </div>
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -z-0 translate-x-10 -translate-y-10 group-hover:bg-blue-500/10 transition-colors" />
        </div>
    );
}

function DrawingWidget() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.strokeStyle = "#a1a1aa"; // Zinc 400
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
        }
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <div className="bg-[#0E0E0E]/50 border border-white/5 rounded-2xl p-4 flex flex-col h-[200px] relative group overflow-hidden">
            <div className="flex justify-between items-center mb-2 z-10">
                <span className="text-zinc-500 text-xs font-mono uppercase">Scratchpad</span>
                <button onClick={clearCanvas} className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-zinc-500 hover:text-white">
                    <Eraser size={14} />
                </button>
            </div>
            <div className="flex-1 border border-white/5 rounded-lg bg-black/20 overflow-hidden cursor-crosshair z-10">
                <canvas
                    ref={canvasRef}
                    width={250}
                    height={130}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full h-full touch-none"
                />
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -z-0 -translate-x-10 translate-y-10 group-hover:bg-purple-500/10 transition-colors" />
        </div>
    );
}

function StatusWidget() {
    return (
        <div className="bg-[#0E0E0E]/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-[200px] relative overflow-hidden group">
            <div className="flex flex-col z-10">
                <span className="text-zinc-500 text-xs font-mono uppercase">Status</span>
                <span className="text-white mt-1 font-medium">Focus Mode 🎯</span>
                <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
                    Currently building cool things and drinking coffee.
                </p>
            </div>
            <div className="absolute bottom-4 right-4 z-10">
                <div className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity grayscale group-hover:grayscale-0">
                    ☕
                </div>
            </div>

            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl -z-0 -translate-x-1/2 -translate-y-1/2 group-hover:bg-orange-500/20 transition-colors" />
        </div>
    );
}
