import { reportData } from "@/data/igneo-report";

export default function HeroSection() {
  const d = reportData;
  return (
    <section id="overview" className="section-dark min-h-[70vh] flex items-center pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
            <div className="metric-card space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Report Details</h3>
              <div>
                <p className="text-sm text-muted-foreground">Data period</p>
                <p className="text-foreground font-semibold">{d.dataPeriod}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sources</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {d.dataSources.map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{s}</span>
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
