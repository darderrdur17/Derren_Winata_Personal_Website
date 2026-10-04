import Hero from "@/components/Hero";
import PageShell from "@/components/PageShell";
import { HomeProof } from "@/components/sections/HomeProof";
import { HomeSelectedWork } from "@/components/sections/HomeSelectedWork";
import { HomeRecommendations } from "@/components/sections/HomeRecommendations";
import { HomeExperience } from "@/components/sections/HomeExperience";
import { SignatureFlow } from "@/components/sections/SignatureFlow";
import { HomeCapabilities } from "@/components/sections/HomeCapabilities";
import { HomeCertifications } from "@/components/sections/HomeCertifications";
import { HomeContact } from "@/components/sections/HomeContact";
import { useDocumentMeta } from "@/lib/hooks/useDocumentMeta";
import { routeMeta } from "@/lib/site";

/**
 * Homepage narrative — a hero, then eight numbered sections in deliberate
 * order. The hero (01 in the narrative) is unnumbered in the UI; the numbered
 * eyebrows run 01 → 08 across the sections below it.
 *
 *   Hero          (Introduction — unnumbered in the UI)
 *   01 Proof
 *   02 Selected Work
 *   03 Recommendations                  ← inserted; named voices support
 *                                              the work directly above
 *   04 Experience
 *   05 How I think (SignatureFlow)
 *   06 Capabilities
 *   07 Certifications
 *   08 Contact
 *
 * A recruiter scanning top-to-bottom learns identity → credibility → evidence
 * → named voices → breadth → action inside ~30 seconds.
 */
const Index = () => {
  useDocumentMeta({ ...routeMeta("/"), path: "/" });

  return (
    <PageShell>
      <Hero />
      <HomeProof />
      <HomeSelectedWork />
      <HomeRecommendations />
      <HomeExperience />
      <SignatureFlow />
      <HomeCapabilities />
      <HomeCertifications />
      <HomeContact />
    </PageShell>
  );
};

export default Index;