import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/confirm/route";

// The legacy route must never consume tokens (mail scanners prefetch GET
// links) – it only forwards to the POST-gated /potvrzeni page. It has no
// Redis/Resend imports; these tests pin down the redirect behavior.
describe("GET /api/confirm", () => {
  it("redirects to /potvrzeni preserving the token", () => {
    const response = GET(
      new Request("https://example.test/api/confirm?token=abc.def"),
    );

    expect(response.status).toBe(307);
    const location = new URL(response.headers.get("location")!);
    expect(location.pathname).toBe("/potvrzeni");
    expect(location.searchParams.get("token")).toBe("abc.def");
  });

  it("redirects without a token param when none is given", () => {
    const response = GET(new Request("https://example.test/api/confirm"));

    const location = new URL(response.headers.get("location")!);
    expect(location.pathname).toBe("/potvrzeni");
    expect(location.searchParams.has("token")).toBe(false);
  });
});
