import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // <- add
  images: { unoptimized: true }, // <- add
};

export default nextConfig;