"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLocaleContext } from "../../contexts/LocaleContext";

export default function AboutPage() {
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { t } = useLocaleContext();
  useEffect(() => {
    // Add a small delay before showing content to ensure smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  const handleGoHome = () => {
    setIsExiting(true);
    // Wait for exit animation to complete before navigating
    setTimeout(() => {
      router.push("/?from=about");
    }, 500);
  };
  return (
    <AnimatePresence mode="wait">
      {!isExiting && isLoaded && (
        <motion.div
          className="min-h-[calc(100vh-3.5rem-4rem)] w-full bg-[#161A20] py-8 px-4 md:px-8 flex flex-col items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}>
          <div className="w-full max-w-5xl relative">
            <motion.button
              className="absolute top-0 left-0 mb-6 bg-[#2C313A] text-white py-2 px-4 rounded-xl hover:bg-[#fd19fc] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-[#fd19fc]/20 hover:-translate-y-1"
              onClick={handleGoHome}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                type: "spring",
                stiffness: 200,
              }}>
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [-3, 0, -3] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  repeatDelay: 1,
                }}>
                ◀
              </motion.span>
              {t.back}
            </motion.button>
            <motion.div
              className="w-full mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="w-full bg-[#1E2228] p-6 md:p-8 rounded-xl shadow-xl border-t border-l border-gray-700 mb-8">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="md:w-1/3 flex justify-center md:justify-start">
                    <motion.div
                      className="relative w-64 h-64 md:w-full md:h-auto aspect-square rounded-xl overflow-hidden border-2 border-[#00ffff] shadow-lg max-w-xs"
                      initial={{ opacity: 0, scale: 0.95, rotateY: -5 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2,
                        ease: "easeOut",
                      }}>
                      <motion.div
                        className="absolute left-[30%] top-[15%] z-10"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.9,
                        }}
                        whileHover={{ y: -3, scale: 1.05 }}>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut",
                            repeatDelay: 0.5,
                          }}>
                          <div className="bg-[#00ffff] text-[var(--neon-pink)] text-xs font-bold px-2 py-1 rounded shadow-lg">
                            {t.itsMe}
                          </div>
                        </motion.div>
                      </motion.div>
                      <Image
                        src="/images/profile-2.webp"
                        alt="Zsolt Márku"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 16rem, (max-width: 1200px) 25vw, 33vw"
                        priority
                      />
                    </motion.div>
                  </div>
                  <div className="md:w-2/3">
                    <motion.h1
                      className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[#00ffff] text-center md:text-left"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.3,
                      }}>
                      {t.aboutTitle}
                    </motion.h1>
                    <motion.div
                      className="text-gray-200 space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.4,
                        ease: "easeOut",
                      }}>
                      <h2 className="text-2xl font-semibold text-[#fd19fc] mb-3">
                        {t.journeyTitle}
                      </h2>

                      <p className="text-lg leading-relaxed">
                        {t.journeyPara1}
                      </p>

                      <p className="text-lg leading-relaxed">
                        {t.journeyPara2}
                      </p>

                      <p className="text-lg leading-relaxed">
                        {t.journeyPara3}
                      </p>

                      <p className="text-lg leading-relaxed">
                        {t.journeyPara4}
                      </p>

                      <p className="text-lg leading-relaxed">
                        {t.journeyPara5}
                      </p>
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}>
                  <div className="bg-[#2C313A] p-5 rounded-lg border-l border-t border-gray-700 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 transition-all duration-300">
                    <h2 className="text-xl font-semibold mb-2 text-[#fd19fc]">
                      {t.experienceTitle}
                    </h2>
                    <p className="text-gray-300">{t.experienceDescription}</p>
                  </div>
                  <div className="bg-[#2C313A] p-5 rounded-lg border-l border-t border-gray-700 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 transition-all duration-300">
                    <h2 className="text-xl font-semibold mb-2 text-[#fd19fc]">
                      {t.educationTitle}
                    </h2>
                    <p className="text-gray-300">{t.educationDescription}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
