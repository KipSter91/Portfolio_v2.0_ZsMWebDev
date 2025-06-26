"use client";

import { useEffect } from "react";
import Head from "next/head";
import { useLocaleContext } from "../contexts/LocaleContext";

export function DynamicMetadata() {
  const { locale, t } = useLocaleContext();

  useEffect(() => {
    // Update document title based on current locale
    const titles = {
      en: "Zsolt Márku - Portfolio | Frontend Developer | Warehouse Manager",
      hu: "Márku Zsolt - Portfólió | Frontend Fejlesztő | Warehouse Manager",
      nl: "Zsolt Márku - Portfolio | Frontend Developer | Warehouse Manager",
    };

    const descriptions = {
      en: "Frontend Developer & Warehouse Manager from Rotterdam, Netherlands. Specialized in JavaScript, React, Next.js, TypeScript, and modern web technologies. Explore my multilingual portfolio, innovative projects, and professional journey in the heart of Europe.",
      hu: "Frontend fejlesztő és Warehouse Manager, Rotterdamból, Hollandiában. Modern webes technológiák (React, Next.js, TypeScript), többnyelvű portfólió, innovatív projektek és szakmai tapasztalat egy helyen. Fedezd fel munkáimat és karrierutamat!",
      nl: "Frontend Developer en Warehouse Manager uit Rotterdam, Nederland. Gespecialiseerd in Javascript, React, Next.js, TypeScript en moderne webtechnologieën. Ontdek mijn meertalige portfolio, innovatieve projecten en professionele reis in het hart van Europa.",
    };

    const keywords = {
      en: "Zsolt Márku, Frontend Developer, React, Next.js, TypeScript, JavaScript, Rotterdam, Netherlands, Multilingual Portfolio, Web Development, UI/UX, Modern Web, Innovative Projects, Warehouse Manager, Europe",
      hu: "Márku Zsolt, Frontend Fejlesztő, React, Next.js, TypeScript, JavaScript, Rotterdam, Hollandia, Többnyelvű Portfólió, Webfejlesztés, UI/UX, Modern Web, Innovatív Projektek, Warehouse Manager, Európa",
      nl: "Zsolt Márku, Frontend Developer, React, Next.js, TypeScript, JavaScript, Rotterdam, Nederland, Meertalig Portfolio, Webontwikkeling, UI/UX, Moderne Web, Innovatieve Projecten, Warehouse Manager, Europa",
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
      { property: "og:site_name", content: "Zsolt Márku Portfolio" },
      {
        property: "og:image",
        content: "https://zsoltmarku.com/images/og-home.webp",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Zsolt Márku - Frontend Developer" },
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
