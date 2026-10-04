/**
 * Derive the call-to-action label for a project link.
 *
 * GitHub repos are framed as "source", everything else (a live site, a demo,
 * a write-up) as "live site". Kept in its own module so the rule is
 * testable and shared if other components need it.
 */
export function deriveCtaLabel(href: string): string {
  return /github\.com/i.test(href) ? "View source on GitHub" : "Visit live site";
}
