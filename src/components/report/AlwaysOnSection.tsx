import KpiRow from "./KpiRow";

interface KpiItem {
  value: string;
  label: string;
  comparison: string;
}

interface AlwaysOnProps {
  id: string;
  title: string;
  stage: string;
  subtitle: string;
  description: string;
  kpis: KpiItem[];
  focusQ4: string[];
  focusQ1: string[];
  variant: "dark" | "cream";
  activities?: string[];
}

export default function AlwaysOnSection({ id, title, stage, subtitle, description, kpis, focusQ4, focusQ1, variant, activities }: AlwaysOnProps) {
  const isDark = variant === "dark";
  return (
    <section id={id} className={`${isDark ? "section-dark" : "section-cream"} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className={`text-3xl sm:text-4xl font-extrabold ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>{title}</h2>
          <span className="stage-badge text-xs">{stage}</span>
        </div>
        <p className={`mb-8 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>{subtitle}</p>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <p className={`text-sm leading-relaxed ${isDark ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>{description}</p>

            <div>
              <h4 className={`text-sm font-bold mb-4 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Key Results</h4>
              <div className="space-y-3">
                {kpis.map((kpi) => (
                  <KpiRow key={kpi.label} value={kpi.value} label={kpi.label} comparison={kpi.comparison} variant={variant} />
                ))}
              </div>
            </div>

            {activities && (
              <div>
                <h4 className={`text-sm font-bold mb-3 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Activities</h4>
                <div className="flex flex-wrap gap-2">
                  {activities.map((a) => (
                    <span key={a} className={isDark ? "glass-pill-dark" : "glass-pill-cream"}>{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className={isDark ? "glass-card-dark" : "glass-card-cream"}>
              <h4 className={`text-sm font-bold mb-3 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Areas of focus in Q4</h4>
              <ul className="space-y-2">
                {focusQ4.map((f) => (
                  <li key={f} className={`text-sm flex items-start gap-2 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>
                    <svg className="w-4 h-4 text-success shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className={isDark ? "glass-card-dark" : "glass-card-cream"}>
              <h4 className={`text-sm font-bold mb-3 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Areas to focus in Q1</h4>
              <ul className="space-y-2">
                {focusQ1.map((f) => (
                  <li key={f} className={`text-sm flex items-start gap-2 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>
                    <span className="text-primary mt-0.5 shrink-0">+</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
