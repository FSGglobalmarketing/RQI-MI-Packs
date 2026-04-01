import { useState, useMemo, useEffect, useRef } from "react";
import { reportData } from "@/data/igneo-report";
import { linkedInMonthlyData, linkedInQuarterlyData, q4DailyEngagement } from "@/data/linkedin-data";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from "recharts";
import KpiRow from "./KpiRow";

const TABS = ["Timeline", "Heatmap", "Org vs Spn", "Top Posts"] as const;
type Tab = typeof TABS[number];

function formatK(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}k`;
  return String(v);
}

/* ── Animated line draw hook ── */
function useLineDrawAnimation(deps: any[]) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paths = el.querySelectorAll<SVGPathElement>(".recharts-area-curve");
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.animation = "none";
      void path.getBoundingClientRect();
      path.style.animation = `line-draw 1.5s ease-out forwards`;
    });
  }, deps);
  return ref;
}

/* Custom X-axis tick with quarter labels */
function QuarterTick({ x, y, payload }: any) {
  const month = payload.value as string;
  let qLabel = "";
  if (month.startsWith("Oct")) qLabel = "Q4";
  if (month.startsWith("Jan")) qLabel = "Q1";
  if (month.startsWith("Apr")) qLabel = "Q2";
  if (month.startsWith("Jul")) qLabel = "Q3";

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={12} textAnchor="middle" fontSize={9} fill="hsl(0 0% 60%)">
        {month}
      </text>
      {qLabel && (
        <text x={0} y={0} dy={26} textAnchor="middle" fontSize={8} fontWeight={700} fill="hsl(210 100% 53%)">
          {qLabel}
        </text>
      )}
    </g>
  );
}

/* Spike annotation label */
function SpikeLabel({ viewBox, label }: any) {
  return (
    <g>
      <rect x={viewBox.x - 55} y={viewBox.y - 28} width={110} height={18} rx={4} fill="hsl(210 100% 53%)" fillOpacity={0.9} />
      <text x={viewBox.x} y={viewBox.y - 16} textAnchor="middle" fontSize={8} fontWeight={600} fill="white">
        {label}
      </text>
    </g>
  );
}

// Notable spike annotations
const LINKEDIN_ANNOTATIONS = [
  { month: "Oct 22", dataKey: "organic", label: "Asia Campaign Phase I" },
  { month: "Jul 24", dataKey: "sponsored", label: "HK Paid Campaign" },
  { month: "Jan 26", dataKey: "organic", label: "FMOTY + Team posts" },
];

/* ── Timeline: stacked area chart ── */
function ImpressionsTimeline() {
  const animRef = useLineDrawAnimation([]);

  return (
    <div ref={animRef}>
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={linkedInMonthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="month" tick={<QuarterTick />} interval={2} height={45} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(0 0% 60%)" }} tickFormatter={formatK} />
          <Tooltip
            contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
            labelStyle={{ color: "#0F9AFF", fontWeight: 700 }}
            formatter={(value: number, name: string) => [formatK(value), name === "organic" ? "Organic" : "Sponsored"]}
          />
          <Area type="monotone" dataKey="sponsored" stackId="1" fill="#56658B" stroke="#56658B" strokeWidth={1} isAnimationActive={false} />
          <Area type="monotone" dataKey="organic" stackId="1" fill="#0F9AFF" stroke="#0F9AFF" strokeWidth={2} isAnimationActive={false} />
          {LINKEDIN_ANNOTATIONS.map((ann) => {
            const point = linkedInMonthlyData.find((d) => d.month === ann.month);
            if (!point) return null;
            const val = (point as any)[ann.dataKey] + (ann.dataKey === "organic" ? (point.sponsored || 0) : 0);
            return (
              <ReferenceDot key={ann.month} x={ann.month} y={val} r={5} fill="#0F9AFF" stroke="white" strokeWidth={2}
                label={<SpikeLabel label={ann.label} />}
              />
            );
          })}
          <Legend
            wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
            formatter={(value: string) => <span style={{ color: "hsl(0 0% 60%)" }}>{value === "organic" ? "Organic" : "Sponsored"}</span>}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── Engagement Heatmap ── */
function EngagementHeatmap() {
  const weeks = useMemo(() => {
    const result: { week: number; cells: { date: string; day: number; rate: number }[] }[] = [];
    let currentWeek: { date: string; day: number; rate: number }[] = [];
    let weekNum = 0;

    const firstDate = new Date(q4DailyEngagement[0].date);
    const startDay = firstDate.getDay();
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
    if (rate === 0) return "hsl(210 30% 18%)";
    const intensity = Math.min(rate / maxRate, 1);
    const hue = 210 + intensity * 12;
    const lightness = 65 - intensity * 25;
    const saturation = 40 + intensity * 60;
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
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
        {[0, 5, 10, 15, 20].map((v) => (
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
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={linkedInQuarterlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="quarter" tick={{ fontSize: 9, fill: "hsl(0 0% 60%)" }} />
        <YAxis tick={{ fontSize: 9, fill: "hsl(0 0% 60%)" }} tickFormatter={formatK} />
        <Tooltip
          contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
          formatter={(value: number, name: string) => [formatK(value), name === "organic" ? "Organic" : "Sponsored"]}
        />
        <Bar dataKey="organic" stackId="a" fill="#0F9AFF" radius={[0, 0, 0, 0]} />
        <Bar dataKey="sponsored" stackId="a" fill="#56658B" radius={[4, 4, 0, 0]} />
        <Legend
          wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
          formatter={(value: string) => <span style={{ color: "hsl(0 0% 60%)" }}>{value === "organic" ? "Organic" : "Sponsored"}</span>}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Top Posts table ── */
function TopPostsTable() {
  const d = reportData.linkedin;
  return (
    <div className="space-y-3">
      {d.topPosts.map((post) => (
        <div key={post.title} className="glass-card-dark p-3 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">{post.title}</p>
            <p className="text-[10px] text-muted-foreground">{post.date}</p>
          </div>
          <div className="flex gap-4 shrink-0 text-right">
            <div>
              <p className="text-xs font-bold text-foreground">{formatK(post.impressions)}</p>
              <p className="text-[9px] text-muted-foreground">Impr.</p>
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">{post.clicks}</p>
              <p className="text-[9px] text-muted-foreground">Clicks</p>
            </div>
            <div>
              <p className="text-xs font-bold text-mint">{post.engagement}%</p>
              <p className="text-[9px] text-muted-foreground">Eng.</p>
            </div>
          </div>
        </div>
      ))}
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
                <h4 className="text-sm font-bold mb-3 text-foreground">Focus in Q2</h4>
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
                <p className="text-xs text-muted-foreground mb-3">Daily engagement rate — Q1 2026</p>
                <EngagementHeatmap />
              </div>
            )}

            {activeTab === "Org vs Spn" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Quarterly impressions split: organic vs sponsored</p>
                <OrgVsSponsoredChart />
              </div>
            )}

            {activeTab === "Top Posts" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Top performing posts — Q1 2026</p>
                <TopPostsTable />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
