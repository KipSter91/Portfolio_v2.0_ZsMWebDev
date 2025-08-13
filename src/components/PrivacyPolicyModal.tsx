"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleContext } from "../contexts/LocaleContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({
  isOpen,
  onClose,
}: PrivacyPolicyModalProps) {
  const { t } = useLocaleContext();

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
            className="bg-[#1E2228] rounded-xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#00ffff]/20 shadow-2xl relative"
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
                {t.privacyPolicyTitle}
              </h2>
            </motion.div>

            {/* Content */}
            <div className="space-y-6">
              <motion.div
                className="text-sm text-gray-400 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}>
                {t.lastUpdated}
              </motion.div>

              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}>
                <p className="text-gray-300 leading-relaxed">
                  {t.privacyPolicyContent}
                </p>
              </motion.div>

              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.dataCollection}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t.dataCollectionText}
                </p>
              </motion.div>

              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.cookies}
                </h3>
                <p className="text-gray-300 leading-relaxed">{t.cookiesText}</p>
              </motion.div>

              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.contactPrivacy}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {t.contactPrivacyText}
                </p>
                <div className="bg-[#161A20] p-4 rounded-lg space-y-3">
                  <p className="text-gray-300">
                    <strong className="text-white">{t.name}:</strong> {t.myName}
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-white">{t.email}:</strong>
                    <span className="text-[#00ffff] ml-2">
                      portfolio@zsoltmarku.com
                    </span>
                  </p>
                  <div className="pt-2 border-t border-gray-600">
                    <p className="text-gray-300 mb-2">
                      <strong className="text-white">
                        {t.contactPrivacyBusiness}
                      </strong>
                    </p>
                    <p className="text-gray-300 text-sm">
                      {t.contactPrivacyKvK}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {t.contactPrivacyBTW}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.yourRights}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t.yourRightsText}
                </p>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              className="mt-8 flex justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}>
              <motion.button
                onClick={onClose}
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
                {t.close}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
