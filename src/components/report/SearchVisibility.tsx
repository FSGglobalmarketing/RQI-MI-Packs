import { reportData } from "@/data/igneo-report";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CheckCircle, ArrowRight } from "lucide-react";

// Igneo primary/secondary palette colors for competitors
const COLORS: Record<string, string> = {
  Igneo: "#e8613a",        // coral orange (primary) — bold & thick
  CIP: "#1a2e35",          // dark teal
  Antin: "#8e9eab",        // secondary grey
  IFM: "#2d6a8a",          // secondary blue
  Infravia: "#4a9cc7",     // lighter blue
  "Global Infra": "#7ab4d4", // light blue
  CVC: "#4d2d5e",          // secondary purple
  DIF: "#8b7399",          // lavender
  KKR: "#7a3b1e",          // dark rust
  Blackstone: "#c44e1a",   // dark orange
  Vauban: "#f5f0eb",       // cream (faint)
  Stonepeak: "#b0a89e",    // warm grey
  Ardian: "#5a7080",       // steel
  Macquarie: "#3a5060",    // slate
  JPM: "#c0b8ae",          // light taupe
};

const VISIBLE_LINES = ["Igneo", "CIP", "Antin", "IFM", "Infravia", "Global Infra", "CVC", "DIF", "KKR", "Blackstone", "Vauban", "Stonepeak", "Ardian"];

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
        <p className="text-sm text-secondary-foreground/70 mb-10 max-w-3xl">{s.description}</p>

        {/* Main grid: left info + right chart */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Goal */}
            <div className="bg-background/5 border border-secondary-foreground/10 rounded-xl p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50 mb-2">Goal</p>
              <p className="text-sm text-secondary-foreground/80">{s.goal}</p>
            </div>

            {/* Marketing Activities */}
            <div className="bg-background/5 border border-secondary-foreground/10 rounded-xl p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50 mb-3">Marketing Activities</p>
              <ul className="space-y-2">
                {s.marketingActivities.map((a) => (
                  <li key={a} className="text-sm text-secondary-foreground/80 flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">+</span>{a}
                  </li>
                ))}
              </ul>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">
              {s.kpis.map((kpi) => (
                <div key={kpi.label} className="bg-background/5 border border-secondary-foreground/10 rounded-xl p-5 text-center">
                  <span className="text-3xl font-extrabold text-secondary-foreground">{kpi.value}</span>
                  <span className="kpi-pill-good text-xs px-3 py-1 rounded-full block mt-2 mx-auto w-fit">{kpi.label}</span>
                  <p className="stat-positive mt-1 text-xs">{kpi.comparison}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — chart */}
          <div className="lg:col-span-3 bg-background/5 border border-secondary-foreground/10 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-secondary-foreground mb-4">Search engine visibility over time</h3>
            <ResponsiveContainer width="100%" height={360}>
              <LineChart data={s.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} interval={1} />
                <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a2e35", border: "none", borderRadius: "8px", color: "#fff", fontSize: 11 }}
                  labelStyle={{ color: "#e8613a", fontWeight: 700 }}
                />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                {VISIBLE_LINES.map((key) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={COLORS[key] || "#999"}
                    strokeWidth={key === "Igneo" ? 3 : 1.2}
                    dot={false}
                    strokeOpacity={key === "Igneo" ? 1 : 0.6}
                    animationDuration={1500}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom: Focus areas */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-background/5 border border-secondary-foreground/10 rounded-xl p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50 mb-4">Areas of focus last quarter</p>
            <ul className="space-y-3">
              {s.focusAreas.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-secondary-foreground/80">
                  <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-background/5 border border-secondary-foreground/10 rounded-xl p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50 mb-4">Areas to focus next quarter</p>
            <ul className="space-y-3">
              {s.nextQuarter.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-secondary-foreground/80">
                  <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
