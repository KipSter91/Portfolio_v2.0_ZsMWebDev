import { MetadataRoute } from "next";

export const revalidate = 0;
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/_next/"],
    },
    sitemap: "https://zsoltmarku.com/sitemap.xml",
  };
}
