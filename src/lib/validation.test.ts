import { describe, expect, it } from "vitest";
import { EMAIL_MAX_LENGTH, isValidEmail } from "@/lib/validation";

describe("isValidEmail", () => {
  it("accepts common addresses", () => {
    expect(isValidEmail("volic@example.cz")).toBe(true);
    expect(isValidEmail("jmeno.prijmeni+tag@sub.domena.cz")).toBe(true);
  });

  it("rejects clearly invalid input", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("nomail")).toBe(false);
    expect(isValidEmail("@example.cz")).toBe(false);
    expect(isValidEmail("volic@")).toBe(false);
    expect(isValidEmail("volic@example")).toBe(false);
    expect(isValidEmail("a b@example.cz")).toBe(false);
  });

  it("enforces the length cap", () => {
    const local = "a".repeat(EMAIL_MAX_LENGTH);
    expect(isValidEmail(`${local}@example.cz`)).toBe(false);
  });
});
