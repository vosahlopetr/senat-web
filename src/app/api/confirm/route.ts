import { NextResponse } from "next/server";

/**
 * Legacy entry point kept for links in already-sent confirmation emails
 * (24h token lifetime). New emails link straight to /potvrzeni, where the
 * token is consumed only by an explicit POST. This handler must stay
 * side-effect free: mail scanners prefetch GET links, and any state change
 * here would let them burn tokens.
 */
export function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");

  const destination = new URL("/potvrzeni", request.url);
  if (token) {
    destination.searchParams.set("token", token);
  }

  return NextResponse.redirect(destination);
}
