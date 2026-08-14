import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async rewrites() {
    return [
      // public/sc-datav/index.html：避免 /sc-datav → 404（Next 会去掉尾斜杠）
      { source: "/sc-datav", destination: "/sc-datav/index.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/lab/demos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/projects/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

async function loadConfig() {
  if (process.env.ANALYZE !== "1") {
    return nextConfig;
  }
  const bundleAnalyzer = (await import("@next/bundle-analyzer")).default;
  return bundleAnalyzer({ enabled: true })(nextConfig);
}

export default loadConfig();
