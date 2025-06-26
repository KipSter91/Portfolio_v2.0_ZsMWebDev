"use client";

import { useEffect } from "react";

export function CookieConsentHandler() {
  useEffect(() => {
    // Listen for cookie consent changes and trigger analytics loading
    const handleConsentChange = () => {
      const consent = localStorage.getItem("cookie-consent");
      const analyticsEnabled = localStorage.getItem("analytics-enabled");

      if (consent === "accepted" && analyticsEnabled === "true") {
        // Trigger a custom event that GoogleAnalytics component can listen to
        window.dispatchEvent(new CustomEvent("analytics-consent-given"));
      } else if (consent === "declined" || analyticsEnabled === "false") {
        // Trigger a custom event to disable analytics
        window.dispatchEvent(new CustomEvent("analytics-consent-revoked"));
      }
    };

    // Initial check
    handleConsentChange();

    // Listen for storage changes
    window.addEventListener("storage", handleConsentChange);

    // Custom event listener for immediate updates (same tab)
    const handleLocalStorageUpdate = () => {
      setTimeout(handleConsentChange, 100); // Small delay to ensure localStorage is updated
    };

    // Listen for custom events from CookieConsent component
    window.addEventListener("cookie-consent-updated", handleLocalStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleConsentChange);
      window.removeEventListener(
        "cookie-consent-updated",
        handleLocalStorageUpdate
      );
    };
  }, []);

  return null; // This component doesn't render anything
}
