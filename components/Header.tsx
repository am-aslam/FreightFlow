"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  const applyTheme = (theme: "dark" | "light") => {
    const shouldUseDark = theme === "dark";
    document.documentElement.classList.toggle("dark", shouldUseDark);
    window.localStorage.setItem("freightflow-theme", theme);
    setIsDark(shouldUseDark);
  };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("freightflow-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    applyTheme(isCurrentlyDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/[0.88]">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0B1F3A] text-white shadow-lg shadow-[#0B1F3A]/18 dark:bg-white dark:text-[#0B1F3A]">
            <Ship className="size-5" />
          </div>
          <div>
            <p className="text-base font-bold text-[#0B1F3A] dark:text-white">FreightFlow</p>
            <p className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:block">
              Global freight estimation
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          <a className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-[#0B1F3A] dark:text-slate-300 dark:hover:text-white" href="#calculator">
            Calculator
          </a>
          <a className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-[#0B1F3A] dark:text-slate-300 dark:hover:text-white" href="#breakdown">
            Breakdown
          </a>
          <Badge tone="orange">Guangzhou → Jebel Ali</Badge>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            aria-label="Toggle dark mode"
            aria-pressed={mounted ? isDark : false}
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            type="button"
          >
            {mounted && isDark ? <Sun /> : <Moon />}
          </Button>
          <Button className="hidden sm:inline-flex" variant="accent" asChild>
            <a href="#calculator">Calculate Now</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
