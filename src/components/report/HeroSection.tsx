import { reportData } from "@/data/igneo-report";
import frontCover from "@/assets/front-cover-q4.jpg";

export default function HeroSection() {
  const d = reportData;
  return (
    <section id="overview" className="section-dark relative min-h-[80vh] flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background cover image */}
      <div className="absolute inset-0">
        <img
          src={frontCover}
          alt="Q4 2025 Marketing Report Cover"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <span className="stage-badge mb-6 inline-block">{d.quarter}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-foreground">
              {d.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-lg">{d.subtitle}</p>
            <p className="text-2xl font-bold text-primary">{d.tagline}</p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {/* Liquid glass card */}
            <div className="hero-glass-card space-y-4">
              <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">Report Details</h3>
              <div>
                <p className="text-sm text-foreground/50">Data period</p>
                <p className="text-foreground font-semibold">{d.dataPeriod}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/50">Sources</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {d.dataSources.map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-foreground/10 text-foreground/70 backdrop-blur-sm">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
