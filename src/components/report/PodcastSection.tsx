import { reportData } from "@/data/igneo-report";

export default function PodcastSection() {
  const p = reportData.podcast;
  return (
    <section id="podcast" className="section-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">{p.title}</h2>
          <span className="stage-badge text-xs">{p.stage}</span>
        </div>
        <p className="text-muted-foreground mb-8">{p.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.description}</p>
            <div>
              <h4 className="text-sm font-bold mb-4 text-foreground">Key Results</h4>
              <div className="space-y-3">
                {p.kpis.map((kpi) => (
                  <div key={kpi.label} className="flex items-center gap-4">
                    <span className="text-primary shrink-0 text-sm">+</span>
                    <span className="text-lg font-extrabold min-w-[70px] text-foreground">{kpi.value}</span>
                    <span className="text-sm text-muted-foreground">{kpi.label}</span>
                    <span className="stat-negative text-xs ml-auto whitespace-nowrap">{kpi.comparison}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="metric-card flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              <p className="text-foreground font-semibold">Keeping it Real Assets</p>
              <p className="text-xs text-muted-foreground mt-1">Podcast series</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
