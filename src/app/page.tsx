"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GridSection,
  SplashScreen,
  AnimatedModal,
  LogoModal,
} from "../components";
import { useSearchParams } from "next/navigation";

// Easter egg message in console
const consoleStyles = [
  "color: #00ffff",
  "background-color: #161A20",
  "font-size: 20px",
  "padding: 10px",
  "border-radius: 5px",
  "border: 2px solid #fd19fc",
].join(";");

// Search params component that needs to be wrapped in suspense
function SearchParamsHandler({
  onFromPageChange,
}: {
  onFromPageChange: (fromPage: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const fromPage = searchParams.get("from");

  useEffect(() => {
    onFromPageChange(fromPage);
  }, [fromPage, onFromPageChange]);

  return null;
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(false); // Initially false
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [fromPageInitialized, setFromPageInitialized] = useState(false);
  const [fromPage, setFromPage] = useState<string | null>(null);
  const [currentModal, setCurrentModal] = useState<string | null>(null);

  // Console easter egg
  useEffect(() => {
    console.log(
      "%c👋 Hey there, explorer! Welcome to my portfolio!",
      consoleStyles
    );
  }, []);

  // Handle fromPage detection and navigation logic
  useEffect(() => {
    if (!fromPageInitialized) return;

    if (fromPage) {
      // If fromPage is set, we show the content directly
      setShowSplash(false);
      setShowContent(true);
    } else {
      // If no fromPage, show splash screen
      setShowSplash(true);
      setShowContent(false);
    }
  }, [fromPage, fromPageInitialized]);

  // Handle fromPage change callback
  const handleFromPageChange = (newFromPage: string | null) => {
    setFromPage(newFromPage);
    setFromPageInitialized(true);
  };
  // Splash screen complete
  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowContent(true);
  };

  // Modal handlers
  const handleOpenModal = (modalName: string) => {
    setCurrentModal(modalName);
  };

  const handleCloseModal = () => {
    setCurrentModal(null);
  };

  // Blur on body when modal is open
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (currentModal) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    }
  }, [currentModal]);

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler onFromPageChange={handleFromPageChange} />
      </Suspense>

      <AnimatePresence mode="wait">
        {showSplash && !fromPage && fromPageInitialized && (
          <SplashScreen
            key="splash"
            onComplete={handleSplashComplete}
          />
        )}
        {showContent && fromPageInitialized && !isExiting && (
          <div className="w-full text-white relative overflow-hidden">
            <motion.div
              key="content"
              className="w-full h-full"
              initial={{
                opacity: 0,
                x: fromPage ? -100 : 0,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -100,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                position: "relative",
                zIndex: 1,
              }}>
              <GridSection
                onExit={() => setIsExiting(true)}
                onOpenModal={handleOpenModal}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logo Modal */}
      <AnimatedModal
        isOpen={currentModal === "logo"}
        onClose={handleCloseModal}>
        <LogoModal />
      </AnimatedModal>
    </>
  );
}
