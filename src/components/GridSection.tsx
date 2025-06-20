import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface GridSectionProps {
  onOpenModal: (modal: string) => void;
}

// 4 db normál grid cella - EGYSZERŰ 2x2
const gridItems = [
  { key: "about", label: "About Me", area: "1 / 1 / 2 / 2" }, // bal felső
  { key: "skills", label: "Skills", area: "1 / 2 / 2 / 3" }, // jobb felső
  { key: "projects", label: "Projects", area: "2 / 1 / 3 / 2" }, // bal alsó
  { key: "contact", label: "Contact", area: "2 / 2 / 3 / 3" }, // jobb alsó
];

export default function GridSection({ onOpenModal }: GridSectionProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visualHovered, setVisualHovered] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const underlines = useRef<(SVGPathElement | null)[]>([
    null,
    null,
    null,
    null,
  ]); // Delayed hover functions - hogy a logóra is tudjunk hoverolni
  const handleMouseEnter = (idx: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // 300ms delay a hover state és vizuális effektek beállításához is
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(idx);
      setVisualHovered(idx);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(null);
      setVisualHovered(null);
    }, 300); // 300ms delay
  };

  const handleLogoMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Logóra hoveroláskor megtartjuk a jelenlegi hover állapotot
  };
  const handleLogoMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(null);
      setVisualHovered(null);
    }, 300); // 300ms delay - ugyanannyi mint a grid elemeknél
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  // GSAP animations for the underlines
  useEffect(() => {
    if (visualHovered !== null && underlines.current[visualHovered]) {
      // Animate the underline
      gsap.fromTo(
        underlines.current[visualHovered],
        { strokeDashoffset: 100, strokeDasharray: 100 },
        { strokeDashoffset: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [visualHovered]);

  // Logó pozíció számítása a grid változások alapján
  const getLogoPosition = () => {
    if (hovered === null) {
      // Alapállapot - középen
      return { left: "50%", top: "50%" };
    }

    // Grid template értékek alapján számoljuk ki az új pozíciót
    if (hovered === 0) {
      // About Me hover - bal felső nagyobb (1.15fr 0.85fr / 1.15fr 0.85fr)
      const leftPercent = (1.15 / (1.15 + 0.85)) * 100; // ~57.5%
      const topPercent = (1.15 / (1.15 + 0.85)) * 100;
      return { left: `${leftPercent}%`, top: `${topPercent}%` };
    }
    if (hovered === 1) {
      // Skills hover - jobb felső nagyobb (0.85fr 1.15fr / 1.15fr 0.85fr)
      const leftPercent = (0.85 / (0.85 + 1.15)) * 100; // ~42.5%
      const topPercent = (1.15 / (1.15 + 0.85)) * 100;
      return { left: `${leftPercent}%`, top: `${topPercent}%` };
    }
    if (hovered === 2) {
      // Projects hover - bal alsó nagyobb (1.15fr 0.85fr / 0.85fr 1.15fr)
      const leftPercent = (1.15 / (1.15 + 0.85)) * 100; // ~57.5%
      const topPercent = (0.85 / (0.85 + 1.15)) * 100;
      return { left: `${leftPercent}%`, top: `${topPercent}%` };
    }
    if (hovered === 3) {
      // Contact hover - jobb alsó nagyobb (0.85fr 1.15fr / 0.85fr 1.15fr)
      const leftPercent = (0.85 / (0.85 + 1.15)) * 100; // ~42.5%
      const topPercent = (0.85 / (0.85 + 1.15)) * 100;
      return { left: `${leftPercent}%`, top: `${topPercent}%` };
    }

    return { left: "50%", top: "50%" };
  };

  // Egyszerű 2x2 grid - TÖKÉLETES illeszkedés
  const getGridTemplate = () => {
    if (hovered === null) {
      return {
        gridTemplateColumns: "1fr 1fr", // 2 egyenlő oszlop
        gridTemplateRows: "1fr 1fr", // 2 egyenlő sor
      };
    }

    // Hover effektek - a grid template változik, így a cellák tökéletesen illeszkednek
    if (hovered === 0) {
      // About Me - bal felső nagyobb
      return {
        gridTemplateColumns: "1.15fr 0.85fr",
        gridTemplateRows: "1.15fr 0.85fr",
      };
    }
    if (hovered === 1) {
      // Skills - jobb felső nagyobb
      return {
        gridTemplateColumns: "0.85fr 1.15fr",
        gridTemplateRows: "1.15fr 0.85fr",
      };
    }
    if (hovered === 2) {
      // Projects - bal alsó nagyobb
      return {
        gridTemplateColumns: "1.15fr 0.85fr",
        gridTemplateRows: "0.85fr 1.15fr",
      };
    }
    if (hovered === 3) {
      // Contact - jobb alsó nagyobb
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
      {" "}
      {/* Grid cellák - csak a 4 db normál elem */}{" "}
      {gridItems.map((item, idx) => {
        const isHovered = hovered === idx;
        const isVisualHovered = visualHovered === idx;
        const isOther = hovered !== null && hovered !== idx;

        return (
          <button
            key={item.key}
            className={`flex items-center justify-center transition-all duration-300 text-2xl font-bold select-none group overflow-hidden focus:z-20 cursor-pointer
              ${isHovered ? "z-20 shadow-2xl" : isOther ? "opacity-80" : ""}
            `}
            style={{
              gridArea: item.area,
              minWidth: 0,
              minHeight: 0,
              border: 0,
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
            {" "}
            {/* Normál elemek */}
            <div className="z-10 drop-shadow-lg transition-transform duration-300 relative flex flex-col items-center">
              <span
                className={`transition-colors ${
                  isVisualHovered ? "text-[#00ffff]" : ""
                }`}>
                {item.label}
              </span>
              {/* SVG underline animation */}
              <svg
                className="w-full h-5 overflow-visible absolute -bottom-2"
                viewBox="0 0 100 5"
                preserveAspectRatio="none">
                <path
                  ref={(el) => {
                    underlines.current[idx] = el;
                    return undefined;
                  }}
                  d="M0,2.5 Q25,5 50,2.5 T100,2.5"
                  fill="none"
                  stroke="var(--neon-pink)"
                  strokeWidth="2"
                  className={`transition-opacity ${
                    isVisualHovered ? "opacity-100" : "opacity-0"
                  }`}
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
              </svg>
            </div>
          </button>
        );
      })}{" "}
      {/* Logó elem - grid layout középpont, követi a változásokat */}
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
