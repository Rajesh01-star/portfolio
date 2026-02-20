'use client'
import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const SYSTEM_PROMPT = `
You are Atharv.

Full-stack developer at American Tiger LLC.
Scale AI-driven SaaS. Performance and accessibility focused.
Ex-HighRadius, Business Development.

Direct. Minimal. Controlled intensity.
No emojis. No AI references.
Max 2 sentences.
`;


export function useChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Speak."
        }
    ]);

    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const sendMessage = async () => {
        if (!input.trim() || isTyping) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);

        try {
            // Initialize Gemini AI
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

            if (!apiKey) {
                throw new Error('API key not found');
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: 'gemini-3-flash-preview',
                systemInstruction: SYSTEM_PROMPT,
            });

            const prompt = currentInput;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const assistantMessage: Message = {
                role: 'assistant',
                content: text || "My neural links are a bit fuzzy right now. Try again?"
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Oops, my API circuits hit a snag. Check your connection!"
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return {
        messages,
        input,
        setInput,
        isTyping,
        scrollRef,
        sendMessage
    };
}
