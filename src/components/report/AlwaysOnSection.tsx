import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import KpiRow from "./KpiRow";

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
  change: string;
}

interface TrafficSourceItem {
  source: string;
  percentage: number;
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

function formatK(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return String(v);
}

/* ── Users & Sessions Chart ── */
function UsersSessionsChart({ data, variant }: { data: GaMonthlyItem[]; variant: "dark" | "cream" }) {
  const isDark = variant === "dark";
  const gridStroke = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const tickFill = isDark ? "hsl(195 15% 65%)" : "#64748b";

  return (
    <ResponsiveContainer width="100%" height={420}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
        <XAxis dataKey="month" tick={{ fontSize: 9, fill: tickFill }} />
        <YAxis tick={{ fontSize: 9, fill: tickFill }} tickFormatter={formatK} />
        <Tooltip
          contentStyle={{
            background: isDark ? "hsl(195 30% 12%)" : "hsl(20 33% 93%)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            borderRadius: 12,
            fontSize: 11,
            color: isDark ? "#fff" : "#052332",
          }}
          labelStyle={{ color: "#FF5424", fontWeight: 700 }}
          formatter={(value: number, name: string) => [formatK(value), name === "users" ? "Users" : "Sessions"]}
        />
        <Area type="monotone" dataKey="sessions" stackId="1" fill="#214E6F" stroke="#29628A" strokeWidth={1} fillOpacity={0.6} />
        <Area type="monotone" dataKey="users" stackId="1" fill="#FF5424" stroke="#FF5424" strokeWidth={2} fillOpacity={0.8} />
        <Legend
          wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
          formatter={(value: string) => (
            <span style={{ color: tickFill }}>{value === "users" ? "Users" : "Sessions"}</span>
          )}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ── Top Pages Bar Chart ── */
function TopPagesChart({ data, variant }: { data: TopPageItem[]; variant: "dark" | "cream" }) {
  const isDark = variant === "dark";
  const gridStroke = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const tickFill = isDark ? "hsl(195 15% 65%)" : "#64748b";

  return (
    <div className="space-y-3">
      {data.map((page, i) => {
        const maxViews = data[0]?.views || 1;
        const widthPct = (page.views / maxViews) * 100;
        return (
          <div key={page.page} className="flex items-center gap-3">
            <span className={`text-xs font-mono w-36 truncate shrink-0 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/60"}`}>
              {page.page}
            </span>
            <div className="flex-1 relative h-6 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: i === 0 ? "#FF5424" : "#214E6F",
                  opacity: 1 - i * 0.12,
                }}
              />
            </div>
            <span className={`text-xs font-semibold tabular-nums w-12 text-right ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>
              {formatK(page.views)}
            </span>
            <span className="text-xs font-semibold text-[hsl(142_60%_45%)] w-10 text-right">{page.change}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Traffic Sources ── */
function TrafficSourcesChart({ data, variant }: { data: TrafficSourceItem[]; variant: "dark" | "cream" }) {
  const isDark = variant === "dark";
  const colors = ["#FF5424", "#214E6F", "#29628A", "#506570", "#829199"];

  return (
    <div className="space-y-3">
      {data.map((source, i) => (
        <div key={source.source} className="space-y-1">
          <div className="flex justify-between">
            <span className={`text-xs font-medium ${isDark ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>{source.source}</span>
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

            <div className="grid grid-cols-2 gap-4">
              <div className={isDark ? "glass-card-dark flow-corner-bl" : "glass-card-cream flow-corner-bl"}>
                <h4 className={`text-sm font-bold mb-3 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Focus in Q4</h4>
                <ul className="space-y-2">
                  {focusQ4.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>
                      <svg className="w-4 h-4 text-success shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={isDark ? "glass-card-dark flow-corner-tr" : "glass-card-cream flow-corner-tr"}>
                <h4 className={`text-sm font-bold mb-3 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Focus in Q1</h4>
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
                        : isDark ? "text-muted-foreground hover:text-foreground" : "text-secondary-foreground/50 hover:text-secondary-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "Users & Sessions" && (
                <div className="flex-1 flex flex-col">
                  <p className={`text-xs mb-3 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/60"}`}>Monthly active users and sessions — Google Analytics</p>
                  <div className="flex-1 min-h-0">
                    <UsersSessionsChart data={gaMonthly!} variant={variant} />
                  </div>
                </div>
              )}

              {activeTab === "Top Pages" && topPages && (
                <div>
                  <p className={`text-xs mb-3 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/60"}`}>Most visited pages by total views</p>
                  <TopPagesChart data={topPages} variant={variant} />
                </div>
              )}

              {activeTab === "Traffic Sources" && trafficSources && (
                <div>
                  <p className={`text-xs mb-3 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/60"}`}>Where our visitors come from</p>
                  <TrafficSourcesChart data={trafficSources} variant={variant} />
                </div>
              )}
            </div>
          ) : (
            <div className={isDark ? "glass-card-dark" : "glass-card-cream"}>
              <p className={`text-sm leading-relaxed ${isDark ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>
                Analytics data visualisation coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
