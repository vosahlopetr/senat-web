import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* ==========================================================================
   * CORE & COMPILER CONFIGURATION
   * ========================================================================== */

  // Enables the React Compiler to automatically optimize component rendering
  // and reduce the need for manual memoization (useMemo, useCallback).
  reactCompiler: true,

  // Enables static typing for links to prevent typos and ensure routing type safety.
  typedRoutes: false,

  // Disables the 'x-powered-by: Next.js' header for security (prevents framework sniffing).
  poweredByHeader: false,

  // Ensures React strict mode is enabled (default in App Router) to catch unsafe lifecycles.
  reactStrictMode: true,

  // Required for MDX
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  /* ==========================================================================
   * CACHING & RENDERING (Next.js 16+)
   * ========================================================================== */

  // Enables the new Cache Components architecture (\`use cache\`), replacing
  // older experimental PPR, dynamicIO, and route segment configs.
  // Pages currently use the built-in \`cacheLife("days")\` profile; define
  // custom profiles here only when a page actually needs one.
  cacheComponents: true,

  /* ==========================================================================
   * REWRITES & REDIRECTS
   * ========================================================================== */

  async rewrites() {
    return [
      // Exact match for a single flyer
      {
        source: "/letak",
        destination: "/",
      },
      {
        source: "/qr",
        destination: "/",
      },
      // Dynamic match for unlimited campaigns (e.g. /qr/spring-2026, /qr/poster-a)
      {
        source: "/qr/:campaign",
        destination: "/",
      },
    ];
  },

  async redirects() {
    return [
      { source: "/novinky", destination: "/aktuality", permanent: true },
      {
        source: "/novinky/:slug",
        destination: "/aktuality/:slug",
        permanent: true,
      },
    ];
  },

  /* ==========================================================================
   * IMAGE OPTIMIZATION (Strict Next.js 16 Defaults)
   * ========================================================================== */

  images: {
    // Enable modern image formats. Vercel will serve AVIF if the browser supports it,
    // falling back to WebP. AVIF takes longer to encode but compresses ~20% smaller.
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
    ],

    // Required in Next 16: Restrict the allowed qualities to prevent malicious actors
    // from exhausting your Vercel Image Optimization quota.
    qualities: [25, 50, 60, 75, 100],

    // Security: Allow SVG optimization safely by forcing downloads for direct visits
    // and applying a strict sandbox CSP to the SVG itself.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // Optimization: Increase TTL for images to 30 days to maximize edge cache hits on Vercel.
    minimumCacheTTL: 2592000,

    // Prevent excessive redirects when fetching upstream remote images.
    maximumRedirects: 3,

    // Memory protection: Limit the maximum size of a remote image the server will fetch (10MB).
    maximumResponseBody: 10_000_000,

    // Limits disk cache size (in bytes) to prevent unbounded storage growth (500MB).
    maximumDiskCacheSize: 500_000_000,

    // Ensure local network IPs are blocked from image optimization (Security best practice).
    dangerouslyAllowLocalIP: false,

    // Cleaned up imageSizes to remove 16px (deprecated/unnecessary in Next 16).
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
  },

  /* ==========================================================================
   * SECURITY & HTTP HEADERS
   * ========================================================================== */

  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            // Enforce HTTPS
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // Prevent MIME-type sniffing
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Prevent clickjacking (Replaced by CSP frame-ancestors 'none', but good fallback)
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            // Restrict access to device APIs
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },

  /* ==========================================================================
   * EXPERIMENTAL & CUTTING-EDGE FEATURES
   * ========================================================================== */

  experimental: {
    // Required for MDX
    mdxRs: true,

    // Merges CSS files implicitly to reduce network requests.
    cssChunking: true,

    // Ensure fetch responses in Server Components are cached across HMR refreshes in dev.
    serverComponentsHmrCache: true,

    // Memory optimizations from Next.js documentation
    preloadEntriesOnStart: false,
    webpackMemoryOptimizations: true,
    serverSourceMaps: false,
  },

  productionBrowserSourceMaps: false,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
