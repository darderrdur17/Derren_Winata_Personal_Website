import { useEffect } from "react";
import { siteConfig } from "@/lib/site";

/**
 * Set per-route document metadata on mount and restore on unmount.
 *
 * No external dependency — runs directly against the <head>. Keeps the bundle
 * lean (no react-helmet) and is enough for a 5-route SPA.
 *
 * Injects (if not already present):
 *   - <title>
 *   - <meta name="description">
 *   - <meta property="og:title|og:description|og:image|og:image:alt|og:url|og:type">
 *   - <meta name="twitter:card|twitter:title|twitter:description|twitter:image|twitter:image:alt">
 *   - <link rel="canonical">
 *   - optional <script type="application/ld+json" id="route-jsonld"> for route
 *     structured data (ItemList / BreadcrumbList)
 *
 * Idempotent: re-applying for the same route only mutates the attribute, never
 * the DOM. We restore the previous values on unmount so navigating back to
 * the root doesn't carry a stale title.
 */
export interface RouteMeta {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "profile" | "article";
  /**
   * Optional structured data (JSON-LD) injected as a dedicated
   * `<script type="application/ld+json">`. One route-level block at a time —
   * the static Person/WebSite graph in index.html always remains, and any
   * previously injected route block is removed on navigation/unmount.
   */
  jsonLd?: unknown;
}

const ensureMeta = (
  selector: string,
  attr: string,
  create?: HTMLElement
): HTMLElement | null => {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el && create) {
    el = create;
    document.head.appendChild(el);
  }
  if (el && attr) el.setAttribute(attr, el.getAttribute(attr) ?? "");
  return el;
};

const setMeta = (selector: string, key: string, value: string) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    // Key is "name:<value>" or "property:<value>". Split on the FIRST colon
    // only — values like "og:image:alt" / "twitter:image:alt" contain more.
    const firstColon = key.indexOf(":");
    const attr = key.slice(0, firstColon);
    const attrValue = key.slice(firstColon + 1);
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector(
    `link[rel="${rel}"]`
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const absoluteUrl = (pathOrUrl: string): string => {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  const base = siteConfig.canonicalOrigin.replace(/\/$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
};

const capture = (): Record<string, string> => {
  const out: Record<string, string> = {};
  document.head.querySelectorAll("meta[content], link[href]").forEach((el) => {
    const k =
      el.getAttribute("name") ??
      (el.getAttribute("property")
        ? `property:${el.getAttribute("property")}`
        : "");
    if (!k) return;
    if (el instanceof HTMLMetaElement) out[k] = el.getAttribute("content") ?? "";
  });
  out.__title = document.title;
  return out;
};

const restore = (snapshot: Record<string, string>) => {
  document.head.querySelectorAll("meta").forEach((el) => {
    const k =
      el.getAttribute("name") ??
      (el.getAttribute("property")
        ? `property:${el.getAttribute("property")}`
        : "");
    if (k && k in snapshot) el.setAttribute("content", snapshot[k]);
  });
  document.title = snapshot.__title;
};

export function useDocumentMeta(meta: RouteMeta) {
  // Stable key for the JSON-LD payload so the effect only re-runs when the
  // actual structured data changes (not on every render that rebuilds the
  // object). Hoisted out of the dependency array to satisfy lint rules.
  const jsonLdKey = JSON.stringify(meta.jsonLd ?? null);

  useEffect(() => {
    const snapshot = capture();

    const title = meta.title ?? siteConfig.title;
    const description = meta.description ?? siteConfig.description;
    const path = meta.path ?? window.location.pathname;
    const image = absoluteUrl(meta.image ?? siteConfig.ogImage);
    const imageAlt = meta.imageAlt ?? siteConfig.ogImageAlt;
    const url = absoluteUrl(path);
    const type = meta.type ?? "website";

    document.title = title;
    setMeta('meta[name="description"]', "name:description", description);
    setMeta('meta[property="og:title"]', "property:og:title", title);
    setMeta('meta[property="og:description"]', "property:og:description", description);
    setMeta('meta[property="og:image"]', "property:og:image", image);
    setMeta('meta[property="og:image:alt"]', "property:og:image:alt", imageAlt);
    setMeta('meta[property="og:url"]', "property:og:url", url);
    setMeta('meta[property="og:type"]', "property:og:type", type);
    setMeta('meta[property="og:site_name"]', "property:og:site_name", siteConfig.name);
    setMeta('meta[property="og:locale"]', "property:og:locale", "en_SG");

    setMeta('meta[name="twitter:card"]', "name:twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name:twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name:twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name:twitter:image", image);
    setMeta('meta[name="twitter:image:alt"]', "name:twitter:image:alt", imageAlt);

    setLink("canonical", url);

    // Route-level structured data: replace any previously injected block so we
    // never leak one route's JSON-LD into another. The static Person/WebSite
    // graph in index.html is untouched (different element).
    const existing = document.getElementById("route-jsonld");
    if (existing) existing.remove();
    if (jsonLdKey !== "null") {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "route-jsonld";
      script.textContent = jsonLdKey;
      document.head.appendChild(script);
    }

    return () => {
      restore(snapshot);
      document.getElementById("route-jsonld")?.remove();
    };
  }, [
    meta.title,
    meta.description,
    meta.path,
    meta.image,
    meta.imageAlt,
    meta.type,
    jsonLdKey,
  ]);
}

// Suppress unused-parameter lint: ensureMeta reserved for future use.
void ensureMeta;