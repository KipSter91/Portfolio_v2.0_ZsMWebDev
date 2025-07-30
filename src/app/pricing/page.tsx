"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleContext } from "../../contexts/LocaleContext";

export default function PricingPage() {
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { t, locale } = useLocaleContext();

  useEffect(() => {
    // Scroll to top when page loads (from any CTA button)
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/?from=pricing");
    }, 500);
  };

  const packages = [
    {
      id: "budget",
      name: t.budgetPackage,
      priceEuro: "€749",
      priceHuf: "299 000 Ft",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-400",
      shadowColor: "shadow-blue-500/20",
      hoverShadow: "hover:shadow-blue-500/30",
      subtitle: t.budgetSubtitle,
      features: t.budgetFeatures,
    },
    {
      id: "standard",
      name: t.standardPackage,
      priceEuro: "€999",
      priceHuf: "399 000 Ft",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-400",
      shadowColor: "shadow-purple-500/20",
      hoverShadow: "hover:shadow-purple-500/30",
      subtitle: t.standardSubtitle,
      recommended: true,
      features: t.standardFeatures,
    },
    {
      id: "pro",
      name: t.proPackage,
      priceEuro: "€1349",
      priceHuf: "539 000 Ft",
      color: "from-yellow-500 to-yellow-600",
      borderColor: "border-yellow-400",
      shadowColor: "shadow-yellow-500/20",
      hoverShadow: "hover:shadow-yellow-500/30",
      subtitle: t.proSubtitle,
      features: t.proFeatures,
    },
    {
      id: "custom",
      name: t.customPackage,
      priceEuro: t.customPrice,
      priceHuf: t.customPrice,
      color: "from-orange-500 to-orange-600",
      borderColor: "border-orange-400",
      shadowColor: "shadow-orange-500/20",
      hoverShadow: "hover:shadow-orange-500/30",
      subtitle: t.customSubtitle,
      description: t.customDescription,
      features: t.customFeatures,
    },
  ];

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
            {/* Back Button */}
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
                {/* Header Section */}
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}>
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[#00ffff] text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                    viewport={{ once: true, margin: "-50px" }}>
                    {t.pricingTitle}
                  </motion.h1>

                  <motion.p
                    className="text-lg text-gray-200 text-center mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true, margin: "-50px" }}>
                    {t.pricingSubtitle}
                  </motion.p>
                </motion.div>

                {/* Packages Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}>
                  {packages.map((pkg, index) => (
                    <motion.article
                      key={pkg.id}
                      className="bg-[#2C313A] p-6 rounded-lg border-l border-t border-gray-700 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 transition-all duration-300 relative"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                      }}
                      viewport={{ once: true, margin: "-50px" }}>
                      {/* Recommended Badge */}
                      {pkg.recommended && (
                        <motion.div
                          className="absolute -top-4 -right-3 z-10"
                          initial={{ scale: 0, rotate: -45 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            delay: 0.5 + index * 0.1,
                          }}
                          viewport={{ once: true }}>
                          <div className="bg-[#00ffff] text-[#161A20] text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-[#00ffff]/20 shadow-lg shadow-[#00ffff]/30">
                            {t.recommended}
                          </div>
                        </motion.div>
                      )}

                      {/* Package Header */}
                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}>
                        <div className="flex items-center gap-3 mb-3">
                          <motion.h2
                            className="text-2xl font-bold text-[#fd19fc]"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.3 + index * 0.1,
                            }}
                            viewport={{ once: true }}>
                            {pkg.name}
                          </motion.h2>
                        </div>

                        <motion.div
                          className="text-3xl font-black text-[#00ffff] mb-3"
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            delay: 0.4 + index * 0.1,
                          }}
                          viewport={{ once: true }}>
                          {/* Show HUF for Hungarian, EUR for others */}
                          {locale === "hu" ? pkg.priceHuf : pkg.priceEuro}
                          {pkg.priceEuro !== "Konzultáció alapján" &&
                            pkg.priceHuf !== "Konzultáció alapján" &&
                            pkg.priceEuro !== "Quote on request" &&
                            pkg.priceEuro !== "Op aanvraag" &&
                            t.customPrice !== pkg.priceEuro && (
                              <span className="text-sm font-normal text-gray-400">
                                {locale === "hu"
                                  ? " + ÁFA"
                                  : locale === "nl"
                                  ? " ex. BTW"
                                  : " ex. VAT"}
                              </span>
                            )}
                        </motion.div>

                        <motion.p
                          className="text-gray-300 text-sm leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.5 + index * 0.1,
                          }}
                          viewport={{ once: true, margin: "-50px" }}>
                          {pkg.subtitle}
                          {pkg.description && (
                            <>
                              <br />
                              <span className="text-gray-400 text-xs">
                                {pkg.description}
                              </span>
                            </>
                          )}
                        </motion.p>
                      </motion.div>

                      {/* Features List */}
                      <motion.ul
                        className="space-y-3 mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}>
                        {/* Show regular features - for Pro package, exclude CMS related features */}
                        {(pkg.id === "pro"
                          ? pkg.features.slice(0, 10) // First 10 features before CMS section
                          : pkg.features
                        ).map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.7 + index * 0.1 + featureIndex * 0.05,
                            }}
                            viewport={{ once: true, margin: "-50px" }}>
                            <motion.span
                              className="text-[#00ffff] text-sm mt-1.5 select-none"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                delay: 0.8 + index * 0.1 + featureIndex * 0.05,
                              }}
                              viewport={{ once: true, margin: "-50px" }}>
                              ✓
                            </motion.span>
                            <span className="leading-relaxed">{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>

                      {/* CMS Section - Only for Pro package */}
                      {pkg.id === "pro" && (
                        <motion.div
                          className="mt-6 mb-6 border border-[#00ffff]/30 rounded-lg p-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.8 + index * 0.1,
                          }}
                          viewport={{ once: true, margin: "-50px" }}>
                          {/* CMS Header */}
                          <div className="text-center mb-4">
                            <motion.span
                              className="text-sm font-bold text-[#fd19fc] inline-block"
                              animate={{ scale: [1, 1.04, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}>
                              {pkg.features[10]}{" "}
                              {/* "OPTIONAL: Sanity CMS Integration (+€250)" */}
                            </motion.span>
                          </div>

                          {/* CMS Features */}
                          <ul className="space-y-2">
                            {pkg.features.slice(11).map(
                              (
                                feature,
                                subIndex // Features from index 11 onwards
                              ) => (
                                <motion.li
                                  key={subIndex}
                                  className="flex items-start gap-3 text-sm text-gray-300"
                                  initial={{ opacity: 0, x: -15 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: 0.9 + index * 0.1 + subIndex * 0.1,
                                  }}
                                  viewport={{ once: true, margin: "-50px" }}>
                                  <span className="text-gray-400 text-xs mt-1">
                                    •
                                  </span>
                                  <span className="leading-relaxed">
                                    {feature}
                                  </span>
                                </motion.li>
                              )
                            )}
                          </ul>
                        </motion.div>
                      )}

                      {/* CTA Button */}
                      <motion.button
                        className="w-full bg-gradient-to-r from-[#fd19fc] to-[#cc14cc] text-white font-semibold py-3 px-4 rounded-xl hover:from-[#cc14cc] hover:to-[#fd19fc] transition-all duration-300 shadow-lg hover:shadow-[#fd19fc]/30 hover:-translate-y-1 border-2 border-[#fd19fc]/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.9 + index * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                        onClick={() => {
                          router.push(`/contact?package=${pkg.id}`);
                        }}>
                        {pkg.id === "custom" ? t.requestQuote : t.choosePackage}
                      </motion.button>
                    </motion.article>
                  ))}
                </motion.div>

                {/* VAT Information */}
                <motion.div
                  className="w-full max-w-5xl mx-auto bg-[#2C313A] p-6 md:p-8 rounded-xl shadow-xl border-t border-l border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.0 }}
                  viewport={{ once: true, margin: "-100px" }}>
                  <motion.h2
                    className="text-xl md:text-2xl font-bold mb-4 text-[#00ffff]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 1.1,
                    }}
                    viewport={{ once: true, margin: "-50px" }}>
                    {t.vatInfoTitle}
                  </motion.h2>

                  <motion.p
                    className="text-base text-gray-200 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    viewport={{ once: true, margin: "-50px" }}>
                    {t.vatInfoDescription}
                  </motion.p>
                </motion.div>
              </div>
            </motion.section>

            {/* Content Update Policy Section */}
            <motion.section
              className="w-full mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <div className="w-full bg-[#1E2228] p-6 md:p-8 rounded-xl shadow-xl border-t border-l border-gray-700">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}>
                  <motion.h2
                    className="text-xl md:text-2xl font-bold mb-4 text-[#fd19fc]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.3,
                    }}
                    viewport={{ once: true, margin: "-50px" }}>
                    {t.contentUpdatePolicyTitle}
                  </motion.h2>

                  <motion.p
                    className="text-base text-gray-200 mb-4 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true, margin: "-50px" }}>
                    {t.contentUpdatePolicyDescription}
                  </motion.p>

                  <motion.div
                    className="bg-[#2C313A] p-4 rounded-lg border border-gray-600 mb-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true, margin: "-50px" }}>
                    <p className="text-[#00ffff] font-semibold text-lg mb-2">
                      {t.contentUpdateRate}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {t.contentUpdateIncludes}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>

            {/* Contact CTA Section */}
            <motion.section
              className="w-full mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="w-full bg-[#1E2228] p-6 md:p-8 rounded-xl shadow-xl border-t border-l border-gray-700">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}>
                  <motion.h2
                    className="text-2xl md:text-3xl font-bold mb-4 text-[#fd19fc]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.3,
                    }}
                    viewport={{ once: true, margin: "-50px" }}>
                    {t.questionsTitle}
                  </motion.h2>

                  <motion.p
                    className="text-lg text-gray-200 mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true, margin: "-50px" }}>
                    {t.questionsDescription}
                  </motion.p>

                  <motion.button
                    className="bg-gradient-to-r from-[#00ffff] to-[#00cccc] text-[#161A20] font-semibold py-3 px-8 rounded-xl hover:from-[#00cccc] hover:to-[#00ffff] transition-all duration-300 shadow-lg hover:shadow-[#00ffff]/30 hover:-translate-y-1 border-2 border-[#00ffff]/50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    onClick={() => router.push("/contact")}>
                    {t.contactCta}
                  </motion.button>
                </motion.div>
              </div>
            </motion.section>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
}
