"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GridSection, LangSwitcher, LoadingScreen } from "../components";
import { translations } from "../data/translations";
import { useLocale } from "../lib/i18n";
import { useSearchParams } from "next/navigation";

type Locale = keyof typeof translations;

// Easter egg message in console
const consoleStyles = [
  "color: #00ffff",
  "background-color: #161A20",
  "font-size: 20px",
  "padding: 10px",
  "border-radius: 5px",
  "border: 2px solid #fd19fc",
].join(";");

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [locale, setLocale] = useLocale();
  const t = translations[locale as Locale];
  const searchParams = useSearchParams();
  const fromPage = searchParams.get("from");

  // Console easter egg
  useEffect(() => {
    console.log(
      "%c👋 Hey there, explorer! Welcome to my portfolio!",
      consoleStyles
    );
  }, []);

  useEffect(() => {
    // Only show loading when first loading the site, not when returning from sections
    const timer = setTimeout(
      () => {
        setIsLoading(false);
      },
      fromPage ? 0 : 1800
    );

    return () => clearTimeout(timer);
  }, [fromPage]);

  return (
    <>
      {isLoading && !fromPage && (
        <LoadingScreen
          isLoading={isLoading}
          showWelcome={true}
        />
      )}

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            className="min-h-screen text-white relative"
            initial={{ opacity: 0, x: fromPage ? -100 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}>
            <LangSwitcher
              locale={locale}
              setLocale={setLocale}
            />
            <GridSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
