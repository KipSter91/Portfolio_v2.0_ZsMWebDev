"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translations } from "../data/translations";

export type Locale = keyof typeof translations;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)[Locale];
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // Initialize locale from localStorage or browser language
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    if (stored && ["en", "hu", "nl", "de"].includes(stored)) {
      setLocaleState(stored as Locale);
    } else if (typeof navigator !== "undefined") {
      const lang = navigator.language.slice(0, 2);
      if (["en", "hu", "nl", "de"].includes(lang)) {
        setLocaleState(lang as Locale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
    }
  };

  const value: LocaleContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export const useLocaleContext = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocaleContext must be used within a LocaleProvider");
  }
  return context;
};
