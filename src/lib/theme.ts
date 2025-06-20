"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored) setTheme(stored);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      setTheme("dark");
    else setTheme("light");
  }, []);

  useEffect(() => {
    // Always set both html and body background for safety
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
