"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GridSection, SplashScreen } from "../components";
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

// Search params component that needs to be wrapped in suspense
function SearchParamsHandler({
  onFromPageChange,
}: {
  onFromPageChange: (fromPage: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const fromPage = searchParams.get("from");

  useEffect(() => {
    onFromPageChange(fromPage);
  }, [fromPage, onFromPageChange]);

  return null;
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(false); // Kezdetben false
  const [showContent, setShowContent] = useState(false);
  const [fromPageInitialized, setFromPageInitialized] = useState(false);
  const [locale, setLocale] = useLocale();
  const [fromPage, setFromPage] = useState<string | null>(null);
  const t = translations[locale as Locale];

  // Console easter egg
  useEffect(() => {
    console.log(
      "%c👋 Hey there, explorer! Welcome to my portfolio!",
      consoleStyles
    );
  }, []);

  // Handle fromPage detection and navigation logic
  useEffect(() => {
    if (!fromPageInitialized) return;

    if (fromPage) {
      // Ha másik oldalról jövünk vissza - azonnal megjelenítjük a tartalmat
      setShowSplash(false);
      setShowContent(true);
    } else {
      // Ha első betöltés - splash screen jelenik meg
      setShowSplash(true);
      setShowContent(false);
    }
  }, [fromPage, fromPageInitialized]);

  // Handle fromPage change callback
  const handleFromPageChange = (newFromPage: string | null) => {
    setFromPage(newFromPage);
    setFromPageInitialized(true);
  };

  // Splash screen befejezése
  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowContent(true);
  };
  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler onFromPageChange={handleFromPageChange} />
      </Suspense>

      <AnimatePresence mode="wait">
        {showSplash && !fromPage && fromPageInitialized && (
          <SplashScreen
            key="splash"
            onComplete={handleSplashComplete}
          />
        )}

        {showContent && fromPageInitialized && (
          <motion.div
            key="content"
            className="w-full text-white relative"
            initial={{
              opacity: 0,
              x: fromPage ? -100 : 0, // Jobbról jön be ha visszanavigálunk
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: fromPage ? 100 : -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}>
            <GridSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
