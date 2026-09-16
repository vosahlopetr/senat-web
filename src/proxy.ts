import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const METADATA_ROUTE_PATTERN =
  /\/(opengraph-image|twitter-image|apple-icon|icon\d*)$|^\/(sitemap\.xml|robots\.txt|manifest\.webmanifest)$/;

function isMetadataRoute(pathname: string) {
  return METADATA_ROUTE_PATTERN.test(pathname);
}

export function proxy(request: NextRequest) {
  const status = process.env.POST_ELECTION_STATUS;
  const isPostElection = status === "victory" || status === "loss";
  const { pathname } = request.nextUrl;

  // Do not intercept metadata routes, static assets, or the post-election page itself
  if (
    isPostElection &&
    pathname !== "/post-election" &&
    !pathname.startsWith("/_next") &&
    !pathname.includes(".") &&
    !isMetadataRoute(pathname)
  ) {
    return NextResponse.rewrite(new URL("/post-election", request.url));
  }

  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://vitals.vercel-insights.com`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' blob: data: https:`,
    `font-src 'self' data:`,
    `connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com`,
    `frame-src 'self' https://www.youtube.com https://youtube.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
  ].join("; ");

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|opengraph-image|twitter-image|apple-icon|images/|assets/).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
