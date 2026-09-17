/** @type {import('next').NextConfig} */

/** YouTube thumbnail CDNs — keep in sync with src/lib/youtube.ts */
const youtubeImageHosts = ["https://img.youtube.com", "https://i.ytimg.com"];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://picsum.photos ${youtubeImageHosts.join(" ")}`,
      "font-src 'self' data:",
      "connect-src 'self' https://*.api.sanity.io https://cdn.sanity.io https://*.sanity.io",
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
      "media-src 'self' https://cdn.sanity.io",
    ].join("; "),
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async redirects() {
    return [];
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/((?!admin).*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
