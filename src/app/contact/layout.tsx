import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me - Zsolt Márku | Get in Touch for Projects & Collaboration",
  description:
    "Ready to work together? Contact me for web development projects, collaboration opportunities, or to discuss your ideas. Based in Rotterdam, Netherlands, available for frontend development work.",
  keywords:
    "contact Zsolt Márku, hire frontend developer Rotterdam, React developer contact, web development collaboration, freelance frontend developer Netherlands, project inquiry",
  openGraph: {
    title:
      "Contact Me - Zsolt Márku | Get in Touch for Projects & Collaboration",
    description:
      "Ready to work together? Contact me for web development projects, collaboration opportunities, or to discuss your ideas.",
    url: "https://zsoltmarku.com/contact",
    images: [
      {
        url: "https://zsoltmarku.com/images/og-contact.webp",
        width: 1200,
        height: 630,
        alt: "Contact Zsolt Márku - Frontend Developer",
      },
    ],
  },
  twitter: {
    title:
      "Contact Me - Zsolt Márku | Get in Touch for Projects & Collaboration",
    description:
      "Ready to work together? Contact me for web development projects, collaboration opportunities, or to discuss your ideas.",
    images: ["https://zsoltmarku.com/images/og-contact.webp",],
  },
  alternates: {
    canonical: "https://zsoltmarku.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
