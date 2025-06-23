"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../../data/translations";
import { useLocale } from "../../lib/i18n";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaPython,
} from "react-icons/fa";
import {
  SiMongodb,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiGithubcopilot,
  SiOpenai,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

type Locale = keyof typeof translations;

// Personal skill item
const PersonalSkillItem = ({
  skill,
  delay,
}: {
  skill: string;
  delay: number;
}) => (
  <motion.div
    className="bg-[#2C313A] p-4 rounded-lg border-t border-l border-gray-700 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 transition-all duration-300"
    initial={{ y: 20, opacity: 0, scale: 0.9 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}>
    <div className="text-center">
      <span className="text-gray-200 font-medium">{skill}</span>
    </div>
  </motion.div>
);

// Tech skill item with icon
const TechSkillItem = ({
  name,
  icon,
  delay,
}: {
  name: string;
  icon: React.ReactNode;
  delay: number;
}) => (
  <motion.div
    className="bg-[#2C313A] p-4 rounded-lg border-t border-l border-gray-700 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 transition-all duration-300"
    initial={{ y: 20, opacity: 0, scale: 0.9 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}>
    <div className="flex flex-col items-center text-center">
      <div className="text-4xl mb-3 text-[#00ffff]">{icon}</div>
      <h4 className="text-white font-semibold">{name}</h4>
    </div>
  </motion.div>
);

export default function SkillsPage() {
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const [locale, setLocale] = useLocale();
  const t = translations[locale as Locale];

  useEffect(() => {
    // Add a small delay before showing content to ensure smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    setIsExiting(true);
    // Wait for exit animation to complete before navigating
    setTimeout(() => {
      router.push("/?from=skills");
    }, 500);
  };
  const personalSkills = [
    { skill: "Problem solving" },
    { skill: "Critical thinking" },
    { skill: "Communication" },
    { skill: "Responsibility" },
    { skill: "Leadership" },
    { skill: "Teamwork" },
    { skill: "Motivation" },
    { skill: "Conflict management" },
    { skill: "Adaptability" },
    { skill: "Time management" },
    { skill: "Attention to detail" },
    { skill: "Creativity" },
  ];
  const frontendSkills = [
    { name: "HTML", icon: <FaHtml5 style={{ color: "#E34F26" }} /> },
    { name: "CSS", icon: <FaCss3Alt style={{ color: "#1572B6" }} /> },
    { name: "JavaScript", icon: <FaJs style={{ color: "#F7DF1E" }} /> },
    { name: "TypeScript", icon: <SiTypescript style={{ color: "#3178C6" }} /> },
    { name: "React", icon: <FaReact style={{ color: "#61DAFB" }} /> },
    { name: "Next.js", icon: <SiNextdotjs style={{ color: "#000000" }} /> },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss style={{ color: "#06B6D4" }} />,
    },
    { name: "Bootstrap", icon: <FaBootstrap style={{ color: "#7952B3" }} /> },
  ];
  const backendSkills = [
    { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
    { name: "MongoDB", icon: <SiMongodb style={{ color: "#47A248" }} /> },
    { name: "Python", icon: <FaPython style={{ color: "#3776AB" }} /> },
  ];
  const tools = [
    { name: "VS Code", icon: <VscCode style={{ color: "#007ACC" }} /> },
    { name: "Git", icon: <FaGitAlt style={{ color: "#F05032" }} /> },
    { name: "GitHub", icon: <FaGithub style={{ color: "#ffffff" }} /> },
    {
      name: "GitHub Copilot",
      icon: <SiGithubcopilot style={{ color: "#00D8FF" }} />,
    },
    { name: "ChatGPT", icon: <SiOpenai style={{ color: "#ffffff" }} /> },
    {
      name: "AI Prompting",
      icon: <span style={{ color: "#fd19fc" }}>💭</span>,
    },
  ];
  return (
    <AnimatePresence mode="wait">
      {!isExiting && isLoaded && (
        <motion.div
          className="min-h-[calc(100vh-3.5rem-4rem)] w-full bg-[#161A20] py-8 px-4 md:px-8 flex flex-col items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}>
          <div className="w-full max-w-5xl relative">
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
                ←
              </motion.span>
              Back
            </motion.button>
            <motion.div
              className="w-full mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <motion.h1
                className="text-3xl md:text-4xl font-bold mb-6 text-[#00ffff] text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.3,
                }}>
                {t.skills}
              </motion.h1>
              <div className="w-full bg-[#1E2228] p-6 md:p-8 rounded-xl shadow-xl border-t border-l border-gray-700 mb-8">
                {/* Personal Skills Section */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#fd19fc] text-center">
                    Personal Skills
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {personalSkills.map((item, index) => (
                      <PersonalSkillItem
                        key={item.skill}
                        skill={item.skill}
                        delay={0.7 + index * 0.1}
                      />
                    ))}
                  </div>
                </motion.div>
                {/* Coding Skills Section */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#00ffff] text-center">
                    Coding Skills
                  </h2>
                  {/* Frontend Skills */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}>
                    <h3 className="text-xl font-semibold mb-4 text-[#fd19fc] text-center">
                      Frontend
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {frontendSkills.map((tech, index) => (
                        <TechSkillItem
                          key={tech.name}
                          name={tech.name}
                          icon={tech.icon}
                          delay={1.5 + index * 0.1}
                        />
                      ))}
                    </div>
                  </motion.div>
                  {/* Backend Skills */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.2 }}>
                    <h3 className="text-xl font-semibold mb-4 text-[#fd19fc] text-center">
                      Backend
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {backendSkills.map((tech, index) => (
                        <TechSkillItem
                          key={tech.name}
                          name={tech.name}
                          icon={tech.icon}
                          delay={2.3 + index * 0.1}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
                {/* Tools Section */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.8 }}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#fd19fc] text-center">
                    Tools & Technologies
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tools.map((tool, index) => (
                      <TechSkillItem
                        key={tool.name}
                        name={tool.name}
                        icon={tool.icon}
                        delay={2.9 + index * 0.1}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
              {/* Always Learning Section */}
              <motion.div
                className="bg-[#2C313A] p-8 rounded-lg text-center border-t border-l border-gray-700 hover:shadow-lg hover:shadow-[#fd19fc]/10 hover:-translate-y-1 transition-all duration-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 3.5 }}>
                <h3 className="text-2xl font-semibold mb-4 text-[#fd19fc]">
                  Always Learning
                </h3>
                <p className="text-gray-200">
                  I'm constantly expanding my skillset and staying up-to-date
                  with the latest technologies and best practices in web
                  development. Currently focusing on exploring new frameworks
                  and tools to enhance my development capabilities.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
