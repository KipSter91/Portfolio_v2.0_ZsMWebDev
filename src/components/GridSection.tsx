"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface GridSectionProps {
  onOpenModal?: (modal: string) => void;
  onExit?: () => void;
}

// 2x2 grid items
const gridItems = [
  { key: "about", label: "About Me", area: "1 / 1 / 2 / 2" },
  { key: "skills", label: "Skills", area: "1 / 2 / 2 / 3" },
  { key: "projects", label: "Projects", area: "2 / 1 / 3 / 2" },
  { key: "contact", label: "Contact", area: "2 / 2 / 3 / 3" },
];

// SVG underline path variants - szögletes és egyszerű változatok
const underlinePaths = [
  // Straight (marad az eredeti)
  "M0,2.5 L100,2.5",
  // Egyszerű hullám
  "M0,2.5 Q25,0.5 50,2.5 T100,2.5",
  // Dupla hullám
  "M0,2.5 Q12.5,0.5 25,2.5 Q37.5,4.5 50,2.5 Q62.5,0.5 75,2.5 Q87.5,4.5 100,2.5",
  // Enyhe ív
  "M0,2.5 Q50,0.5 100,2.5",
  // Fordított ív
  "M0,2.5 Q50,4.5 100,2.5",
];

export default function GridSection({ onOpenModal, onExit }: GridSectionProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visualHovered, setVisualHovered] = useState<number | null>(null);
  const [currentUnderlineIdx, setCurrentUnderlineIdx] = useState<number | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);
  const [activeGridItem, setActiveGridItem] = useState<number | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const underlines = useRef<(SVGPathElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const router = useRouter();

  // Delayed hover effect for smooth transitions
  const handleMouseEnter = (idx: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    const randomIdx = Math.floor(Math.random() * underlinePaths.length);
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(idx);
      setVisualHovered(idx);
      setCurrentUnderlineIdx(randomIdx);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(null);
      setVisualHovered(null);
      setCurrentUnderlineIdx(null);
    }, 300);
  }; // Handle logo mouse events
  const handleLogoMouseEnter = () => {
    if (isMobile) return; // Skip for mobile/tablet
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setLogoHovered(true);
  };

  const handleLogoMouseLeave = () => {
    if (isMobile) return; // Skip for mobile/tablet
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setLogoHovered(false);
  };
  // Handle click for mobile/tablet (first click activates, second click navigates)
  const handleGridItemClick = (idx: number) => {
    if (isMobile) {
      if (activeGridItem === idx) {
        // Second click - navigate with animation
        onExit?.();
        setTimeout(() => {
          router.push(`/${gridItems[idx].key}`);
        }, 500);
      } else {
        // First click - activate the grid item
        setActiveGridItem(idx);
        setHovered(idx);
        setVisualHovered(idx);
        setCurrentUnderlineIdx(
          Math.floor(Math.random() * underlinePaths.length)
        );
      }
    } else {
      // Desktop - navigate with animation
      onExit?.();
      setTimeout(() => {
        router.push(`/${gridItems[idx].key}`);
      }, 500);
    }
  };

  const handleLogoClick = () => {
    if (isMobile && activeGridItem !== null) {
      setActiveGridItem(null);
      setHovered(null);
      setVisualHovered(null);
    } else {
      onExit?.();
      setTimeout(() => {
        router.push("/logo");
      }, 500);
    }
  };

  // Reset active grid item when clicking elsewhere (for mobile)
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (isMobile && activeGridItem !== null) {
      // Check if we're clicking on a grid item
      const isGridItem = (e.target as HTMLElement).closest(
        "button[data-grid-item]"
      );
      if (!isGridItem) {
        setActiveGridItem(null);
        setHovered(null);
        setVisualHovered(null);
      }
    }
  };
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Detect mobile/tablet devices
  useEffect(() => {
    const checkDevice = () => {
      const mediaQuery = window.matchMedia("(max-width: 1024px)");
      setIsMobile(mediaQuery.matches);
    };

    // Check on initial load
    checkDevice();

    // Listen for window resize events
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);
  // Animate underline on hover
  useEffect(() => {
    if (visualHovered !== null && underlines.current[visualHovered]) {
      const pathElement = underlines.current[visualHovered];
      const pathLength = pathElement.getTotalLength();

      gsap.fromTo(
        pathElement,
        { strokeDashoffset: pathLength, strokeDasharray: pathLength },
        { strokeDashoffset: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [visualHovered]);
  // Calculate logo position based on hovered grid
  const getLogoPosition = () => {
    // Base position when nothing is hovered
    if (hovered === null) return { left: "50%", top: "50%" };

    // Position adjustments for different hover states
    // These calculations now need to be adjusted for the new non-fixed layout
    if (hovered === 0) {
      const leftPercent = (1.15 / (1.15 + 0.85)) * 100;
      const topPercent = (1.15 / (1.15 + 0.85)) * 100;
      return { left: `${leftPercent}%`, top: `${topPercent}%` };
    }
    if (hovered === 1) {
      const leftPercent = (0.85 / (0.85 + 1.15)) * 100;
      const topPercent = (1.15 / (1.15 + 0.85)) * 100;
      return { left: `${leftPercent}%`, top: `${topPercent}%` };
    }
    if (hovered === 2) {
      const leftPercent = (1.15 / (1.15 + 0.85)) * 100;
      const topPercent = (0.85 / (0.85 + 1.15)) * 100;
      return { left: `${leftPercent}%`, top: `${topPercent}%` };
    }
    if (hovered === 3) {
      const leftPercent = (0.85 / (0.85 + 1.15)) * 100;
      const topPercent = (0.85 / (0.85 + 1.15)) * 100;
      return { left: `${leftPercent}%`, top: `${topPercent}%` };
    }
    return { left: "50%", top: "50%" };
  };

  // Responsive 2x2 grid, expands hovered cell
  const getGridTemplate = () => {
    if (hovered === null) {
      return {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      };
    }
    if (hovered === 0) {
      return {
        gridTemplateColumns: "1.15fr 0.85fr",
        gridTemplateRows: "1.15fr 0.85fr",
      };
    }
    if (hovered === 1) {
      return {
        gridTemplateColumns: "0.85fr 1.15fr",
        gridTemplateRows: "1.15fr 0.85fr",
      };
    }
    if (hovered === 2) {
      return {
        gridTemplateColumns: "1.15fr 0.85fr",
        gridTemplateRows: "0.85fr 1.15fr",
      };
    }
    if (hovered === 3) {
      return {
        gridTemplateColumns: "0.85fr 1.15fr",
        gridTemplateRows: "0.85fr 1.15fr",
      };
    }
    return {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
    };
  };
  return (
    <motion.div
      className="w-full grid relative z-10 transition-all duration-300"
      style={{
        ...getGridTemplate(),
        gap: 0,
        padding: 0,
        margin: 0,
        borderSpacing: 0,
        width: "100%",
        height: "calc(100vh - 7rem)", // Accounting for header (3.5rem) and footer (3.5rem)
      }}
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={handleOutsideClick}>
      {gridItems.map((item, idx) => {
        const isHovered = hovered === idx;
        const isVisualHovered = visualHovered === idx;
        const isActive = activeGridItem === idx;
        const isOther = hovered !== null && hovered !== idx;
        return (
          <button
            key={item.key}
            data-grid-item={true}
            className={`relative flex items-center justify-center transition-all duration-300 text-2xl font-bold select-none group overflow-hidden focus:z-20 cursor-pointer
              ${isHovered ? "z-20" : isOther ? " blur-[3px]" : ""}
              ${isActive ? "active-grid-item" : ""}
            `}
            style={{
              gridArea: item.area,
              minWidth: 0,
              minHeight: 0,
              border:
                !isHovered && !isActive
                  ? "1px solid var(--medium-gray)"
                  : "2px solid var(--neon-cyan) ",
              outline: 0,
              padding: 0,
              margin: 0,
              boxSizing: "border-box",
              width: "100%",
              height: "100%",
              backgroundColor: "var(--dark-gray)",
            }}
            onClick={() => handleGridItemClick(idx)}
            aria-label={item.label}
            onMouseEnter={!isMobile ? () => handleMouseEnter(idx) : undefined}
            onMouseLeave={!isMobile ? handleMouseLeave : undefined}
            onFocus={!isMobile ? () => handleMouseEnter(idx) : undefined}
            onBlur={!isMobile ? handleMouseLeave : undefined}>
            {(isHovered || isActive) && (
              <div className="animated-gradient"></div>
            )}
            <div className="z-10 drop-shadow-lg transition-transform duration-300 relative flex flex-col items-center">
              <span
                className={`transition-colors ${
                  isVisualHovered || isActive ? "text-[#00ffff]" : ""
                }`}
                style={{ marginBottom: 8 }}>
                {item.label}
                {isMobile && isActive && (
                  <span className="ml-2 text-[#fd19fc]">▸</span>
                )}
              </span>
              {(isVisualHovered || isActive) &&
                currentUnderlineIdx !== null && (
                  <svg
                    className="w-full h-5 overflow-visible absolute -bottom-2"
                    viewBox="0 0 100 5"
                    preserveAspectRatio="none">
                    <path
                      ref={(el) => {
                        underlines.current[idx] = el;
                        return undefined;
                      }}
                      d={underlinePaths[currentUnderlineIdx]}
                      fill="none"
                      stroke="var(--neon-pink)"
                      strokeWidth="1"
                      className={`transition-opacity opacity-100`}
                      strokeDasharray="0"
                      strokeDashoffset="0"
                    />
                  </svg>
                )}
            </div>
          </button>
        );
      })}
      {/* Logo element, follows grid center or hovered cell */}
      <div
        className="absolute z-30 flex items-center justify-center w-20 h-20 rounded-2xl bg-black border-2 border-[#00ffff] transition-all duration-300 hover:border-[#fd19fc] hover:shadow-lg hover:shadow-[#00ffff]/50 hover:scale-110 focus:outline-none focus:border-[#fd19fc] pointer-events-auto "
        style={{
          ...getLogoPosition(),
          transform: "translate(-50%, -50%)",
        }}
        onClick={handleLogoClick}
        aria-label="Logo - ZM"
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && handleLogoClick()
        }
        onMouseEnter={handleLogoMouseEnter}
        onMouseLeave={handleLogoMouseLeave}>
        <img
          src="/images/logo.png"
          alt="Zsolt Márku logo"
          className="w-full h-full object-cover rounded-full overflow-hidden"
        />
        {/* Desktop tooltip: always in DOM, only visible on hover */}
        {!isMobile && (
          <div
            className={`absolute top-[80px] w-20 h-7 rounded-b-xl bg-[#fd19fc] flex items-center justify-center shadow-glow z-50 desktop-tooltip${
              logoHovered ? "" : " tooltip-hide"
            }`}>
            <span className="text-white text-xs font-bold">Click on me!</span>
          </div>
        )}
        {/* Mobile tooltip: always visible */}
        {isMobile && (
          <div className="absolute top-[80px] w-20 h-7 rounded-b-xl bg-[#fd19fc] flex items-center justify-center shadow-glow z-50 pulse-dot">
            <span className="text-white text-xs font-bold">Click on me!</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
