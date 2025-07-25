"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleContext } from "../../contexts/LocaleContext";
import {
  FaGlobe,
  FaChartLine,
  FaCogs,
  FaTachometerAlt,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGoogle,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiHostinger,
} from "react-icons/si";

export default function ServicesPage() {
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
      router.push("/?from=services");
    }, 500);
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && isLoaded && (
        <motion.article
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

            <motion.section
              className="w-full mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="w-full bg-[#1E2228] p-6 md:p-8 rounded-xl shadow-xl border-t border-l border-gray-700 mb-8">
                <motion.h1
                  className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[#00ffff] text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.3,
                  }}>
                  {t.servicesTitle}
                </motion.h1>

                <motion.p
                  className="text-lg text-gray-200 text-center mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4,
                    ease: "easeOut",
                  }}>
                  {t.servicesHero}
                </motion.p>

                {/* Services Grid */}
                <motion.div
                  className="grid md:grid-cols-2 gap-6 mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}>
                  <motion.div
                    className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <FaGlobe className="text-2xl text-[var(--neon-cyan)] mr-3" />
                      <h3 className="text-xl font-semibold text-white">
                        {t.landingPageTitle}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {t.landingPageDescription}
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <FaChartLine className="text-2xl text-[var(--neon-pink)] mr-3" />
                      <h3 className="text-xl font-semibold text-white">
                        {t.onePageTitle}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {t.onePageDescription}
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <FaCogs className="text-2xl text-[var(--neon-cyan)] mr-3" />
                      <h3 className="text-xl font-semibold text-white">
                        {t.conversionTitle}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {t.conversionDescription}
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <FaTachometerAlt className="text-2xl text-[var(--neon-pink)] mr-3" />
                      <h3 className="text-xl font-semibold text-white">
                        {t.technicalTitle}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {t.technicalDescription}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Technologies Section */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}>
                  <h2 className="text-2xl font-semibold text-[#fd19fc] mb-6 text-center">
                    {t.technologiesTitle}
                  </h2>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <FaHtml5 className="text-2xl text-orange-500 mx-auto mb-2" />
                      <span className="text-white text-sm">HTML</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <FaCss3Alt className="text-2xl text-blue-500 mx-auto mb-2" />
                      <span className="text-white text-sm">CSS</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <FaJs className="text-2xl text-yellow-500 mx-auto mb-2" />
                      <span className="text-white text-sm">JavaScript</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <SiTypescript className="text-2xl text-blue-600 mx-auto mb-2" />
                      <span className="text-white text-sm">TypeScript</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <FaReact className="text-2xl text-cyan-400 mx-auto mb-2" />
                      <span className="text-white text-sm">React</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <SiNextdotjs className="text-2xl text-white mx-auto mb-2" />
                      <span className="text-white text-sm">Next.js</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <SiTailwindcss className="text-2xl text-cyan-400 mx-auto mb-2" />
                      <span className="text-white text-sm">Tailwind</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <SiHostinger className="text-2xl text-purple-500 mx-auto mb-2" />
                      <span className="text-white text-sm">Hostinger</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <FaGoogle className="text-2xl text-red-500 mx-auto mb-2" />
                      <span className="text-white text-sm">SEO Tools</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Target Audience Section */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}>
                  <h2 className="text-2xl font-semibold text-[#fd19fc] mb-3 text-center">
                    {t.targetAudienceTitle}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <p className="text-gray-300">• {t.targetAudience1}</p>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <p className="text-gray-300">• {t.targetAudience2}</p>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <p className="text-gray-300">• {t.targetAudience3}</p>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1">
                      <p className="text-gray-300">• {t.targetAudience4}</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.div
              className="text-center p-8 rounded-xl shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl border-2 border-[#fd19fc]/60 animate-pulse"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.ctaTitle}
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  {t.pricingCtaDescription}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="bg-gradient-to-r from-[#00ffff] to-[#00cccc] text-[#161A20] font-semibold py-3 px-6 rounded-xl hover:from-[#00cccc] hover:to-[#00ffff] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#00ffff]/30 hover:-translate-y-1 border-2 border-[#00ffff]/50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200,
                    }}
                    onClick={() => {
                      router.push("/contact");
                      window.scrollTo(0, 0);
                    }}>
                    {t.ctaContact}
                  </motion.button>

                  <motion.button
                    className="bg-gradient-to-r from-[#fd19fc] to-[#cc14cc] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#cc14cc] hover:to-[#fd19fc] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#fd19fc]/30 hover:-translate-y-1 border-2 border-[#fd19fc]/50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}>
                    {t.ctaPricing}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
}
