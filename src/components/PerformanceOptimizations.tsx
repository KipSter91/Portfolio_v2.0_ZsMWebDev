"use client";
// Safari detektálás & body class hozzáadása + opcionális passive listener beállítás.
import { useEffect } from "react";

export default function PerformanceOptimizations() {
  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
    if (isSafari) {
      document.body.classList.add("is-safari");
    }
    // Példa passive listener – ha később szükség lesz görgetésre (most csak noop)
    const noop = () => {};
    const opts: AddEventListenerOptions & { passive?: boolean } = {
      passive: true,
    };
    window.addEventListener("touchstart", noop, opts);
    return () => {
      window.removeEventListener("touchstart", noop);
    };
  }, []);
  return null;
}
