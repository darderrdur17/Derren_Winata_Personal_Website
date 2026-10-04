import { describe, it, expect } from "vitest";
import {
  validateContact,
  isHoneypotTripped,
  resolveCorsOrigin,
  checkRateLimit,
} from "./contactValidation";

describe("validateContact", () => {
  it("accepts a well-formed payload and trims whitespace", () => {
    const result = validateContact({
      name: "  Jane Doe  ",
      email: "jane@example.com",
      subject: "Hello",
      message: "This is a sufficiently long message.",
    });
    expect(result.ok).toBe(true);
    expect(result.value).toEqual({
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Hello",
      message: "This is a sufficiently long message.",
    });
  });

  it("rejects when any required field is missing", () => {
    expect(validateContact({ name: "", email: "a@b.com", subject: "s", message: "m".repeat(10) }).ok).toBe(false);
    expect(validateContact({ name: "n", email: "", subject: "s", message: "m".repeat(10) }).ok).toBe(false);
    expect(validateContact({ name: "n", email: "a@b.com", subject: "", message: "m".repeat(10) }).ok).toBe(false);
    expect(validateContact({ name: "n", email: "a@b.com", subject: "s", message: "" }).ok).toBe(false);
  });

  it("rejects malformed emails", () => {
    const r = validateContact({ name: "n", email: "not-an-email", subject: "s", message: "m".repeat(10) });
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/email/i);
  });

  it("rejects messages shorter than 10 characters", () => {
    const r = validateContact({ name: "n", email: "a@b.com", subject: "s", message: "too short" });
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/10 characters/i);
  });

  it("enforces max-length caps", () => {
    expect(validateContact({ name: "x".repeat(101), email: "a@b.com", subject: "s", message: "m".repeat(10) }).error).toMatch(/Name is too long/);
    expect(validateContact({ name: "n", email: `a@${"b".repeat(250)}.com`, subject: "s", message: "m".repeat(10) }).error).toMatch(/Email is too long/);
    expect(validateContact({ name: "n", email: "a@b.com", subject: "x".repeat(201), message: "m".repeat(10) }).error).toMatch(/Subject is too long/);
    expect(validateContact({ name: "n", email: "a@b.com", subject: "s", message: "m".repeat(2001) }).error).toMatch(/Message is too long/);
  });

  it("accepts non-string input gracefully (treats as empty)", () => {
    const r = validateContact({ name: 123, email: null, subject: undefined, message: [] });
    expect(r.ok).toBe(false);
  });
});

describe("isHoneypotTripped", () => {
  it("returns true when a trap field is filled", () => {
    expect(isHoneypotTripped({ company: "spam" })).toBe(true);
    expect(isHoneypotTripped({ website: "http://spam" })).toBe(true);
  });

  it("returns false for a clean submission", () => {
    expect(isHoneypotTripped({ name: "n", email: "a@b.com", subject: "s", message: "m".repeat(10) })).toBe(false);
    expect(isHoneypotTripped({})).toBe(false);
  });
});

describe("resolveCorsOrigin", () => {
  const allowed = ["https://derren-winata.com", "https://www.derren-winata.com"];

  it("echoes the requesting origin when its host is allowed", () => {
    expect(resolveCorsOrigin("https://derren-winata.com", allowed)).toBe("https://derren-winata.com");
    expect(resolveCorsOrigin("https://www.derren-winata.com", allowed)).toBe("https://www.derren-winata.com");
  });

  it("returns null for disallowed or malformed origins", () => {
    expect(resolveCorsOrigin("https://evil.example.com", allowed)).toBeNull();
    expect(resolveCorsOrigin("not-a-url", allowed)).toBeNull();
    expect(resolveCorsOrigin(undefined, allowed)).toBeNull();
  });
});

describe("checkRateLimit", () => {
  it("allows up to RATE_MAX attempts then blocks", () => {
    const email = `rl-${Date.now()}@example.com`;
    // 5 allowed attempts.
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(email).ok).toBe(true);
    }
    const blocked = checkRateLimit(email);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("scopes the limit per email", () => {
    const a = `a-${Date.now()}@example.com`;
    const b = `b-${Date.now()}@example.com`;
    for (let i = 0; i < 5; i++) checkRateLimit(a);
    // A different email still gets through.
    expect(checkRateLimit(b).ok).toBe(true);
  });
});
