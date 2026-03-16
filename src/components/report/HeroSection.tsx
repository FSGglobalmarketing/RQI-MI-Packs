import { reportData } from "@/data/igneo-report";
import heroBg from "@/assets/hero-bg.png";

export default function HeroSection() {
  const d = reportData;
  return (
    <section id="overview" className="section-dark relative min-h-[80vh] flex items-center pt-20 pb-16 overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-ash via-ash/85 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="animate-slide-up">
          <div className="flex items-center gap-4 mb-6">
            <span className="stage-badge inline-block">{d.quarter}</span>
            <span className="text-foreground/60 text-sm font-medium">1st Oct – 31st Dec 2025</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-foreground">
            {d.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-lg">{d.subtitle}</p>
          <p className="text-2xl font-bold text-primary">{d.tagline}</p>
        </div>
      </div>
    </section>
  );
}
