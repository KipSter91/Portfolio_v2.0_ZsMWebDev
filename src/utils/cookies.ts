// Cookie types and preferences
export interface CookiePreferences {
  essential: boolean; // Always true, cannot be disabled
  analytics: boolean; // User can choose
  marketing?: boolean; // For future use
}

export const defaultCookiePreferences: CookiePreferences = {
  essential: true,
  analytics: false,
};

export const COOKIE_CONSENT_KEY = "cookie-consent";
export const COOKIE_PREFERENCES_KEY = "cookie-preferences";

// Cookie utility functions
export const setCookiePreferences = (preferences: CookiePreferences) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
    localStorage.setItem(COOKIE_CONSENT_KEY, "configured");

    // Trigger custom event for analytics
    window.dispatchEvent(
      new CustomEvent("cookiePreferencesChanged", {
        detail: preferences,
      })
    );
  }
};

export const getCookiePreferences = (): CookiePreferences => {
  if (typeof window === "undefined") {
    return defaultCookiePreferences;
  }

  const stored = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (stored) {
    try {
      return { ...defaultCookiePreferences, ...JSON.parse(stored) };
    } catch {
      return defaultCookiePreferences;
    }
  }
  return defaultCookiePreferences;
};

export const hasUserMadeChoice = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
};
