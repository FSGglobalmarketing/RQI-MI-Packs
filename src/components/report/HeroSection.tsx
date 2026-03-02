import { reportData } from "@/data/igneo-report";
import heroBg from "@/assets/hero-bg.png";

export default function HeroSection() {
  const d = reportData;
  return (
    <section id="overview" className="section-dark topo-pattern topo-pattern-dark relative min-h-[80vh] flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background cover image — horizontal scroll loop */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-scroll-track absolute inset-y-0 flex w-[200%]">
          <img
            src={heroBg}
            alt=""
            className="w-1/2 h-full object-cover object-center shrink-0"
          />
          <img
            src={heroBg}
            alt=""
            className="w-1/2 h-full object-cover object-center shrink-0"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <span className="stage-badge mb-6 inline-block">{d.quarter}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-foreground">
              {d.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-lg">{d.subtitle}</p>
            <p className="text-2xl font-bold text-primary">{d.tagline}</p>
          </div>

          <div className="animate-slide-up flex items-center justify-end" style={{ animationDelay: "0.2s" }}>
            <div className="hero-glass-card flow-corner-br space-y-4 w-full max-w-sm">
              <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">Report Details</h3>
              <div>
                <p className="text-sm text-foreground/50">Data period</p>
                <p className="text-foreground font-semibold">{d.dataPeriod}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/50">Sources</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {d.dataSources.map((s) => (
                    <span key={s} className="glass-pill-dark">{s}</span>
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
