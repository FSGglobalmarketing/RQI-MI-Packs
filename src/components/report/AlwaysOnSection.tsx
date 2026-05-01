import { useState, useEffect, useRef } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, ReferenceDot } from "recharts";
import KpiRow from "./KpiRow";
import { Globe, FileText, Megaphone, Mail, Video, Mic, Layout, PenTool, Newspaper } from "lucide-react";

function getActivityIcon(activity: string) {
  const lower = activity.toLowerCase();
  if (lower.includes("website") || lower.includes("page") || lower.includes("landing")) return Layout;
  if (lower.includes("linkedin")) return Globe;
  if (lower.includes("email") || lower.includes("signature")) return Mail;
  if (lower.includes("video") || lower.includes("listen")) return Video;
  if (lower.includes("insight") || lower.includes("paper") || lower.includes("flyer") || lower.includes("thought")) return FileText;
  if (lower.includes("podcast") || lower.includes("audio")) return Mic;
  if (lower.includes("ad") || lower.includes("sem") || lower.includes("display") || lower.includes("paid")) return Megaphone;
  if (lower.includes("press") || lower.includes("advertorial")) return Newspaper;
  if (lower.includes("profile") || lower.includes("content")) return PenTool;
  return Globe;
}

interface KpiItem {
  value: string;
  label: string;
  comparison: string;
}

interface GaMonthlyItem {
  month: string;
  users: number;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgDuration: number;
}

interface TopPageItem {
  page: string;
  views: number;
  q4Views?: number;
  change: string;
}

interface TrafficSourceItem {
  source: string;
  percentage: number;
}

// Spike annotations for notable data points
const WEBSITE_ANNOTATIONS: { month: string; dataKey: string; label: string }[] = [
  { month: "Oct 25", dataKey: "users", label: "HK LinkedIn Ads launch" },
  { month: "Jan 26", dataKey: "users", label: "HK LinkedIn Ads Phase II" },
];

/* ── Animated area path using stroke-dashoffset ── */
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
      // force reflow
      void path.getBoundingClientRect();
      path.style.animation = `line-draw 1.5s ease-out forwards`;
    });
  }, deps);
  return ref;
}

function formatK(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return String(v);
}

/* Custom X-axis tick with quarter labels */
function QuarterTick({ x, y, payload, data }: any) {
  const month = payload.value;
  const idx = data.findIndex((d: any) => d.month === month);
  // Show Q label at start of each quarter
  let qLabel = "";
  if (month.startsWith("Oct")) qLabel = "Q4";
  if (month.startsWith("Jan")) qLabel = "Q1";

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={12} textAnchor="middle" fontSize={9} fill="#64748b">
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

/* Annotation label for spike dots */
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

/* ── Users & Sessions Chart ── */
function UsersSessionsChart({ data, variant }: { data: GaMonthlyItem[]; variant: "dark" | "cream" }) {
  const isDark = variant === "dark";
  const gridStroke = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const animRef = useLineDrawAnimation([data]);

  return (
    <div ref={animRef}>
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <XAxis dataKey="month" tick={<QuarterTick data={data} />} height={45} />
          <YAxis tick={{ fontSize: 9, fill: "#64748b" }} tickFormatter={formatK} />
          <Tooltip
            contentStyle={{
              background: isDark ? "hsl(0 0% 8%)" : "hsl(0 0% 96%)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              borderRadius: 12,
              fontSize: 11,
              color: isDark ? "#fff" : "#000",
            }}
            labelStyle={{ color: "#0F9AFF", fontWeight: 700 }}
            formatter={(value: number, name: string) => [formatK(value), name === "users" ? "Users" : "Sessions"]}
          />
          <Area type="monotone" dataKey="sessions" stackId="1" fill="#56658B" stroke="#56658B" strokeWidth={1} fillOpacity={0.6} isAnimationActive={false} />
          <Area type="monotone" dataKey="users" stackId="1" fill="#0F9AFF" stroke="#0F9AFF" strokeWidth={2} fillOpacity={0.8} isAnimationActive={false} />
          {/* Spike annotations */}
          {WEBSITE_ANNOTATIONS.map((ann) => {
            const point = data.find((d) => d.month === ann.month);
            if (!point) return null;
            return (
              <ReferenceDot
                key={ann.month}
                x={ann.month}
                y={point[ann.dataKey as keyof GaMonthlyItem] as number}
                r={5}
                fill="#0F9AFF"
                stroke="white"
                strokeWidth={2}
                label={<SpikeLabel label={ann.label} />}
              />
            );
          })}
          <Legend
            wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
            formatter={(value: string) => (
              <span style={{ color: "#64748b" }}>{value === "users" ? "Users" : "Sessions"}</span>
            )}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
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
  gaMonthly?: GaMonthlyItem[];
  topPages?: TopPageItem[];
  trafficSources?: TrafficSourceItem[];
}

const TABS = ["Users & Sessions", "Top Pages", "Traffic Sources"] as const;
type Tab = typeof TABS[number];

/* ── Top Pages Stacked Horizontal Bar Chart ── */
function TopPagesChart({ data, variant }: { data: TopPageItem[]; variant: "dark" | "cream" }) {
  const isDark = variant === "dark";
  const maxViews = Math.max(...data.map((p) => (p.views || 0) + (p.q4Views || 0)));
  const anyHasQ4 = data.some((p) => (p.q4Views || 0) > 0);

  return (
    <div className="space-y-4">
      {anyHasQ4 && (
        <div className="flex items-center gap-4 mb-1">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: "#0F9AFF" }} /> Q1 2026</span>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: "#56658B" }} /> Q4 2025</span>
        </div>
      )}
      {data.map((page) => {
        const q1Pct = (page.views / maxViews) * 100;
        const q4Pct = ((page.q4Views || 0) / maxViews) * 100;
        const isPercentChange = /^[+-]/.test(page.change);
        const changeColor = page.change.startsWith("-")
          ? "text-accent-orange"
          : isPercentChange
            ? "text-[hsl(142_60%_45%)]"
            : (isDark ? "text-white/50" : "text-secondary-foreground/50");
        return (
          <div key={page.page} className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className={`text-xs font-medium ${isDark ? "text-white" : "text-secondary-foreground/70"}`}>{page.page}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold tabular-nums ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>{formatK(page.views)}</span>
                <span className={`text-[10px] font-medium tabular-nums text-right ${changeColor}`}>{page.change}</span>
              </div>
            </div>
            <div className="relative h-5 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
              <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${q4Pct}%`, backgroundColor: "#56658B" }} />
              <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${q1Pct}%`, backgroundColor: "#0F9AFF" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Traffic Sources ── */
function TrafficSourcesChart({ data, variant }: { data: TrafficSourceItem[]; variant: "dark" | "cream" }) {
  const isDark = variant === "dark";
  const colors = ["#0F9AFF", "#56658B", "#D37669", "#F99C46", "#FFCC00"];

  return (
    <div className="space-y-3">
      {data.map((source, i) => (
        <div key={source.source} className="space-y-1">
          <div className="flex justify-between">
            <span className={`text-xs font-medium ${isDark ? "text-white" : "text-secondary-foreground/70"}`}>{source.source}</span>
            <span className={`text-xs font-bold ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>{source.percentage}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${source.percentage}%`, backgroundColor: colors[i] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AlwaysOnSection({ id, title, stage, subtitle, description, kpis, focusQ4, focusQ1, variant, activities, gaMonthly, topPages, trafficSources }: AlwaysOnProps) {
  const isDark = variant === "dark";
  const hasGA = gaMonthly && gaMonthly.length > 0;
  const [activeTab, setActiveTab] = useState<Tab>("Users & Sessions");

  return (
    <section id={id} className={`${isDark ? "section-dark flow-section-dark" : "section-cream flow-section-cream"} py-24 relative`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        <span className="stage-badge text-xs inline-block mb-3">{stage}</span>
        <h2 className={`text-3xl sm:text-4xl font-extrabold mb-2 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>{title}</h2>
        <p className={`mb-8 ${isDark ? "text-white" : "text-secondary-foreground/70"}`}>{subtitle}.</p>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <p className={`text-sm leading-relaxed ${isDark ? "text-white" : "text-secondary-foreground/70"}`}>{description}</p>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activities.map((a) => {
                    const Icon = getActivityIcon(a);
                    return (
                      <div key={a} className={`flex items-center gap-2.5 text-sm ${isDark ? "text-white" : "text-secondary-foreground/70"}`}>
                        <Icon className={`w-4 h-4 shrink-0 ${isDark ? "text-mint" : "text-moss"}`} />
                        <span>{a}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className={isDark ? "glass-card-dark flow-corner-bl" : "glass-card-cream flow-corner-bl"}>
                <h4 className={`text-sm font-bold mb-3 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Focus in Q1</h4>
                <ul className="space-y-2">
                  {focusQ4.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${isDark ? "text-foreground/80" : "text-secondary-foreground/70"}`}>
                      <svg className="w-4 h-4 text-success shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={isDark ? "glass-card-dark flow-corner-tr" : "glass-card-cream flow-corner-tr"}>
                <h4 className={`text-sm font-bold mb-3 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Focus in Q2</h4>
                <ul className="space-y-2">
                  {focusQ1.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${isDark ? "text-foreground/80" : "text-secondary-foreground/70"}`}>
                      <span className="text-primary mt-0.5 shrink-0">+</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right — GA Charts (if data available) */}
          {hasGA ? (
            <div className={`${isDark ? "glass-card-dark flow-corner-br" : "glass-card-cream flow-corner-br"} min-h-[540px] flex flex-col`}>
              <div className="flex gap-1 mb-4 overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      activeTab === tab
                        ? "bg-primary text-primary-foreground"
                        : isDark ? "text-white hover:text-foreground" : "text-secondary-foreground/50 hover:text-secondary-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "Users & Sessions" && (
                <div className="flex-1 flex flex-col">
                  <p className={`text-xs mb-3 ${isDark ? "text-white" : "text-secondary-foreground/60"}`}>Monthly active users and page views — Google Analytics (Q4 2025 vs Q1 2026)</p>
                  <div className="flex-1 min-h-0">
                    <UsersSessionsChart data={gaMonthly!} variant={variant} />
                  </div>
                </div>
              )}

              {activeTab === "Top Pages" && topPages && (
                <div>
                  <p className={`text-xs mb-3 ${isDark ? "text-white" : "text-secondary-foreground/60"}`}>Most visited pages by total views</p>
                  <TopPagesChart data={topPages} variant={variant} />
                </div>
              )}

              {activeTab === "Traffic Sources" && trafficSources && (
                <div>
                  <p className={`text-xs mb-3 ${isDark ? "text-white" : "text-secondary-foreground/60"}`}>Where our visitors come from</p>
                  <TrafficSourcesChart data={trafficSources} variant={variant} />
                </div>
              )}
            </div>
          ) : (
            <div className={isDark ? "glass-card-dark" : "glass-card-cream"}>
              <p className={`text-sm leading-relaxed ${isDark ? "text-white" : "text-secondary-foreground/70"}`}>
                Analytics data visualisation coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
