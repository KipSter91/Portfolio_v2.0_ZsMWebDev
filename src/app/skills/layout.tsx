import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills & Technologies - Zsolt Márku | Frontend Development Expertise",
  description:
    "Explore my technical skills in React, Next.js, TypeScript, JavaScript, and more. Personal skills including leadership, teamwork, and problem-solving developed through warehouse management experience.",
  keywords:
    "Zsolt Márku skills, React developer skills, Next.js expertise, TypeScript, JavaScript, HTML CSS, Tailwind CSS, Framer Motion, leadership skills, teamwork, problem solving, frontend technologies",
  openGraph: {
    title:
      "Skills & Technologies - Zsolt Márku | Frontend Development Expertise",
    description:
      "Explore my technical skills in React, Next.js, TypeScript, JavaScript, and more. Personal skills including leadership, teamwork, and problem-solving.",
    url: "https://zsoltmarku.com/skills",
    images: [
      {
        url: "https://zsoltmarku.com/images/og-skills.webp",
        width: 1200,
        height: 630,
        alt: "Zsolt Márku - Skills & Technologies",
      },
    ],
  },
  twitter: {
    title:
      "Skills & Technologies - Zsolt Márku | Frontend Development Expertise",
    description:
      "Explore my technical skills in React, Next.js, TypeScript, JavaScript, and more. Personal skills including leadership, teamwork, and problem-solving.",
    images: ["https://zsoltmarku.com/images/og-skills.webp",],
  },
  alternates: {
    canonical: "https://zsoltmarku.com/skills",
  },
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
