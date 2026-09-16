import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TOKEN_EXPIRY_MS } from "@/lib/site-config";

const {
  isRateLimitedMock,
  markTokenUsedMock,
  releaseTokenUseMock,
  contactsUpdateMock,
  envMock,
} = vi.hoisted(() => ({
  isRateLimitedMock: vi.fn(),
  markTokenUsedMock: vi.fn(),
  releaseTokenUseMock: vi.fn(),
  contactsUpdateMock: vi.fn(),
  envMock: {
    isProduction: false,
    secretPassphrase: "test-secret-passphrase",
    resendApiKey: "re_test_dummy",
    resendFromEmail: "Test <test@example.test>",
    kvRestApiUrl: undefined as string | undefined,
    kvRestApiToken: undefined as string | undefined,
    siteUrl: "https://example.test",
  },
}));

vi.mock("@/lib/env", () => ({ env: envMock }));

vi.mock("@/lib/redis", () => ({
  isRateLimited: isRateLimitedMock,
  markTokenUsed: markTokenUsedMock,
  releaseTokenUse: releaseTokenUseMock,
}));

vi.mock("@/lib/resend", () => ({
  getResend: () => ({ contacts: { update: contactsUpdateMock } }),
}));

// Imported after the mocks: crypto.ts signs with the mocked secret, so
// tokens generated here verify inside confirmToken exactly like production.
import { confirmToken } from "@/lib/confirm";
import { generateToken } from "@/lib/crypto";

const IP = "203.0.113.7";

beforeEach(() => {
  vi.clearAllMocks();
  envMock.isProduction = false;
  isRateLimitedMock.mockResolvedValue(false);
  markTokenUsedMock.mockResolvedValue("ok");
  releaseTokenUseMock.mockResolvedValue(undefined);
  contactsUpdateMock.mockResolvedValue({ error: null });
});

afterEach(() => {
  vi.useRealTimers();
});

describe("confirmToken", () => {
  it("confirms a valid token and flips the contact to subscribed", async () => {
    const token = generateToken("volic@example.cz");

    await expect(confirmToken(token, IP)).resolves.toBe("confirmed");
    expect(contactsUpdateMock).toHaveBeenCalledWith({
      email: "volic@example.cz",
      unsubscribed: false,
    });
    expect(markTokenUsedMock).toHaveBeenCalledWith(token, expect.any(Number));
    expect(releaseTokenUseMock).not.toHaveBeenCalled();
  });

  it("rejects when the IP rate limit trips, before any token work", async () => {
    isRateLimitedMock.mockResolvedValue(true);

    const result = await confirmToken(generateToken("a@example.cz"), IP);

    expect(result).toBe("rate_limited");
    expect(isRateLimitedMock).toHaveBeenCalledWith("confirm-ip", IP);
    expect(markTokenUsedMock).not.toHaveBeenCalled();
    expect(contactsUpdateMock).not.toHaveBeenCalled();
  });

  it("rejects a missing token", async () => {
    await expect(confirmToken(null, IP)).resolves.toBe("invalid_token");
  });

  it("rejects a garbage token", async () => {
    await expect(confirmToken("not-a-real.token", IP)).resolves.toBe(
      "invalid_token",
    );
    expect(markTokenUsedMock).not.toHaveBeenCalled();
  });

  it("rejects an expired token", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(Date.now() - TOKEN_EXPIRY_MS - 60_000);
    const token = generateToken("volic@example.cz");
    vi.useRealTimers();

    await expect(confirmToken(token, IP)).resolves.toBe("expired_token");
    expect(markTokenUsedMock).not.toHaveBeenCalled();
  });

  it("rejects a replayed token without touching Resend", async () => {
    markTokenUsedMock.mockResolvedValue("already-used");

    const result = await confirmToken(generateToken("a@example.cz"), IP);

    expect(result).toBe("used_token");
    expect(contactsUpdateMock).not.toHaveBeenCalled();
    expect(releaseTokenUseMock).not.toHaveBeenCalled();
  });

  it("fails closed in production when Redis is unavailable", async () => {
    envMock.isProduction = true;
    markTokenUsedMock.mockResolvedValue("unavailable");

    const result = await confirmToken(generateToken("a@example.cz"), IP);

    expect(result).toBe("server_error");
    expect(contactsUpdateMock).not.toHaveBeenCalled();
  });

  it("proceeds in development when Redis is unavailable", async () => {
    markTokenUsedMock.mockResolvedValue("unavailable");

    const result = await confirmToken(generateToken("a@example.cz"), IP);

    expect(result).toBe("confirmed");
    expect(contactsUpdateMock).toHaveBeenCalledTimes(1);
  });

  it("releases the token when the Resend update fails, so the link stays retryable", async () => {
    contactsUpdateMock.mockResolvedValue({ error: { message: "boom" } });
    const token = generateToken("volic@example.cz");

    await expect(confirmToken(token, IP)).resolves.toBe("server_error");
    expect(releaseTokenUseMock).toHaveBeenCalledWith(token);
  });

  it("releases the token when the Resend update throws", async () => {
    contactsUpdateMock.mockRejectedValue(new Error("network down"));
    const token = generateToken("volic@example.cz");

    await expect(confirmToken(token, IP)).resolves.toBe("invalid_token");
    expect(releaseTokenUseMock).toHaveBeenCalledWith(token);
  });
});
