"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleContext } from "../contexts/LocaleContext";
import { type Locale } from "../contexts/LocaleContext";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { locale, setLocale, t } = useLocaleContext();
  const languages = [
    { code: "en" as Locale, label: "EN", name: "English" },
    { code: "hu" as Locale, label: "HU", name: "Magyar" },
    { code: "nl" as Locale, label: "NL", name: "Nederlands" },
  ];

  // Disable body scroll when menu is open - same as AnimatedModal
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        window.scrollTo({ top: scrollY });
      };
    }
  }, [isOpen]);

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ zIndex: 999999999 }}
          onClick={onClose}
        >
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#1E2228] rounded-xl border border-[#00ffff]/20 shadow-2xl relative max-w-md w-full overflow-hidden"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 255, 255, 0.1)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Same style as AnimatedModal */}
            <motion.button
              className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl p-2 hover:bg-[#2C313A] rounded-xl w-8 h-8 flex items-center justify-center transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal"
            >
              ×
            </motion.button>

            {/* Content with nav links */}
            <div className="p-6 pt-20 space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Link
                  href="/services"
                  onClick={onClose}
                  className="flex items-center gap-4 w-full p-4 rounded-xl border border-[#00ffff]/20 hover:border-[#00ffff]/50 bg-[#2C313A]/30 hover:bg-[#2C313A]/50 text-[#00ffff] hover:text-[#fd19fc] transition-all duration-300 group"
                >
                  <MdMiscellaneousServices className="flex-shrink-0 text-2xl" />
                  <span className="text-lg font-medium">{t.services}</span>
                  <IoChevronForward className="ml-auto group-hover:translate-x-1 transition-transform text-lg" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Link
                  href="/pricing"
                  onClick={onClose}
                  className="flex items-center gap-4 w-full p-4 rounded-xl border border-[#fd19fc]/20 hover:border-[#fd19fc]/50 bg-[#2C313A]/30 hover:bg-[#2C313A]/50 text-[#fd19fc] hover:text-[#00ffff] transition-all duration-300 group"
                >
                  <FaDollarSign className="flex-shrink-0 text-2xl" />
                  <span className="text-lg font-medium">{t.pricing}</span>
                  <IoChevronForward className="ml-auto group-hover:translate-x-1 transition-transform text-lg" />
                </Link>
              </motion.div>
            </div>

            {/* Language selector */}
            <motion.div 
              className="p-6 border-t border-[#00ffff]/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="flex justify-center items-center">
                <div className="inline-flex bg-[#2C313A] p-1 rounded-xl border border-[#00ffff]/20">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`px-4 py-2 rounded-lg font-bold text-sm uppercase transition-all duration-300
                        ${
                          locale === lang.code
                            ? "bg-gradient-to-b from-[#00ffff] to-[#00cccc] text-[#1E2228]"
                            : "text-[color:var(--white)] hover:text-[color:var(--neon-cyan)] hover:bg-[#3A414D]/70"
                        }
                      `}
                      onClick={() => {
                        setLocale(lang.code);
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use portal to render at document body level
  return typeof window !== "undefined"
    ? createPortal(menuContent, document.body)
    : null;
};

export default MobileMenu;
