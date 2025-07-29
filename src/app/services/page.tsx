"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
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

  // Timeline progress animation
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start when timeline title becomes visible
      const startPoint = windowHeight * 0.8;
      // Finish when timeline section leaves viewport
      const endPoint = -rect.height * 0.2;

      if (rect.top <= startPoint && rect.top >= endPoint) {
        const totalDistance = startPoint - endPoint;
        const currentDistance = startPoint - rect.top;
        const progress = Math.min(
          1,
          Math.max(0, currentDistance / totalDistance)
        );
        setTimelineProgress(progress);
      } else if (rect.top < endPoint) {
        setTimelineProgress(1);
      } else {
        setTimelineProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
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
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.1,
                  }}
                  viewport={{ once: true, margin: "-50px" }}>
                  {t.servicesTitle}
                </motion.h1>

                <motion.p
                  className="text-lg text-gray-200 text-center mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, margin: "-50px" }}>
                  {t.servicesHero}
                </motion.p>

                {/* Services Grid */}
                <motion.div
                  className="grid md:grid-cols-2 gap-6 mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}>
                  <motion.div
                    className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}>
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
                    className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true, margin: "-50px" }}>
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
                    className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true, margin: "-50px" }}>
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
                    className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true, margin: "-50px" }}>
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
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}>
                  <motion.h2
                    className="text-2xl font-semibold text-[#fd19fc] mb-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-50px" }}>
                    {t.technologiesTitle}
                  </motion.h2>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <FaHtml5 className="text-2xl text-orange-500 mx-auto mb-2" />
                      <span className="text-white text-sm">HTML</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <FaCss3Alt className="text-2xl text-blue-500 mx-auto mb-2" />
                      <span className="text-white text-sm">CSS</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <FaJs className="text-2xl text-yellow-500 mx-auto mb-2" />
                      <span className="text-white text-sm">JavaScript</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <SiTypescript className="text-2xl text-blue-600 mx-auto mb-2" />
                      <span className="text-white text-sm">TypeScript</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <FaReact className="text-2xl text-cyan-400 mx-auto mb-2" />
                      <span className="text-white text-sm">React</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <SiNextdotjs className="text-2xl text-white mx-auto mb-2" />
                      <span className="text-white text-sm">Next.js</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <SiTailwindcss className="text-2xl text-cyan-400 mx-auto mb-2" />
                      <span className="text-white text-sm">Tailwind</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.45 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <SiHostinger className="text-2xl text-purple-500 mx-auto mb-2" />
                      <span className="text-white text-sm">Hostinger</span>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <FaGoogle className="text-2xl text-red-500 mx-auto mb-2" />
                      <span className="text-white text-sm">SEO Tools</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Target Audience Section */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}>
                  <motion.h2
                    className="text-2xl font-semibold text-[#fd19fc] mb-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-50px" }}>
                    {t.targetAudienceTitle}
                  </motion.h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <p className="text-gray-300">• {t.targetAudience1}</p>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <p className="text-gray-300">• {t.targetAudience2}</p>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <p className="text-gray-300">• {t.targetAudience3}</p>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <p className="text-gray-300">• {t.targetAudience4}</p>
                    </motion.div>

                    <motion.div
                      className="bg-[#2C313A] p-4 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 md:col-span-2"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      <p className="text-gray-300">• {t.targetAudience5}</p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Timeline Section - SIMPLE AND WORKING! */}
                <motion.div
                  ref={timelineRef}
                  className="mb-4 md:mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}>
                  <motion.h2
                    className="text-2xl font-semibold text-[#fd19fc] mb-8 md:mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>
                    {t.timelineTitle}
                  </motion.h2>

                  <div className="relative">
                    {/* Background Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-600 h-full hidden md:block opacity-30"></div>

                    {/* Animated Progress Line */}
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#fd19fc] to-[#00ffff] hidden md:block transition-all duration-300 ease-out"
                      style={{
                        height: `${timelineProgress * 100}%`,
                        transformOrigin: "top",
                      }}></div>

                    {/* Start Marker */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 hidden md:block">
                      <div className="relative">
                        <div className="w-6 h-6 bg-[#fd19fc] rounded-full shadow-lg shadow-[#fd19fc]/50 border-2 border-white"></div>
                        <div className="absolute inset-2 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-[#fd19fc] text-xs font-semibold whitespace-nowrap">
                          START
                        </div>
                      </div>
                    </div>

                    {/* Finish Marker */}
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 translate-y-2 hidden md:block transition-all duration-500"
                      style={{
                        bottom: 0,
                        opacity: timelineProgress > 0.9 ? 1 : 0.3,
                      }}>
                      <div className="relative">
                        <div className="w-6 h-6 bg-[#00ffff] rounded-full shadow-lg shadow-[#00ffff]/50 border-2 border-white"></div>
                        <div className="absolute inset-2 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-[#00ffff] text-xs font-semibold whitespace-nowrap">
                          FINISH
                        </div>
                      </div>
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-4 md:space-y-12">
                      {/* Day 1 */}
                      <motion.div
                        className="flex flex-col md:flex-row items-center md:space-x-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true, margin: "-100px" }}>
                        <div className="w-full md:w-1/2 md:text-right">
                          <div className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 relative">
                            {/* Designos pont pulzáló effekttel */}
                            <div className="absolute -right-4 top-1/2 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
                              <div className="relative">
                                <div className="w-4 h-4 bg-[#fd19fc] rounded-full shadow-lg shadow-[#fd19fc]/50"></div>
                                <div className="absolute inset-0 w-4 h-4 bg-[#fd19fc] rounded-full animate-ping opacity-75"></div>
                                <div className="absolute inset-1 w-2 h-2 bg-white rounded-full opacity-80"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-end mb-3">
                              <h3 className="text-lg font-semibold text-white text-center md:text-right">
                                {t.timelineDay1Title}
                              </h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {t.timelineDay1Description}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:block w-8"></div>
                        <div className="hidden md:block md:w-1/2"></div>
                      </motion.div>

                      {/* Day 2 */}
                      <motion.div
                        className="flex flex-col md:flex-row items-center md:space-x-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}>
                        <div className="hidden md:block md:w-1/2"></div>
                        <div className="hidden md:block w-8"></div>
                        <div className="w-full md:w-1/2">
                          <div className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 relative">
                            {/* Designos pont cyan színnel */}
                            <div className="absolute -left-4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
                              <div className="relative">
                                <div className="w-4 h-4 bg-[#00ffff] rounded-full shadow-lg shadow-[#00ffff]/50"></div>
                                <div className="absolute inset-0 w-4 h-4 bg-[#00ffff] rounded-full animate-ping opacity-75"></div>
                                <div className="absolute inset-1 w-2 h-2 bg-white rounded-full opacity-80"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-start mb-3">
                              <h3 className="text-lg font-semibold text-white text-center md:text-left">
                                {t.timelineDay2Title}
                              </h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {t.timelineDay2Description}
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Days 3-5 */}
                      <motion.div
                        className="flex flex-col md:flex-row items-center md:space-x-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true, margin: "-100px" }}>
                        <div className="w-full md:w-1/2 md:text-right">
                          <div className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 relative">
                            {/* Designos pont lila színnel */}
                            <div className="absolute -right-4 top-1/2 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
                              <div className="relative">
                                <div className="w-4 h-4 bg-[#fd19fc] rounded-full shadow-lg shadow-[#fd19fc]/50"></div>
                                <div className="absolute inset-0 w-4 h-4 bg-[#fd19fc] rounded-full animate-ping opacity-75"></div>
                                <div className="absolute inset-1 w-2 h-2 bg-white rounded-full opacity-80"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-end mb-3">
                              <h3 className="text-lg font-semibold text-white text-center md:text-right">
                                {t.timelineDay35Title}
                              </h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {t.timelineDay35Description}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:block w-8"></div>
                        <div className="hidden md:block md:w-1/2"></div>
                      </motion.div>

                      {/* Days 6-7 */}
                      <motion.div
                        className="flex flex-col md:flex-row items-center md:space-x-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true, margin: "-100px" }}>
                        <div className="hidden md:block md:w-1/2"></div>
                        <div className="hidden md:block w-8"></div>
                        <div className="w-full md:w-1/2">
                          <div className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 relative">
                            {/* Designos pont zöld színnel */}
                            <div className="absolute -left-4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
                              <div className="relative">
                                <div className="w-4 h-4 bg-[#00ffff] rounded-full shadow-lg shadow-[#00ffff]/50"></div>
                                <div className="absolute inset-0 w-4 h-4 bg-[#00ffff] rounded-full animate-ping opacity-75"></div>
                                <div className="absolute inset-1 w-2 h-2 bg-white rounded-full opacity-80"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-start mb-3">
                              <h3 className="text-lg font-semibold text-white text-center md:text-left">
                                {t.timelineDay67Title}
                              </h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {t.timelineDay67Description}
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Day 8 */}
                      <motion.div
                        className="flex flex-col md:flex-row items-center md:space-x-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true, margin: "-100px" }}>
                        <div className="w-full md:w-1/2 md:text-right">
                          <div className="bg-[#2C313A] p-6 rounded-xl border border-[#3C4147] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 relative">
                            {/* Designos pont lila színnel */}
                            <div className="absolute -right-4 top-1/2 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
                              <div className="relative">
                                <div className="w-4 h-4 bg-[#fd19fc] rounded-full shadow-lg shadow-[#fd19fc]/50"></div>
                                <div className="absolute inset-0 w-4 h-4 bg-[#fd19fc] rounded-full animate-ping opacity-75"></div>
                                <div className="absolute inset-1 w-2 h-2 bg-white rounded-full opacity-80"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-end mb-3">
                              <h3 className="text-lg font-semibold text-white text-center md:text-right">
                                {t.timelineDay8Title}
                              </h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {t.timelineDay8Description}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:block w-8"></div>
                        <div className="hidden md:block md:w-1/2"></div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.div
              className="text-center p-8 rounded-xl shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}>
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl border-2 border-[#fd19fc]/60 animate-pulse"></div>

              <div className="relative z-10">
                <motion.h2
                  className="text-2xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-50px" }}>
                  {t.ctaTitle}
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-300 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}>
                  {t.pricingCtaDescription}
                </motion.p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="bg-gradient-to-r from-[#00ffff] to-[#00cccc] text-[#161A20] font-semibold py-3 px-6 rounded-xl hover:from-[#00cccc] hover:to-[#00ffff] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#00ffff]/30 hover:-translate-y-1 border-2 border-[#00ffff]/50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200,
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    onClick={() => {
                      router.push("/contact");
                    }}>
                    {t.ctaContact}
                  </motion.button>

                  <motion.button
                    className="bg-gradient-to-r from-[#fd19fc] to-[#cc14cc] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#cc14cc] hover:to-[#fd19fc] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#fd19fc]/30 hover:-translate-y-1 border-2 border-[#fd19fc]/50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    onClick={() => {
                      router.push("/pricing");
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
