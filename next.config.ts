import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ["zsoltmarku.com"], // Add your domain for external images
    formats: ["image/webp", "image/avif"], // Use modern image formats
  },
  output: "export",
  trailingSlash: true,
  basePath: "",

  // SEO and performance optimizations
  compress: true,
};

export default nextConfig;
