import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "About ZsMWebDev - Professional Web Development Services | Zsolt Márku",
  description:
    "Meet the founder of ZsMWebDev - Zsolt Márku, professional web developer in Rotterdam, Netherlands. Nearly 10 years of experience at AMPCO Metal, Computer Science background, and passion for creating custom websites that transform businesses online.",
  keywords:
    "ZsMWebDev about, Zsolt Márku web developer, professional web development Rotterdam, custom website development, Computer Science Miskolc University, AMPCO Metal experience, business transformation, React Next.js specialist",
  openGraph: {
    title:
      "About ZsMWebDev - Professional Web Development Services | Zsolt Márku",
    description:
      "Meet the founder of ZsMWebDev - professional web developer with nearly 10 years of experience, specializing in custom websites that transform businesses.",
    url: "https://zsoltmarku.com/about",
    images: [
      {
        url: "https://zsoltmarku.com/images/og-about.webp",
        width: 1200,
        height: 630,
        alt: "ZsMWebDev - About Professional Web Development Services",
      },
    ],
  },
  twitter: {
    title:
      "About ZsMWebDev - Professional Web Development Services | Zsolt Márku",
    description:
      "Meet the founder of ZsMWebDev - professional web developer with nearly 10 years of experience, specializing in custom websites that transform businesses.",
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
