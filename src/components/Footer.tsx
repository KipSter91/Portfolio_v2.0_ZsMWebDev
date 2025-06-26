"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocaleContext } from "../contexts/LocaleContext";
import {
  FaLinkedinIn,
  FaGithub,
  FaFacebookF,
  FaInstagram,
  FaShieldAlt,
  FaCookie,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import { CookieSettingsModal } from "./CookieSettingsModal";

const Footer: React.FC = () => {
  const { t } = useLocaleContext();
  const currentYear = new Date().getFullYear();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);

  // Listen for splash screen completion
  useEffect(() => {
    const handleSplashComplete = () => {
      setSplashComplete(true);
    };

    // Check if splash is already complete (in case event was missed)
    const checkSplashComplete = () => {
      const splashElement = document.querySelector("[data-splash-screen]");
      if (!splashElement) {
        setSplashComplete(true);
      }
    };

    window.addEventListener("splashComplete", handleSplashComplete);

    // Small delay to check splash status
    setTimeout(checkSplashComplete, 100);

    return () => {
      window.removeEventListener("splashComplete", handleSplashComplete);
    };
  }, []);

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/zsolt-márku-931a49298",
      icon: "linkedin",
    },
    { name: "GitHub", url: "https://github.com/kipster91", icon: "github" },
    {
      name: "Facebook",
      url: "https://www.facebook.com/marku.zsolt",
      icon: "facebook",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/markuzsolt/",
      icon: "instagram",
    },
    { name: "X", url: "https://x.com/MarkuZsolt", icon: "twitter" },
  ];
  return (
    <footer className="w-full bg-[color:var(--dark-gray)] border-t border-[color:var(--medium-gray)] mt-auto h-14">
      {/* Mobile Layout */}
      <div className="md:hidden h-full px-2">
        <div className="flex items-center justify-between h-full">
          {/* Copyright */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={
              splashComplete ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-shrink-0">
            <span className="text-xs text-[color:var(--white)]">
              © {currentYear} {t.myName}
            </span>
          </motion.div>

          {/* Privacy/Cookie Icons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={
              splashComplete ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex items-center space-x-2">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-[color:var(--white)] hover:text-[color:var(--neon-cyan)] transition-colors duration-300"
                aria-label={t.privacyPolicy}>
                <FaShieldAlt className="w-4 h-4" />
              </button>
            </motion.div>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <button
                onClick={() => setIsCookieModalOpen(true)}
                className="text-[color:var(--white)] hover:text-[color:var(--neon-cyan)] transition-colors duration-300"
                aria-label={t.cookieSettings}>
                <FaCookie className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={
              splashComplete ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex space-x-2 flex-shrink-0">
            {socialLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--white)] hover:text-[color:var(--neon-cyan)] transition-colors duration-300"
                  aria-label={link.name}>
                  {renderIcon(link.icon)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={
              splashComplete ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex items-center">
            <span className="text-sm text-[color:var(--white)]">
              © 2023 - {currentYear} {t.myName}
            </span>
          </motion.div>

          {/* Privacy Policy and Cookie Settings */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={
              splashComplete ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex items-center space-x-2 text-xs text-[color:var(--white)]">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="hover:text-[color:var(--neon-cyan)] transition-colors duration-300">
                {t.privacyPolicy}
              </button>
            </motion.div>
            <span>|</span>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <button
                onClick={() => setIsCookieModalOpen(true)}
                className="hover:text-[color:var(--neon-cyan)] transition-colors duration-300">
                {t.cookieSettings}
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={
              splashComplete ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--white)] hover:text-[color:var(--neon-cyan)] transition-colors duration-300"
                  aria-label={link.name}>
                  {renderIcon(link.icon)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      <CookieSettingsModal
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
      />
    </footer>
  );
};

const renderIcon = (icon: string) => {
  const iconClass = "w-4 h-4 md:w-5 md:h-5";
  switch (icon) {
    case "linkedin":
      return <FaLinkedinIn className={iconClass} />;
    case "github":
      return <FaGithub className={iconClass} />;
    case "facebook":
      return <FaFacebookF className={iconClass} />;
    case "instagram":
      return <FaInstagram className={iconClass} />;
    case "twitter":
      return <FaXTwitter className={iconClass} />;
    default:
      return null;
  }
};

export default Footer;
