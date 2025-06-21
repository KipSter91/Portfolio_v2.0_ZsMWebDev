"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../../data/translations";
import { useLocale } from "../../lib/i18n";

type Locale = keyof typeof translations;

export default function AboutPage() {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();
  const [locale, setLocale] = useLocale();
  const t = translations[locale as Locale];

  const handleGoHome = () => {
    setIsExiting(true);
    // Wait for exit animation to complete before navigating
    setTimeout(() => {
      router.push("/?from=about");
    }, 500);
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          className="min-h-screen bg-[#161A20] p-8 flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}>
          <motion.button
            className="absolute top-6 left-6 bg-[#2C313A] text-white py-2 px-4 rounded hover:bg-[#fd19fc] transition-colors"
            onClick={handleGoHome}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            ← {t.close}
          </motion.button>

          <motion.div
            className="max-w-3xl bg-[#1E2228] p-8 rounded-xl shadow-xl border-t border-l border-gray-700"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}>
            <h1 className="text-4xl font-bold mb-6 text-[#00ffff]">
              {t.about}
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              {t.aboutContent}
            </p>

            <motion.div
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}>
              <div className="bg-[#2C313A] p-5 rounded-lg border-l border-t border-gray-700">
                <h2 className="text-xl font-semibold mb-2 text-[#fd19fc]">
                  Experience
                </h2>
                <p className="text-gray-300">
                  5+ years of professional frontend development with a focus on
                  interactive web applications.
                </p>
              </div>

              <div className="bg-[#2C313A] p-5 rounded-lg border-l border-t border-gray-700">
                <h2 className="text-xl font-semibold mb-2 text-[#fd19fc]">
                  Education
                </h2>
                <p className="text-gray-300">
                  Bachelor's Degree in Computer Science with additional
                  certifications in modern web technologies.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
