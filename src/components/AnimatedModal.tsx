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
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div
            className="bg-[#161A20] rounded-2xl p-8 shadow-xl min-w-[320px] min-h-[200px] relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-3 right-3 text-white hover:text-cyan-400 text-2xl font-bold"
              onClick={onClose}
              aria-label="Close modal">
              ×
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
