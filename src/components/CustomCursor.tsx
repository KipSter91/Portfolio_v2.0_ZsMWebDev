"use client";
import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [lastMove, setLastMove] = useState(Date.now());
  const [hasMoved, setHasMoved] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile or tablet
    const checkDevice = () => {
      const mediaQuery = window.matchMedia("(max-width: 1024px)");
      setIsMobile(mediaQuery.matches);
    };

    // Check on initial load
    checkDevice();

    // Add resize listener to detect orientation/device changes
    window.addEventListener("resize", checkDevice);

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
      setLastMove(Date.now());
      setHasMoved(true);
    };
    const hide = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", hide);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", hide);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  // Don't render anything on mobile/tablet
  if (isMobile) {
    return null;
  }

  return (
    <>
      {visible && hasMoved && (
        <div
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            width: 10,
            height: 10,
            background: "var(--dark-gray)",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            border: "2px solid var(--neon-cyan)",
            boxShadow: "0 0 12px var(--neon-pink), 0 0 2px var(--neon-cyan)",
            transition: "background 0.2s, border 0.2s, box-shadow 0.2s",
            opacity: 1,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
