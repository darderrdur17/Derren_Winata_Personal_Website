import BackToTop from "@/components/BackToTop";
import ClientLogos from "@/components/ClientLogos";
import CursorGlow from "@/components/CursorGlow";
import FeaturedStats from "@/components/FeaturedStats";
import FeaturedProjects from "@/components/FeaturedProjects";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Testimonial from "@/components/Testimonial";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen bg-background theme-transition">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" aria-label="Main content">
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
        <Contact />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default Index;
