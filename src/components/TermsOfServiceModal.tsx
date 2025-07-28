"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleContext } from "../contexts/LocaleContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal = ({
  isOpen,
  onClose,
}: TermsOfServiceModalProps) => {
  const { t } = useLocaleContext();

  // Scroll lock - ugyanaz mint a PrivacyPolicyModal-ban
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}>
            {/* Close Button - Ugyanaz mint a PrivacyPolicyModal-ban */}
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
              <h2 className="text-2xl font-bold text-white">{t.termsTitle}</h2>
            </motion.div>

            {/* Content */}
            <div className="space-y-6">
              <motion.div
                className="text-sm text-gray-400 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}>
                {t.termsLastUpdate}
              </motion.div>

              {/* 1. Definitions */}
              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.termsDefinitions}
                </h3>
                <div className="space-y-3 text-gray-300 leading-relaxed">
                  <p>{t.termsZsmwebdev}</p>
                  <p>{t.termsClient}</p>
                  <p>{t.termsAgreement}</p>
                </div>
              </motion.div>

              {/* 2. Applicability */}
              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.termsApplicability}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t.termsApplicabilityText}
                </p>
              </motion.div>

              {/* 3. Services */}
              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.termsServices}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-3">
                  {t.termsServicesText}
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  {t.termsServicesList.map((service: string, index: number) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </motion.div>

              {/* 4. Quotes and rates */}
              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.termsQuotes}
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  {t.termsQuotesText.map((quote: string, index: number) => (
                    <li key={index}>{quote}</li>
                  ))}
                </ul>
              </motion.div>

              {/* 5. Payment */}
              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.termsPayment}
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  {t.termsPaymentText.map((payment: string, index: number) => (
                    <li key={index}>{payment}</li>
                  ))}
                </ul>
              </motion.div>

              {/* 6. Cancellation */}
              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.termsCancellation}
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  {t.termsCancellationText.map(
                    (cancellation: string, index: number) => (
                      <li key={index}>{cancellation}</li>
                    )
                  )}
                </ul>
              </motion.div>

              {/* 7. Intellectual Property */}
              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.termsIntellectual}
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  {t.termsIntellectualText.map(
                    (intellectual: string, index: number) => (
                      <li key={index}>{intellectual}</li>
                    )
                  )}
                </ul>
              </motion.div>

              {/* 8. Maintenance */}
              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.termsMaintenance}
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  {t.termsMaintenanceText.map(
                    (maintenance: string, index: number) => (
                      <li key={index}>{maintenance}</li>
                    )
                  )}
                </ul>
              </motion.div>

              {/* 9. Liability */}
              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.termsLiability}
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  {t.termsLiabilityText.map(
                    (liability: string, index: number) => (
                      <li key={index}>{liability}</li>
                    )
                  )}
                </ul>
              </motion.div>

              {/* 10. Applicable Law */}
              <motion.div
                className="bg-[#2C313A] p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t.termsLaw}
                </h3>
                <div className="space-y-3 text-gray-300 leading-relaxed">
                  {t.termsLawText.map((law: string, index: number) => (
                    <p key={index}>{law}</p>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              className="mt-8 flex justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.4 }}>
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
};
