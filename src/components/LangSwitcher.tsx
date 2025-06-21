"use client";

import React from "react";

const languages = [
  { code: "en", label: "🇬🇧" },
  { code: "hu", label: "🇭🇺" },
  { code: "nl", label: "🇳🇱" },
];

export default function LangSwitcher({
  locale,
  setLocale,
}: {
  locale: string;
  setLocale: (l: string) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`text-2xl px-2 py-1 rounded-full border-2 border-transparent hover:border-cyan-400 transition-all ${
            locale === lang.code
              ? "bg-cyan-400 text-black"
              : "bg-[#2C313A] text-white"
          }`}
          onClick={() => setLocale(lang.code)}
          aria-label={`Switch to ${lang.code}`}>
          {lang.label}
        </button>
      ))}
    </div>
  );
}
