import clsx from "clsx";

export function Section({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <section className={clsx("flex flex-col gap-4", className)}>
            {children}
        </section>
    );
}
