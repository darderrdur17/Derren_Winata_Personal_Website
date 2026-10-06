/**
 * Research output.
 *
 * Kept separate from `experiences` (which models *roles*) so a publication can
 * never inflate the role count on /experience.
 *
 * Naming policy: collaborators are described by ROLE, not by name. The UNR
 * engagement is ongoing and the paper is not yet public, so no individual is
 * named here until there is a final citation and consent to publish it.
 */
export interface Publication {
  id: string;
  /** Working title until the final submission title is confirmed. */
  title: string;
  /** The author's own credit, described by role — never a name list. */
  credit: string;
  venue: string;
  status: string;
  summary: string;
  contributions: string[];
  tags: string[];
}

export const publications: Publication[] = [
  {
    id: "unr-tourist-levy-ai-governance",
    title:
      "Bali's Foreign Tourist Levy: Progressive Web App Delivery & AI Governance",
    credit: "First author · with UNR faculty and programme staff",
    venue: "Smart Digital Conference 2026",
    status: "In preparation",
    summary:
      "A study of how Bali's foreign tourist levy can be delivered through a progressive web app, paired with a governance framework for the automated and AI-assisted components involved.",
    contributions: [
      "First author — framing the research question, structure, and argument",
      "PWA delivery model for levy collection and the visitor experience",
      "AI governance considerations for the system's automated components",
    ],
    tags: ["Research", "PWA", "AI Governance"],
  },
];
