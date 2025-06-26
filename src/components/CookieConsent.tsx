"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleContext } from "../contexts/LocaleContext";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import { CookieSettingsModal } from "./CookieSettingsModal";
import {
  hasUserMadeChoice,
  setCookiePreferences,
  defaultCookiePreferences,
  CookiePreferences,
} from "../utils/cookies";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);
  const { t } = useLocaleContext();

  // Scroll lock - ugyanaz mint az AnimatedModal-ban
  useEffect(() => {
    if (isVisible) {
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
  }, [isVisible]);

  useEffect(() => {
    // Listen for splash screen completion
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
    setTimeout(checkSplashComplete, 1000);

    return () => {
      window.removeEventListener("splashComplete", handleSplashComplete);
    };
  }, []);

  useEffect(() => {
    // Only show consent after splash is complete
    if (splashComplete && !hasUserMadeChoice()) {
      setTimeout(() => {
        setShowConsent(true);
        setIsVisible(true);
      }, 1000); // Small delay after splash
    }
  }, [splashComplete]);

  const handleAcceptAll = () => {
    const preferences: CookiePreferences = {
      essential: true,
      analytics: true,
    };
    setCookiePreferences(preferences);

    // Trigger events for immediate update
    window.dispatchEvent(new CustomEvent("cookie-consent-updated"));
    window.dispatchEvent(new CustomEvent("analytics-consent-given"));

    setIsVisible(false);
    setTimeout(() => setShowConsent(false), 300);
  };

  const handleDeclineAll = () => {
    const preferences: CookiePreferences = {
      essential: true,
      analytics: false,
    };
    setCookiePreferences(preferences);

    // Trigger events for immediate update
    window.dispatchEvent(new CustomEvent("cookie-consent-updated"));
    window.dispatchEvent(new CustomEvent("analytics-consent-revoked"));

    setIsVisible(false);
    setTimeout(() => setShowConsent(false), 300);
  };

  const handleCustomize = () => {
    setShowSettingsModal(true);
  };

  const handleSettingsSave = () => {
    setIsVisible(false);
    setTimeout(() => setShowConsent(false), 300);
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Cookie Banner */}
          <motion.div
            className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 lg:left-auto lg:right-8 lg:max-w-xl z-[9999]"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.4,
            }}>
            <div className="bg-[#1E2228] border border-[#00ffff]/20 rounded-xl p-6 shadow-2xl shadow-[#00ffff]/10 backdrop-blur-md">
              <motion.div
                className="flex items-start gap-3 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}>
                <motion.div
                  className="text-2xl"
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 500 }}>
                  🍪
                </motion.div>
                <div>
                  <motion.h3
                    className="text-lg font-semibold text-white mb-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}>
                    {t.cookieConsentTitle}
                  </motion.h3>
                  <motion.p
                    className="text-gray-300 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.3 }}>
                    {t.cookieConsentText}
                  </motion.p>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={handleAcceptAll}
                    className="flex-1 relative overflow-hidden bg-gradient-to-r from-[#fd19fc] to-[#cc14cc] text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 group hover:shadow-lg hover:shadow-[#fd19fc]/30 hover:-translate-y-1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff1493] to-[#fd19fc] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">{t.acceptCookies}</span>
                  </motion.button>
                  <motion.button
                    onClick={handleDeclineAll}
                    className="flex-1 bg-[#2C313A] hover:bg-[#3A4048] text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-600 hover:border-gray-500"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    {t.declineCookies}
                  </motion.button>
                </div>

                <motion.button
                  onClick={handleCustomize}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-[#00ffff] to-[#00cccc] text-[#161A20] font-medium py-3 px-4 rounded-xl transition-all duration-300 group hover:shadow-lg hover:shadow-[#00ffff]/30 hover:-translate-y-1"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45, duration: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00cccc] to-[#00ffff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">
                    {t.manageCookieSettings}
                  </span>
                </motion.button>
              </motion.div>

              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}>
                <motion.button
                  className="text-xs text-gray-400 hover:text-[#00ffff] underline hover:no-underline transition-all duration-200"
                  onClick={() => setShowPrivacyModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  {t.privacyPolicy}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Privacy Policy Modal */}
          <PrivacyPolicyModal
            isOpen={showPrivacyModal}
            onClose={() => setShowPrivacyModal(false)}
          />

          {/* Cookie Settings Modal */}
          <CookieSettingsModal
            isOpen={showSettingsModal}
            onClose={() => setShowSettingsModal(false)}
            onSave={handleSettingsSave}
          />
        </>
      )}
    </AnimatePresence>
  );
}
