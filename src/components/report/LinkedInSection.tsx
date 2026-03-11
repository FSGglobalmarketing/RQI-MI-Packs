import { useState, useMemo } from "react";
import { reportData } from "@/data/igneo-report";
import { linkedInMonthlyData, linkedInQuarterlyData, q4DailyEngagement } from "@/data/linkedin-data";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import KpiRow from "./KpiRow";

const TABS = ["Timeline", "Heatmap", "Org vs Spn", "Sparklines"] as const;
type Tab = typeof TABS[number];

function formatK(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}k`;
  return String(v);
}

/* ── Timeline: stacked area chart ── */
function ImpressionsTimeline() {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <AreaChart data={linkedInMonthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} interval={5} />
        <YAxis tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} tickFormatter={formatK} />
        <Tooltip
          contentStyle={{ background: "hsl(195 30% 12%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
          labelStyle={{ color: "hsl(14 78% 57%)", fontWeight: 700 }}
          formatter={(value: number, name: string) => [formatK(value), name === "organic" ? "Organic" : "Sponsored"]}
        />
        <Area type="monotone" dataKey="sponsored" stackId="1" fill="#56658B" stroke="#56658B" strokeWidth={1} />
        <Area type="monotone" dataKey="organic" stackId="1" fill="#0F9AFF" stroke="#0F9AFF" strokeWidth={2} />
        <Legend
          wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
          formatter={(value: string) => <span style={{ color: "hsl(195 15% 65%)" }}>{value === "organic" ? "Organic" : "Sponsored"}</span>}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ── Engagement Heatmap ── */
function EngagementHeatmap() {
  const weeks = useMemo(() => {
    const result: { week: number; cells: { date: string; day: number; rate: number }[] }[] = [];
    let currentWeek: { date: string; day: number; rate: number }[] = [];
    let weekNum = 0;

    // Start from first day and build week grid
    const firstDate = new Date(q4DailyEngagement[0].date);
    const startDay = firstDate.getDay(); // 0=Sun
    // Pad start
    for (let i = 0; i < startDay; i++) {
      currentWeek.push({ date: "", day: i, rate: 0 });
    }

    q4DailyEngagement.forEach((d) => {
      const date = new Date(d.date);
      const day = date.getDay();
      if (day === 0 && currentWeek.length > 0) {
        result.push({ week: weekNum++, cells: currentWeek });
        currentWeek = [];
      }
      currentWeek.push({ date: d.date, day, rate: d.rate });
    });
    if (currentWeek.length) result.push({ week: weekNum, cells: currentWeek });
    return result;
  }, []);

  const maxRate = Math.max(...q4DailyEngagement.map((d) => d.rate));
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  function getColor(rate: number) {
    if (rate === 0) return "hsl(205 40% 18%)";
    const intensity = Math.min(rate / maxRate, 1);
    // Wider range: from muted dark orange (68%) down to vivid bright orange (42%)
    const lightness = 68 - intensity * 30;
    const saturation = 60 + intensity * 40; // 60% → 100%
    return `hsl(14 ${saturation}% ${lightness}%)`;
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-1.5">
        <div className="flex flex-col gap-1.5 mr-1 pt-6">
          {dayLabels.map((d, i) => (
            <div key={i} className="h-7 w-6 flex items-center justify-center text-[10px] text-muted-foreground">{d}</div>
          ))}
        </div>
        <div className="flex gap-1.5 overflow-x-auto flex-1">
          {weeks.map((week) => (
            <div key={week.week} className="flex flex-col gap-1.5 flex-1">
              {/* Month label on first week */}
              <div className="h-5 text-[10px] text-muted-foreground text-center">
                {week.cells[0]?.date
                  ? new Date(week.cells[0].date).getDate() <= 7
                    ? new Date(week.cells[0].date).toLocaleDateString("en", { month: "short" })
                    : ""
                  : ""}
              </div>
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const cell = week.cells.find((c) => c.day === dayIndex);
                if (!cell || !cell.date) return <div key={dayIndex} className="h-7 rounded-md bg-muted/20 w-full" />;
                return (
                  <div
                    key={dayIndex}
                    className="h-7 rounded-md cursor-default transition-transform hover:scale-110 w-full"
                    style={{ backgroundColor: getColor(cell.rate) }}
                    title={`${cell.date}: ${cell.rate.toFixed(2)}%`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 justify-center">
        <span className="text-[10px] text-muted-foreground">Less</span>
        {[0, 1.5, 3, 5, 7].map((v) => (
          <div key={v} className="h-4 w-4 rounded-sm" style={{ backgroundColor: getColor(v) }} />
        ))}
        <span className="text-[10px] text-muted-foreground">More</span>
      </div>
    </div>
  );
}

/* ── Organic vs Sponsored quarterly bar chart ── */
function OrgVsSponsoredChart() {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <BarChart data={linkedInQuarterlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="quarter" tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} />
        <YAxis tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} tickFormatter={formatK} />
        <Tooltip
          contentStyle={{ background: "hsl(195 30% 12%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
          formatter={(value: number, name: string) => [formatK(value), name === "organic" ? "Organic" : "Sponsored"]}
        />
        <Bar dataKey="organic" stackId="a" fill="#FF5424" radius={[0, 0, 0, 0]} />
        <Bar dataKey="sponsored" stackId="a" fill="#214E6F" radius={[4, 4, 0, 0]} />
        <Legend
          wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
          formatter={(value: string) => <span style={{ color: "hsl(195 15% 65%)" }}>{value === "organic" ? "Organic" : "Sponsored"}</span>}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Monthly sparkline KPI cards ── */
function SparklineCards() {
  const recent = linkedInMonthlyData.slice(-6);
  const metrics: { label: string; key: keyof typeof recent[0]; format: (v: number) => string }[] = [
    { label: "Impressions", key: "organic", format: formatK },
    { label: "Clicks", key: "clicks", format: formatK },
    { label: "Reactions", key: "reactions", format: formatK },
    { label: "Shares", key: "shares", format: (v) => String(v) },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map(({ label, key, format }) => {
        const values = recent.map((d) => Number(d[key]));
        const max = Math.max(...values);
        const min = Math.min(...values);
        const range = max - min || 1;
        const latest = values[values.length - 1];
        const prev = values[values.length - 2];
        const change = prev ? ((latest - prev) / prev * 100).toFixed(0) : "0";
        const isUp = Number(change) >= 0;

        // Build simple SVG sparkline
        const width = 120;
        const height = 32;
        const points = values.map((v, i) => `${(i / (values.length - 1)) * width},${height - ((v - min) / range) * height}`).join(" ");

        return (
          <div key={label} className="glass-card-dark p-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
              <span className={`text-[10px] font-semibold ${isUp ? "text-[hsl(142_60%_45%)]" : "text-primary"}`}>
                {isUp ? "+" : ""}{change}%
              </span>
            </div>
            <p className="text-lg font-bold text-foreground mb-1">{format(latest)}</p>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-8" preserveAspectRatio="none">
              <polyline
                points={points}
                fill="none"
                stroke="hsl(14 78% 57%)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex justify-between text-[8px] text-muted-foreground mt-1">
              {recent.map((d) => <span key={d.month}>{d.month.split(" ")[0]}</span>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Section ── */
export default function LinkedInSection() {
  const d = reportData.linkedin;
  const [activeTab, setActiveTab] = useState<Tab>("Timeline");

  return (
    <section id="linkedin" className="section-dark py-24 flow-section-dark relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">{d.title}</h2>
          <span className="stage-badge text-xs">{d.stage}</span>
        </div>
        <p className="text-muted-foreground mb-8">{d.subtitle}</p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Info + Focus boxes */}
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">{d.description}</p>

            <div>
              <h4 className="text-sm font-bold mb-4 text-foreground">Key Results</h4>
              <div className="space-y-3">
                {d.kpis.map((kpi) => (
                  <KpiRow key={kpi.label} value={kpi.value} label={kpi.label} comparison={kpi.comparison} />
                ))}
              </div>
            </div>

            {d.activities && (
              <div>
                <h4 className="text-sm font-bold mb-3 text-foreground">Activities</h4>
                <div className="flex flex-wrap gap-2">
                  {d.activities.map((a) => (
                    <span key={a} className="glass-pill-dark">{a}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card-dark flow-corner-bl">
                <h4 className="text-sm font-bold mb-3 text-foreground">Focus in Q4</h4>
                <ul className="space-y-2">
                  {d.focusQ4.map((f) => (
                    <li key={f} className="text-sm flex items-start gap-2 text-muted-foreground">
                      <svg className="w-4 h-4 text-[hsl(142_60%_45%)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card-dark flow-corner-tr">
                <h4 className="text-sm font-bold mb-3 text-foreground">Focus in Q1</h4>
                <ul className="space-y-2">
                  {d.focusQ1.map((f) => (
                    <li key={f} className="text-sm flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0">+</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right — Charts */}
          <div className="glass-card-dark flow-corner-br min-h-[540px] flex flex-col">
            <div className="flex gap-1 mb-4 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Timeline" && (
              <div className="flex-1 flex flex-col">
                <p className="text-xs text-muted-foreground mb-3">Total impressions by month (organic + sponsored)</p>
                <div className="flex-1 min-h-0">
                  <ImpressionsTimeline />
                </div>
              </div>
            )}

            {activeTab === "Heatmap" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Daily engagement rate — Q4 2025</p>
                <EngagementHeatmap />
              </div>
            )}

            {activeTab === "Org vs Spn" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Quarterly impressions split: organic vs sponsored</p>
                <OrgVsSponsoredChart />
              </div>
            )}

            {activeTab === "Sparklines" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Last 6 months trend — key metrics</p>
                <SparklineCards />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
