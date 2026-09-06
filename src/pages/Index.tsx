import ClientLogos from "@/components/ClientLogos";
import FeaturedStats from "@/components/FeaturedStats";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Testimonial from "@/components/Testimonial";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import PageShell from "@/components/PageShell";

const Index = () => {
  return (
    <PageShell>
      <Hero />
      <FeaturedStats />
      <ClientLogos />
      <FeaturedProjects />
      <About />
      <Process />
      <Testimonial />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
    </PageShell>
  );
};

export default Index;
