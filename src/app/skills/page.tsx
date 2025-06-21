"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "../../components";
import { translations } from "../../data/translations";
import { useLocale } from "../../lib/i18n";

type Locale = keyof typeof translations;

// Skill item with animation variants
const SkillItem = ({
  title,
  skills,
  delay,
}: {
  title: string;
  skills: string[];
  delay: number;
}) => (
  <motion.div
    className="bg-[#2C313A] p-6 rounded-lg shadow-lg border-t border-l border-gray-700"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay }}>
    <h3 className="text-xl font-semibold mb-4 text-[#fd19fc]">{title}</h3>
    <ul className="space-y-2">
      {skills.map((skill, index) => (
        <motion.li
          key={index}
          className="flex items-center"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + index * 0.1 }}>
          <span className="mr-2 text-[#00ffff]">•</span> {skill}
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

export default function SkillsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
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
      router.push("/?from=skills");
    }, 500);
  };

  const skillsData = {
    frontend: [
      "React & Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GSAP & Framer Motion",
    ],
    backend: ["Node.js", "Express", "MongoDB", "REST API Design"],
    design: ["Figma", "UI/UX Principles", "Responsive Design", "Animation"],
    tools: ["Git & GitHub", "VS Code", "Webpack", "Docker"],
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
            className="min-h-screen bg-[#161A20] p-8"
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

            <div className="max-w-6xl mx-auto mt-20">
              <motion.h1
                className="text-4xl font-bold mb-6 text-[#00ffff] text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}>
                {t.skills}
              </motion.h1>

              <motion.p
                className="text-xl text-gray-200 text-center mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}>
                {t.skillsContent}
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SkillItem
                  title="Frontend"
                  skills={skillsData.frontend}
                  delay={0.6}
                />
                <SkillItem
                  title="Backend"
                  skills={skillsData.backend}
                  delay={0.7}
                />
                <SkillItem
                  title="Design"
                  skills={skillsData.design}
                  delay={0.8}
                />
                <SkillItem
                  title="Tools"
                  skills={skillsData.tools}
                  delay={0.9}
                />
              </div>

              <motion.div
                className="mt-16 bg-[#2C313A] p-8 rounded-lg text-center border-t border-l border-gray-700"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}>
                <h3 className="text-2xl font-semibold mb-4 text-[#fd19fc]">
                  Always Learning
                </h3>
                <p className="text-gray-200">
                  I'm constantly expanding my skillset and staying up-to-date
                  with the latest technologies and best practices in web
                  development.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
