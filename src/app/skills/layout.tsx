import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Skills & Technologies - ZsMWebDev by Zsolt Márku | Frontend Development Expertise",
  description:
    "Explore ZsMWebDev's technical skills by Zsolt Márku in React, Next.js, TypeScript, JavaScript, and more. Personal skills including leadership, teamwork, and problem-solving developed through nearly 10 years of warehouse management experience.",
  keywords:
    "ZsMWebDev skills, Zsolt Márku expertise, React developer skills, Next.js expertise, TypeScript, JavaScript, HTML CSS, Tailwind CSS, Framer Motion, leadership skills, teamwork, problem solving, frontend technologies Rotterdam",
  openGraph: {
    title:
      "Skills & Technologies - ZsMWebDev by Zsolt Márku | Frontend Development Expertise",
    description:
      "Explore ZsMWebDev's technical skills by Zsolt Márku in React, Next.js, TypeScript, JavaScript, and more. Personal skills including leadership, teamwork, and problem-solving.",
    url: "https://zsoltmarku.com/skills",
    images: [
      {
        url: "https://zsoltmarku.com/images/og-skills.webp",
        width: 1200,
        height: 630,
        alt: "ZsMWebDev by Zsolt Márku - Skills & Technologies",
      },
    ],
  },
  twitter: {
    title:
      "Skills & Technologies - ZsMWebDev by Zsolt Márku | Frontend Development Expertise",
    description:
      "Explore ZsMWebDev's technical skills by Zsolt Márku in React, Next.js, TypeScript, JavaScript, and more. Personal skills including leadership, teamwork, and problem-solving.",
    images: ["https://zsoltmarku.com/images/og-skills.webp"],
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
