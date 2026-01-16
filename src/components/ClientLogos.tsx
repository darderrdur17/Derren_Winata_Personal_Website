const logos = [
  "National University of Singapore",
  "Marina Bay Sands",
  "AI Singapore",
  "Firsty",
  "Medisaya",
];

const ClientLogos = () => {
  return (
    <section aria-label="Partner logos" className="py-12 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm font-mono text-muted-foreground tracking-[0.2em] uppercase">
              Trusted By Teams In
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {logos.map((logo) => (
              <span
                key={logo}
                className="px-4 py-2 rounded-full border border-border/60 bg-background/70 text-xs md:text-sm text-muted-foreground font-semibold tracking-wide uppercase hover-glow text-center whitespace-normal max-w-[180px] md:max-w-none md:whitespace-nowrap leading-snug"
                aria-label={logo}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
