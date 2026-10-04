/**
 * Shared contact-form validation, CORS, honeypot, and rate-limit helpers.
 *
 * This module is the single source of truth for the contact endpoint's
 * acceptance rules. It is imported by BOTH:
 *   - `api/submit-contact.ts`      (Vercel serverless, production)
 *   - `vite.config.ts`             (dev middleware, mirrors prod)
 * so a payload rejected in prod is also rejected in dev (and vice-versa).
 *
 * It is intentionally dependency-free and browser/DOM-agnostic so it can run
 * in a Node serverless runtime, the Vite config loader, or a test runner.
 */

export interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot trap — bots tend to auto-fill common field names. */
  company?: unknown;
  website?: unknown;
}

export interface ValidatedContact {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidation {
  ok: boolean;
  error?: string;
  value?: ValidatedContact;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 100,
  email: 255,
  subject: 200,
  messageMin: 10,
  messageMax: 2000,
} as const;

const asString = (v: unknown): string =>
  typeof v === "string" ? v.trim() : "";

/**
 * Validate a raw contact payload. Returns `ok: false` with a human-readable
 * `error` for any rejection, or `ok: true` with the trimmed, typed `value`.
 */
export function validateContact(input: ContactPayload = {}): ContactValidation {
  const name = asString(input.name);
  const email = asString(input.email);
  const subject = asString(input.subject);
  const message = asString(input.message);

  if (!name || !email || !subject || !message) {
    return { ok: false, error: "All fields are required" };
  }

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Invalid email format" };
  }

  if (message.length < LIMITS.messageMin) {
    return { ok: false, error: "Message must be at least 10 characters" };
  }

  if (name.length > LIMITS.name) {
    return { ok: false, error: "Name is too long" };
  }
  if (email.length > LIMITS.email) {
    return { ok: false, error: "Email is too long" };
  }
  if (subject.length > LIMITS.subject) {
    return { ok: false, error: "Subject is too long" };
  }
  if (message.length > LIMITS.messageMax) {
    return { ok: false, error: "Message is too long" };
  }

  return { ok: true, value: { name, email, subject, message } };
}

/**
 * Honeypot detection. Real users never see or fill the hidden `company` /
 * `website` fields; automated spam bots usually do. When tripped we accept
 * the submission silently (HTTP 200) without persisting it — the bot gets a
 * fake success and we store nothing.
 */
export function isHoneypotTripped(input: ContactPayload = {}): boolean {
  const trap1 = asString(input.company);
  const trap2 = asString(input.website);
  return trap1 !== "" || trap2 !== "";
}

/**
 * Resolve an `Access-Control-Allow-Origin` value for a request.
 *
 * Returns the *requesting* origin only when it matches one of `allowed`
 * (compared by host, so http/https and www. variants can be normalised by
 * listing the apex). Returns `null` when the origin is missing or not
 * permitted, so callers can simply skip the header.
 *
 * Echoing the verified origin (rather than `*`) is what locks the endpoint
 * down: browsers will refuse cross-origin `fetch` otherwise.
 */
export function resolveCorsOrigin(
  origin: string | undefined,
  allowed: string[]
): string | null {
  if (!origin) return null;
  try {
    const incoming = new URL(origin);
    for (const candidate of allowed) {
      try {
        if (new URL(candidate).host === incoming.host) return origin;
      } catch {
        // Skip malformed allowed entries rather than crashing the request.
      }
    }
  } catch {
    // Unparseable origin — treat as not allowed.
  }
  return null;
}

export const PRODUCTION_ORIGINS = [
  "https://derren-winata.com",
  "https://www.derren-winata.com",
];

// ---------------------------------------------------------------------------
// Best-effort in-memory rate limit (per-email sliding window).
//
// This is deliberately NOT a hard security control: serverless instances don't
// share memory, so it only throttles repeat offenders on a warm instance. It
// raises the cost of naive abuse without requiring an external store (Upstash
// / Vercel KV) for what is a low-value contact form. A real DoS would need a
// CDN/WAF layer in front, which is out of scope here.
// ---------------------------------------------------------------------------

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_ATTEMPTS = 5;

const attempts = new Map<string, number[]>();

/**
 * Record an attempt for `email` and report whether it is within budget.
 * Returns `{ ok: true }` when allowed, or `{ ok: false, retryAfter }` with a
 * `Retry-After` value in seconds when the window is exhausted.
 */
export function checkRateLimit(email: string): {
  ok: boolean;
  retryAfter?: number;
} {
  const now = Date.now();
  const key = email.toLowerCase();
  const windowed = (attempts.get(key) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );

  if (windowed.length >= RATE_MAX_ATTEMPTS) {
    const oldest = windowed[0];
    const retryAfter = Math.ceil((RATE_WINDOW_MS - (now - oldest)) / 1000);
    return { ok: false, retryAfter };
  }

  windowed.push(now);
  attempts.set(key, windowed);
  return { ok: true };
}
