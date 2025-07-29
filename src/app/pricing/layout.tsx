import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pricing & Packages | ZsMWebDev by Zsolt Márku - Web Development Services",
  description:
    "Explore ZsMWebDev's web development packages and pricing by Zsolt Márku. Budget (€749), Standard (€999), Pro (€1349) and Custom solutions for every need. Professional website design and development services in Rotterdam.",
  keywords:
    "ZsMWebDev pricing, Zsolt Márku web development, website costs Rotterdam, frontend development rates, React website price, Next.js development cost, website design pricing, web developer rates Netherlands, landing page cost, website creation price, responsive website cost, budget package, standard package, pro package",
  openGraph: {
    title:
      "Pricing & Packages | ZsMWebDev by Zsolt Márku - Web Development Services",
    description:
      "Explore ZsMWebDev's web development packages and pricing by Zsolt Márku. Budget (€749), Standard (€999), Pro (€1349) and Custom solutions for every need.",
    url: "https://zsoltmarku.com/pricing",
    images: [
      {
        url: "https://zsoltmarku.com/images/og-pricing.webp",
        width: 1200,
        height: 630,
        alt: "ZsMWebDev by Zsolt Márku - Pricing & Packages",
      },
    ],
  },
  twitter: {
    title:
      "Pricing & Packages | ZsMWebDev by Zsolt Márku - Web Development Services",
    description:
      "Explore ZsMWebDev's web development packages and pricing by Zsolt Márku. Budget, Standard, Pro and Custom solutions for every need.",
    images: ["https://zsoltmarku.com/images/og-pricing.webp"],
  },
  alternates: {
    canonical: "https://zsoltmarku.com/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
