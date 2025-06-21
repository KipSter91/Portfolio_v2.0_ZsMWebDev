"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../../data/translations";
import { useLocale } from "../../lib/i18n";

type Locale = keyof typeof translations;

export default function LogoPage() {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();
  const [locale, setLocale] = useLocale();
  const t = translations[locale as Locale];

  const handleGoHome = () => {
    setIsExiting(true);
    // Wait for exit animation to complete before navigating
    setTimeout(() => {
      router.push("/?from=logo");
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
            className="max-w-3xl bg-[#1E2228] p-8 rounded-xl shadow-xl border-t border-l border-gray-700 flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}>
            <motion.div
              className="w-40 h-40 bg-black border-4 border-[#00ffff] rounded-full overflow-hidden mb-8"
              animate={{
                borderColor: ["#00ffff", "#fd19fc", "#00ffff"],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
              }}>
              <img
                src="/images/logo.png"
                alt="Zsolt Márku logo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.h1
              className="text-3xl font-bold mb-4 text-[#00ffff]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}>
              Zsolt Márku
            </motion.h1>

            <motion.h2
              className="text-xl font-semibold mb-6 text-[#fd19fc]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}>
              Frontend Developer
            </motion.h2>

            <motion.p
              className="text-gray-300 text-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}>
              The logo represents my passion for clean, modern design and
              cutting-edge technology. The colors symbolize creativity (pink)
              and precision (cyan) - two essential qualities in frontend
              development.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-6 w-full"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}>
              <div className="bg-[#2C313A] p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-[#00ffff]">
                  Design Philosophy
                </h3>
                <p className="text-gray-300 text-sm">
                  Simplicity with impact. Clean interfaces with thoughtful
                  animations create memorable experiences.
                </p>
              </div>

              <div className="bg-[#2C313A] p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-[#00ffff]">
                  Brand Colors
                </h3>
                <div className="flex space-x-2 mt-2">
                  <div className="w-10 h-10 rounded-full bg-[#00ffff] border border-gray-700"></div>
                  <div className="w-10 h-10 rounded-full bg-[#fd19fc] border border-gray-700"></div>
                  <div className="w-10 h-10 rounded-full bg-[#161A20] border border-gray-700"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
