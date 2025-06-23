"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { translations } from "../../data/translations";
import { useLocale } from "../../lib/i18n";

type Locale = keyof typeof translations;

export default function AboutPage() {
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const [locale, setLocale] = useLocale();
  const t = translations[locale as Locale];
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
            {" "}
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
                ←
              </motion.span>
              Back
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
                            It's Me!
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
                      {t.about}
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
                        My journey and professional experiences (so far)
                      </h2>

                      <p className="text-lg leading-relaxed">
                        I studied at the Faculty of Informatics at the
                        University of Miskolc for two years, where I gained
                        thorough knowledge in the field of computer science.
                        During my studies, I discovered my passion for web
                        development and programming, which has since defined my
                        professional interests.
                      </p>

                      <p className="text-lg leading-relaxed">
                        My journey led me to the Netherlands, where I began my
                        career at AMPCO Metal as a sawing machine operator.
                        Within a short period, I was promoted to leadership
                        positions, first as a Team Leader and then as a
                        Warehouse Supervisor. In these roles, I learned how to
                        lead teams, optimize processes, and ensure efficiency in
                        a fast-paced industrial environment.
                      </p>

                      <p className="text-lg leading-relaxed">
                        Currently, I work at Arvato as a Warehouse Manager,
                        where I oversee a larger team and supervise complex
                        logistical operations. This role provides me with
                        opportunities to further develop my strategic thinking
                        and leadership skills.
                      </p>

                      <p className="text-lg leading-relaxed">
                        Meanwhile, my passion for IT and technology remains
                        unchanged. I continuously expand my knowledge in web
                        development, programming languages, as well as
                        artificial intelligence and AI tools. This expertise
                        enables me to combine technological innovations with my
                        leadership experience to offer effective solutions to
                        modern business challenges.
                      </p>

                      <p className="text-lg leading-relaxed">
                        I am ready to apply my knowledge and experience in new
                        projects. Join me on this journey, and let's explore the
                        endless possibilities of web development, artificial
                        intelligence, and technological advancement together!
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
                      Experience
                    </h2>
                    <p className="text-gray-300">
                      Team leadership and warehouse operations, while
                      concurrently developing expertise in building websites,
                      landing pages, and modern web applications.
                    </p>
                  </div>
                  <div className="bg-[#2C313A] p-5 rounded-lg border-l border-t border-gray-700 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 transition-all duration-300">
                    <h2 className="text-xl font-semibold mb-2 text-[#fd19fc]">
                      Education
                    </h2>
                    <p className="text-gray-300">
                      Computer Science studies at the University of Miskolc with
                      continuous self-development in modern web technologies and
                      AI.
                    </p>
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
