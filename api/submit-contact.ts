import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  validateContact,
  isHoneypotTripped,
  checkRateLimit,
  resolveCorsOrigin,
  PRODUCTION_ORIGINS,
  type ContactPayload,
} from "../src/lib/contactValidation";

const ALLOWED_ORIGINS = [
  process.env.VITE_SITE_ORIGIN,
  process.env.SITE_ORIGIN,
  ...PRODUCTION_ORIGINS,
].filter(Boolean) as string[];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apply CORS first so every response (including errors) is consistent.
  const origin = resolveCorsOrigin(
    req.headers.origin as string | undefined,
    ALLOWED_ORIGINS
  );
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = (req.body ?? {}) as ContactPayload;

  // Honeypot: silently accept (fake success) but never persist.
  if (isHoneypotTripped(payload)) {
    return res.status(200).json({ success: true });
  }

  const validation = validateContact(payload);
  if (!validation.ok || !validation.value) {
    return res.status(400).json({ error: validation.error });
  }

  // Best-effort per-email throttle.
  const rate = checkRateLimit(validation.value.email);
  if (!rate.ok) {
    res.setHeader("Retry-After", String(rate.retryAfter ?? 60));
    return res.status(429).json({ error: "Too many requests, please try again later" });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !secretKey) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const supabase = createClient(supabaseUrl, secretKey);
  const { error } = await supabase.from("contact_messages").insert({
    name: validation.value.name,
    email: validation.value.email,
    subject: validation.value.subject,
    message: validation.value.message,
  });

  if (error) {
    console.error("contact_messages insert failed:", error);
    return res.status(500).json({ error: "Failed to save message" });
  }

  return res.status(200).json({ success: true });
}
