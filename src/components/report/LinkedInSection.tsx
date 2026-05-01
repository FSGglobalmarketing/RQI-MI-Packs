import { useState } from "react";
import { reportData } from "@/data/igneo-report";
import {
  linkedInMonthlyData, linkedInQuarterlyData,
  contentMixData, topPostsQ1, linkedInHeadline,
} from "@/data/linkedin-data";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { ExternalLink } from "lucide-react";
import KpiRow from "./KpiRow";

const TABS = ["Timeline", "Content Mix", "Org vs Spn", "Top Posts"] as const;
type Tab = typeof TABS[number];

// LinkedIn section is on cream/white bg; chart uses high-contrast brand colours
const COLOR_ORGANIC = "#0F9AFF";       // RQI Blue (primary on dark — pops on ash)
const COLOR_SPONSORED = "#F99C46";     // Brand orange (secondary)
const COLOR_IMPRESSIONS = "#53b8bb";   // Mint

const CHART_GRID = "rgba(0,0,0,0.07)";
const CHART_TICK = "rgba(0,0,0,0.7)";
const LEGEND_TEXT = "#0f172a";
const CHART_TOOLTIP = {
  background: "hsl(0 0% 8%)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  fontSize: 12,
  color: "#fff",
};

function formatK(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return String(v);
}

const CATEGORY_COLORS: Record<string, string> = {
  Events: "#0F9AFF",
  Strategy: "#56658B",
  Insights: "#D37669",
  HR: "#7ba98b",
};

/* ── Timeline (last 12 months — Q4 + Q1 monthly stack) ── */
function TimelineChart() {
  // Show last 12 months = include Q1 + Q4 + 6 prior months for context
  const months = linkedInMonthlyData.slice(-12);
  return (
    <ResponsiveContainer width="100%" height={420}>
      <AreaChart data={months} margin={{ top: 20, right: 16, left: -6, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: CHART_TICK }} />
        <YAxis tick={{ fontSize: 11, fill: CHART_TICK }} tickFormatter={formatK} />
        <Tooltip
          contentStyle={CHART_TOOLTIP}
          formatter={(value: number, name: string) => [
            formatK(value),
            name === "sponsored" ? "Sponsored" : "Organic",
          ]}
        />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={(v: string) => (
            <span style={{ color: LEGEND_TEXT }}>
              {v === "sponsored" ? "Sponsored" : "Organic"}
            </span>
          )}
        />
        <Area
          type="monotone"
          dataKey="sponsored"
          stackId="1"
          fill={COLOR_SPONSORED}
          stroke={COLOR_SPONSORED}
          strokeWidth={1.5}
          fillOpacity={0.55}
        />
        <Area
          type="monotone"
          dataKey="organic"
          stackId="1"
          fill={COLOR_ORGANIC}
          stroke={COLOR_ORGANIC}
          strokeWidth={2.5}
          fillOpacity={0.7}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ── Content Mix (grouped bars + cards) ── */
function ContentMixChart() {
  const chartData = contentMixData
    .filter((d) => d.posts > 0)
    .map((d) => ({
      category: d.category,
      "Avg Engagement %": +(d.avgEngagement * 100).toFixed(2),
      "Avg CTR %": +(d.avgCtr * 100).toFixed(2),
      "Avg Impressions": d.avgImpressions,
    }));

  return (
    <div className="space-y-4">
      <p className="text-[11px] text-secondary-foreground/70">
        Average post performance by content category. Engagement and CTR on the left axis (%);
        impressions on the right axis.
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
          <XAxis dataKey="category" tick={{ fontSize: 12, fill: CHART_TICK }} />
          <YAxis
            yAxisId="pct"
            tick={{ fontSize: 10, fill: CHART_TICK }}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            yAxisId="imp"
            orientation="right"
            tick={{ fontSize: 10, fill: CHART_TICK }}
            tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)}
          />
          <Tooltip
            contentStyle={CHART_TOOLTIP}
            formatter={(value: number, name: string) =>
              name === "Avg Impressions"
                ? [value.toLocaleString(), name]
                : [`${value.toFixed(2)}%`, name]
            }
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} formatter={(v: string) => <span style={{ color: LEGEND_TEXT }}>{v}</span>} />
          <Bar yAxisId="pct" dataKey="Avg Engagement %" fill={COLOR_ORGANIC} radius={[4, 4, 0, 0]} />
          <Bar yAxisId="pct" dataKey="Avg CTR %" fill={COLOR_SPONSORED} radius={[4, 4, 0, 0]} />
          <Bar yAxisId="imp" dataKey="Avg Impressions" fill={COLOR_IMPRESSIONS} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {contentMixData.map((c) => (
          <div key={c.category} className="rounded-lg p-3" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-secondary-foreground">
              <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS[c.category] || "#888" }} />
              {c.category}
            </div>
            <p className="text-lg font-bold text-secondary-foreground">{c.posts}</p>
            <p className="text-[10px] tracking-wider text-secondary-foreground/70">posts</p>
            <p className="text-[11px] text-secondary-foreground/70 mt-1">
              Avg CTR: <span className="text-secondary-foreground">{(c.avgCtr * 100).toFixed(2)}%</span>
            </p>
            <p className="text-[11px] text-secondary-foreground/70">
              Avg Eng: <span className="text-secondary-foreground">{(c.avgEngagement * 100).toFixed(2)}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Org vs Spn quarterly stacked bar ── */
function OrgVsSpnChart() {
  // Show last 8 quarters for trend, or all if fewer
  const data = linkedInQuarterlyData.slice(-8);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 16, left: -6, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
        <XAxis dataKey="quarter" tick={{ fontSize: 12, fill: CHART_TICK }} />
        <YAxis tick={{ fontSize: 11, fill: CHART_TICK }} tickFormatter={formatK} />
        <Tooltip contentStyle={CHART_TOOLTIP} formatter={(v: number) => formatK(v)} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} formatter={(v: string) => <span style={{ color: LEGEND_TEXT }}>{v}</span>} />
        <Bar dataKey="organic" name="Organic" stackId="a" fill={COLOR_ORGANIC} radius={[0, 0, 0, 0]} />
        <Bar dataKey="sponsored" name="Sponsored" stackId="a" fill={COLOR_SPONSORED} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Top Posts table (sorted by CTR) ── */
function TopPostsTable() {
  const sorted = [...topPostsQ1].sort((a, b) => b.ctr - a.ctr);
  return (
    <div>
      <p className="text-[11px] text-secondary-foreground/70 mb-3">
        Top {sorted.length} Q1 posts ranked by click-through rate.
      </p>
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.03)" }}>
              <th className="text-left p-3 font-semibold text-secondary-foreground">Post</th>
              <th className="text-left p-3 font-semibold text-secondary-foreground">Category</th>
              <th className="text-right p-3 font-semibold text-secondary-foreground">CTR</th>
              <th className="text-right p-3 font-semibold text-secondary-foreground">Impressions</th>
              <th className="text-right p-3 font-semibold text-secondary-foreground">Clicks</th>
              <th className="text-right p-3 font-semibold text-secondary-foreground">Eng Rate</th>
              {sorted.some((p) => p.link) && (
                <th className="text-center p-3 font-semibold text-secondary-foreground">Link</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sorted.map((post, i) => (
              <tr key={i} className="border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <td className="p-3 text-secondary-foreground max-w-[240px]">
                  <div className="font-medium leading-snug">{post.title}</div>
                  <div className="text-[10px] text-secondary-foreground/50 mt-1">{post.date}</div>
                </td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(0,0,0,0.05)", color: "hsl(0 0% 85%)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: CATEGORY_COLORS[post.category] || "#888" }} />
                    {post.category}
                  </span>
                </td>
                <td className="p-3 text-right tabular-nums text-secondary-foreground font-bold">
                  {(post.ctr * 100).toFixed(2)}%
                </td>
                <td className="p-3 text-right tabular-nums text-secondary-foreground">{post.impressions.toLocaleString()}</td>
                <td className="p-3 text-right tabular-nums text-secondary-foreground">{post.clicks.toLocaleString()}</td>
                <td className="p-3 text-right tabular-nums text-secondary-foreground">{(post.engagementRate * 100).toFixed(2)}%</td>
                {sorted.some((p) => p.link) && (
                  <td className="p-3 text-center">
                    {post.link ? (
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-6 h-6 rounded-full items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.05)", color: "hsl(0 0% 80%)" }}
                        aria-label="Open post"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-secondary-foreground/30">—</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function LinkedInSection() {
  const d = reportData.linkedin;
  const [tab, setTab] = useState<Tab>("Timeline");

  const q1 = linkedInHeadline.q1;
  const q4 = linkedInHeadline.q4;
  const pct = (a: number, b: number) => (b === 0 ? "—" : `${a >= b ? "+" : ""}${Math.round(((a - b) / b) * 100)}%`);

  const kpis = [
    { value: formatK(q1.impressions),            label: "Impressions", comparison: `${pct(q1.impressions, q4.impressions)} vs Q4` },
    { value: q1.clicks.toLocaleString(),         label: "Clicks",      comparison: `${pct(q1.clicks, q4.clicks)} vs Q4` },
    { value: `${(q1.avgCtr * 100).toFixed(1)}%`, label: "Avg CTR",     comparison: `${pct(q1.avgCtr * 100, q4.avgCtr * 100)} vs Q4` },
    { value: String(q1.posts),                   label: "Posts",       comparison: `${q1.posts - q4.posts >= 0 ? "+" : ""}${q1.posts - q4.posts} vs Q4 (${q4.posts})` },
  ];

  return (
    <section id="linkedin" className="section-cream py-24 flow-section-cream relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        <span className="stage-badge text-xs inline-block mb-3">{d.stage}</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground mb-2">{d.title}</h2>
        <p className="text-sm leading-relaxed text-secondary-foreground mb-8">{d.subtitle}.</p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — info */}
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-secondary-foreground">{d.description}</p>

            <div>
              <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Key Results</h4>
              <div className="space-y-3">
                {kpis.map((k) => (
                  <KpiRow key={k.label} value={k.value} label={k.label} comparison={k.comparison} variant="dark" />
                ))}
              </div>
            </div>

            {d.activities && (
              <div>
                <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Activities</h4>
                <div className="flex flex-wrap gap-2">
                  {d.activities.map((a) => (
                    <span key={a} className="text-xs px-3 py-1 rounded-full bg-secondary-foreground/5 text-secondary-foreground/80 border border-secondary-foreground/10">{a}</span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Our focus in</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card-cream flow-corner-bl">
                  <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Q1</h4>
                  <ul className="space-y-2">
                    {d.focusQ4.map((f) => (
                      <li key={f} className="text-sm flex items-start gap-2 text-secondary-foreground">
                        <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card-cream flow-corner-tr">
                  <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Q2</h4>
                  <ul className="space-y-2">
                    {d.focusQ1.map((f) => (
                      <li key={f} className="text-sm flex items-start gap-2 text-secondary-foreground">
                        <span className="text-primary mt-0.5 shrink-0">+</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right — charts */}
          <div className="glass-card-cream flow-corner-br min-h-[540px] flex flex-col">
            <div className="flex gap-1 mb-4 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    tab === t
                      ? "bg-primary text-primary-foreground"
                      : "text-secondary-foreground hover:bg-secondary-foreground/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "Timeline" && (
              <div className="flex-1 flex flex-col">
                <p className="text-xs text-secondary-foreground/70 mb-3">Impressions by month — last 12 months (organic + sponsored)</p>
                <div className="flex-1 min-h-0">
                  <TimelineChart />
                </div>
              </div>
            )}

            {tab === "Content Mix" && (
              <div>
                <p className="text-xs text-secondary-foreground/70 mb-3">Post performance by content category — engagement rate vs CTR vs reach</p>
                <ContentMixChart />
              </div>
            )}

            {tab === "Org vs Spn" && (
              <div>
                <p className="text-xs text-secondary-foreground/70 mb-3">Quarterly impressions split: organic vs sponsored</p>
                <OrgVsSpnChart />
              </div>
            )}

            {tab === "Top Posts" && <TopPostsTable />}
          </div>
        </div>
      </div>
    </section>
  );
}
