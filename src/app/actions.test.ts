import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  contactsCreateMock,
  contactsGetMock,
  emailsSendMock,
  isRateLimitedMock,
} = vi.hoisted(() => ({
  contactsCreateMock: vi.fn(),
  contactsGetMock: vi.fn(),
  emailsSendMock: vi.fn(),
  isRateLimitedMock: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    contacts = { create: contactsCreateMock, get: contactsGetMock };
    emails = { send: emailsSendMock };
  },
}));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7" }),
}));

vi.mock("@/lib/redis", () => ({
  isRateLimited: (scope: string, key: string | null) =>
    isRateLimitedMock(scope, key),
}));

import { subscribeToNewsletter } from "@/app/actions";

function formDataWith(entries: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    formData.set(key, value);
  }
  return formData;
}

beforeEach(() => {
  vi.clearAllMocks();
  isRateLimitedMock.mockResolvedValue(false);
  contactsCreateMock.mockResolvedValue({ error: null });
  contactsGetMock.mockResolvedValue({ data: null, error: null });
  emailsSendMock.mockResolvedValue({ error: null });
});

describe("subscribeToNewsletter", () => {
  it("silently succeeds when the honeypot is filled, without calling Resend", async () => {
    const result = await subscribeToNewsletter(
      formDataWith({ website: "http://spam.example", email: "bot@example.cz" }),
    );

    expect(result).toEqual({ success: true });
    expect(contactsCreateMock).not.toHaveBeenCalled();
    expect(emailsSendMock).not.toHaveBeenCalled();
  });

  it("rejects invalid emails", async () => {
    for (const email of [
      "",
      "nomail",
      "@example.cz",
      "volic@",
      "a b@example.cz",
    ]) {
      const result = await subscribeToNewsletter(formDataWith({ email }));
      expect(result).toEqual({ success: false, error: "invalid_email" });
    }
    expect(contactsCreateMock).not.toHaveBeenCalled();
  });

  it("rejects an email over the length cap", async () => {
    const email = `${"a".repeat(255)}@example.cz`;
    const result = await subscribeToNewsletter(formDataWith({ email }));
    expect(result).toEqual({ success: false, error: "invalid_email" });
  });

  it("returns rate_limited when the IP limiter trips", async () => {
    isRateLimitedMock.mockImplementation(
      async (scope: string) => scope === "subscribe-ip",
    );

    const result = await subscribeToNewsletter(
      formDataWith({ email: "volic@example.cz" }),
    );
    expect(result).toEqual({ success: false, error: "rate_limited" });
    expect(contactsCreateMock).not.toHaveBeenCalled();
  });

  it("returns rate_limited when the per-email limiter trips", async () => {
    isRateLimitedMock.mockImplementation(
      async (scope: string) => scope === "subscribe-email",
    );

    const result = await subscribeToNewsletter(
      formDataWith({ email: "volic@example.cz" }),
    );
    expect(result).toEqual({ success: false, error: "rate_limited" });
    expect(isRateLimitedMock).toHaveBeenCalledWith(
      "subscribe-email",
      "volic@example.cz",
    );
    expect(contactsCreateMock).not.toHaveBeenCalled();
  });

  it("creates the contact and sends a confirmation email on the happy path", async () => {
    const result = await subscribeToNewsletter(
      formDataWith({ email: "  Volic@Example.cz " }),
    );

    expect(result).toEqual({ success: true });
    // Normalized (trimmed + lowercased) email, double opt-in starts unsubscribed.
    expect(contactsCreateMock).toHaveBeenCalledWith({
      email: "volic@example.cz",
      unsubscribed: true,
    });

    expect(emailsSendMock).toHaveBeenCalledTimes(1);
    const sendArgs = emailsSendMock.mock.calls[0][0];
    expect(sendArgs.to).toBe("volic@example.cz");
    expect(sendArgs.html).toContain("/potvrzeni?token=");
  });

  it("returns server_error when Resend fails and the contact does not exist", async () => {
    contactsCreateMock.mockResolvedValue({ error: { message: "boom" } });

    const result = await subscribeToNewsletter(
      formDataWith({ email: "volic@example.cz" }),
    );
    expect(result).toEqual({ success: false, error: "server_error" });
    expect(emailsSendMock).not.toHaveBeenCalled();
  });

  it("re-sends the confirmation email when the contact already exists", async () => {
    // Resend rejects duplicate creates; a supporter who lost the first email
    // must still receive a fresh confirmation link.
    contactsCreateMock.mockResolvedValue({
      error: { name: "validation_error", message: "Contact already exists" },
    });
    contactsGetMock.mockResolvedValue({
      data: { id: "contact_1", email: "volic@example.cz", unsubscribed: false },
      error: null,
    });

    const result = await subscribeToNewsletter(
      formDataWith({ email: "volic@example.cz" }),
    );

    expect(result).toEqual({ success: true });
    expect(contactsGetMock).toHaveBeenCalledWith({
      email: "volic@example.cz",
    });
    expect(emailsSendMock).toHaveBeenCalledTimes(1);
    const sendArgs = emailsSendMock.mock.calls[0][0];
    expect(sendArgs.to).toBe("volic@example.cz");
    expect(sendArgs.html).toContain("/potvrzeni?token=");
  });
});
