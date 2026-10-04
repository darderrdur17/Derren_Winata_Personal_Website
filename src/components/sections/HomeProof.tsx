import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProofBand } from "@/components/sections/Stat";

/**
 * 02 — Proof. A horizontal 4-up band of evidence numbers, each grounded in
 * real portfolio data (not aspirational marketing).
 *
 * Stats are static (no count-up) so they're meaningful as a scannable row.
 * The reveal-band version lives in `Stat.tsx`; this composition ties the
 * band to the page narrative with the same SectionHeader treatment.
 */
export function HomeProof() {
  return (
    <section
      id="proof"
      aria-label="Evidence and outcomes"
      className="relative py-16 sm:py-20"
    >
      <Container>
        <SectionHeader
          eyebrow="01"
          title="Proof, not pitches."
          lede="Every number below is grounded in real work from the past two years — internships, research, and shipped products."
        />

        <div className="mt-10">
          <ProofBand
            stats={[
              {
                label: "Platforms shipped",
                value: "3",
                detail:
                  "AI Singapore (national AI programme) · AI for Good, NSWS, ASEAN portal",
              },
              {
                label: "Live product · target users",
                value: "1,000+",
                detail: "360cogni.com cognitive health platform",
              },
              {
                label: "Faster reporting",
                value: "83%",
                detail: "Marina Bay Sands stakeholder automation",
              },
              {
                label: "Address coverage",
                value: "99.72%",
                detail: "Singapore halal registry (MUIS) validation",
              },
            ]}
          />
        </div>

        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          ↓ Below: the projects each number belongs to.
        </p>
      </Container>
    </section>
  );
}