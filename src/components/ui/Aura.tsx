import React from "react";
import clsx from "clsx";

interface AuraProps {
    className?: string;
    children?: React.ReactNode;
}

export function Aura({ className, children }: AuraProps) {
    return (
        <div className={clsx("aura-container pointer-events-none", className)}>
            <div className="aura-content">
                <div className="aura-wrapper aura">
                    <div className="aura-rays-wrapper aura-rays">
                        <div className="aura-rainbow-element aura-rainbow"></div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}
