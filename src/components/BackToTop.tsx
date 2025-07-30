"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp } from "react-icons/fa";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down 400px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[99] flex items-center justify-center w-12 h-12 bg-[color:var(--dark-gray)] border-2 border-[color:var(--medium-gray)] hover:border-[color:var(--neon-cyan)] text-[color:var(--white)] hover:text-[color:var(--neon-cyan)] rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 group"
          whileHover={{
            scale: 1.05,
            borderColor: "var(--neon-cyan)",
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top">
          <motion.div
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}>
            <FaChevronUp className="text-lg group-hover:text-[color:var(--neon-cyan)] transition-colors duration-300" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
