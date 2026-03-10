/** @type {import('next').NextConfig} */
import { CSP_HEADER } from "./src/lib/security/csp";

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ];

    if (isProd) {
      securityHeaders.push({ key: "Content-Security-Policy", value: CSP_HEADER });
    }

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
