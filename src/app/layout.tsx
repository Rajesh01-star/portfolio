import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GlobalBackground } from "@/components/GlobalBackground";

import { FloatingActionBar } from "@/components/FloatingActionBar";
import { TriggerProvider } from "@/context/TriggerContext";

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
          <TriggerProvider>
            {/* Global Background */}
            <GlobalBackground />

            <main className="relative mx-auto mt-2 w-full max-w-[540px] px-4 sm:px-0 z-10 pb-20">
              {children}
            </main>

            {/* Global Music Player & Chat Action Bar */}
            <FloatingActionBar />
          </TriggerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
