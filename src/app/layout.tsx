import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";
import { Header, Footer } from "../components";
import { LocaleProvider } from "../contexts/LocaleContext";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { CookieConsent } from "../components/CookieConsent";
import { CookieConsentHandler } from "../components/CookieConsentHandler";
import { DynamicMetadata } from "../components/DynamicMetadata";

export const metadata: Metadata = {
  // Base metadata - will be updated dynamically by DynamicMetadata component
  authors: [{ name: "Zsolt Márku", url: "https://zsoltmarku.com" }],
  creator: "Zsolt Márku",
  publisher: "Zsolt Márku",
  robots: "index, follow",
  alternates: {
    canonical: "https://zsoltmarku.com",
    languages: {
      en: "https://zsoltmarku.com",
      hu: "https://zsoltmarku.com",
      nl: "https://zsoltmarku.com",
    },
  },
  verification: {
    google: "zBCBMedAwejCsXEFYaDYiXBRUNZY2EPv8XpQiE4ZQwk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Zsolt Márku",
    alternateName: "Kipster91",
    jobTitle: ["Frontend Developer", "Warehouse Manager"],
    url: "https://zsoltmarku.com",
    image: "https://zsoltmarku.com/images/profile.webp",
    description:
      "Frontend Developer and Warehouse Manager, from Rotterdam, in Netherlands. Experienced in frontend development with Javascript, React, Next.js, TypeScript, and team leadership.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rotterdam",
      addressCountry: "Netherlands",
    },
    alumniOf: {
      "@type": "Organization",
      name: "University of Miskolc",
      department: "Faculty of Informatics",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Framer Motion",
      "Web Development",
      "Frontend Development",
      "Team Leadership",
      "Warehouse Management",
    ],
    sameAs: [
      "https://linkedin.com/in/zsolt-márku-931a49298",
      "https://github.com/kipster91",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <head>
        <link
          rel="canonical"
          href="https://zsoltmarku.com"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://zsoltmarku.com"
        />
        <link
          rel="alternate"
          hrefLang="hu"
          href="https://zsoltmarku.com"
        />
        <link
          rel="alternate"
          hrefLang="nl"
          href="https://zsoltmarku.com"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://zsoltmarku.com"
        />
        <link
          rel="icon"
          type="image/webp"
          href="/images/logo.webp"
        />
        <link
          rel="shortcut icon"
          type="image/webp"
          href="/images/logo.webp"
        />
        <link
          rel="apple-touch-icon"
          href="/images/logo.webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning>
        <GoogleAnalytics />
        <CookieConsentHandler />
        <LocaleProvider>
          <DynamicMetadata />
          <CustomCursor />
          <div className="fixed top-0 left-0 right-0 z-50 header-blur">
            <Header />
          </div>
          <main className="pt-14 flex-grow overflow-x-hidden">{children}</main>
          <Footer />
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
