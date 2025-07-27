"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleContext } from "../../contexts/LocaleContext";
import { ThankYouModal } from "../../components";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

function ContactPageContent() {
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLocaleContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Check if form was successfully submitted via FormSubmit
    if (searchParams.get("success") === "true") {
      setShowThankYouModal(true);
      // Clear the URL parameter after showing modal
      const url = new URL(window.location.href);
      url.searchParams.delete("success");
      window.history.replaceState({}, "", url.toString());
    }

    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleGoHome = () => {
    setIsExiting(true);
    // Wait for exit animation to complete before navigating
    setTimeout(() => {
      router.push("/?from=contact");
    }, 500);
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <AnimatePresence mode="wait">
        {!isExiting && isLoaded && (
          <motion.div
            key="contact-page"
            className="min-h-[calc(100vh-3.5rem-4rem)] w-full bg-[#161A20] py-8 px-4 md:px-8 flex flex-col items-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <div className="w-full max-w-6xl relative">
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
                    {t.contactTitle}
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-xl text-gray-200 text-center mb-8 max-w-3xl mx-auto leading-relaxed border-b border-[#00ffff]/20 pb-4 rounded-xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true, margin: "-50px" }}>
                    {t.contactContent}
                  </motion.p>
                </div>
                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <motion.div
                    className="bg-[#1E2228] p-8 rounded-xl shadow-xl border-t border-l border-gray-700"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}>
                    <form
                      method="POST"
                      action="https://formsubmit.co/portfolio@zsoltmarku.com"
                      className="space-y-6">
                      {/* FormSubmit configuration fields */}
                      <input
                        type="hidden"
                        name="_subject"
                        value="New contact form submission from portfolio"
                      />
                      <input
                        type="hidden"
                        name="_next"
                        value={`${
                          typeof window !== "undefined"
                            ? window.location.origin
                            : ""
                        }/contact?success=true`}
                      />
                      <input
                        type="hidden"
                        name="_captcha"
                        value="false"
                      />
                      <input
                        type="hidden"
                        name="_template"
                        value="table"
                      />
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}>
                        <label
                          className="block text-sm mb-2 text-gray-300"
                          htmlFor="name">
                          {t.yourName}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 bg-[#2C313A] rounded border border-gray-700 focus:border-[#00ffff] focus:outline-none transition-colors"
                          placeholder={t.namePlaceholder}
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true, margin: "-50px" }}>
                        <label
                          className="block text-sm mb-2 text-gray-300"
                          htmlFor="email">
                          {t.yourEmail}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 bg-[#2C313A] rounded border border-gray-700 focus:border-[#00ffff] focus:outline-none transition-colors"
                          placeholder={t.emailPlaceholder}
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true, margin: "-50px" }}>
                        <label
                          className="block text-sm mb-2 text-gray-300"
                          htmlFor="message">
                          {t.yourMessage}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formState.message}
                          onChange={handleInputChange}
                          required
                          placeholder={t.messagePlaceholder}
                          className="w-full p-3 bg-[#2C313A] rounded border border-gray-700 focus:border-[#00ffff] focus:outline-none transition-colors"></textarea>
                      </motion.div>
                      <motion.button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#00ffff] to-[#00cccc] text-[#161A20] font-semibold py-3 px-6 rounded-xl hover:from-[#00cccc] hover:to-[#00ffff] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#00ffff]/30 hover:-translate-y-1 border-2 border-[#00ffff]/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsSubmitting(true)}
                        transition={{
                          duration: 0.4,
                          delay: 0.4,
                          type: "spring",
                          stiffness: 200,
                        }}
                        viewport={{ once: true, margin: "-50px" }}>
                        {t.sendMessage}
                      </motion.button>
                    </form>
                  </motion.div>
                  {/* Contact Info */}
                  <motion.div
                    className="bg-[#1E2228] p-8 rounded-xl shadow-xl border-t border-l border-gray-700"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}>
                    <motion.h2
                      className="text-2xl font-bold text-[#00ffff] mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      {t.letsConnect}
                    </motion.h2>

                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      viewport={{ once: true, margin: "-50px" }}>
                      {/* WhatsApp */}
                      <motion.a
                        href="https://wa.me/31686351440"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-[#2C313A] p-4 rounded-lg border-t border-l border-gray-700 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 transition-all duration-300 group"
                        initial={{ y: 20, opacity: 0, scale: 0.9 }}
                        whileInView={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true, margin: "-50px" }}>
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                            <FaWhatsapp className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold group-hover:text-[#00ffff] transition-colors">
                              WhatsApp
                            </h3>
                            <p className="text-gray-300">+31686351440</p>
                          </div>
                        </div>
                      </motion.a>

                      {/* Email */}
                      <motion.a
                        href="mailto:portfolio@zsoltmarku.com"
                        className="block bg-[#2C313A] p-4 rounded-lg border-t border-l border-gray-700 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                        initial={{ y: 20, opacity: 0, scale: 0.9 }}
                        whileInView={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true, margin: "-50px" }}>
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-[#00ffff] rounded-full flex items-center justify-center">
                            <MdEmail className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold group-hover:text-[#00ffff] transition-colors">
                              {t.email}
                            </h3>
                            <p className="text-gray-300">
                              portfolio@zsoltmarku.com
                            </p>
                          </div>
                        </div>
                      </motion.a>
                      {/* Let's Collaborate */}
                      <motion.div
                        className="bg-[#2C313A] p-6 rounded-lg border border-[#00ffff]/30 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 transition-all duration-300"
                        initial={{ y: 20, opacity: 0, scale: 0.9 }}
                        whileInView={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true, margin: "-50px" }}>
                        <motion.h3
                          className="text-xl font-bold text-[#00ffff] mb-3"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          viewport={{ once: true, margin: "-50px" }}>
                          {t.letsCollaborate}
                        </motion.h3>
                        <motion.p
                          className="text-gray-300 leading-relaxed"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          viewport={{ once: true, margin: "-50px" }}>
                          {t.collaborationText}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thank You Modal */}
      <ThankYouModal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
      />
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageContent />
    </Suspense>
  );
}
