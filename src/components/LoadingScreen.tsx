"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
  isExiting?: boolean;
  showWelcome?: boolean;
}

export default function LoadingScreen({
  isLoading,
  showWelcome = false,
}: LoadingScreenProps) {
  const [loadingDots, setLoadingDots] = useState("");

  // Animated loading dots
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Only show loading screen when entering a section, not when exiting
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#161A20]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}>
      {/* Animated gradient full background */}
      <div
        className="animated-gradient fixed inset-0 z-0"
        style={{ pointerEvents: "none" }}
      />
      <div className="flex flex-col items-center relative z-10">
        {/* Pulsing logo */}
        <motion.div
          className="relative w-24 h-24 bg-black border-2 border-[#00ffff] rounded-full overflow-hidden mb-5 z-10"
          animate={{
            scale: [1, 1.15, 1],
            boxShadow: [
              "0 0 0 rgba(0, 255, 255, 0.4)",
              "0 0 25px rgba(0, 255, 255, 0.7)",
              "0 0 0 rgba(0, 255, 255, 0.4)",
            ],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}>
          <img
            src="/images/logo.png"
            alt="Zsolt Márku logo"
            className="w-full h-full object-cover relative z-10"
          />
        </motion.div>

        {/* Welcome or loading text */}
        {showWelcome ? (
          <motion.div
            className="text-[#00ffff] text-xl tracking-wider flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}>
            <span className="mr-1">Welcome to my portfolio</span>
            <motion.span
              className="inline-block min-w-[24px] text-[#fd19fc]"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}>
              {loadingDots}
            </motion.span>
          </motion.div>
        ) : (
          <motion.div
            className="text-[#00ffff] text-xl tracking-wider flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}>
            <span className="mr-1">Loading</span>
            <motion.span
              className="inline-block min-w-[24px] text-[#fd19fc]"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}>
              {loadingDots}
            </motion.span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
