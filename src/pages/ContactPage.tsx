import PageShell from "@/components/PageShell";
import Contact from "@/components/Contact";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { useDocumentMeta } from "@/lib/hooks/useDocumentMeta";
import { routeMeta, siteConfig } from "@/lib/site";
import { breadcrumbList } from "@/lib/structuredData";

const ContactPage = () => {
  useDocumentMeta({
    ...routeMeta("/contact"),
    path: "/contact",
    jsonLd: breadcrumbList("/contact"),
  });

  return (
    <PageShell>
      <section className="relative pt-28 sm:pt-36">
        <Container narrow>
          <SectionHeader
            eyebrow="Contact"
            title="Let's build something useful."
            lede="Whether you're hiring, scoping a project, or want a second pair of hands on an analytics/AI build — my inbox is open."
          />
        </Container>
      </section>
      <div className="pb-24">
        <Contact />
      </div>
      <noscript>
        <p className="px-6 pb-12 text-center text-sm text-muted-foreground">
          Prefer email? Reach me directly at{" "}
          <a className="text-primary underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          .
        </p>
      </noscript>
    </PageShell>
  );
};

export default ContactPage;
