"use client";

import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function AnimatedModal({
  isOpen,
  onClose,
  children,
}: AnimatedModalProps) {
  // Scroll lock
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

  const isReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const baseVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 18, scale: 0.96 },
  } as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/65 backdrop-blur-sm perf-overlay flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div
            className="modal-content-perf bg-[#1E2228] rounded-xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#00ffff]/20 shadow-2xl relative"
            variants={baseVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: isReduced ? 0.15 : 0.32, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}>
            {/* Close Button - Same style as projects modal */}
            <motion.button
              className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl p-2 hover:bg-[#2C313A] rounded-xl w-8 h-8 flex items-center justify-center transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal">
              ×
            </motion.button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
