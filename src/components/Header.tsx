"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleContext, type Locale } from "../contexts/LocaleContext";
import MobileMenu from "./MobileMenu";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";

const languages = [
  { code: "en" as Locale, label: "EN", name: "English" },
  { code: "hu" as Locale, label: "HU", name: "Magyar" },
  { code: "nl" as Locale, label: "NL", name: "Nederlands" },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLocaleContext();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Listen for splash screen completion
  useEffect(() => {
    const handleSplashComplete = () => {
      setSplashComplete(true);
    };

    // Check if splash is already complete (in case event was missed)
    const checkSplashComplete = () => {
      const splashElement = document.querySelector("[data-splash-screen]");
      if (!splashElement) {
        setSplashComplete(true);
      }
    };

    window.addEventListener("splashComplete", handleSplashComplete);

    // Small delay to check splash status
    setTimeout(checkSplashComplete, 100);

    return () => {
      window.removeEventListener("splashComplete", handleSplashComplete);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <header 
      className="fixed top-0 left-0 w-full bg-[color:var(--dark-gray)] bg-opacity-70 backdrop-blur-md border-b border-[color:var(--medium-gray)] h-14"
      style={{ zIndex: 999997 }}
    >
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={
            splashComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: splashComplete ? 0.3 : 0,
          }}>
          <Link
            href="/"
            className="text-[color:var(--white)] hover:text-[color:var(--neon-cyan)] transition-colors duration-300">
            <span className="text-xl font-bold">{t.portfolio}</span>
          </Link>
        </motion.div>

        {/* Desktop business links - CTA elements */}
        <motion.div
          className="flex-1 justify-center gap-6 hidden md:flex"
          initial={{ opacity: 0, y: -20 }}
          animate={
            splashComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: splashComplete ? 0.6 : 0,
          }}
        >
          <motion.div
            animate={{ 
              borderColor: [
                "rgba(0, 255, 255, 0.2)", 
                "rgba(0, 255, 255, 0.9)", 
                "rgba(0, 255, 255, 0.2)"
              ] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5, 
              ease: "easeInOut" 
            }}
            className="border-2 border-[color:var(--neon-cyan)]/40 rounded-xl"
          >
            <Link
              href="/services"
              className="flex items-center justify-center gap-2 text-white hover:text-[color:var(--neon-cyan)] font-medium px-4 py-2 rounded-xl bg-[color:var(--dark-gray)] hover:bg-[color:var(--neon-cyan)]/10 transition-all duration-300"
            >
              <MdMiscellaneousServices className="text-lg" />
              {t.services || "Services"}
            </Link>
          </motion.div>
          <motion.div
            animate={{ 
              borderColor: [
                "rgba(253, 25, 252, 0.2)", 
                "rgba(253, 25, 252, 0.9)", 
                "rgba(253, 25, 252, 0.2)"
              ] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5, 
              ease: "easeInOut",
              delay: 0.3
            }}
            className="border-2 border-[color:var(--neon-pink)]/40 rounded-xl"
          >
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 text-white hover:text-[color:var(--neon-pink)] font-medium rounded-xl px-4 py-2 bg-[color:var(--dark-gray)] hover:bg-[color:var(--neon-pink)]/10 transition-all duration-300"
            >
              <FaDollarSign className="text-lg" />
              {t.pricing || "Pricing"}
            </Link>
          </motion.div>
        </motion.div>

        {/* Hamburger menu button for mobile - now fully right, lang button will be in MobileMenu */}
        <motion.div 
          className="md:hidden flex items-center justify-end w-full"
          initial={{ opacity: 0, y: -50 }}
          animate={
            splashComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: splashComplete ? 0.4 : 0,
          }}
        >
          <motion.button
            aria-label="Open menu"
            className="flex items-center gap-2 px-3 py-2 border-2 border-[color:var(--medium-gray)] hover:border-[color:var(--neon-cyan)] bg-[color:var(--dark-gray)] text-[color:var(--white)] rounded-xl transition-all duration-300 group"
            onClick={() => setIsMobileMenuOpen(true)}
            whileHover={{
              borderColor: "var(--neon-cyan)",
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[color:var(--white)] group-hover:text-[color:var(--neon-pink)] transition-colors duration-300">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Mobile Menu Component */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />

        {/* Language Menu - only visible on desktop, hidden on mobile */}
        <motion.div
          className="relative hidden md:block"
          ref={menuRef}
          initial={{ opacity: 0, y: -50 }}
          animate={
            splashComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: splashComplete ? 0.5 : 0,
          }}>
          <motion.button
            className="flex items-center border-2 gap-1 px-3 py-2 border-[color:var(--medium-gray)] hover:border-[color:var(--neon-cyan)] bg-[color:var(--dark-gray)] text-[color:var(--white)] rounded-xl transition-all duration-300 group min-w-[50px] justify-center"
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            whileHover={{
              borderColor: "var(--neon-cyan)",
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}>
            <span className="font-bold text-sm tracking-wide uppercase flex items-center justify-center">
              {currentLanguage.label}
            </span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-[color:var(--neon-cyan)] group-hover:text-[color:var(--neon-pink)] transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: isLangMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.button>
          <AnimatePresence>
            {isLangMenuOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-44 bg-[color:var(--dark-gray)] border-2 border-[color:var(--medium-gray)] rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}>
                <div>
                  {languages.map((lang, idx) => (
                    <button
                      key={lang.code}
                      className={`w-full flex items-center gap-3 px-4 text-sm transition-colors duration-200 group relative overflow-hidden py-3
                        ${
                          locale === lang.code
                            ? "bg-[color:var(--neon-cyan)] text-[color:var(--black)] font-bold"
                            : "text-[color:var(--white)] hover:bg-[color:var(--medium-gray)] hover:text-[color:var(--neon-cyan)]"
                        }
                      `}
                      onClick={() => {
                        setLocale(lang.code);
                        setIsLangMenuOpen(false);
                      }}>
                      <span className="font-bold text-base tracking-wide uppercase flex items-center justify-center w-8 h-8 relative z-10">
                        {lang.label}
                      </span>
                      <span className="relative z-10 font-medium">
                        {lang.name}
                      </span>
                      {locale === lang.code && (
                        <div className="ml-auto text-[color:var(--black)]">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
