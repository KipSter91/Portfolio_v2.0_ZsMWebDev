"use client";
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const addMouseListeners = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', addMouseListeners);
    return () => {
      window.removeEventListener('mousemove', addMouseListeners);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 10,
        height: 10,
        background: 'var(--dark-gray)',
        borderRadius: '25% 5% 25% 5%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        border: '2px solid var(--neon-cyan)',
        boxShadow: '0 0 12px var(--neon-pink), 0 0 2px var(--neon-cyan)',
        transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
      }}
    />
  );
};

export default CustomCursor;
