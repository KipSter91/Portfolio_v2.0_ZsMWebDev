import React, { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitcher({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (t: string) => void;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTimeout(() => setTheme(theme === "dark" ? "light" : "dark"), 300);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  return (
    <>
      {/* Animated theme transition overlay */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-40 pointer-events-none transition-opacity duration-1000"
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(circle at top-left, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)"
                : "radial-gradient(circle at bottom-right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%)",
            opacity: isTransitioning ? 1 : 0,
          }}
        />
      )}

      {/* Theme toggle button */}
      <button
        className="fixed top-4 left-4 z-50 bg-[#2C313A] p-2 rounded-full shadow hover:bg-[#00ffff] transition-colors"
        onClick={toggleTheme}
        aria-label="Toggle theme">
        {theme === "dark" ? (
          <SunIcon className="w-6 h-6 text-yellow-300" />
        ) : (
          <MoonIcon className="w-6 h-6 text-gray-800" />
        )}
      </button>
    </>
  );
}
