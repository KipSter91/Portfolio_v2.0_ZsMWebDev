"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/username", icon: "github" },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/username",
      icon: "linkedin",
    },
    { name: "Twitter", url: "https://twitter.com/username", icon: "twitter" },
  ];
  return (
    <footer className="w-full bg-[color:var(--dark-gray)] border-t border-[color:var(--medium-gray)] mt-auto h-14">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex items-center"
        >
          <span className="text-[color:var(--white)] text-sm">
            © 2023 - {currentYear} Zsolt Márku
          </span>
        </motion.div>        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex space-x-6"
        >
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
    </footer>
  );
};

const renderIcon = (icon: string) => {
  switch (icon) {
    case "github":
      return <FaGithub className="w-5 h-5" />;
    case "linkedin":
      return <FaLinkedin className="w-5 h-5" />;
    case "twitter":
      return <FaTwitter className="w-5 h-5" />;
    default:
      return null;
  }
};

export default Footer;
