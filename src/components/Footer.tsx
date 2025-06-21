"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-[color:var(--white)] text-sm">
            © {currentYear} Zsolt Marku
          </span>
        </div>

        <div className="flex space-x-6">
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
        </div>
      </div>
    </footer>
  );
};

const renderIcon = (icon: string) => {
  switch (icon) {
    case "github":
      return (
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      );
    case "linkedin":
      return (
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect
            x="2"
            y="9"
            width="4"
            height="12"></rect>
          <circle
            cx="4"
            cy="4"
            r="2"></circle>
        </svg>
      );
    case "twitter":
      return (
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      );
    default:
      return null;
  }
};

export default Footer;
