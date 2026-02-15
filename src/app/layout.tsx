import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import StarBackground from "@/components/StarBackground";
import { Aura } from "@/components/ui/Aura";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atharv",
  description: "Portfolio of Atharv",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          inter.variable,
          jetbrainsMono.variable,
          "antialiased bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300"
        )}
      >
        <ThemeProvider
          disableTransitionOnChange
        >
          {/* Global Background */}
          <div className="fixed inset-0 z-[-1] bg-white dark:bg-[#050505] transition-colors duration-300">
            {/* Subtle star background - Increased opacity and blended */}
            {/* <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-soft-light z-0 pointer-events-none"></div> */}
            <StarBackground />
            {/* Aura Effect */}
            <Aura />
          </div>

          <main className="relative mx-auto mt-2 w-full max-w-[540px] px-4 sm:px-0 z-10 pb-20">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
