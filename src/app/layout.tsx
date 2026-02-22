import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DynamicFavicon } from "@/components/DynamicFavicon";
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
  title: "Atharv | Frontend Engineer",
  description: "Portfolio of Atharv, a frontend engineer passionate about building accessible and performant web applications with React, Next.js, and TypeScript.",
  keywords: ["Atharv", "Frontend Engineer", "React", "Next.js", "TypeScript", "Web Development", "Portfolio"],
  authors: [{ name: "Atharv" }],
  creator: "Atharv",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atharv.dev", // Update with actual URL
    title: "Atharv | Frontend Engineer",
    description: "Portfolio of Atharv, a frontend engineer passionate about building accessible and performant web applications.",
    siteName: "Atharv Portfolio",
    images: [
      {
        url: "/atharv.jpeg", // Fallback to profile picture if no OG image
        width: 800,
        height: 800,
        alt: "Atharv - Frontend Engineer",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharv | Frontend Engineer",
    description: "Portfolio of Atharv, a frontend engineer passionate about building accessible and performant web applications.",
    images: ["/atharv.jpeg"],
  },
  icons: {
    icon: "/icon-bw.png",
    shortcut: "/icon-bw.png",
    apple: "/icon-bw.png",
  }
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
          <DynamicFavicon />
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
