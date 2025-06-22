"use client";

import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaGithub,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function LogoModal() {
  const el = useRef<HTMLSpanElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/images/profile.webp", "/images/profile-1.webp"];
  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex: number) => (prevIndex === 0 ? 1 : 0));
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: [
          "I'm Zsolt Márku",
          "Warehouse Manager",
          "Frontend Developer",
          "Creative Coder",
          "Husband to Barbara",
          "Proud Dad of 2 Cats",
          "Traveller",
          "Video Game Fanatic",
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 300,
        loop: true,
        showCursor: false,
        smartBackspace: true,
      });
      return () => typed.destroy();
    }
  }, []);
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-10 p-10 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.2 }}>
      <div className="relative w-40 h-40 rounded-xl overflow-hidden border-2 border-[#00ffff] shadow-[var(--neon-pink)]">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Zsolt Márku profile ${index + 1}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentImageIndex === index ? 1 : 0,
              zIndex: currentImageIndex === index ? 10 : 1,
            }}
            transition={{ duration: 0.8 }}
          />
        ))}
      </div>
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}>
        <div className="h-[40px] flex items-center justify-center">
          <span
            ref={el}
            className="text-3xl font-semibold text-white block"
          />
        </div>
        <motion.p
          className="italic text-[var(--neon-pink)] font-handwriting text-2xl mt-6 max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}>
          "Creativity is intelligence having fun."
          <span className="block font-handwriting text-lg text-[var(--neon-cyan)] mt-1 text-right mr-8">
            — Albert Einstein
          </span>
        </motion.p>
      </motion.div>
      <motion.div
        className="flex gap-3 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}>
        <a
          href="https://linkedin.com/in/zsoltmarku"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2C313A] hover:bg-[#00ffff] hover:text-black p-2 rounded-full transition-colors">
          <FaLinkedinIn size={20} />
        </a>
        <a
          href="https://github.com/kipster91"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2C313A] hover:bg-[#00ffff] hover:text-black p-2 rounded-full transition-colors">
          <FaGithub size={20} />
        </a>
        <a
          href="https://facebook.com/zsolt.marku"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2C313A] hover:bg-[#00ffff] hover:text-black p-2 rounded-full transition-colors">
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://instagram.com/zsoltmarku"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2C313A] hover:bg-[#00ffff] hover:text-black p-2 rounded-full transition-colors">
          <FaInstagram size={20} />
        </a>
        <a
          href="https://twitter.com/zsoltmarku"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2C313A] hover:bg-[#00ffff] hover:text-black p-2 rounded-full transition-colors">
          <FaXTwitter size={20} />
        </a>
      </motion.div>
    </motion.div>
  );
}
