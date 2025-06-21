"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../data/translations";
import { useLocale } from "../lib/i18n";

type Locale = keyof typeof translations;

const languages = [
  { code: "en", label: "🇬🇧", name: "English" },
  { code: "hu", label: "🇭🇺", name: "Magyar" },
  { code: "nl", label: "🇳🇱", name: "Nederlands" },
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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <Link
            href="/"
            className="text-[color:var(--white)] hover:text-[color:var(--neon-cyan)] transition-colors duration-300">
            <span className="text-xl font-bold">Zsolt Marku</span>
          </Link>
        </motion.div>{" "}
        <div
          className="relative"
          ref={menuRef}>
          <motion.button
            className="flex items-center space-x-2 px-3 py-1.5 border border-[color:var(--medium-gray)] hover:border-[color:var(--neon-cyan)] bg-[color:var(--dark-gray)] bg-opacity-60 backdrop-blur-sm text-[color:var(--white)] transition-all duration-300"
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            whileHover={{ borderColor: "var(--neon-cyan)" }}
            whileTap={{ scale: 0.98 }}>
            <span className="text-xl mr-2">{currentLanguage.label}</span>
            <span className="text-sm hidden sm:inline">
              {currentLanguage.name}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-300 ${
                isLangMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>

          <AnimatePresence>
            {isLangMenuOpen && (
              <motion.div
                className="absolute right-0 mt-1 w-40 bg-[color:var(--dark-gray)] bg-opacity-70 backdrop-blur-md border border-[color:var(--medium-gray)] shadow-[0_0_15px_rgba(0,255,255,0.1)] overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}>
                <div className="py-1">
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      className={`block w-full text-left px-4 py-2 text-sm border-l-2 ${
                        locale === lang.code
                          ? "border-[color:var(--neon-cyan)] text-[color:var(--neon-cyan)] bg-[color:var(--medium-gray)] bg-opacity-40"
                          : "border-transparent text-[color:var(--white)] hover:bg-[color:var(--medium-gray)] hover:bg-opacity-40 hover:border-[color:var(--neon-pink)]"
                      } transition-all duration-200`}
                      onClick={() => {
                        setLocale(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      whileHover={{
                        x: 3,
                        backgroundColor: "rgba(44, 49, 58, 0.4)",
                        boxShadow: "inset 0 0 8px rgba(0, 255, 255, 0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}>
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{lang.label}</span>
                        <span>{lang.name}</span>
                      </div>
                    </motion.button>
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
