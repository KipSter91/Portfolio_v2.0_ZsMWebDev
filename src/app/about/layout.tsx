import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me - Zsolt Márku | Frontend Developer & Professional Journey",
  description:
    "Learn about my journey from Computer Science studies to becoming a Frontend Developer and Warehouse Manager in Rotterdam, Netherlands. My experience, education, and passion for technology.",
  keywords:
    "Zsolt Márku about, professional journey, Computer Science Miskolc University, Frontend Developer experience, Warehouse Manager Rotterdam, AMPCO Metal, Arvato, web development passion",
  openGraph: {
    title: "About Me - Zsolt Márku | Frontend Developer & Professional Journey",
    description:
      "Learn about my journey from Computer Science studies to becoming a Frontend Developer and Warehouse Manager in Rotterdam, Netherlands.",
    url: "https://zsoltmarku.com/about",
    images: [
      {
        url: "https://zsoltmarku.com/images/og-about.webp",
        width: 1200,
        height: 630,
        alt: "Zsolt Márku - About Me",
      },
    ],
  },
  twitter: {
    title: "About Me - Zsolt Márku | Frontend Developer & Professional Journey",
    description:
      "Learn about my journey from Computer Science studies to becoming a Frontend Developer and Warehouse Manager in Rotterdam, Netherlands.",
    images: ["https://zsoltmarku.com/images/og-about.webp"],
  },
  alternates: {
    canonical: "https://zsoltmarku.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
