"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-full transition-colors relative h-10 w-10 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 dark:scale-0 transition-all scale-100 rotate-0 dark:-rotate-90 absolute text-orange-500" />
      <Moon className="h-5 w-5 dark:scale-100 transition-all scale-0 rotate-90 dark:rotate-0 absolute text-white" />
    </button>
  );
}
