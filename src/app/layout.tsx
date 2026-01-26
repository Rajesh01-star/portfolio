import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Duy Le",
  description: "Portfolio of Duy Le",
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
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
