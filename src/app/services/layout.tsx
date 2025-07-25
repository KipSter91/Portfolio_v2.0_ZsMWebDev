import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | ZsMWebDev - Custom Web Development",
  description:
    "Modern, custom websites for entrepreneurs and small businesses. Landing pages, one-page websites, and conversion-focused web solutions.",
  keywords: [
    "web development",
    "landing page",
    "one page website",
    "custom website",
    "ZsMWebDev",
    "responsive design",
    "SEO",
  ],
  openGraph: {
    title: "Services | ZsMWebDev - Custom Web Development",
    description:
      "Modern, custom websites for entrepreneurs and small businesses. Landing pages, one-page websites, and conversion-focused web solutions.",
    images: ["/images/og-services.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | ZsMWebDev - Custom Web Development",
    description:
      "Modern, custom websites for entrepreneurs and small businesses. Landing pages, one-page websites, and conversion-focused web solutions.",
    images: ["/images/og-services.webp"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
