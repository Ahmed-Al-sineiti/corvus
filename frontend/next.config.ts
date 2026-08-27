import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const backendUrl = process.env.BACKEND_URL?.replace(/\/$/, "");
const frontendRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: frontendRoot,
  },
  async rewrites() {
    if (!backendUrl) {
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
