"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// Google Analytics tracking ID - replace with your actual ID
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "GA_MEASUREMENT_ID";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function GoogleAnalytics() {
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false);

  useEffect(() => {
    // Check if analytics are enabled
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      const analyticsEnabled = localStorage.getItem("analytics-enabled");
      const cookiePreferences = localStorage.getItem("cookie-preferences");

      let shouldEnable = false;

      if (cookiePreferences) {
        try {
          const preferences = JSON.parse(cookiePreferences);
          shouldEnable = preferences.analytics === true;
        } catch {
          shouldEnable = false;
        }
      } else if (consent === "accepted" && analyticsEnabled === "true") {
        shouldEnable = true;
      }

      setShouldLoadAnalytics(shouldEnable);

      if (shouldEnable && !window.dataLayer) {
        // Initialize dataLayer if analytics are enabled
        window.dataLayer = window.dataLayer || [];

        function gtag(...args: any[]) {
          window.dataLayer!.push(args);
        }

        window.gtag = gtag;

        // Configure Google Analytics
        gtag("js", new Date());
        gtag("config", GA_MEASUREMENT_ID, {
          page_title: document.title,
          page_location: window.location.href,
          anonymize_ip: true,
          cookie_flags: "SameSite=Strict;Secure",
        });
      }
    };

    // Initial check
    checkConsent();

    // Listen for consent events
    const handleConsentGiven = () => checkConsent();
    const handleConsentRevoked = () => checkConsent();
    const handlePreferencesChanged = () => checkConsent();

    window.addEventListener("analytics-consent-given", handleConsentGiven);
    window.addEventListener("analytics-consent-revoked", handleConsentRevoked);
    window.addEventListener("cookie-consent-updated", checkConsent);
    window.addEventListener(
      "cookiePreferencesChanged",
      handlePreferencesChanged
    );

    return () => {
      window.removeEventListener("analytics-consent-given", handleConsentGiven);
      window.removeEventListener(
        "analytics-consent-revoked",
        handleConsentRevoked
      );
      window.removeEventListener("cookie-consent-updated", checkConsent);
      window.removeEventListener(
        "cookiePreferencesChanged",
        handlePreferencesChanged
      );
    };
  }, []);

  return (
    <>
      {shouldLoadAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=Strict;Secure'
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
