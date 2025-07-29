"use client";

import { useEffect } from "react";
import Head from "next/head";
import { useLocaleContext } from "../contexts/LocaleContext";

export function DynamicMetadata() {
  const { locale, t } = useLocaleContext();

  useEffect(() => {
    // Update document title based on current locale
    const titles = {
      en: "ZsMWebDev - Zsolt Márku | Custom Website Development | Professional Web Solutions",
      hu: "ZsMWebDev - Márku Zsolt | Egyedi Weboldal Fejlesztés | Professzionális Web Megoldások",
      nl: "ZsMWebDev - Zsolt Márku | Maatwerk Website Ontwikkeling | Professionele Web Oplossingen",
    };

    const descriptions = {
      en: "ZsMWebDev by Zsolt Márku creates custom websites from scratch for businesses in Rotterdam, Netherlands. Specialized in React, Next.js, TypeScript, and modern web technologies. Transform your business online with professional, conversion-optimized websites.",
      hu: "A ZsMWebDev - Márku Zsolt egyedi weboldalakat készít a semmiből vállalkozások számára Rotterdamban, Hollandiában. React, Next.js, TypeScript és modern webes technológiák specialistája. Alakítsd át vállalkozásod online professzionális, konverzióra optimalizált weboldalakkal.",
      nl: "ZsMWebDev door Zsolt Márku creëert maatwerk websites vanaf nul voor bedrijven in Rotterdam, Nederland. Gespecialiseerd in React, Next.js, TypeScript en moderne webtechnologieën. Transformeer uw bedrijf online met professionele, conversie-geoptimaliseerde websites.",
    };

    const keywords = {
      en: "ZsMWebDev, Zsolt Márku, custom website development, React Next.js developer Rotterdam, professional web design Netherlands, business website creation, modern web development, conversion optimization, TypeScript specialist",
      hu: "ZsMWebDev, Márku Zsolt, egyedi weboldal fejlesztés, React Next.js fejlesztő Rotterdam, professzionális webdesign Hollandia, üzleti weboldal készítés, modern webfejlesztés, konverzió optimalizálás, TypeScript specialista",
      nl: "ZsMWebDev, Zsolt Márku, maatwerk website ontwikkeling, React Next.js ontwikkelaar Rotterdam, professioneel webdesign Nederland, bedrijfswebsite creatie, moderne webontwikkeling, conversie optimalisatie, TypeScript specialist",
    };

    const currentTitle = titles[locale as keyof typeof titles] || titles.en;
    const currentDescription =
      descriptions[locale as keyof typeof descriptions] || descriptions.en;
    const currentKeywords =
      keywords[locale as keyof typeof keywords] || keywords.en;

    // Update document title
    document.title = currentTitle;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", currentDescription);

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", currentKeywords);

    // Update or create Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", currentTitle);

    let ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute("content", currentDescription);

    // Add other OpenGraph properties if they don't exist
    const ogProperties = [
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zsoltmarku.com" },
      {
        property: "og:site_name",
        content: "ZsMWebDev - Professional Website Development",
      },
      {
        property: "og:image",
        content: "https://zsoltmarku.com/images/og-home.webp",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "ZsMWebDev by Zsolt Márku - Professional Website Development Services",
      },
    ];

    ogProperties.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    });

    // Update or create Twitter meta tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement("meta");
      twitterTitle.setAttribute("name", "twitter:title");
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute("content", currentTitle);

    let twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );
    if (!twitterDescription) {
      twitterDescription = document.createElement("meta");
      twitterDescription.setAttribute("name", "twitter:description");
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute("content", currentDescription);

    // Add other Twitter properties if they don't exist
    const twitterProperties = [
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://zsoltmarku.com/images/og-home.webp",
      },
    ];

    twitterProperties.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = locale;
  }, [locale]);

  return null; // This component doesn't render anything
}
