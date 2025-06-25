"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedModal from "./AnimatedModal";
import { useLocaleContext } from "../contexts/LocaleContext";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  const { t } = useLocaleContext();
  return (
    <AnimatedModal
      isOpen={isOpen}
      onClose={onClose}>
      <div className="text-center py-8 px-4">
        {/* Success Icon */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-[#00ffff] rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}>
          <motion.svg
            className="w-10 h-10 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#00ffff] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}>
          {t.thankYouTitle}
        </motion.h2>
        {/* Description */}
        <motion.p
          className="text-lg text-gray-300 mb-8 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}>
          {t.thankYouMessage}
        </motion.p>
      </div>
    </AnimatedModal>
  );
}
