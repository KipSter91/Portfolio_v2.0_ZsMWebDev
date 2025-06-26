"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleContext } from "../contexts/LocaleContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CookiePreferences,
  getCookiePreferences,
  setCookiePreferences,
} from "../utils/cookies";

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (preferences: CookiePreferences) => void;
}

export function CookieSettingsModal({
  isOpen,
  onClose,
  onSave,
}: CookieSettingsModalProps) {
  const { t } = useLocaleContext();
  const [preferences, setPreferences] = useState<CookiePreferences>(
    getCookiePreferences()
  );

  // Scroll lock - ugyanaz mint az AnimatedModal-ban
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        window.scrollTo({ top: scrollY });
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setPreferences(getCookiePreferences());
    }
  }, [isOpen]);

  const handleSave = () => {
    setCookiePreferences(preferences);
    onSave?.(preferences);
    onClose();
  };

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Cannot disable essential cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[10000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div
            className="bg-[#1E2228] rounded-xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#00ffff]/20 shadow-2xl relative"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}>
            {/* Close Button - Ugyanaz mint az AnimatedModal-ban */}
            <motion.button
              className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl p-2 hover:bg-[#2C313A] rounded-xl w-8 h-8 flex items-center justify-center transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal">
              ×
            </motion.button>

            {/* Header */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}>
              <h2 className="text-2xl font-bold text-white">
                {t.cookieSettings}
              </h2>
            </motion.div>

            {/* Content */}
            <div className="space-y-6">
              <motion.p
                className="text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}>
                {t.cookieSettingsDescription}
              </motion.p>

              {/* Essential Cookies */}
              <motion.div
                className="bg-[#2C313A] p-4 rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    {t.essentialCookies}
                  </h3>
                  <div className="relative">
                    <div className="w-12 h-6 bg-gray-400 rounded-full relative opacity-50 cursor-not-allowed">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {t.essentialCookiesDescription}
                </p>
              </motion.div>

              {/* Analytics Cookies */}
              <motion.div
                className="bg-[#2C313A] p-4 rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    {t.analyticsCookies}
                  </h3>
                  <motion.button
                    onClick={() => handleToggle("analytics")}
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <div
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.analytics ? "bg-[#00ffff]" : "bg-gray-600"
                      }`}>
                      <motion.div
                        className="absolute top-1 w-4 h-4 bg-white rounded-full"
                        animate={{
                          x: preferences.analytics ? 28 : 4,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}></motion.div>
                    </div>
                  </motion.button>
                </div>
                <p className="text-sm text-gray-400">
                  {t.analyticsCookiesDescription}
                </p>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end">
              <motion.button
                onClick={handleSave}
                className="bg-gradient-to-r from-[#fd19fc] to-[#cc14cc] text-white font-semibold py-2.5 px-6 rounded-xl hover:from-[#cc14cc] hover:to-[#fd19fc] transition-all duration-300 shadow-lg hover:shadow-[#fd19fc]/30 hover:-translate-y-1 border-2 border-[#fd19fc]/50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}>
                {t.saveSettings}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
