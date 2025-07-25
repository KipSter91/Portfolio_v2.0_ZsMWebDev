"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocaleContext } from "../contexts/LocaleContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useLocaleContext();

  // Disable body scroll when menu is open - same as AnimatedModal
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

  if (!isOpen) return null;

  const menuContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 999999999 }}
      onClick={onClose}>
      {/* Animated Gradient Background - same as main portfolio */}
      <div className="animated-gradient" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-[#1E2228] rounded-xl border border-[#00ffff]/20 shadow-2xl relative max-w-md w-full"
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 255, 255, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}>
        {/* Header - same style as AnimatedModal */}
        <div className="flex justify-between items-center p-6 border-b border-[#00ffff]/20">
          <motion.h2
            className="text-2xl font-bold text-white"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}>
            Menu
          </motion.h2>

          <motion.button
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white text-3xl p-2 hover:bg-[#2C313A] rounded-xl w-10 h-10 flex items-center justify-center transition-colors"
            onClick={onClose}
            aria-label="Close modal">
            ×
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}>
            <Link
              href="/services"
              onClick={onClose}
              className="flex items-center gap-4 w-full p-4 rounded-xl border border-[#00ffff]/20 hover:border-[#00ffff]/50 bg-[#2C313A]/30 hover:bg-[#2C313A]/50 text-[#00ffff] hover:text-[#fd19fc] transition-all duration-300 group">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="flex-shrink-0">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <span className="text-lg font-medium">
                {t.services || "Services"}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="ml-auto group-hover:translate-x-1 transition-transform">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}>
            <Link
              href="/pricing"
              onClick={onClose}
              className="flex items-center gap-4 w-full p-4 rounded-xl border border-[#fd19fc]/20 hover:border-[#fd19fc]/50 bg-[#2C313A]/30 hover:bg-[#2C313A]/50 text-[#fd19fc] hover:text-[#00ffff] transition-all duration-300 group">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="flex-shrink-0">
                <line
                  x1="12"
                  y1="1"
                  x2="12"
                  y2="23"
                />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span className="text-lg font-medium">
                {t.pricing || "Pricing"}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="ml-auto group-hover:translate-x-1 transition-transform">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="p-6 border-t border-[#00ffff]/20 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}>
          <p className="text-sm text-gray-400">{t.portfolio} © 2025</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  // Use portal to render at document body level
  return typeof window !== "undefined"
    ? createPortal(menuContent, document.body)
    : null;
};

export default MobileMenu;
