"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    // First animation starts with a slight delay
    const timer1 = setTimeout(() => {
      setShowContent(true);
    }, 500); // Splash screen ending we are waiting for 0.5 seconds
    // Logo animation: 0.5s delay + 1.2s = 1.7s
    // Shimmer animation: 1.5s delay + 3.5s = 5.0s
    // Progress bar: 1.5s delay + 3.2s = 4.7s
    const timer2 = setTimeout(() => {
      onComplete();
    }, 5500); // 5.5 seconds - waiting for all animations to complete

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#161A20] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}>
      {/* Animated gradient background */}
      <div
        className="animated-gradient fixed inset-0 z-0"
        style={{ pointerEvents: "none" }}
      />

      <div className="flex flex-col items-center relative z-10">
        {/* Logo with pulsing animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            showContent
              ? {
                  opacity: 1,
                  scale: [0.5, 1.2, 1],
                }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{
            duration: 1.2,
            ease: "easeOut",
            scale: {
              times: [0, 0.6, 1],
              duration: 1.2,
            },
          }}
          className="relative w-32 h-32 rounded-xl bg-black border-2 border-[#00ffff] overflow-hidden mb-8 z-10">
          <motion.div
            className="absolute inset-0"
            animate={{
              boxShadow: [
                "0 0 0 rgba(0, 255, 255, 0.4)",
                "0 0 30px rgba(0, 255, 255, 0.8)",
                "0 0 0 rgba(0, 255, 255, 0.4)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <img
            src="/images/logo.png"
            alt="Zsolt Márku logo"
            className="w-full h-full object-cover relative z-10"
          />
        </motion.div>

        {/* Welcome Text with neon styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#00ffff] mb-2 tracking-wide">
            Welcome
          </h1>
          <p className="text-xl md:text-2xl text-white font-light">
            to my <span className="text-[#fd19fc] font-medium">Portfolio</span>
          </p>
        </motion.div>
        {/* Progress bar with realistic loading animation */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            showContent ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
          }
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="mt-8 w-80 h-2 bg-[#2c313a] overflow-hidden relative border rounded-xl border-[#00ffff]/20">
          {/* Main progress bar */}
          <motion.div
            className="h-full bg-gradient-to-r from-[#00ffff] via-[#00ffff] to-[#fd19fc] relative"
            initial={{ width: "0%" }}
            animate={
              showContent
                ? {
                    width: ["0%", "12%", "28%", "45%", "67%", "89%", "100%"],
                  }
                : { width: "0%" }
            }
            transition={{
              duration: 3.2,
              delay: 1.5,
              ease: "easeInOut",
              times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
            }}
          />

          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#00ffff] via-[#00ffff] to-[#fd19fc] rounded-xl blur-md opacity-60"
            initial={{ width: "0%" }}
            animate={
              showContent
                ? {
                    width: ["0%", "12%", "28%", "45%", "67%", "89%", "100%"],
                  }
                : { width: "0%" }
            }
            transition={{
              duration: 3.2,
              delay: 1.5,
              ease: "easeInOut",
              times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
            }}
          />

          {/* Progress percentage display */}
          <motion.div
            className="absolute -top-8 left-0 text-[#00ffff] text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}>
              Loading...
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
