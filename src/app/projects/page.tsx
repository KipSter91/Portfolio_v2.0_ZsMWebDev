"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../../data/translations";
import { useLocale } from "../../lib/i18n";
import { FiRefreshCw } from "react-icons/fi";

type Locale = keyof typeof translations;

interface Project {
  title: string;
  tech: string;
  description: string;
  imageUrl?: string;
  link?: string;
  color: string;
}

// CSS 3D Cube Component
function ProjectCube({
  projects,
  onProjectSelect,
  selectedProject,
  isTouchDragging,
  setIsTouchDragging,
}: {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  selectedProject: Project | null;
  isTouchDragging: boolean;
  setIsTouchDragging: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [rotationX, setRotationX] = useState(-20); // Start slightly tilted down
  const [rotationY, setRotationY] = useState(-45); // Start slightly rotated to the right
  const [isRotating, setIsRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cubeContainerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastTouchPos = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);

  // Prevent page scroll during cube rotation on mobile (touch only)
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (isTouchDragging) {
        e.preventDefault();
      }
    };
    const preventGlobalScroll = (e: TouchEvent) => {
      if (isTouchDragging) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("touchstart", preventGlobalScroll, {
      passive: false,
    });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    return () => {
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("touchstart", preventGlobalScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isTouchDragging]);

  const handleFaceClick = (index: number) => {
    if (projects[index] && !isDragging) {
      onProjectSelect(projects[index]);
    }
  };
  // Responsive cube size
  const [cubeSize, setCubeSize] = useState(300);
  useEffect(() => {
    const updateCubeSize = () => {
      if (window.innerWidth < 640) {
        setCubeSize(180); // mobile
      } else if (window.innerWidth < 1024) {
        setCubeSize(220); // tablet
      } else {
        setCubeSize(300); // desktop
      }
    };
    updateCubeSize();
    window.addEventListener("resize", updateCubeSize);
    return () => window.removeEventListener("resize", updateCubeSize);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      setIsDragging(true);
    }

    setRotationY((prev) => prev + deltaX * 0.8);
    setRotationX((prev) => prev - deltaY * 0.8);

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    setTimeout(() => setIsDragging(false), 100);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsTouchDragging(true);
      setIsDragging(false);
      const touch = e.touches[0];
      lastTouchPos.current = { x: touch.clientX, y: touch.clientY };
      // Lock scroll for drag only if modal is not open
      if (!selectedProject) scrollLock.lock();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastTouchPos.current.x;
      const deltaY = touch.clientY - lastTouchPos.current.y;

      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        setIsDragging(true);
      }

      setRotationY((prev) => prev + deltaX * 0.6);
      setRotationX((prev) => prev - deltaY * 0.6);

      lastTouchPos.current = { x: touch.clientX, y: touch.clientY };
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsTouchDragging(false);
    setTimeout(() => setIsDragging(false), 100);
    // Unlock scroll for drag only if modal is not open
    if (!selectedProject) scrollLock.unlock();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Reset Button - Top Right */}
      <motion.button
        className="z-20 flex items-center justify-center bg-[#2C313A] text-[#00ffff] border border-[#00ffff]/30 p-2 md:p-3 rounded-lg hover:bg-[#fd19fc] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#fd19fc]/30 absolute right-2 top-2 md:top-4 md:right-4"
        style={{ fontSize: cubeSize < 200 ? 20 : 24 }}
        onClick={() => {
          if (isRotating) return;
          setIsRotating(true);
          setRotationX(-20); // Reset to initial tilted state
          setRotationY(-45); // Reset to initial rotated state
          setTimeout(() => setIsRotating(false), 600);
        }}
        disabled={isRotating}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Reset view">
        <FiRefreshCw />
      </motion.button>
      {/* Drag Instructions */}
      <div
        className="z-20 text-[#00ffff]/70 text-xs md:text-sm bg-[#2C313A]/80 backdrop-blur-sm px-2 py-1 md:px-3 md:py-2 rounded-lg border border-[#00ffff]/20 absolute left-2 top-2 md:left-4 md:top-4"
        style={{ maxWidth: cubeSize * 1.2 }}>
        <div className="hidden md:block">Click & drag to rotate</div>
        <div className="md:hidden">Swipe to rotate</div>
      </div>{" "}
      <div
        ref={cubeContainerRef}
        className="relative mb-8 select-none cursor-grab active:cursor-grabbing touch-none overscroll-none"
        style={{
          perspective: "1200px",
          width: cubeSize * 2.2,
          height: cubeSize * 2.2,
          touchAction: "none",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "none",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: rotationX,
            rotateY: rotationY,
          }}
          transition={{
            type: isDragging ? "tween" : "spring",
            damping: isDragging ? 0 : 25,
            stiffness: isDragging ? 0 : 200,
            duration: isDragging ? 0 : 0.8,
          }}>
          {/* Front Face */}
          <motion.div
            className="absolute bg-gradient-to-br from-[#2C313A] to-[#1E2228] border-2 border-[#00ffff]/30 rounded-lg cursor-pointer flex flex-col items-center justify-center p-4 text-center hover:border-[#fd19fc] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/20"
            style={{
              width: cubeSize,
              height: cubeSize,
              transform: `translateZ(${cubeSize / 2}px)`,
              left: "50%",
              top: "50%",
              marginLeft: -cubeSize / 2,
              marginTop: -cubeSize / 2,
            }}
            onClick={() => handleFaceClick(0)}
            whileHover={{
              borderColor: "#fd19fc",
              boxShadow: "0 0 20px rgba(253, 25, 252, 0.3)",
            }}>
            <div className="monitor-frame">
              <img
                src="/images/oldportfolio.png"
                alt="Old Portfolio screenshot"
                className="monitor-frame__screen"
              />
              <div className="monitor-frame__bezel" />
              <div className="monitor-frame__stand" />
            </div>
            <div className="mt-3 text-base font-semibold text-white text-center">
              {projects[0]?.title || "Old Portfolio"}
            </div>
          </motion.div>

          {/* Back Face */}
          <motion.div
            className="absolute bg-gradient-to-br from-[#2C313A] to-[#1E2228] border-2 border-[#00ffff]/30 rounded-lg cursor-pointer flex flex-col items-center justify-center p-4 text-center hover:border-[#fd19fc] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/20"
            style={{
              width: cubeSize,
              height: cubeSize,
              transform: `rotateY(180deg) translateZ(${cubeSize / 2}px)`,
              left: "50%",
              top: "50%",
              marginLeft: -cubeSize / 2,
              marginTop: -cubeSize / 2,
            }}
            onClick={() => handleFaceClick(1)}
            whileHover={{
              borderColor: "#fd19fc",
              boxShadow: "0 0 20px rgba(253, 25, 252, 0.3)",
            }}>
            <div className="monitor-frame">
              <img
                src="/images/istoneflexwork.png"
                alt="IstOne Flexwork screenshot"
                className="monitor-frame__screen"
              />
              <div className="monitor-frame__bezel" />
              <div className="monitor-frame__stand" />
            </div>
            <div className="mt-3 text-base font-semibold text-white text-center">
              {projects[1]?.title || "IstOneFlexWork"}
            </div>
          </motion.div>

          {/* Right Face */}
          <motion.div
            className="absolute bg-gradient-to-br from-[#2C313A] to-[#1E2228] border-2 border-[#00ffff]/30 rounded-lg cursor-pointer flex flex-col items-center justify-center p-4 text-center hover:border-[#fd19fc] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/20"
            style={{
              width: cubeSize,
              height: cubeSize,
              transform: `rotateY(90deg) translateZ(${cubeSize / 2}px)`,
              left: "50%",
              top: "50%",
              marginLeft: -cubeSize / 2,
              marginTop: -cubeSize / 2,
            }}
            onClick={() => handleFaceClick(2)}
            whileHover={{
              borderColor: "#fd19fc",
              boxShadow: "0 0 20px rgba(253, 25, 252, 0.3)",
            }}>
            <div className="monitor-frame">
              <img
                src="/images/stepio.png"
                alt="StepIO screenshot"
                className="monitor-frame__screen"
              />
              <div className="monitor-frame__bezel" />
              <div className="monitor-frame__stand" />
            </div>
            <div className="mt-3 text-base font-semibold text-white text-center">
              {projects[2]?.title || "StepIO"}
            </div>
          </motion.div>

          {/* Left Face */}
          <motion.div
            className="absolute bg-gradient-to-br from-[#2C313A] to-[#1E2228] border-2 border-[#00ffff]/30 rounded-lg cursor-pointer flex flex-col items-center justify-center p-4 text-center hover:border-[#fd19fc] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/20"
            style={{
              width: cubeSize,
              height: cubeSize,
              transform: `rotateY(-90deg) translateZ(${cubeSize / 2}px)`,
              left: "50%",
              top: "50%",
              marginLeft: -cubeSize / 2,
              marginTop: -cubeSize / 2,
            }}
            onClick={() => handleFaceClick(3)}
            whileHover={{
              borderColor: "#fd19fc",
              boxShadow: "0 0 20px rgba(253, 25, 252, 0.3)",
            }}>
            <div className="monitor-frame">
              <img
                src="/images/guccoaching.png"
                alt="G.U.C. Coaching screenshot"
                className="monitor-frame__screen"
              />
              <div className="monitor-frame__bezel" />
              <div className="monitor-frame__stand" />
            </div>
            <div className="mt-3 text-base font-semibold text-white text-center">
              {projects[3]?.title || "G.U.C. Coaching"}
            </div>
          </motion.div>

          {/* Top Face */}
          <motion.div
            className="absolute bg-gradient-to-br from-[#2C313A] to-[#1E2228] border-2 border-[#00ffff]/30 rounded-lg cursor-pointer flex flex-col items-center justify-center p-4 text-center hover:border-[#fd19fc] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/20"
            style={{
              width: cubeSize,
              height: cubeSize,
              transform: `rotateX(90deg) translateZ(${cubeSize / 2}px)`,
              left: "50%",
              top: "50%",
              marginLeft: -cubeSize / 2,
              marginTop: -cubeSize / 2,
            }}
            onClick={() => handleFaceClick(4)}
            whileHover={{
              borderColor: "#fd19fc",
              boxShadow: "0 0 20px rgba(253, 25, 252, 0.3)",
            }}>
            <div className="monitor-frame">
              <img
                src="/images/dishcovery.png"
                alt="Dishcovery screenshot"
                className="monitor-frame__screen"
              />
              <div className="monitor-frame__bezel" />
              <div className="monitor-frame__stand" />
            </div>
            <div className="mt-3 text-base font-semibold text-white text-center">
              {projects[4]?.title || "Dishcovery"}
            </div>
          </motion.div>

          {/* Bottom Face */}
          <motion.div
            className="absolute bg-gradient-to-br from-[#2C313A] to-[#1E2228] border-2 border-[#00ffff]/30 rounded-lg cursor-pointer flex flex-col items-center justify-center p-4 text-center hover:border-[#fd19fc] transition-all duration-300 hover:shadow-lg hover:shadow-[#fd19fc]/20"
            style={{
              width: cubeSize,
              height: cubeSize,
              transform: `rotateX(-90deg) translateZ(${cubeSize / 2}px)`,
              left: "50%",
              top: "50%",
              marginLeft: -cubeSize / 2,
              marginTop: -cubeSize / 2,
            }}
            onClick={() => handleFaceClick(5)}
            whileHover={{
              borderColor: "#fd19fc",
              boxShadow: "0 0 20px rgba(253, 25, 252, 0.3)",
            }}>
            <div className="monitor-frame">
              <img
                src="/images/ampcoplatecutting.png"
                alt="Ampco Plate Calculator screenshot"
                className="monitor-frame__screen"
              />
              <div className="monitor-frame__bezel" />
              <div className="monitor-frame__stand" />
            </div>
            <div className="mt-3 text-base font-semibold text-white text-center">
              {projects[5]?.title || "Ampco Plate Calculator"}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTouchDragging, setIsTouchDragging] = useState(false);
  const router = useRouter();
  const [locale, setLocale] = useLocale();
  const t = translations[locale as Locale];

  // Modal scroll lock effect (must be inside ProjectsPage)
  useEffect(() => {
    if (selectedProject && !isTouchDragging) {
      scrollLock.lock();
      return () => scrollLock.unlock();
    }
    if (!selectedProject && !isTouchDragging) {
      scrollLock.unlock();
    }
  }, [selectedProject, isTouchDragging]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/?from=projects");
    }, 500);
  };

  const projects: Project[] = [
    {
      title: "Old Portfolio",
      tech: "React, Next.js, TypeScript, Framer Motion",
      description:
        "My previous portfolio with older projects, showing my learning curve and early works.",
      color: "#00ffff",
    },
    {
      title: "IstOneFlexWork",
      tech: "React, Tailwind CSS, Vite",
      description: "Solar Panel Cleaning landing page for IstOneFlexWork.",
      color: "#fd19fc",
    },
    {
      title: "StepIO",
      tech: "React, Android, Firebase, Tailwind CSS",
      description: "Activity Tracker landing page and Android app for StepIO.",
      color: "#00ff88",
    },
    {
      title: "G.U.C. Coaching",
      tech: "React, Tailwind CSS, Vercel",
      description: "Personal trainer landing page for G.U.C. Coaching.",
      color: "#ff6b6b",
    },
    {
      title: "Dishcovery",
      tech: "React Native, Expo, Node.js",
      description: "Recipes app for discovering and sharing dishes.",
      color: "#ffd93d",
    },
    {
      title: "Ampco  Calculator",
      tech: "React, TypeScript, Tailwind CSS",
      description: "Plate Cutting Calculator for Ampco.",
      color: "#a8e6cf",
    },
  ];

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };
  return (
    <AnimatePresence mode="wait">
      {!isExiting && isLoaded && (
        <motion.div
          className="min-h-[calc(100vh-3.5rem-4rem)] w-full bg-[#161A20] py-8 px-4 md:px-8 flex flex-col items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}>
          <div className="w-full max-w-6xl relative">
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
              {t.back}
            </motion.button>

            <motion.div
              className="w-full mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="w-full bg-[#1E2228] p-6 md:p-8 rounded-xl shadow-xl border-t border-l border-gray-700 mb-8">
                <motion.h1
                  className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[#00ffff] text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.3,
                  }}>
                  {t.projects}
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl text-gray-200 text-center mb-8 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}>
                  {t.projectsContent}
                </motion.p>
                <motion.div
                  className="text-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}>
                  <p className="text-[#fd19fc] font-semibold mb-2">
                    Interactive 3D Project Cube
                  </p>
                  <p className="text-gray-400 text-sm">
                    Click on any face to explore the project
                  </p>
                </motion.div>
                <motion.div
                  className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-[#161A20] to-[#1E2228] border border-gray-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}>
                  <ProjectCube
                    projects={projects}
                    onProjectSelect={handleProjectSelect}
                    selectedProject={selectedProject}
                    isTouchDragging={isTouchDragging}
                    setIsTouchDragging={setIsTouchDragging}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Project Details Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeProjectModal}>
                <motion.div
                  className="bg-[#1E2228] rounded-xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border-t border-l border-gray-700 shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#00ffff] mb-2">
                        {selectedProject.title}
                      </h2>
                      <p className="text-[#fd19fc] font-medium">
                        {selectedProject.tech}
                      </p>
                    </div>
                    <motion.button
                      className="text-gray-400 hover:text-white text-2xl"
                      onClick={closeProjectModal}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}>
                      ×
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    <div className="h-48 bg-gradient-to-r from-[#00ffff]/20 to-[#fd19fc]/20 rounded-lg flex items-center justify-center border border-gray-700">
                      <div className="text-6xl opacity-30">💻</div>
                    </div>

                    <p className="text-gray-200 leading-relaxed text-lg">
                      {selectedProject.description}
                    </p>

                    <div className="flex gap-4 pt-4">
                      <motion.button
                        className="bg-[#00ffff] text-black font-bold py-2 px-6 rounded-lg hover:bg-[#fd19fc] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        View Project
                      </motion.button>
                      <motion.button
                        className="bg-[#2C313A] text-white py-2 px-6 rounded-lg hover:bg-[#fd19fc] transition-colors border border-gray-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        Source Code
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Scroll lock helpers ---
const scrollLock = {
  y: 0,
  locked: false,
  lock() {
    if (this.locked) return;
    this.y = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${this.y}px`;
    this.locked = true;
  },
  unlock() {
    if (!this.locked) return;
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    const y = this.y;
    this.locked = false;
    if (y) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: y });
      });
    }
  },
};
