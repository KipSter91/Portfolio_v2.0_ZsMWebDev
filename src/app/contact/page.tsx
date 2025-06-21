"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "../../components";
import { translations } from "../../data/translations";
import { useLocale } from "../../lib/i18n";

type Locale = keyof typeof translations;

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();
  const [locale, setLocale] = useLocale();
  const t = translations[locale as Locale];
  useEffect(() => {
    // Longer loading time to see the animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);
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
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the form submission to your backend
    console.log("Form submitted:", formState);

    // Show success message
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormState({
        name: "",
        email: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };
  return (
    <>
      {" "}
      <LoadingScreen
        isLoading={isLoading}
        direction="right"
      />
      <AnimatePresence mode="wait">
        {!isLoading && !isExiting && (
          <motion.div
            className="min-h-screen bg-[#161A20] p-8 flex items-center justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <motion.button
              className="absolute top-6 left-6 bg-[#2C313A] text-white py-2 px-4 rounded hover:bg-[#fd19fc] transition-colors"
              onClick={handleGoHome}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              ← {t.close}
            </motion.button>

            <div className="w-full max-w-2xl">
              <motion.h1
                className="text-4xl font-bold mb-6 text-[#00ffff] text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}>
                {t.contact}
              </motion.h1>

              <motion.p
                className="text-xl text-gray-200 text-center mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}>
                {t.contactContent}
              </motion.p>

              <motion.div
                className="bg-[#1E2228] p-8 rounded-xl shadow-xl border-t border-l border-gray-700"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}>
                {submitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}>
                    <div className="text-5xl mb-4">✓</div>
                    <h3 className="text-2xl font-bold text-[#00ffff] mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-300">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit}>
                    <div>
                      <label
                        className="block text-sm mb-2 text-gray-300"
                        htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-[#2C313A] rounded border border-gray-700 focus:border-[#00ffff] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-2 text-gray-300"
                        htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-[#2C313A] rounded border border-gray-700 focus:border-[#00ffff] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-2 text-gray-300"
                        htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-[#2C313A] rounded border border-gray-700 focus:border-[#00ffff] focus:outline-none transition-colors"></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full bg-[#00ffff] text-black font-bold py-3 px-4 rounded hover:bg-[#fd19fc] transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      Send Message
                    </motion.button>
                  </form>
                )}
              </motion.div>

              <motion.div
                className="mt-8 flex justify-center space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}>
                {/* Social media icons - replace # with your actual links */}
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00ffff] transition-colors">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00ffff] transition-colors">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00ffff] transition-colors">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
