"use client";

import { useEffect, useState } from "react";

export function useLocale() {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    if (stored) setLocale(stored);
    else if (typeof navigator !== "undefined") {
      const lang = navigator.language.slice(0, 2);
      if (["en", "hu", "nl"].includes(lang)) setLocale(lang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return [locale, setLocale] as const;
}
