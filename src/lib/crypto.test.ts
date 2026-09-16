import { afterEach, describe, expect, it, vi } from "vitest";
import { generateToken, verifyToken } from "@/lib/crypto";
import { TOKEN_EXPIRY_MS } from "@/lib/site-config";

afterEach(() => {
  vi.useRealTimers();
});

describe("generateToken / verifyToken", () => {
  it("round-trips email and timestamp", () => {
    const before = Date.now();
    const token = generateToken("volic@example.cz");
    const after = Date.now();

    const decoded = verifyToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded!.email).toBe("volic@example.cz");
    expect(decoded!.timestamp).toBeGreaterThanOrEqual(before);
    expect(decoded!.timestamp).toBeLessThanOrEqual(after);
  });

  it("rejects a tampered payload", () => {
    const token = generateToken("volic@example.cz");
    const [, signature] = token.split(".");
    const forgedPayload = Buffer.from(
      JSON.stringify({ email: "utocnik@example.cz", timestamp: Date.now() }),
    ).toString("base64url");

    expect(verifyToken(`${forgedPayload}.${signature}`)).toBeNull();
  });

  it("rejects a tampered signature", () => {
    const token = generateToken("volic@example.cz");
    const [payload, signature] = token.split(".");
    const flipped =
      signature.slice(0, -1) + (signature.endsWith("A") ? "B" : "A");

    expect(verifyToken(`${payload}.${flipped}`)).toBeNull();
  });

  it("rejects malformed tokens", () => {
    expect(verifyToken("")).toBeNull();
    expect(verifyToken("garbage")).toBeNull();
    expect(verifyToken("one.two.three")).toBeNull();
    expect(verifyToken("not-base64url.not-a-signature")).toBeNull();
  });

  it("embeds a timestamp old tokens fail the expiry check with", () => {
    const past = Date.now() - TOKEN_EXPIRY_MS - 60_000;
    vi.useFakeTimers();
    vi.setSystemTime(past);
    const token = generateToken("volic@example.cz");
    vi.useRealTimers();

    const decoded = verifyToken(token);
    expect(decoded).not.toBeNull();
    // Same check the confirm route performs.
    expect(Date.now() - decoded!.timestamp).toBeGreaterThan(TOKEN_EXPIRY_MS);
  });
});
