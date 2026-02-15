"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TriggerContextType {
    isTriggered: boolean;
    setTriggered: (value: boolean) => void;
}

const TriggerContext = createContext<TriggerContextType | undefined>(undefined);

export function TriggerProvider({ children }: { children: ReactNode }) {
    const [isTriggered, setIsTriggered] = useState(false);

    const setTriggered = (value: boolean) => {
        setIsTriggered(value);
        if (value) {
            // Auto reset after 2 seconds
            setTimeout(() => setIsTriggered(false), 2000);
        }
    };

    return (
        <TriggerContext.Provider value={{ isTriggered, setTriggered }}>
            {children}
        </TriggerContext.Provider>
    );
}

export function useTrigger() {
    const context = useContext(TriggerContext);
    if (context === undefined) {
        throw new Error("useTrigger must be used within a TriggerProvider");
    }
    return context;
}
