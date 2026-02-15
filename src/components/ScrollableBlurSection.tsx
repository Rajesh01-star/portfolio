'use client';

import { GradualBlur } from './GradualBlur';

interface ScrollableBlurSectionProps {
    children: React.ReactNode;
    height?: number | string;
    className?: string;
}

export const ScrollableBlurSection = ({
    children,
    height = 500,
    className = ''
}: ScrollableBlurSectionProps) => {
    return (
        <section
            className={`relative overflow-hidden bg-neutral-900 border border-white/10 rounded-2xl ${className}`}
            style={{ height }}
        >
            <div
                className="h-full overflow-y-auto no-scrollbar scroll-smooth"
                style={{ padding: '6rem 2rem' }}
            >
                {children}
            </div>

            <GradualBlur
                target="parent"
                position="bottom"
                height="7rem"
                strength={2}
                divCount={5}
                curve="bezier"
                exponential
                opacity={1}
            />
        </section>
    );
};
