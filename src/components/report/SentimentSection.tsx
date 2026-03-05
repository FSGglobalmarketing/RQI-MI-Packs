import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts";
import KpiRow from "./KpiRow";
import {
  sentimentKpis, sentimentBreakdown, mentionsByMonth,
  channelBreakdown, countryBreakdown, recentHighlights,
} from "@/data/sentiment-data";

const TABS = ["Timeline", "Sentiment", "Channels", "Geography"] as const;
type Tab = typeof TABS[number];

const COLORS = {
  positive: "hsl(142 60% 45%)",
  neutral: "hsl(205 30% 55%)",
  negative: "hsl(14 100% 57%)",
};

/* ── Timeline: stacked area chart ── */
function TimelineChart() {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <AreaChart data={mentionsByMonth} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} />
        <YAxis tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} />
        <Tooltip
          contentStyle={{ background: "hsl(195 30% 12%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
          labelStyle={{ color: "hsl(14 78% 57%)", fontWeight: 700 }}
        />
        <Area type="monotone" dataKey="negative" stackId="1" fill="hsl(14 100% 57% / 0.3)" stroke={COLORS.negative} strokeWidth={1.5} />
        <Area type="monotone" dataKey="neutral" stackId="1" fill="hsl(205 30% 55% / 0.25)" stroke={COLORS.neutral} strokeWidth={1.5} />
        <Area type="monotone" dataKey="positive" stackId="1" fill="hsl(142 60% 45% / 0.35)" stroke={COLORS.positive} strokeWidth={2} />
        <Legend
          wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
          formatter={(value: string) => (
            <span style={{ color: "hsl(195 15% 65%)", textTransform: "capitalize" }}>{value}</span>
          )}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ── Donut chart ── */
function SentimentDonut() {
  const data = [
    { name: "Positive", value: sentimentBreakdown.positive },
    { name: "Neutral", value: sentimentBreakdown.neutral },
    { name: "Negative", value: sentimentBreakdown.negative },
  ];
  const total = data.reduce((s, d) => s + d.value, 0);
  const colors = [COLORS.positive, COLORS.neutral, COLORS.negative];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "hsl(195 30% 12%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex gap-6 mt-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
            <span className="text-muted-foreground">{d.name}</span>
            <span className="font-bold text-foreground">{((d.value / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Channel bar chart ── */
function ChannelChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={channelBreakdown} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} />
        <YAxis type="category" dataKey="channel" tick={{ fontSize: 11, fill: "hsl(195 15% 65%)" }} width={70} />
        <Tooltip
          contentStyle={{ background: "hsl(195 30% 12%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
        />
        <Bar dataKey="positive" stackId="a" fill={COLORS.positive} radius={[0, 0, 0, 0]} />
        <Bar dataKey="neutral" stackId="a" fill={COLORS.neutral} />
        <Bar dataKey="negative" stackId="a" fill={COLORS.negative} radius={[0, 4, 4, 0]} />
        <Legend
          wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
          formatter={(value: string) => (
            <span style={{ color: "hsl(195 15% 65%)", textTransform: "capitalize" }}>{value}</span>
          )}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Geography bar chart ── */
function GeographyChart() {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <BarChart data={countryBreakdown} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} />
        <YAxis type="category" dataKey="country" tick={{ fontSize: 10, fill: "hsl(195 15% 65%)" }} width={100} />
        <Tooltip
          contentStyle={{ background: "hsl(195 30% 12%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
        />
        <Bar dataKey="mentions" fill="hsl(14 100% 57%)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Sentiment dot ── */
function SentimentDot({ sentiment }: { sentiment: string }) {
  const color = sentiment === "positive" ? COLORS.positive : sentiment === "negative" ? COLORS.negative : COLORS.neutral;
  return <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />;
}

/* ── Main Section ── */
export default function SentimentSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Timeline");

  return (
    <section id="sentiment" className="section-dark topo-pattern hex-pattern-dark py-24 flow-section-dark relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">Sentiment Monitoring</h2>
          <span className="stage-badge text-xs">Social Listening</span>
        </div>
        <p className="text-muted-foreground mb-8">
          Brand visibility and media sentiment tracking across web, social and news channels — powered by Brandwatch.
        </p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — KPIs & Highlights */}
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Monitoring of all public mentions of Igneo Infrastructure Partners across global web, news, LinkedIn, Twitter/X, and Bluesky.
              Coverage spans Sep 2025 – Mar 2026 with 940+ tracked mentions across 24 countries.
            </p>

            <div>
              <h4 className="text-sm font-bold mb-4 text-foreground">Key Metrics</h4>
              <div className="space-y-3">
                <KpiRow value="940+" label="Total mentions" comparison="+18% vs prior period" />
                <KpiRow value={sentimentKpis.positiveRate} label="Positive sentiment" comparison="+5pp vs Q3" />
                <KpiRow value={String(sentimentKpis.countriesReached)} label="Countries reached" comparison="+3 new markets" />
                <KpiRow value="83%" label="Web coverage share" comparison="Dominant channel" />
              </div>
            </div>

            {/* Recent Highlights */}
            <div className="glass-card-dark flow-corner-bl">
              <h4 className="text-sm font-bold mb-3 text-foreground">Notable Coverage</h4>
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
                {recentHighlights.map((m, i) => (
                  <a
                    key={i}
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group cursor-pointer"
                  >
                    <SentimentDot sentiment={m.sentiment} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {m.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-muted-foreground">{m.source}</span>
                        <span className="text-[10px] text-muted-foreground">·</span>
                        <span className="text-[10px] text-muted-foreground">{new Date(m.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                    </div>
                    <svg className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
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
              <div>
                <p className="text-xs text-muted-foreground mb-3">Monthly mentions by sentiment (stacked)</p>
                <TimelineChart />
              </div>
            )}

            {activeTab === "Sentiment" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Overall sentiment distribution — Sep 2025 to Mar 2026</p>
                <SentimentDonut />
              </div>
            )}

            {activeTab === "Channels" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Mentions by channel with sentiment breakdown</p>
                <ChannelChart />
              </div>
            )}

            {activeTab === "Geography" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Top 10 countries by mention volume</p>
                <GeographyChart />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
