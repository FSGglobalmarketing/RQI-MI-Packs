import { reportData } from "@/data/igneo-report";

export default function SearchVisibility() {
  const s = reportData.searchVisibility;

  return (
    <section id="search-visibility" className="section-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground">
            Search engine visibility
          </h2>
          <span className="stage-badge text-xs">Awareness</span>
        </div>
        <p className="text-secondary-foreground/70 mb-8">{s.description}</p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left column */}
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-secondary-foreground/70">{s.goal}</p>

            <div>
              <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Marketing Activities</h4>
              <ul className="space-y-2">
                {s.marketingActivities.map((a) => (
                  <li key={a} className="text-sm flex items-start gap-2 text-secondary-foreground/70">
                    <span className="text-primary mt-0.5 shrink-0">+</span>{a}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {s.focusAreas.map((f) => (
                  <span key={f} className="text-xs px-4 py-1.5 rounded-full border border-secondary-foreground/20 text-secondary-foreground/70">{f}</span>
                ))}
              </div>
            </div>

            {/* Key Results — KPI list style */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-secondary-foreground">Key Results</h4>
              <div className="space-y-3">
                {s.kpis.map((kpi) => (
                  <div key={kpi.label} className="flex items-center gap-4">
                    <span className="text-primary shrink-0 text-sm">+</span>
                    <span className="text-lg font-extrabold min-w-[70px] text-secondary-foreground">{kpi.value}</span>
                    <span className="text-sm text-secondary-foreground/70">{kpi.label}</span>
                    <span className="stat-positive text-xs ml-auto whitespace-nowrap">{kpi.comparison}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: reserved for images */}
          <div />
        </div>
      </div>
    </section>
  );
}
