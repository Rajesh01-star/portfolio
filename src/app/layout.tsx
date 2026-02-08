import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import StarBackground from "@/components/StarBackground";

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
          <div className="fixed inset-0 z-[-1] bg-[#050505]">
            {/* Subtle star background */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light"></div>
            {/* Green Gradient Glow - Top Left-to-Right Spread */}
            <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
          </div>

          <main className="relative mx-auto mt-6 w-full max-w-[540px] px-4 sm:px-0 z-10 pb-20">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
