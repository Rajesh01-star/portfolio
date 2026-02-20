'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/hooks/useChat';

export const ChatInterface: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { messages, input, setInput, isTyping, scrollRef, sendMessage } = useChat();

    return (
        <div className="w-full flex flex-col h-[500px] max-h-[calc(100vh-8rem)] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10">
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-300">
                        ATHARV  <span className="text-xs text-zinc-500">// UNFILTERED</span>
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <i className="fa-solid fa-microchip text-zinc-400 dark:text-zinc-600"></i>
                    <button onClick={onClose} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors ml-2 hidden sm:block">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/50 rounded-tl-none'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-zinc-100 dark:bg-zinc-800/50 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 flex gap-1">
                            <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce"></span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
                <div className="relative flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isTyping}
                        className="absolute right-2 p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50 transition-colors"
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
