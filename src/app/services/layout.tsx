import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | ZsMWebDev - Custom Web Development Solutions",
  description:
    "Professional web development services for entrepreneurs and small businesses. Modern, responsive websites, landing pages, and custom web solutions tailored to your needs.",
  keywords:
    "web development services, custom website development, landing page design, responsive web design, frontend development, React development, Next.js websites, professional web solutions, ZsMWebDev services",
  openGraph: {
    title: "Services | ZsMWebDev - Custom Web Development Solutions",
    description:
      "Professional web development services for entrepreneurs and small businesses. Modern, responsive websites, landing pages, and custom web solutions.",
    url: "https://zsoltmarku.com/services",
    images: [
      {
        url: "https://zsoltmarku.com/images/og-services.webp",
        width: 1200,
        height: 630,
        alt: "ZsMWebDev Services - Web Development Solutions",
      },
    ],
  },
  twitter: {
    title: "Services | ZsMWebDev - Custom Web Development Solutions",
    description:
      "Professional web development services for entrepreneurs and small businesses. Modern, responsive websites and custom web solutions.",
    images: ["https://zsoltmarku.com/images/og-services.webp"],
  },
  alternates: {
    canonical: "https://zsoltmarku.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
