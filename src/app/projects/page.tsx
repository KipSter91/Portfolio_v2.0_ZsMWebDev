"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../../data/translations";
import { useLocale } from "../../lib/i18n";

type Locale = keyof typeof translations;

interface Project {
  title: string;
  tech: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

export default function ProjectsPage() {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();
  const [locale, setLocale] = useLocale();
  const t = translations[locale as Locale];

  const handleGoHome = () => {
    setIsExiting(true);
    // Wait for exit animation to complete before navigating
    setTimeout(() => {
      router.push("/?from=projects");
    }, 500);
  };

  const projects: Project[] = [
    {
      title: "Portfolio Website",
      tech: "Next.js, TypeScript, Tailwind CSS",
      description:
        "A motion-centric, single-page portfolio with animated modals and interactive grid layout.",
    },
    {
      title: "E-commerce Platform",
      tech: "React, Node.js, MongoDB",
      description:
        "Full-stack e-commerce solution with payment processing and inventory management.",
    },
    {
      title: "Weather Dashboard",
      tech: "React, OpenWeather API, Styled Components",
      description:
        "Interactive weather app with location-based forecasts and animated weather visuals.",
    },
    {
      title: "Task Management App",
      tech: "Next.js, Firebase, Tailwind CSS",
      description:
        "Collaborative task management platform with real-time updates and user authentication.",
    },
  ];

  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };
  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
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
              {t.projects}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-200 text-center mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}>
              {t.projectsContent}
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={container}
              initial="hidden"
              animate="show">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-[#2C313A] rounded-lg overflow-hidden shadow-lg border-t border-l border-gray-700 transition-transform hover:scale-[1.02] hover:shadow-cyan-900/20"
                  variants={item}>
                  <div className="h-48 bg-gradient-to-r from-[#00ffff]/20 to-[#fd19fc]/20 flex items-center justify-center">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-5xl opacity-30">💻</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#fd19fc]">
                      {project.title}
                    </h3>
                    <p className="text-sm opacity-70 mb-3">{project.tech}</p>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#00ffff] text-black font-bold py-2 px-4 rounded hover:bg-[#fd19fc] transition-colors">
                        View Project
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
