import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Portfolio - Zsolt Márku | React & Next.js Web Development",
  description:
    "Showcase of my web development projects including StepIO fitness app, IstOneFlexWork landing page, G.U.C. Coaching website, Dishcovery recipe app, and AMPCO calculator tool. Built with Javascript, React, Next.js, and modern technologies.",
  keywords:
    "Zsolt Márku projects, React projects, Next.js portfolio, StepIO app, IstOneFlexWork, GUC Coaching, Dishcovery recipe app, AMPCO calculator, web development portfolio, JavaScript projects",
  openGraph: {
    title: "Projects Portfolio - Zsolt Márku | React & Next.js Web Development",
    description:
      "Showcase of my web development projects including StepIO fitness app, IstOneFlexWork landing page, and more. Built with Javascript, React, Next.js, and modern technologies.",
    url: "https://zsoltmarku.com/projects",
    images: [
      {
        url: "https://zsoltmarku.com/images/og-projects.webp",
        width: 1200,
        height: 630,
        alt: "Zsolt Márku - Projects Portfolio",
      },
    ],
  },
  twitter: {
    title: "Projects Portfolio - Zsolt Márku | React & Next.js Web Development",
    description:
      "Showcase of my web development projects including StepIO fitness app, IstOneFlexWork landing page, and more.",
    images: ["https://zsoltmarku.com/images/og-projects.webp",],
  },
  alternates: {
    canonical: "https://zsoltmarku.com/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
