"use client";

import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleContext } from "../../contexts/LocaleContext";
import { useCustomBackButton } from "../../hooks/useCustomBackButton";
import {
  FiRefreshCw,
  FiExternalLink,
  FiGithub,
  FiDownload,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { FaReact, FaAndroid, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiExpo,
  SiFramer,
  SiGreensock,
  SiPython,
  SiFlask,
} from "react-icons/si";

interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  technologies?: { name: string; icon: React.ReactNode }[];
  image?: string;
  liveDemo?: string;
  sourceCode?: string;
  pdfs?: { name: string; filename: string }[];
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

// Cube public handle
interface ProjectCubeHandle {
  reset: () => void;
}

const ProjectCube = React.memo(
  React.forwardRef<
    ProjectCubeHandle,
    {
      projects: Project[];
      onProjectSelect: (project: Project) => void;
      selectedProject: Project | null;
      isTouchDragging: boolean;
      setIsTouchDragging: React.Dispatch<React.SetStateAction<boolean>>;
    }
  >(
    (
      {
        projects,
        onProjectSelect,
        selectedProject,
        isTouchDragging,
        setIsTouchDragging,
      },
      ref
    ) => {
      const [isDragging, setIsDragging] = useState(false);
      const cubeInnerRef = useRef<HTMLDivElement>(null);
      const lastMouse = useRef({ x: 0, y: 0 });
      const lastTouch = useRef({ x: 0, y: 0 });
      const rot = useRef({ x: -20, y: -45 });
      const frame = useRef(false);
      const resetting = useRef(false);

      useImperativeHandle(
        ref,
        () => ({
          reset: () => {
            if (resetting.current) return;
            resetting.current = true;
            const start = { ...rot.current };
            const end = { x: -20, y: -45 };
            const dur = 500;
            const t0 = performance.now();
            const ease = (t: number) => 1 - Math.pow(1 - t, 3);
            const step = (now: number) => {
              const p = Math.min(1, (now - t0) / dur);
              const e = ease(p);
              rot.current.x = start.x + (end.x - start.x) * e;
              rot.current.y = start.y + (end.y - start.y) * e;
              if (cubeInnerRef.current)
                cubeInnerRef.current.style.transform = `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
              if (p < 1) requestAnimationFrame(step);
              else resetting.current = false;
            };
            requestAnimationFrame(step);
          },
        }),
        []
      );

      // Resize handling
      const [cubeSize, setCubeSize] = useState(300);
      useEffect(() => {
        const update = () => {
          if (window.innerWidth < 640) setCubeSize(200);
          else if (window.innerWidth < 1024) setCubeSize(250);
          else setCubeSize(300);
        };
        update();
        window.addEventListener("resize", update, { passive: true });
        return () => window.removeEventListener("resize", update);
      }, []);

      useEffect(() => {
        const prevent = (e: TouchEvent) => {
          if (isTouchDragging) e.preventDefault();
        };
        document.addEventListener("touchmove", prevent, { passive: false });
        return () => document.removeEventListener("touchmove", prevent);
      }, [isTouchDragging]);

      const schedule = () => {
        if (frame.current) return;
        frame.current = true;
        requestAnimationFrame(() => {
          if (cubeInnerRef.current)
            cubeInnerRef.current.style.transform = `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
          frame.current = false;
        });
      };
      const apply = (dx: number, dy: number, f: number) => {
        rot.current.y += dx * f;
        rot.current.x -= dy * f;
        schedule();
      };
      const faceClick = (i: number) => {
        if (!isDragging && projects[i]) onProjectSelect(projects[i]);
      };

      const onMouseDown = (e: React.MouseEvent) => {
        if (resetting.current) return;
        setIsDragging(false);
        lastMouse.current = { x: e.clientX, y: e.clientY };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp, { once: true });
      };
      const onMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - lastMouse.current.x;
        const dy = e.clientY - lastMouse.current.y;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) setIsDragging(true);
        apply(dx, dy, 0.75);
        lastMouse.current = { x: e.clientX, y: e.clientY };
      };
      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        setTimeout(() => setIsDragging(false), 80);
      };

      const onTouchStart = (e: React.TouchEvent) => {
        if (resetting.current) return;
        if (e.touches.length !== 1) return;
        setIsTouchDragging(true);
        setIsDragging(false);
        const t = e.touches[0];
        lastTouch.current = { x: t.clientX, y: t.clientY };
        if (!selectedProject) scrollLock.lock();
      };
      const onTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length !== 1) return;
        const t = e.touches[0];
        const dx = t.clientX - lastTouch.current.x;
        const dy = t.clientY - lastTouch.current.y;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) setIsDragging(true);
        apply(dx, dy, 0.55);
        lastTouch.current = { x: t.clientX, y: t.clientY };
      };
      const onTouchEnd = () => {
        setIsTouchDragging(false);
        setTimeout(() => setIsDragging(false), 80);
        if (!selectedProject) scrollLock.unlock();
      };

      return (
        <div
          className="relative select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
          style={{
            perspective: "1200px",
            width: cubeSize * 2.1,
            height: cubeSize * 2.1,
            touchAction: "none",
            willChange: "transform",
            userSelect: "none",
            WebkitUserSelect: "none" as any,
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}>
          <div
            ref={cubeInnerRef}
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
              transform: `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`,
            }}>
            {[
              {
                i: 0,
                tr: `translateZ(${cubeSize / 2}px)`,
                img: "/images/oldportfolio.webp",
              },
              {
                i: 1,
                tr: `rotateY(180deg) translateZ(${cubeSize / 2}px)`,
                img: "/images/istoneflexwork.webp",
              },
              {
                i: 2,
                tr: `rotateY(90deg) translateZ(${cubeSize / 2}px)`,
                img: "/images/stepio.webp",
              },
              {
                i: 3,
                tr: `rotateY(-90deg) translateZ(${cubeSize / 2}px)`,
                img: "/images/guccoaching.webp",
              },
              {
                i: 4,
                tr: `rotateX(90deg) translateZ(${cubeSize / 2}px)`,
                img: "/images/dishcovery.webp",
              },
              {
                i: 5,
                tr: `rotateX(-90deg) translateZ(${cubeSize / 2}px)`,
                img: "/images/ampcoplatecutting.webp",
              },
            ].map((face) => (
              <div
                key={face.i}
                className="absolute bg-gradient-to-br from-[#2C313A] to-[#1E2228] border-2 border-[#00ffff]/30 rounded-lg cursor-pointer flex flex-col items-center justify-center p-4 text-center hover:border-[#fd19fc] transition-colors duration-200"
                style={{
                  width: cubeSize,
                  height: cubeSize,
                  transform: face.tr,
                  left: "50%",
                  top: "50%",
                  marginLeft: -cubeSize / 2,
                  marginTop: -cubeSize / 2,
                  willChange: "transform",
                }}
                onClick={() => faceClick(face.i)}>
                <div className="monitor-frame">
                  <img
                    src={face.img}
                    alt={projects[face.i]?.title || "Project"}
                    className="monitor-frame__screen select-none pointer-events-none"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  <div className="monitor-frame__bezel" />
                  <div className="monitor-frame__stand" />
                </div>
                <div className="mt-3 text-xs sm:text-sm md:text-base font-semibold text-white text-center">
                  {projects[face.i]?.title || "Project"}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  )
);

export default function ProjectsPage() {
  const cubeRef = useRef<ProjectCubeHandle | null>(null);
  const [isRotating, setIsRotating] = useState(false); // only for reset btn disabled state
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTouchDragging, setIsTouchDragging] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<string>("");
  // Featured video enlarge state
  const [isFeaturedPreviewOpen, setIsFeaturedPreviewOpen] = useState(false);
  const [isProjectVideoEnlarged, setIsProjectVideoEnlarged] = useState(false);
  // Lock scroll when any overlay (featured or enlarged project video) is open
  useEffect(() => {
    if (isFeaturedPreviewOpen || isProjectVideoEnlarged) {
      scrollLock.lock();
      return () => {
        scrollLock.unlock();
      };
    }
  }, [isFeaturedPreviewOpen, isProjectVideoEnlarged]);
  // Close featured preview with ESC
  useEffect(() => {
    if (!isFeaturedPreviewOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFeaturedPreviewOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFeaturedPreviewOpen]);

  const router = useRouter();
  const { t } = useLocaleContext();

  // Handle browser/Android back button
  useCustomBackButton("projects", () => setIsExiting(true));

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
      title: t.oldPortfolioTitle || "Old Portfolio",
      description:
        t.oldPortfolioDescription ||
        "My previous portfolio showcasing my earlier projects and development journey. This portfolio demonstrates my growth as a developer. It features responsive design, smooth transitions, and showcases my learning curve through different projects.",
      technologies: [
        { name: "HTML5", icon: <FaHtml5 style={{ color: "#E34F26" }} /> },
        { name: "CSS3", icon: <FaCss3Alt style={{ color: "#1572B6" }} /> },
        { name: "JavaScript", icon: <FaJs style={{ color: "#F7DF1E" }} /> },
      ],
      image: "/images/oldportfolio.webp",
      liveDemo: "https://oldportfolio.zsoltmarku.com/",
      sourceCode: "https://github.com/KipSter91/Portfolio_ZsMWebDev.git",
    },
    {
      title: t.istOneFlexWorkTitle || "IstOneFlexWork",
      description:
        t.istOneFlexWorkDescription ||
        "Responsive, SEO-optimized landing page for IstOneFlexWork (István Máté), a solar panel cleaning service. Built with Next.js for fast performance, featuring modern design and clear call-to-action sections for maximum user engagement.",
      technologies: [
        { name: "Next.js", icon: <SiNextdotjs style={{ color: "#000000" }} /> },
        {
          name: "TypeScript",
          icon: <SiTypescript style={{ color: "#3178C6" }} />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss style={{ color: "#06B6D4" }} />,
        },
        {
          name: "Framer Motion",
          icon: <SiFramer style={{ color: "#0055FF" }} />,
        },
        { name: "GSAP", icon: <SiGreensock style={{ color: "#88CE02" }} /> },
      ],
      image: "/images/istoneflexwork.webp",
      liveDemo: "https://solarcleanflexwork.com/",
      sourceCode:
        "https://github.com/KipSter91/IstOneFlexWork_Landing_Page_ZsMWebDev.git",
    },
    {
      title: t.stepIOTitle || "StepIO",
      description:
        t.stepIODescription ||
        "Comprehensive activity tracking solution featuring a responsive landing page and a native Android app. StepIO is a privacy-first step counter and GPS tracker built with React Native (Expo Bare Workflow) and custom Kotlin services. It offers onboarding, real-time step tracking, route logging, visual statistics, goal setting, and complete on-device data privacy—no external servers or data collection.",
      technologies: [
        { name: "Next.js", icon: <SiNextdotjs style={{ color: "#000000" }} /> },
        {
          name: "TypeScript",
          icon: <SiTypescript style={{ color: "#3178C6" }} />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss style={{ color: "#06B6D4" }} />,
        },
        {
          name: "React Native",
          icon: <FaReact style={{ color: "#61DAFB" }} />,
        },
        { name: "Expo", icon: <SiExpo style={{ color: "#000020" }} /> },
        { name: "Android", icon: <FaAndroid style={{ color: "#3DDC84" }} /> },
      ],
      image: "/images/stepio.webp",
      liveDemo: "https://stepio.zsoltmarku.com/",
      sourceCode:
        "https://github.com/KipSter91/StepIO_Landing_Page_ZsMWebDev.git",
    },
    {
      title: t.gucCoachingTitle || "G.U.C. Coaching",
      description:
        t.gucCoachingDescription ||
        "Multilingual, animated landing page for G.U.C. Coaching (Dávid Vágusz), built with HTML, Tailwind CSS, and GSAP. The site highlights services, achievements, and offers contact options in three languages (EN, HU, NL). Features include smooth section transitions, animated logo using Delaunay triangulation, responsive design, and FormSubmit integration.",
      technologies: [
        { name: "HTML5", icon: <FaHtml5 style={{ color: "#E34F26" }} /> },
        { name: "CSS3", icon: <FaCss3Alt style={{ color: "#1572B6" }} /> },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss style={{ color: "#06B6D4" }} />,
        },
        { name: "JavaScript", icon: <FaJs style={{ color: "#F7DF1E" }} /> },
        { name: "GSAP", icon: <SiGreensock style={{ color: "#88CE02" }} /> },
      ],
      image: "/images/guccoaching.png",
      liveDemo:
        "https://oldportfolio.zsoltmarku.com/projects/guccoaching/index.html",
      sourceCode: "https://github.com/KipSter91/G.U.C._Coaching_ZsMWebDev.git",
    },
    {
      title: t.dishcoveryTitle || "Dishcovery",
      description:
        t.dishcoveryDescription ||
        "Dishcovery is a responsive JavaScript web application for browsing and bookmarking recipes. Built with a custom MVC architecture, it features real-time ingredient adjustment, interactive UI, persistent bookmarks, and animated user experience. Recipes are fetched from the Forkify API, and the project is bundled with Parcel for optimized performance.",
      technologies: [
        { name: "HTML5", icon: <FaHtml5 style={{ color: "#E34F26" }} /> },
        { name: "CSS3", icon: <FaCss3Alt style={{ color: "#1572B6" }} /> },
        { name: "JavaScript", icon: <FaJs style={{ color: "#F7DF1E" }} /> },
      ],
      image: "/images/dishcovery.webp",
      liveDemo:
        "https://oldportfolio.zsoltmarku.com/projects/dishcovery/index.html",
      sourceCode: "https://github.com/KipSter91/Dishcovery_ZsMWebDev.git",
    },
    {
      title: t.ampcoCalculatorTitle || "AMPCO® Calculator",
      description:
        t.ampcoCalculatorDescription ||
        "Cutting time estimation tool for AMPCO METAL. Extracts X, Y, Z values from Act/Cube® PDF drawings or manual input, then calculates sequential plate cutting durations. Built with Python, Flask, and vanilla JS for clean UI and accurate industrial workflows.",
      technologies: [
        { name: "HTML5", icon: <FaHtml5 style={{ color: "#E34F26" }} /> },
        { name: "CSS3", icon: <FaCss3Alt style={{ color: "#1572B6" }} /> },
        { name: "JavaScript", icon: <FaJs style={{ color: "#F7DF1E" }} /> },
        { name: "Python", icon: <SiPython style={{ color: "#3776AB" }} /> },
        { name: "Flask", icon: <SiFlask style={{ color: "#FFFFFF" }} /> },
      ],
      image: "/images/ampcoplatecutting.webp",
      liveDemo: "https://ampco-plate-cutting-time-calculator.onrender.com",
      sourceCode:
        "https://github.com/KipSter91/Ampco_Plate_Cutting_Time_Calculator_ZsMWebDev.git",
      pdfs: [
        {
          name: "Test 1",
          filename: "test.pdf",
        },
        {
          name: "Test 2",
          filename: "test-1.pdf",
        },
        {
          name: "Test 3",
          filename: "test-2.pdf",
        },
      ],
    },
  ];

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest(".pdf-dropdown")) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsDropdownOpen(false);
    setSelectedPdf("");
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
                ◀
              </motion.span>
              {t.back}
            </motion.button>

            <motion.div
              className="w-full mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              {/* Featured Project Section */}
              <motion.div
                className="w-full bg-[#1E2228] p-6 md:p-8 rounded-xl shadow-xl mb-10 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-lg bg-[#fd19fc]/20 text-[#fd19fc] border border-[#fd19fc]/40">
                        {t.featuredProjectLabel}
                      </span>
                      <motion.span
                        className="h-px flex-1 bg-gradient-to-r from-[#fd19fc] via-[#00ffff] to-transparent"
                        layout
                      />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {t.fashionFoundryTitle}
                      <span className="block text-base md:text-lg font-medium text-[#00ffff]/80 mt-1">
                        {t.fashionFoundrySubtitle}
                      </span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6 max-w-2xl">
                      {t.fashionFoundryShort}
                      {t.fashionFoundryMoreInfo && (
                        <span className="block text-[11px] md:text-xs mt-3 text-[#00ffff]/70 tracking-wide">
                          {t.fashionFoundryMoreInfo}{" "}
                          <a
                            href="https://fashion-foundry-zsmwebdev.vercel.app/about"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-dotted underline-offset-2 hover:text-[#fd19fc] transition-colors inline-flex items-center gap-1">
                            {t.fashionFoundryAboutLink}
                            <FiExternalLink className="w-3 h-3 opacity-80" />
                          </a>
                        </span>
                      )}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.a
                        href="https://fashion-foundry-zsmwebdev.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-[#00ffff] to-[#00cccc] text-[#161A20] font-semibold py-3 px-6 rounded-xl hover:from-[#00cccc] hover:to-[#00ffff] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#00ffff]/30 hover:-translate-y-1 border-2 border-[#00ffff]/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200,
                        }}>
                        <FiExternalLink className="w-5 h-5" />
                        {t.viewLive}
                      </motion.a>
                      <motion.a
                        href="https://github.com/KipSter91/Fashion_Foundry_ZsMWebDev.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-[#fd19fc] to-[#cc14cc] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#cc14cc] hover:to-[#fd19fc] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#fd19fc]/30 hover:-translate-y-1 border-2 border-[#fd19fc]/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}>
                        <FiGithub className="w-5 h-5" />
                        {t.source}
                      </motion.a>
                    </div>
                  </div>
                  {/* Visual / Mock display */}
                  <div className="w-full lg:w-80 xl:w-96 flex items-center justify-center">
                    <div
                      className="relative w-full max-w-xs group cursor-pointer"
                      onClick={() => setIsFeaturedPreviewOpen(true)}>
                      <div className="monitor-frame cursor-pointer">
                        <video
                          src="/videos/fashionfoundry.webm"
                          className="monitor-frame__screen object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                          poster="/images/og-projects.webp"
                          aria-label="Fashion Foundry demo preview video"
                        />
                        <div className="monitor-frame__bezel" />
                        <div className="monitor-frame__stand" />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-wide text-[#00ffff]/70 uppercase bg-[#2C313A]/80 px-2 py-1 rounded-lg border border-[#00ffff]/20 backdrop-blur-sm">
                        {t.clickToEnlarge}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
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
                  {t.projectsTitle}
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl text-gray-200 text-center mb-8 max-w-3xl mx-auto leading-relaxed border-b border-[#00ffff]/20 pb-4 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}>
                  {t.projectsContent}
                </motion.p>
                <motion.div
                  className="text-center mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}>
                  <div className="inline-block border-b border-[#00ffff]/20 pb-4 rounded-xl">
                    <p className="text-[#fd19fc] font-semibold mb-1">
                      {t.projectCubeTitle || "Interactive 3D Project Cube"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {t.projectCubeDescription ||
                        "Click on any face to explore the project"}
                    </p>
                  </div>
                </motion.div>
                <div className="flex flex-row items-center justify-between gap-4 mb-4">
                  <div className="z-20 text-[#00ffff]/70 text-xs md:text-sm bg-[#2C313A]/80 backdrop-blur-sm px-2 py-1 md:px-3 md:py-2 rounded-lg border border-[#00ffff]/20">
                    <div className="hidden md:block">
                      {t.dragToRotate || "Click & drag to rotate"}
                    </div>
                    <div className="md:hidden">
                      {t.swipeToRotate || "Swipe to rotate"}
                    </div>
                  </div>
                  <motion.button
                    className="z-20 flex items-center justify-center bg-[#2C313A] text-[#00ffff] border border-[#00ffff]/30 p-1.5 md:p-2 rounded-lg hover:bg-[#fd19fc] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#fd19fc]/30"
                    style={{ fontSize: 18 }}
                    onClick={() => {
                      if (isRotating) return;
                      setIsRotating(true);
                      cubeRef.current?.reset();
                      setTimeout(() => setIsRotating(false), 650);
                    }}
                    disabled={isRotating}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={t.resetView || "Reset view"}>
                    <FiRefreshCw />
                  </motion.button>
                </div>
                <motion.div
                  className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-[#161A20] to-[#1E2228] border border-gray-700 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}>
                  <ProjectCube
                    ref={cubeRef}
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
          {/* Featured Preview Overlay */}
          <AnimatePresence>
            {isFeaturedPreviewOpen && (
              <motion.div
                className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#0b0e13]/90 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFeaturedPreviewOpen(false)}>
                <motion.div
                  className="relative w-full max-w-5xl focus:outline-none"
                  initial={{ scale: 0.85, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.85, opacity: 0, y: 30 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  onClick={(e) => e.stopPropagation()}
                  tabIndex={-1}>
                  <motion.button
                    aria-label={t.close || "Close"}
                    className="text-gray-400 hover:text-white text-3xl p-2 hover:bg-[#2C313A] w-8 h-8 flex items-center justify-center rounded-xl transition-colors absolute -top-12 right-0"
                    onClick={() => setIsFeaturedPreviewOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    ×
                  </motion.button>
                  <div className="relative mx-auto overflow-hidden rounded-2xl shadow-2xl bg-[#0f1216] border border-[#00ffff]/25">
                    {/* Outer glow frame */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#00ffff]/40" />
                    <video
                      src="/videos/fashionfoundry.webm"
                      className="w-full h-full object-cover relative"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/images/og-projects.webp"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* /Featured Preview Overlay */}

          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeProjectModal}>
                <motion.div
                  className="bg-[#1E2228] rounded-xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#00ffff]/20 shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  onClick={(e) => e.stopPropagation()}>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#00ffff] mb-2">
                        {selectedProject.title}
                      </h2>
                    </div>
                    <motion.button
                      className="text-gray-400 hover:text-white text-3xl p-2 hover:bg-[#2C313A] w-8 h-8 flex items-center justify-center rounded-xl transition-colors"
                      onClick={closeProjectModal}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}>
                      ×
                    </motion.button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Project Preview */}
                    <div className="space-y-6">
                      {/* Monitor Frame with Project Image */}
                      <div className="bg-[#2C313A] p-6 rounded-xl border border-[#00ffff]/20">
                        <h3 className="text-xl font-semibold text-white mb-4 text-center">
                          {t.projectPreview || "Project Preview"}
                        </h3>
                        <div className="flex justify-center">
                          <div
                            className="relative w-full"
                            style={{ maxWidth: "400px" }}>
                            <div
                              className="monitor-frame cursor-pointer group"
                              style={{ width: "100%" }}
                              onClick={() => setIsProjectVideoEnlarged(true)}
                              aria-label={t.clickToEnlarge}
                              role="button">
                              {selectedProject.title === t.oldPortfolioTitle ||
                              selectedProject.title === "Old Portfolio" ? (
                                <video
                                  src="/videos/oldportfolio.webm"
                                  className="monitor-frame__screen"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                              ) : selectedProject.title === t.dishcoveryTitle ||
                                selectedProject.title === "Dishcovery" ? (
                                <video
                                  src="/videos/dishcovery.webm"
                                  className="monitor-frame__screen"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                              ) : selectedProject.title ===
                                  t.ampcoCalculatorTitle ||
                                selectedProject.title ===
                                  "AMPCO® Calculator" ? (
                                <video
                                  src="/videos/ampcoplatecutting.webm"
                                  className="monitor-frame__screen"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                              ) : selectedProject.title ===
                                  t.gucCoachingTitle ||
                                selectedProject.title === "G.U.C. Coaching" ? (
                                <video
                                  src="/videos/guccoaching.webm"
                                  className="monitor-frame__screen"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                              ) : selectedProject.title ===
                                  t.istOneFlexWorkTitle ||
                                selectedProject.title === "IstOneFlexWork" ? (
                                <video
                                  src="/videos/istoneflexwork.webm"
                                  className="monitor-frame__screen"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                              ) : selectedProject.title === t.stepIOTitle ||
                                selectedProject.title === "StepIO" ? (
                                <video
                                  src="/videos/stepio.webm"
                                  className="monitor-frame__screen"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                              ) : null}
                              <div className="monitor-frame__bezel" />
                              <div className="monitor-frame__stand" />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-wide text-[#00ffff]/70 uppercase bg-[#2C313A]/80 px-2 py-1 rounded-lg border border-[#00ffff]/20 backdrop-blur-sm whitespace-nowrap flex items-center justify-center">
                              {t.clickToEnlarge}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Technologies */}
                      {selectedProject.technologies && (
                        <div className="bg-[#2C313A] p-6 rounded-xl border border-[#00ffff]/20">
                          <h3 className="text-xl font-semibold text-white mb-4">
                            {t.technologiesUsed}
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {selectedProject.technologies.map((tech, index) => (
                              <motion.div
                                key={tech.name}
                                className="flex items-center gap-3 p-3 bg-[#1E2228] rounded-lg border border-gray-700 hover:border-[#fd19fc]/50 transition-colors"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}>
                                <div className="text-xl md:text-2xl">
                                  {tech.icon}
                                </div>
                                <span className="text-xs md:text-sm lg:text-base text-white font-medium">
                                  {tech.name}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Project Details */}
                    <div className="space-y-6">
                      {/* Description */}
                      <div className="bg-[#2C313A] p-6 rounded-xl border border-[#00ffff]/20">
                        <h3 className="text-xl font-semibold text-white mb-4">
                          {t.aboutProject || "About This Project"}
                        </h3>
                        <p className="text-gray-200 leading-relaxed text-base">
                          {selectedProject.description}
                        </p>
                      </div>
                      {/* Action Buttons */}
                      <div className="bg-[#2C313A] p-6 rounded-xl border border-[#00ffff]/20">
                        <h3 className="text-xl font-semibold text-white mb-4">
                          {t.exploreProject || "Explore Project"}
                        </h3>
                        <div className="flex flex-wrap gap-3 md:gap-4">
                          <motion.a
                            href={selectedProject.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:flex-1 bg-gradient-to-r from-[#00ffff] to-[#00cccc] text-[#161A20] font-semibold py-2 px-4 lg:py-3 lg:px-6 rounded-xl hover:from-[#00cccc] hover:to-[#00ffff] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#00ffff]/30 hover:-translate-y-1 border-2 border-[#00ffff]/50 text-sm md:text-[15px]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                              duration: 0.4,
                              type: "spring",
                              stiffness: 200,
                            }}>
                            <FiExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                            {t.viewLive || "View Live"}
                          </motion.a>
                          <motion.a
                            href={selectedProject.sourceCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:flex-1 bg-gradient-to-r from-[#fd19fc] to-[#cc14cc] text-white font-semibold py-2 px-4 lg:py-3 lg:px-6 rounded-xl hover:from-[#cc14cc] hover:to-[#fd19fc] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#fd19fc]/30 hover:-translate-y-1 border-2 border-[#fd19fc]/50 text-sm md:text-[15px]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.1,
                              type: "spring",
                              stiffness: 200,
                            }}>
                            <FiGithub className="w-4 h-4 md:w-5 md:h-5" />
                            {t.source || "Source"}
                          </motion.a>
                        </div>

                        {/* Downloadable PDFs - Only for AMPCO Calculator */}
                        {(selectedProject.title === t.ampcoCalculatorTitle ||
                          selectedProject.title === "AMPCO® Calculator") &&
                          selectedProject.pdfs && (
                            <div className="mt-6 pt-6 border-t border-[#00ffff]/20">
                              <h4 className="text-lg font-semibold text-white mb-4">
                                {t.downloadablePDFs || "Downloadable PDFs"}
                              </h4>
                              <div className="space-y-4">
                                {/* Dropdown */}
                                <div className="relative pdf-dropdown">
                                  <motion.button
                                    className="w-full bg-[#1E2228] border border-gray-700 rounded-lg px-4 py-3 text-left text-white hover:border-[#00ffff]/50 transition-colors flex items-center justify-between"
                                    onClick={() =>
                                      setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}>
                                    <span className="text-gray-300">
                                      {selectedPdf
                                        ? selectedProject.pdfs.find(
                                            (pdf) =>
                                              pdf.filename === selectedPdf
                                          )?.name ||
                                          t.selectTestPDF ||
                                          "Select a test PDF..."
                                        : t.selectTestPDF ||
                                          "Select a test PDF..."}
                                    </span>
                                    <motion.div
                                      animate={{
                                        rotate: isDropdownOpen ? 180 : 0,
                                      }}
                                      transition={{ duration: 0.2 }}>
                                      <FiChevronDown className="w-5 h-5 text-gray-400" />
                                    </motion.div>
                                  </motion.button>

                                  <AnimatePresence>
                                    {isDropdownOpen && (
                                      <motion.div
                                        className="absolute top-full left-0 right-0 mt-2 bg-[#1E2228] border border-gray-700 rounded-lg shadow-lg z-10"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}>
                                        {selectedProject.pdfs.map(
                                          (pdf, index) => (
                                            <motion.button
                                              key={pdf.filename}
                                              className="w-full px-4 py-3 text-left hover:bg-[#2C313A] transition-colors border-b border-gray-700 last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
                                              onClick={() => {
                                                setSelectedPdf(pdf.filename);
                                                setIsDropdownOpen(false);
                                              }}
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{
                                                delay: index * 0.05,
                                              }}>
                                              <div className="text-white font-medium">
                                                {pdf.name}
                                              </div>
                                            </motion.button>
                                          )
                                        )}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>

                                {/* Download Button */}
                                {selectedPdf && (
                                  <motion.a
                                    href={`/plate-cutting-pdfs/${selectedPdf}`}
                                    download={selectedPdf}
                                    className="w-full bg-gradient-to-r from-[#00ffff] to-[#00cccc] text-[#161A20] font-semibold py-3 px-6 rounded-xl hover:from-[#00cccc] hover:to-[#00ffff] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#00ffff]/30 hover:-translate-y-1 border-2 border-[#00ffff]/50"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{
                                      duration: 0.4,
                                      type: "spring",
                                      stiffness: 200,
                                    }}>
                                    <FiDownload className="w-5 h-5" />
                                    {t.download || "Download"}
                                  </motion.a>
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Enlarged project video overlay */}
          <AnimatePresence>
            {isProjectVideoEnlarged && selectedProject && (
              <motion.div
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0b0e13]/90 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsProjectVideoEnlarged(false)}>
                <motion.div
                  className="relative w-full max-w-5xl"
                  initial={{ scale: 0.85, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.85, opacity: 0, y: 30 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  onClick={(e) => e.stopPropagation()}>
                  <motion.button
                    aria-label={t.close || "Close"}
                    className="text-gray-400 hover:text-white text-3xl p-2 hover:bg-[#2C313A] w-8 h-8 flex items-center justify-center rounded-xl transition-colors absolute -top-12 right-0"
                    onClick={() => setIsProjectVideoEnlarged(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    ×
                  </motion.button>
                  <div className="relative mx-auto overflow-hidden rounded-2xl shadow-2xl bg-[#0f1216] border border-[#00ffff]/25">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#00ffff]/40" />
                    {(() => {
                      const title = selectedProject.title;
                      const mapping: Record<string, string> = {
                        [t.oldPortfolioTitle]: "/videos/oldportfolio.webm",
                        "Old Portfolio": "/videos/oldportfolio.webm",
                        [t.dishcoveryTitle]: "/videos/dishcovery.webm",
                        Dishcovery: "/videos/dishcovery.webm",
                        [t.ampcoCalculatorTitle]:
                          "/videos/ampcoplatecutting.webm",
                        "AMPCO® Calculator": "/videos/ampcoplatecutting.webm",
                        [t.gucCoachingTitle]: "/videos/guccoaching.webm",
                        "G.U.C. Coaching": "/videos/guccoaching.webm",
                        [t.istOneFlexWorkTitle]: "/videos/istoneflexwork.webm",
                        IstOneFlexWork: "/videos/istoneflexwork.webm",
                        [t.stepIOTitle]: "/videos/stepio.webm",
                        StepIO: "/videos/stepio.webm",
                      };
                      const src = mapping[title] || "";
                      return src ? (
                        <video
                          src={src}
                          className="w-full h-full object-cover relative"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : null;
                    })()}
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
