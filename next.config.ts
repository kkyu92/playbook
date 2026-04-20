import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      // 외부 폰트 stylesheet — CSP 차단 시 React 가 head <link rel=preload as=style> 의
      // promise 를 unresolved 로 남겨 hydration BAILOUT_TO_CLIENT_SIDE_RENDERING 발생
      // (admin/login form 죽는 root cause). 폰트 도메인 명시 허용.
      "style-src 'self' 'unsafe-inline' https://api.fontshare.com https://cdn.jsdelivr.net https://fonts.googleapis.com",
      "img-src 'self' data: blob:",
      "font-src 'self' data: https://api.fontshare.com https://cdn.jsdelivr.net https://fonts.gstatic.com",
      "connect-src 'self' https://api.github.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
