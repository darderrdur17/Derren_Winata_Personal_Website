import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createClient } from "@supabase/supabase-js";
import {
  validateContact,
  isHoneypotTripped,
  checkRateLimit,
  resolveCorsOrigin,
  PRODUCTION_ORIGINS,
  type ContactPayload,
} from "./src/lib/contactValidation";

// The dev server is same-origin to itself; allow its own origin plus the prod
// origins so the CORS logic mirrors production exactly.
const DEV_ALLOWED_ORIGINS = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5173",
  ...PRODUCTION_ORIGINS,
];

function readBody(req: import("http").IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function contactApiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: "contact-api-dev",
    configureServer(server) {
      server.middlewares.use("/api/submit-contact", async (req, res, next) => {
        const origin = resolveCorsOrigin(
          req.headers.origin as string | undefined,
          DEV_ALLOWED_ORIGINS
        );
        if (origin) {
          res.setHeader("Access-Control-Allow-Origin", origin);
          res.setHeader("Vary", "Origin");
        }
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        const supabaseUrl = env.VITE_SUPABASE_URL;
        const secretKey = env.SUPABASE_SECRET_KEY;

        if (!supabaseUrl || !secretKey) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Server configuration error" }));
          return;
        }

        try {
          const body = JSON.parse(await readBody(req)) as ContactPayload;

          // Honeypot: fake success, never persist.
          if (isHoneypotTripped(body)) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true }));
            return;
          }

          // Mirror api/submit-contact.ts exactly via the shared validator.
          const validation = validateContact(body);
          if (!validation.ok || !validation.value) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: validation.error }));
            return;
          }

          const rate = checkRateLimit(validation.value.email);
          if (!rate.ok) {
            res.statusCode = 429;
            res.setHeader("Retry-After", String(rate.retryAfter ?? 60));
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Too many requests, please try again later" }));
            return;
          }

          const supabase = createClient(supabaseUrl, secretKey);
          const { error } = await supabase.from("contact_messages").insert({
            name: String(name).trim(),
            email: String(email).trim(),
            subject: String(subject).trim(),
            message: String(message).trim(),
          });

          if (error) {
            console.error("contact_messages insert failed:", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to save message" }));
            return;
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: true }));
        } catch (error) {
          console.error("contact api dev plugin error:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Unexpected server error" }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && contactApiDevPlugin(env),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
