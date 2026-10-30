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
 * Count characters the way a person counts them.
 *
 * `String.prototype.length` counts UTF-16 code units, so an emoji counts as
 * two — five of them satisfied a "10 character" minimum that the visitor had
 * visibly not met. Postgres `varchar(n)` counts characters too, so this also
 * matches what the column will actually accept.
 */
const charLength = (value: string): number => [...value].length;

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

  if (charLength(message) < LIMITS.messageMin) {
    return { ok: false, error: "Message must be at least 10 characters" };
  }

  if (charLength(name) > LIMITS.name) {
    return { ok: false, error: "Name is too long" };
  }
  if (charLength(email) > LIMITS.email) {
    return { ok: false, error: "Email is too long" };
  }
  if (charLength(subject) > LIMITS.subject) {
    return { ok: false, error: "Subject is too long" };
  }
  if (charLength(message) > LIMITS.messageMax) {
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
 * Returns the *requesting* origin only when it exactly matches one of
 * `allowed`. The comparison is scheme-sensitive: `new URL(...).host` alone
 * would have accepted `http://` as well as `https://`, which lets a
 * downgraded origin through even though every entry in the allow-list is
 * HTTPS. `www.` and apex variants are distinct origins and must each be
 * listed explicitly. Returns `null` when the origin is missing or not
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
        if (new URL(candidate).origin === incoming.origin) return origin;
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
/** Prune once the map grows past this, so a warm instance cannot leak. */
const PRUNE_THRESHOLD = 256;

const attempts = new Map<string, number[]>();

/**
 * Drop keys whose timestamps have all aged out.
 *
 * Without this the map only ever grew: each new sender added a key that was
 * never revisited, and a long-lived instance would accumulate one entry per
 * distinct email forever. Pruning is skipped below the threshold because the
 * map is tiny in normal use and a full sweep on every request is wasteful.
 */
function pruneAttempts(now: number) {
  for (const [key, times] of attempts) {
    const live = times.filter((t) => now - t < RATE_WINDOW_MS);
    if (live.length === 0) attempts.delete(key);
    else if (live.length !== times.length) attempts.set(key, live);
  }
}

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

  if (attempts.size > PRUNE_THRESHOLD) pruneAttempts(now);

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
