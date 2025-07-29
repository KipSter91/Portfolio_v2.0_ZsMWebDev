import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Contact ZsMWebDev by Zsolt Márku - Custom Website Development | Get Your Quote",
  description:
    "Ready to transform your business online? Contact ZsMWebDev by Zsolt Márku for custom website development, modern web solutions, and professional digital presence. Based in Rotterdam, Netherlands, specializing in React, Next.js, and conversion-optimized websites.",
  keywords:
    "contact ZsMWebDev, Zsolt Márku contact, custom website development Rotterdam, hire web developer Netherlands, React Next.js developer, business website creation, modern web development, professional website design, conversion optimization",
  openGraph: {
    title:
      "Contact ZsMWebDev by Zsolt Márku - Custom Website Development | Get Your Quote",
    description:
      "Ready to transform your business online? Contact ZsMWebDev by Zsolt Márku for custom website development, modern web solutions, and professional digital presence.",
    url: "https://zsoltmarku.com/contact",
    images: [
      {
        url: "https://zsoltmarku.com/images/og-contact.webp",
        width: 1200,
        height: 630,
        alt: "Contact ZsMWebDev by Zsolt Márku - Professional Website Development",
      },
    ],
  },
  twitter: {
    title:
      "Contact ZsMWebDev by Zsolt Márku - Custom Website Development | Get Your Quote",
    description:
      "Ready to transform your business online? Contact ZsMWebDev by Zsolt Márku for custom website development, modern web solutions, and professional digital presence.",
    images: ["https://zsoltmarku.com/images/og-contact.webp"],
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
