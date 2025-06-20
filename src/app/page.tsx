"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GridSection,
  AnimatedModal,
  LogoModal,
  LangSwitcher,
} from "../components";
import { translations } from "../data/translations";
import { useLocale } from "../lib/i18n";

type Locale = keyof typeof translations;

// Easter egg message in console
const consoleStyles = [
  "color: #00ffff",
  "background-color: #161A20",
  "font-size: 20px",
  "padding: 10px",
  "border-radius: 5px",
  "border: 2px solid #fd19fc",
].join(";");

export default function Home() {
  const [modal, setModal] = useState<string | null>(null);
  const [locale, setLocale] = useLocale();
  const t = translations[locale as Locale];

  // Console easter egg
  useEffect(() => {
    console.log(
      "%c👋 Hey there, explorer! Welcome to my portfolio!",
      consoleStyles
    );
  }, []);

  return (
    <motion.div
      className="min-h-screen text-white relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>
      <LangSwitcher
        locale={locale}
        setLocale={setLocale}
      />
      <GridSection onOpenModal={setModal} />
      <AnimatedModal
        isOpen={!!modal}
        onClose={() => setModal(null)}>
        {modal === "about" && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4 text-[#00ffff]">
              {t.about}
            </h2>
            <p className="text-lg">{t.aboutContent}</p>
          </motion.div>
        )}
        {modal === "skills" && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4 text-[#00ffff]">
              {t.skills}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#fd19fc]">
                  Frontend
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>GSAP & Framer Motion</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#fd19fc]">
                  Backend
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>MongoDB</li>
                  <li>REST API Design</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
        {modal === "projects" && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4 text-[#00ffff]">
              {t.projects}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="border border-[#2C313A] p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-[#fd19fc]">
                  Portfolio Website
                </h3>
                <p className="text-sm opacity-70 mb-2">
                  Next.js, TypeScript, Tailwind CSS
                </p>
                <p>
                  A motion-centric, single-page portfolio with animated modals
                  and interactive grid layout.
                </p>
              </div>
              <div className="border border-[#2C313A] p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-[#fd19fc]">
                  Project Name
                </h3>
                <p className="text-sm opacity-70 mb-2">
                  React, Node.js, MongoDB
                </p>
                <p>
                  Brief project description highlighting key features and
                  technologies.
                </p>
              </div>
            </div>
          </motion.div>
        )}
        {modal === "contact" && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4 text-[#00ffff]">
              {t.contact}
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  className="block text-sm mb-1"
                  htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 bg-[#2C313A] rounded border border-gray-700 focus:border-[#00ffff] focus:outline-none"
                />
              </div>
              <div>
                <label
                  className="block text-sm mb-1"
                  htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 bg-[#2C313A] rounded border border-gray-700 focus:border-[#00ffff] focus:outline-none"
                />
              </div>
              <div>
                <label
                  className="block text-sm mb-1"
                  htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-2 bg-[#2C313A] rounded border border-gray-700 focus:border-[#00ffff] focus:outline-none"></textarea>
              </div>
              <button
                type="button"
                className="bg-[#00ffff] text-black font-bold py-2 px-4 rounded hover:bg-[#fd19fc] transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>
        )}
        {modal === "logo" && <LogoModal />}
      </AnimatedModal>
    </motion.div>
  );
}
