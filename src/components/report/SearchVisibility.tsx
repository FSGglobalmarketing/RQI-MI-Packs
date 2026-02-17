import { reportData } from "@/data/igneo-report";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS: Record<string, string> = {
  IFM: "#94a3b8",
  CIP: "#22c55e",
  Antin: "#4ade80",
  Igneo: "#e8613a",
  Infravia: "#3b82f6",
  Ardian: "#6366f1",
  Blackstone: "#a78bfa",
  Stonepeak: "#f59e0b",
  Vauban: "#06b6d4",
};

export default function SearchVisibility() {
  const s = reportData.searchVisibility;
  return (
    <section id="search-visibility" className="section-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground">Global online brand visibility</h2>
          <span className="stage-badge text-xs">Awareness</span>
        </div>
        <p className="text-secondary-foreground/70 mb-8 max-w-2xl">{s.description}</p>

        <div className="grid lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-background/5 border border-secondary-foreground/10 rounded-xl p-6 space-y-4">
              <p className="text-sm font-semibold text-secondary-foreground">Goal</p>
              <p className="text-sm text-secondary-foreground/70">{s.goal}</p>
            </div>
            {s.kpis.map((kpi) => (
              <div key={kpi.label} className="flex items-center gap-4 bg-background/5 border border-secondary-foreground/10 rounded-xl p-5">
                <span className="text-3xl font-extrabold text-secondary-foreground">{kpi.value}</span>
                <div>
                  <span className="kpi-pill-good text-xs px-3 py-1 rounded-full">{kpi.label}</span>
                  <p className="stat-positive mt-1">{kpi.comparison}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 bg-background/5 border border-secondary-foreground/10 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-secondary-foreground mb-4">Search engine visibility over time</h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={s.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a2e35", border: "none", borderRadius: "8px", color: "#fff" }}
                  labelStyle={{ color: "#e8613a" }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {Object.keys(COLORS).map((key) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={COLORS[key]}
                    strokeWidth={key === "Igneo" ? 3 : 1.5}
                    dot={false}
                    animationDuration={1500}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
