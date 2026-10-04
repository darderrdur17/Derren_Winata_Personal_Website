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
 * Homepage narrative — nine sections in deliberate order.
 *
 * Sections 01–08 follow brief §10 verbatim. Section 04 (Recommendations) is
 * inserted as supplementary attributable evidence between Work and Experience.
 * Atlas owns the call to deviate from the strict 8-section brief here.
 *
 *   01 Introduction (Hero)
 *   02 Proof
 *   03 Selected Work
 *   04 Recommendations                  ← inserted; named voices support
 *                                              the work directly above
 *   05 Experience
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