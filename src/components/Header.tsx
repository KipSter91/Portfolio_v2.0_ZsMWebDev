"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../data/translations";
import { useLocale } from "../lib/i18n";

type Locale = keyof typeof translations;

const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "hu", label: "HU", name: "Magyar" },
  { code: "nl", label: "NL", name: "Nederlands" },
];

const Header: React.FC = () => {
  const [locale, setLocale] = useLocale();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <header className="fixed top-0 left-0 w-full z-50 bg-[color:var(--dark-gray)] bg-opacity-70 backdrop-blur-md border-b border-[color:var(--medium-gray)] h-14">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 1 }}>
          <Link
            href="/"
            className="text-[color:var(--white)] hover:text-[color:var(--neon-cyan)] transition-colors duration-300">
            <span className="text-xl font-bold">Zsolt Marku</span>
          </Link>
        </motion.div>
        <div
          className="relative"
          ref={menuRef}>
          <motion.button
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 1 }}
            className="flex items-center gap-3 px-4 py-2 border-2 border-[color:var(--medium-gray)] hover:border-[color:var(--neon-cyan)] bg-[color:var(--dark-gray)] text-[color:var(--white)] rounded-full transition-all duration-300 group min-w-[100px] justify-center"
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
                className="absolute right-0 mt-2 w-44 bg-[color:var(--dark-gray)] border-2 border-[color:var(--medium-gray)] rounded-2xl shadow-lg overflow-hidden"
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
        </div>
      </div>
    </header>
  );
};

export default Header;
