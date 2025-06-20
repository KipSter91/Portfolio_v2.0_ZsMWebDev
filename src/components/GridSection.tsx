import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface GridSectionProps {
  onOpenModal: (modal: string) => void;
}

// 2x2 grid items
const gridItems = [
  { key: "about", label: "About Me", area: "1 / 1 / 2 / 2" },
  { key: "skills", label: "Skills", area: "1 / 2 / 2 / 3" },
  { key: "projects", label: "Projects", area: "2 / 1 / 3 / 2" },
  { key: "contact", label: "Contact", area: "2 / 2 / 3 / 3" },
];

// SVG underline path variants
const underlinePaths = [
  // Wavy
  "M0,2.5 Q25,5 50,2.5 T100,2.5",
  // Straight
  "M0,2.5 L100,2.5",
  // Curve up
  "M0,4 Q50,0 100,4",
  // Curve down
  "M0,1 Q50,5 100,1",
  // Twisted (spiral-like)
  "M0,2.5 Q10,0 20,2.5 Q30,5 40,2.5 Q50,0 60,2.5 Q70,5 80,2.5 Q90,0 100,2.5",
];

export default function GridSection({ onOpenModal }: GridSectionProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visualHovered, setVisualHovered] = useState<number | null>(null);
  const [currentUnderlineIdx, setCurrentUnderlineIdx] = useState<number | null>(
    null
  );
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const underlines = useRef<(SVGPathElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);

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
  };

  const handleLogoMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };
  const handleLogoMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(null);
      setVisualHovered(null);
    }, 300);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Animate underline on hover
  useEffect(() => {
    if (visualHovered !== null && underlines.current[visualHovered]) {
      gsap.fromTo(
        underlines.current[visualHovered],
        { strokeDashoffset: 100, strokeDasharray: 100 },
        { strokeDashoffset: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [visualHovered]);

  // Calculate logo position based on hovered grid
  const getLogoPosition = () => {
    if (hovered === null) return { left: "50%", top: "50%" };
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
    <div
      className="w-full h-screen grid fixed inset-0 z-10 transition-all duration-300"
      style={{
        ...getGridTemplate(),
        gap: 0,
        padding: 0,
        margin: 0,
        borderSpacing: 0,
        width: "100vw",
        height: "100vh",
      }}>
      {gridItems.map((item, idx) => {
        const isHovered = hovered === idx;
        const isVisualHovered = visualHovered === idx;
        const isOther = hovered !== null && hovered !== idx;
        return (
          <button
            key={item.key}
            className={`flex items-center justify-center transition-all duration-300 text-2xl font-bold select-none group overflow-hidden focus:z-20 cursor-pointer
              ${isHovered ? "z-20" : isOther ? " blur-[3px]" : ""}
            `}
            style={{
              gridArea: item.area,
              minWidth: 0,
              minHeight: 0,
              border: !isHovered
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
            onClick={() => onOpenModal(item.key)}
            aria-label={item.label}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleMouseEnter(idx)}
            onBlur={handleMouseLeave}>
            <div className="z-10 drop-shadow-lg transition-transform duration-300 relative flex flex-col items-center">
              <span
                className={`transition-colors ${
                  isVisualHovered ? "text-[#00ffff]" : ""
                }`}
                style={{ marginBottom: 8 }}>
                {item.label}
              </span>
              {isVisualHovered && currentUnderlineIdx !== null && (
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
                    strokeDasharray="100"
                    strokeDashoffset="100"
                  />
                </svg>
              )}
            </div>
          </button>
        );
      })}
      {/* Logo element, follows grid center or hovered cell */}
      <div
        className="absolute z-30 flex items-center justify-center w-20 h-20 bg-black border-2 border-[#00ffff] transition-all duration-300 hover:border-[#fd19fc] hover:shadow-lg hover:shadow-[#00ffff]/50 hover:scale-110 focus:outline-none focus:border-[#fd19fc] pointer-events-auto rounded-full overflow-hidden"
        style={{
          ...getLogoPosition(),
          transform: "translate(-50%, -50%)",
        }}
        onClick={() => onOpenModal("logo")}
        aria-label="Logo - ZM"
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && onOpenModal("logo")
        }
        onMouseEnter={handleLogoMouseEnter}
        onMouseLeave={handleLogoMouseLeave}>
        <img
          src="/images/logo.png"
          alt="Zsolt Márku logo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
