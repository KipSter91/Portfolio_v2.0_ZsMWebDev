"use client";

import React from "react";
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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div
            className="bg-[#1E2228] rounded-xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#00ffff]/20 shadow-2xl relative"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
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
