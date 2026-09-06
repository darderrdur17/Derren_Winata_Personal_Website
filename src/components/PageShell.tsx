import { ReactNode } from "react";
import BackToTop from "@/components/BackToTop";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";

const PageShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background theme-transition overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" aria-label="Main content">
        {children}
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default PageShell;
